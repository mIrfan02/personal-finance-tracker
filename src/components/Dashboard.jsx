function Dashboard({ transactions }) {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Get this month's data
    const now = new Date();
    const thisMonth = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });

    const monthIncome = thisMonth
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthExpense = thisMonth
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <span>📊</span> Dashboard
          </h1>
          <p className="page-subtitle">Welcome back! Here's your financial overview</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-header">
              <div className="summary-icon income">💵</div>
              <div className="summary-content">
                <div className="summary-label">Total Income</div>
                <div className="summary-amount">${totalIncome.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-header">
              <div className="summary-icon expense">💸</div>
              <div className="summary-content">
                <div className="summary-label">Total Expenses</div>
                <div className="summary-amount">${totalExpense.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-header">
              <div className="summary-icon balance">💰</div>
              <div className="summary-content">
                <div className="summary-label">Balance</div>
                <div className="summary-amount">${balance.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h2 className="card-title">📅 This Month</h2>
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-value" style={{color: '#10b981'}}>${monthIncome.toFixed(0)}</div>
              <div className="stat-label">Income</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{color: '#ef4444'}}>${monthExpense.toFixed(0)}</div>
              <div className="stat-label">Expenses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{thisMonth.length}</div>
              <div className="stat-label">Transactions</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">${(monthIncome - monthExpense).toFixed(0)}</div>
              <div className="stat-label">Saved</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card" style={{marginTop: '30px'}}>
          <h2 className="card-title">🕒 Recent Transactions</h2>
          <div className="transactions-list" style={{maxHeight: '400px'}}>
            {transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p className="empty-text">No transactions yet. Start adding some!</p>
              </div>
            ) : (
              transactions.slice(0, 5).map(transaction => (
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Dashboard;