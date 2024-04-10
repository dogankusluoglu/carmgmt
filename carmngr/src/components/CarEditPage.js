import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useNavigate } from "react-router"

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import MUIDataTable from "mui-datatables";

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import { TextField } from '@mui/material';

export const CarEditPage = () => {

    const [expenseData, setExpenseData] = useState({
        description: '',
        amount: '',
        car: ''
    })
    
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
        status: '',
        expenses: []
    })

    const { data:car, error, isLoading } = useSWR(`/cars/${carId}`, fetcher);

    // console.log(car)

    const navigate = useNavigate();

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

    const handleExpenseChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };

    const columnsExp = [
        "Description",
        "Amount",
    ];

    const expenses = carData.expenses.map(expense => [
        expense.description,
        expense.amount
    ])

    let totalExpenses = 0;

    for (const expense of expenses) {
        totalExpenses += Number(expense[1])
    }

    // console.log(totalExpenses)

    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();

    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);

    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    // console.log(JSON.stringify(carData));

    const submitForm = async (carData) => {
        await fetchx(`/cars/${carId}/`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(carData),
            // body: carData,
            
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
          })
        .catch((error) => {
            console.error('Error:', error);
        });
    }  

    const submitExpense = async (carData) => {
        expenseData.car = carId
        await fetchx(`/expenses/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(expenseData),
            // body: carData,
            
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
          })
        .catch((error) => {
            console.error('Error:', error);
        });
    }  

    // console.log(carData.expenses)

    const options = {
        filterType: 'checkbox',
        onRowClick: (rowData, rowMeta) => {
            navigate(`/expenses/${rowData[0]}`);
        }
    };

    return (
        <div>
            <h1>{carData.year} {carData.carBrand} {carData.model} ({carData.colour}) from {carData.purchasedFrom}</h1>
            <h2>Profit after expenses: R{Number(carData.retail) - Number(carData.cost) - totalExpenses}</h2>
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

                <div>
                    <Button 
                        id="submit"
                        variant="contained"
                        onClick={() => {
                            submitForm(carData)
                            console.log(carData)
                        }}
                    > Submit </Button>
                </div>
                <h2>Expenses</h2>
                <h3>Total = R{totalExpenses}</h3>
                
                <div>
                    <TextField 
                        name="description" 
                        label="Description" 
                        variant="outlined"
                        value={expenseData.description}
                        onChange={handleExpenseChange}
                    />

                    <TextField 
                        name="amount" 
                        label="Amount" 
                        variant="outlined"
                        value={expenseData.amount}
                        onChange={handleExpenseChange}
                    />

                    <Button 
                        id="submit"
                        variant="contained"
                        onClick={() => {
                            submitExpense(expenseData)
                            console.log(expenseData)
                        }}
                    > Submit Expense </Button>
                </div>

                <MUIDataTable
                    title={`${carData.year} ${carData.carBrand} ${carData.model}  Expenses`}
                    data={expenses}
                    columns={columnsExp}
                    options={options}
                />
            </div>
    )
}
