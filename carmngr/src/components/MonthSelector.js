import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

const MonthSelector = ({ onMonthChange }) => {
    const months = [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 }
    ];

    const [month, setMonth] = useState(months[new Date().getMonth()]); // Default to current month

    const handleChange = (event) => {
        const selectedMonth = months.find(m => m.value === parseInt(event.target.value));
        setMonth(selectedMonth);
        onMonthChange(selectedMonth);
    };

    return (
        <TextField
        select
        label="Select Month"
        value={month.value}
        onChange={handleChange}
        fullWidth
        >
        {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
        ))}
        </TextField>
    );
};

export default MonthSelector;