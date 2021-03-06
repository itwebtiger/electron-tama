import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllInvoices extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="view-top-bar">
            <span>
              All Invoices
            </span>
            <div className="view-action-buttons">
              <button>
                + New Invoice
              </button>
              <button>
                + Add Deposit
              </button>
            </div>
          </div>
          <div className="detail">
            <div className="tabs-container">
              <Link to="/invoices" replace>
                Billed
              </Link>
              <Link to="/invoices/draft" replace>
                Drafts
              </Link>
              <Link to="/invoices/all" replace>
                All Invoices
              </Link>
              <Link to="/invoices/paid" replace>
                Paid
              </Link>
            </div>
            <div className="bill-notification">
              <span>
                No invoices found. <Link to="/invoices/edit/new">Create an invoice?</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllInvoices;
