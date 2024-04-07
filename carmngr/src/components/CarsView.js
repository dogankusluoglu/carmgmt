import { useState, Fragment } from "react"

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import dayjs from 'dayjs';

import { CollapsibleTable } from "./CollapsibleTable";

export const CarsView = () => {

    // Using useSWR hook to fetch data
    // const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    // console.log(error)

    // Header Setup (for later edit vehicle)
    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();
    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    return (
        <div>
            <h1>View All Cars</h1>
            <CollapsibleTable />
        </div>
    )
}
