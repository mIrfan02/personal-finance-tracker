import { useState } from 'react';

function Transactions({ transactions, onDelete }) {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span>📋</span> All Transactions
        </h1>
        <p className="page-subtitle">View and manage your transaction history</p>
      </div>

      <div className="card">
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({transactions.length})
          </button>
          <button
            className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
            onClick={() => setFilter('income')}
          >
            💵 Income ({transactions.filter(t => t.type === 'income').length})
          </button>
          <button
            className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
            onClick={() => setFilter('expense')}
          >
            💸 Expenses ({transactions.filter(t => t.type === 'expense').length})
          </button>
        </div>

        <div className="transactions-list">
          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p className="empty-text">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-meta">
                    <span className="transaction-category">{transaction.category}</span>
                    <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(transaction.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;