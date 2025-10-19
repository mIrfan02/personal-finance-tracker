import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#a855f7'];

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Salary',
  'Freelance',
  'Investment',
  'Other'
];

function Analytics({ transactions }) {
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Category breakdown for expenses
  const categoryData = CATEGORIES.map(category => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: category, value: total, percentage: ((total / totalExpense) * 100).toFixed(1) };
  }).filter(item => item.value > 0);

  // Monthly trend data (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en', { month: 'short', year: 'numeric' });

      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === date.getMonth() &&
               tDate.getFullYear() === date.getFullYear();
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: monthName,
        income,
        expense,
        net: income - expense
      });
    }

    return months;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span>📈</span> Analytics
        </h1>
        <p className="page-subtitle">Visualize your spending patterns and trends</p>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">

        {/* Expense Breakdown */}
        <div className="chart-card">
          <h3 className="chart-header">🥧 Expense Breakdown</h3>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{background: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}}
                    formatter={(value) => `$${value.toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="category-list">
                {categoryData.map((cat, index) => (
                  <div key={cat.name} className="category-item">
                    <div
                      className="category-color"
                      style={{background: COLORS[index % COLORS.length]}}
                    />
                    <div className="category-name">{cat.name}</div>
                    <div className="category-bar">
                      <div
                        className="category-bar-fill"
                        style={{
                          width: `${(cat.value / totalExpense) * 100}%`,
                          background: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                    <div className="category-amount">${cat.value.toFixed(2)}</div>
                    <div className="category-percent">{cat.percentage}%</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p className="empty-text">No expense data to display</p>
            </div>
          )}
        </div>

        {/* Monthly Comparison */}
        <div className="chart-card">
          <h3 className="chart-header">📊 Monthly Comparison</h3>
          {transactions.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{background: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📉</div>
              <p className="empty-text">No data to display</p>
            </div>
          )}
        </div>

        {/* Net Income Trend */}
        <div className="chart-card" style={{gridColumn: '1 / -1'}}>
          <h3 className="chart-header">💹 Net Income Trend (Last 6 Months)</h3>
          {transactions.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{background: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#6366f1"
                  strokeWidth={3}
                  name="Net Income"
                  dot={{ fill: '#6366f1', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📈</div>
              <p className="empty-text">No trend data to display</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Analytics;