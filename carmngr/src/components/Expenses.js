import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import MUIDataTable from "mui-datatables";

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

export const Expenses = () => {
    
    const navigate = useNavigate()

    const { data:cars, errorCars, isLoadingCars } = useSWR(`/cars`, fetcher);
    const { data:expenses, error, isLoading } = useSWR(`/expenses`, fetcher);
    if (error || errorCars) return <div>failed to load</div>
    if (isLoading || isLoadingCars) return <div>loading...</div>
    // console.log(expenses)
    // console.log(cars)

    const carData = cars.map(car => [
        car.id,
        car.year,
        car.carBrand,
        car.model,
        car.colour
    ])

    const carLookup = cars.reduce((acc, car) => {
        acc[car.id] = car.year + " " + car.carBrand + " " + car.model + " (" + car.colour + ")"; 
        return acc;
      }, {});

    const columnsExp = [
        "ID",
        "Description",
        "Amount",
        "Created at",
        "Car"
    ];

    const expensesData = expenses.map(expense => [
        expense.id,
        expense.description,
        expense.amount,
        expense.created_at,
        carLookup[expense.car] || 'Unknown Car'
    ])

    const options = {
        filterType: 'checkbox',
        onRowClick: (rowData, rowMeta) => {
            navigate(`/expenses/${rowData[0]}`);
        }
    };

    return (
        <div>
            {/* <h1>All Expenses</h1> */}
            <MUIDataTable
                title={`Expenses`}
                data={expensesData}
                columns={columnsExp}
                options={options}
            />
        </div>
    )
}
