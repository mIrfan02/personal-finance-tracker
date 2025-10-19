import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import Transactions from './components/Transactions';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('financeTransactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard transactions={transactions} />} />
          <Route path="/add" element={<AddTransaction onAdd={addTransaction} />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} onDelete={deleteTransaction} />} />
          <Route path="/analytics" element={<Analytics transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;