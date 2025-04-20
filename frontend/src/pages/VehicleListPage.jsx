// src/pages/VehicleListPage.jsx

import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchVehicles } from '../api/vehiclesAPI';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: 'none',
          },
        },
      },
    },
  });

function VehicleListPage() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    loadVehicles();
  }, []);

  // Unique "YYYY MMMM" options for Date Added filter
  const monthYearOptions = useMemo(() => {
    return Array.from(
      new Set(
        vehicles
          .map(v => (v.created_at ? moment(v.created_at).format('YYYY MMMM') : null))
          .filter(Boolean)
      )
    );
  }, [vehicles]);

  const columns = [
    {
      name: 'registration_number',
      label: 'Reg No',
      options: { filter: false, sort: true },
    },
    { name: 'make',         label: 'Make',         options: { filter: true,  sort: true } },
    { name: 'model',        label: 'Model',        options: { filter: true,  sort: true } },
    { name: 'vehicle_year', label: 'Year',         options: { filter: true,  sort: true } },
    { name: 'colour',       label: 'Colour',       options: { filter: false, sort: true } },
    { name: 'mileage',      label: 'Mileage',      options: { filter: false, sort: true } },
    { name: 'cost',         label: 'Cost',         options: { filter: false, sort: true } },
    { name: 'retail_price', label: 'Retail Price', options: { filter: false, sort: true } },
    { name: 'status',       label: 'Status',       options: { filter: true,  sort: true } },

    // ← New filterable Salesman column
    {
      name: 'salesman',
      label: 'Salesman',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'created_at',
      label: 'Date Added',
      options: {
        filter: true,
        sort: true,
        filterType: 'multiselect',
        filterOptions: {
          names: monthYearOptions,
          logic: (cellValue, filters) => {
            const label = cellValue
              ? moment(cellValue).format('YYYY MMMM')
              : null;
            if (!filters.length) return false;
            return !filters.includes(label);
          },
        },
        customBodyRender: value =>
          value ? moment(value).format('YYYY MMMM') : '',
      },
    },
    {
      name: 'actions',
      label: 'Details',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: dataIndex => {
          const vehicle = vehicles[dataIndex];
          return (
            <Link
              to={`/vehicles/${vehicle.id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    responsive: 'standard',
    elevation: 2,
  };

  return (
    <div className="w-full p-6">
      {/* Header with Add Vehicle button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
        <button
          onClick={() => navigate('/vehicles/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          + Add Vehicle
        </button>
      </div>

      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="Vehicles"
          data={vehicles}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default VehicleListPage;
