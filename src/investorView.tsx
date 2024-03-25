import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const InvestorView: React.FC = () => {
  return (
    <div className="text-left">
      <Link to="/" className="text-indigo-500 hover:text-indigo-600">
        <h1 className="text-3xl font-bold mb-8 cursor-pointer">Atlanta Tech Ecosystem Dashboard</h1>
      </Link>
      <h2>Dummy text for now but will add graphs</h2>
    </div>
  );
};

export default InvestorView;
