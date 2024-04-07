import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import { TextField } from '@mui/material';

export const CarEditPage = () => {
    
    const { carId } = useParams();
    // console.log(carId)

    const [carData, setCarData] = useState({
        vin: '',
        carBrand: '',
        year: '',
        model: '',
        colour: '',
        mileage: '',
        reg: '',
        cost: '', 
        retail: '',
        purchasedFrom: '',
        totalSpent: '',
        salesman: '',
        profit: '',
        soldTo: '',
        date: dayjs(),
        soldDate: dayjs(),
        notes: '',
        status: ''
    })

    const { data:car, error, isLoading } = useSWR(`/cars/${carId}`, fetcher);

    // console.log(car)

    useEffect(() => {
        if (car) {
            setCarData({
            ...carData, // This spreads the existing state 
            ...car, // This spreads the fetched car data, overriding the properties from the initial state
            date: car.date ? dayjs(car.date) : dayjs(), // Assuming 'date' needs to be handled by dayjs 
            });
        }
    }, [car]); // This effect depends on `car`, so it runs whenever `car` changes.

    // console.log(carData)

    const handleChange = (e, newDate) => {
        if (e?.target) {
            setCarData({ ...carData, [e.target.name]: e.target.value });
        } else {
            setCarData({ ...carData, date: newDate })
        }
    };

    return (
        <div>
            <h1>{carData.year} {carData.carBrand} {carData.model} ({carData.colour})</h1>
            <div>
                <TextField 
                    name="vin" 
                    label="VIN Number" 
                    variant="outlined"
                    value={carData.vin}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="year" 
                    label="Year" 
                    variant="outlined"
                    value={carData.year}
                    onChange={handleChange}
                />
            </div>
            <div>    
                <TextField 
                    name="carBrand" 
                    label="Brand (Audi, BMW, Volkswagen, ...)" 
                    variant="outlined"
                    value={carData.carBrand}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="model" 
                    label="Model (eg. 320d, C200, A3...)" 
                    variant="outlined"
                    value={carData.model}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="colour" 
                    label="Colour" 
                    variant="outlined"
                    value={carData.colour}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="mileage" 
                    label="Mileage" 
                    variant="outlined"
                    value={carData.mileage}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="reg" 
                    label="Registration Number" 
                    variant="outlined"
                    value={carData.reg}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="cost" 
                    label="Cost Price (R)" 
                    variant="outlined"
                    value={carData.cost}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="retail" 
                    label="Retail Price (R)" 
                    variant="outlined"
                    value={carData.retail}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField 
                    name="purchasedFrom" 
                    label="Purchased From" 
                    variant="outlined"
                    value={carData.purchasedFrom}
                    onChange={handleChange}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Date Purchased"
                    name="date"
                    value={carData.date}
                    onChange={(newDate) => handleChange(null, newDate)}
                />
            </LocalizationProvider>
            <div>
                <TextField 
                    name="totalSpent" 
                    label="Total Spent (R)" 
                    variant="outlined"
                    value={carData.totalSpent}
                    onChange={handleChange}
                />
                </div>
                <div>
                    <TextField 
                        name="salesman" 
                        label="Salesman" 
                        variant="outlined"
                        value={carData.salesman}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField 
                        name="profit" 
                        label="Profit (R)" 
                        variant="outlined"
                        value={carData.profit}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField 
                        name="soldTo" 
                        label="Sold To" 
                        variant="outlined"
                        value={carData.soldTo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField 
                        name="notes" 
                        label="Notes" 
                        variant="outlined"
                        value={carData.notes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField 
                        name="status" 
                        label="Status" 
                        variant="outlined"
                        value={carData.status}
                        onChange={handleChange}
                    />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date Sold"
                        name="dateSold"
                        value={carData.dateSold}
                        onChange={(newDate) => handleChange(null, newDate)}
                    />
                </LocalizationProvider>
            </div>
    )
}
