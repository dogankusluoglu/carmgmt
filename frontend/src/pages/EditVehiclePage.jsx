import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchVehicleById, updateVehicle } from '../api/vehiclesAPI';

export default function EditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    registration_number: '',
    make: '',
    model: '',
    vehicle_year: '',
    colour: '',
    mileage: '',
    cost: '',
    retail_price: '',
    status: '',
    origin_location: '',
    additional_description: '',
    salesman: '',
    sold_month: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const data = await fetchVehicleById(id);
        setForm({
          registration_number: data.registration_number || '',
          make:                 data.make || '',
          model:                data.model || '',
          vehicle_year:         data.vehicle_year || '',
          colour:               data.colour || '',
          mileage:              data.mileage || '',
          cost:                 data.cost || '',
          retail_price:         data.retail_price || '',
          status:               data.status || '',
          origin_location:      data.origin_location || '',
          additional_description: data.additional_description || '',
          salesman:             data.salesman || '',
          sold_month:           data.sold_month || '',
        });
      } catch (err) {
        console.error('Failed to load vehicle:', err);
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await updateVehicle(id, form);
      navigate(`/vehicles/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update vehicle.');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Reuse same inputs as AddVehiclePage, using form values */}
          {/* ... registration_number, make, model, vehicle_year, colour, mileage, cost, retail_price, status, origin_location, additional_description, salesman, sold_month ... */}
          {Object.entries(form).map(([key, val]) => (
            <div key={key} className={['additional_description'].includes(key) ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700">
                {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              {key === 'additional_description' ? (
                <textarea
                  name={key}
                  value={val}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <input
                  type={['mileage','vehicle_year'].includes(key) ? 'number' : 'text'}
                  name={key}
                  value={val}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/vehicles/${id}`)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none"
          >
            {submitting ? 'Updating...' : 'Update Vehicle'}
          </button>
        </div>
      </form>
    </div>
  );
}
