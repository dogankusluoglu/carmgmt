import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import MUIDataTable from "mui-datatables";

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import dayjs from 'dayjs';

export const Expenses = () => {
    
    const navigate = useNavigate()

    // const [ expensesData, setExpensesData ] = useState("")
    
    const { data:cars, errorCars, isLoadingCars } = useSWR(`/cars`, fetcher);
    const { data:expenses, error, isLoading } = useSWR(`/expenses`, fetcher);
    // useEffect(() => {
    // if(expenses) setExpensesData(expenses);
    //     }, [expenses]);
    if (error || errorCars) return <div>failed to load</div>
    if (isLoading || isLoadingCars) return <div>loading...</div>
    // console.log(expenses)
    // console.log(cars)

    // Header Setup (for later edit vehicle)
    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();
    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    const carData = cars ? cars.map(car => [
        car.id,
        car.year,
        car.carBrand,
        car.model,
        car.colour
    ]) : []

    const carLookup = cars ? cars.reduce((acc, car) => {
        acc[car.id] = car.year + " " + car.carBrand + " " + car.model + " (" + car.colour + ")"; 
        return acc;
      }, {}) : "";

    const deleteRow = async (id) => {
        try {
            const response = await fetchx(`/expenses/${id}`,{
                method: 'DELETE',
                headers: headers
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
    
            // Check if there's content to parse
            let data = 'Delete successful';
            if (response.status !== 204) { // 204 No Content
                data = await response.json(); // Only parse JSON if there's content
            }
            
            console.log(data); // Log the success message or returned data
        } catch (err) {
            console.error('Error deleting the record:', err);
        }
    }

    const columnsExp = [
        "ID",
        "Description",
        "Amount",
        "Created at",
        "Car"
    ];

    const expensesData = expenses ? expenses.map(expense => [
        expense.id,
        expense.description,
        expense.amount,
        dayjs(expense.created_at).format('DD MMMM YYYY'),
        carLookup[expense.car] || 'Unknown Car'
    ]): []

    const options = {
        filterType: 'checkbox',
        onRowClick: (rowData, rowMeta) => {
            navigate(`/expenses/${rowData[0]}`);
        },
        onRowsDelete: (rowsDeleted, dataRows) => {
            const dataIndexes = rowsDeleted.data.map(row => row.dataIndex);
            dataIndexes.forEach(index => {
                // Assuming the ID is in the first column of your data
                const id = expensesData[index][0];
                // console.log(`ID of the deleted row: ${id}`);
                deleteRow(id)
            });
            // console.log(rowsDeleted);
        }
    };

    return (
        <div>
            <h1>Expenses</h1>
            <MUIDataTable
                title={`All Expenses`}
                data={expensesData}
                columns={columnsExp}
                options={options}
            />
        </div>
    )
}
