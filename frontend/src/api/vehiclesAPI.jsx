import axios from 'axios';

// Create an axios instance with a base URL for API endpoints
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Fetch all vehicles
export const fetchVehicles = async () => {
  try {
    const response = await api.get('/vehicles/');
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

// Fetch a single vehicle by its ID
export const fetchVehicleById = async (id) => {
  try {
    const response = await api.get(`/vehicles/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle with id ${id}:`, error);
    throw error;
  }
};

// Delete a vehicle by its ID
export const deleteVehicleById = async (id) => {
  try {
    const response = await api.delete(`/vehicles/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with id ${id}:`, error);
    throw error;
  }
};

export const createExpense = async (vehicleId, expenseData) => {
  try {
    const response = await api.post(`/vehicles/${vehicleId}/expenses/`, expenseData);
    return response.data;
  } catch (error) {
    console.error(`Error creating expense for vehicle ${vehicleId}:`, error);
    throw error;
  }
};

export const updateExpense = async (expenseId, data) => {
  const res = await api.put(`/expenses/${expenseId}/`, data);
  return res.data;
};

export const deleteExpense = async (expenseId) => {
  const res = await api.delete(`/expenses/${expenseId}/`);
  return res.data;
};

/**
 * Create a new vehicle
 * @param {object} vehicleData – matches your Django Vehicle model fields
 */
export const createVehicle = async (vehicleData) => {
  try {
    const response = await api.post('/vehicles/', vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

/**
 * Update an existing vehicle
 * @param {string|number} id
 * @param {object} vehicleData
 */
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await api.put(`/vehicles/${id}/`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

export default api;
