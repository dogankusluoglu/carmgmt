import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  fetchVehicleById,
  deleteVehicleById,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../api/vehiclesAPI';

function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // Inline new-expense form state
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Edit-expense state
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchVehicleById(id);
        setVehicle(data);
        setExpenses(data.expenses || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const handleEditVehicle = () => navigate(`/vehicles/${id}/edit`);
  const handleDeleteVehicle = async () => {
    if (window.confirm('Delete this vehicle?')) {
      await deleteVehicleById(id);
      navigate('/');
    }
  };

  const toggleNewForm = () => {
    setError('');
    setShowForm(prev => !prev);
    setAmount('');
    setDescription('');
    setEditingId(null);
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const newExp = await createExpense(id, {
        amount: parseFloat(amount),
        expense_description: description,
      });
      setExpenses(prev => [...prev, newExp]);
      toggleNewForm();
    } catch {
      setError('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditAmount(exp.amount);
    setEditDescription(exp.expense_description);
    setError('');
    setShowForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
    setEditDescription('');
    setError('');
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateExpense(editingId, {
        amount: parseFloat(editAmount),
        expense_description: editDescription,
      });
      setExpenses(prev => prev.map(ev => ev.id === editingId ? updated : ev));
      cancelEdit();
    } catch {
      setError('Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expId) => {
    if (window.confirm('Delete this expense?')) {
      await deleteExpense(expId);
      setExpenses(prev => prev.filter(ev => ev.id !== expId));
    }
  };

  if (!vehicle) {
    return <div className="p-4">Loading...</div>;
  }

  // Financial calculations
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const profitCalc = Number(vehicle.retail_price) - Number(vehicle.cost) - totalExpenses;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Inventory</Link>

      {/* Vehicle details and financial summary */}
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 bg-white border rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-2">{vehicle.make} {vehicle.model}</h1>
          <div className="space-y-1 text-gray-700">
            <p><strong>Year:</strong> {vehicle.vehicle_year}</p>
            <p><strong>Colour:</strong> {vehicle.colour}</p>
            <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
            <p><strong>Status:</strong> {vehicle.status}</p>
            {vehicle.status === 'sold' && (
              <>
                <p><strong>Salesman:</strong> {vehicle.salesman}</p>
                <p><strong>Month Sold:</strong> {vehicle.sold_month}</p>
              </>
            )}
          </div>
        </div>

        <div className="md:w-1/3 bg-white border rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Financial Summary</h3>
          <p className="mb-2"><strong>Cost:</strong> R{Number(vehicle.cost).toFixed(2)}</p>
          <p className="mb-2"><strong>Retail Price:</strong> R{Number(vehicle.retail_price).toFixed(2)}</p>
          <p className="mb-2"><strong>Total Expenses:</strong> R{totalExpenses.toFixed(2)}</p>
          <p className={
            `font-semibold ${profitCalc >= 0 ? 'text-green-600' : 'text-red-600'}`
          }><strong>Profit:</strong> R{profitCalc.toFixed(2)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button onClick={handleEditVehicle} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit Vehicle</button>
        <button onClick={handleDeleteVehicle} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete Vehicle</button>
        <button onClick={toggleNewForm} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {/* Inline New Expense Form */}
      {showForm && (
        <form onSubmit={handleSubmitExpense} className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">New Expense</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount (R)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {loading ? 'Saving...' : 'Save Expense'}
          </button>
        </form>
      )}

      {/* Expenses List */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-600">No expenses recorded.</p>
        ) : (
          expenses.map(exp => (
            <div key={exp.id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-start">
              {editingId === exp.id ? (
                <form onSubmit={handleUpdateExpense} className="w-full">
                  <input
                    type="number"
                    step="0.01"
                    value={editAmount}
                    onChange={e => setEditAmount(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2"
                    required
                  />
                  <textarea
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2"
                    required
                  />
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  <div className="flex space-x-2">
                    <button type="button" onClick={cancelEdit} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition">Cancel</button>
                    <button type="submit" disabled={loading} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">{loading ? '...' : 'Save'}</button>
                  </div>
                </form>
              ) : (
                <>  
                  <div>
                    <p className="font-semibold">R{exp.amount}</p>
                    <p className="text-gray-700">{exp.expense_description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => startEdit(exp)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">Edit</button>
                    <button onClick={() => handleDeleteExpense(exp.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VehicleDetailPage;
