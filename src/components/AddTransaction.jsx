import { useState } from 'react';

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

function AddTransaction({ onAdd }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      alert('Please fill all fields!');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onAdd(newTransaction);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setFormData({
      type: 'expense',
      description: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span>➕</span> Add Transaction
        </h1>
        <p className="page-subtitle">Record your income or expense</p>
      </div>

      <div className="card form-card">
        {showSuccess && (
          <div className="success-message">
            <span>✓</span>
            Transaction added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="type-selector">
            <button
              type="button"
              className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
            >
              <span>💵</span> Income
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
            >
              <span>💸</span> Expense
            </button>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., Grocery shopping, Salary, Coffee"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount ($) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;