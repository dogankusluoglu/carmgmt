import { useState, Fragment } from "react"

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import dayjs from 'dayjs';

import MUIDataTable from "mui-datatables";

// import { CollapsibleTable } from "./CollapsibleTable";

export const CarsView = () => {

    // Using useSWR hook to fetch data
    const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(JSON.stringify(cars))

    // Header Setup (for later edit vehicle)
    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();
    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    const columns = [
        "Year", 
        "Brand", 
        "Model", 
        "Colour",
        "Mileage", 
        "Purchased From", 
        "VIN Number", 
        "Registration",
        "Cost Price", 
        "Retail Price", 
        "Date Purchased"
    ];

    const data = cars.map(car => [
        car.year, 
        car.carBrand, 
        car.model, 
        car.colour,
        car.mileage,
        car.purchasedFrom,
        car.vin,
        car.reg,
        car.cost,
        car.retail,
        car.date,
        // In case I need to stringify the expenses array as well
        // JSON.stringify(car.expenses),
        // car.totalSpent,
        // car.salesman,
        // car.soldDate,
        // car.profit,
        // car.soldTo,
        // car.notes,
        // car.status
    ])

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            <h1>View All Cars</h1>
            {/* <CollapsibleTable /> */}
            <MUIDataTable
                title={"Car List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
