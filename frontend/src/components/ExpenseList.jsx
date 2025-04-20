// src/components/ExpenseList.js
import React from 'react';

function ExpenseList({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p className="text-gray-500">No expenses recorded for this vehicle.</p>;
  }
  
  return (
    <ul className="space-y-2">
      {expenses.map((expense, index) => (
        <li key={index} className="p-2 border rounded bg-gray-50">
          <p><strong>Amount:</strong> {expense.amount}</p>
          <p><strong>Description:</strong> {expense.expense_description}</p>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
