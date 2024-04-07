import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router'; 

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';

import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

import { CarRow } from './CarRow';

export const CollapsibleTable = () => {
    // Using useSWR hook to fetch data
    const { data:initialCars, error, isLoading } = useSWR('/cars', fetcher);
    // console.log(initialCars)
    // console.log(isLoading)

    // Header Setup (for later edit vehicle)
    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();
    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState(null);

    useEffect(() => {
        if(initialCars) setCars(initialCars);
    }, [initialCars]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const navigate = useNavigate();

    const handleEdit = (car) => {
        console.log("Editing car:", car);
        navigate(`/editcar/${car.id}`);
    };

    const filteredCars = cars ? cars.filter(car =>
        car.carBrand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm) ||
        car.year.toString().includes(searchTerm) ||
        car.vin.toString().includes(searchTerm)
    ): []

    return (
        <>
            <TextField
                label="Search Cars"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleSearchChange}
            />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Year</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Colour</TableCell>
                        <TableCell>Mileage</TableCell>
                        <TableCell>Purchased From</TableCell>
                        <TableCell>VIN Number</TableCell>
                        <TableCell>Registration Number</TableCell>
                        <TableCell>Cost Price</TableCell>
                        <TableCell>Retail Price</TableCell>
                        <TableCell>Date Purchased</TableCell>
                        <TableCell>View & Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading && filteredCars.map((car) => (
                    <CarRow key={car.id} car={car} onEdit={handleEdit} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
