import Backbone from 'backbone-associations';
import moment from 'moment';
import { mapValues, assignIn, isEmpty, clone, map } from 'lodash';

export default Backbone.AssociatedModel.extend({
  idAttribute: '_id',

  defaults: {
    modifiedFields: [],
    createdAt: moment(),
    modifiedAt: null,
  },

  async save(attrs, options) {
    // Set last modified times
    if (this.changedAttributes() !== false) {
      let modifiedFields = this.changedAttributes();
      modifiedFields = mapValues(modifiedFields, () => moment());
      modifiedFields = assignIn(this.attributes.modifiedFields, modifiedFields);

      this.set({
        modifiedFields,
        modifiedAt: moment(),
      });
    }

    // Proxy the call to the original save function
    const res = await Backbone.Model.prototype.save.apply(this, [attrs, options]);
    return res;
  },

  toJSON(options) {
    const attributes = clone(this.attributes);
    const { relations } = this;

    if (options && options.relations) {
      return new Promise(async (resolve, reject) => {
        // Fetch all the relations
        if (!isEmpty(relations)) {
          try {
            const tasks = relations.map((relation) => this.fetchRelations({ relation, attributes, reject }));
            await Promise.all(tasks);
            resolve(attributes);
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(attributes);
        }
      });
    }

    if (!isEmpty(relations)) {
      relations.forEach((relation) => {
        if (relation.type === 'Many') {
          const relationCol = this.get(relation.key);
          const ids = relationCol.models.map((m) => m.id);
          attributes[relation.key] = ids;
        }
      });
    }

    return attributes;
  },

  async fetchRelations(options) {
    const { relation, attributes, reject } = options;
    const Model = relation.relatedModel();
    attributes[relation.key] = [];

    // Fetch the models
    const models = this.get(relation.key);
    if (models.length > 0) {
      const tasks = [];

      models.forEach((_model) => {
        const _m = new Model();
        _m.set({ _id: _model.id });
        tasks.push(_m.fetch());
      });

      try {
        const values = await Promise.all(tasks);
        attributes[relation.key] = map(values, (value) => value.toJSON());
      } catch (err) {
        reject(err);
      }
    }

    return attributes;
  }
});
