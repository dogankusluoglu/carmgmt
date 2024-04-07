import Fragment, { useState } from 'react';

import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';

export const CarRow = ({ car, onEdit }) => {
    // // Using useSWR hook to fetch data
    // const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    // // console.log(cars)

    // // Header Setup (for later edit vehicle)
    // const username = 'dogie';
    // const password = 'dogie';
    // const headers = new Headers();
    // // Encode username and password base64
    // const encodedCredentials = btoa(`${username}:${password}`);
    // headers.append('Authorization', `Basic ${encodedCredentials}`);
    // headers.append('Content-Type', 'application/json');
    
    // State hook for expandable car
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{car.year}</TableCell>

                <TableCell component="th" scope="row">{car.carBrand}</TableCell>

                <TableCell component="th" scope="row">{car.model}</TableCell>

                <TableCell component="th" scope="row">{car.colour}</TableCell>

                <TableCell component="th" scope="row">{car.mileage}</TableCell>

                <TableCell component="th" scope="row">{car.purchasedFrom}</TableCell>

                <TableCell component="th" scope="row">{car.vin}</TableCell>

                <TableCell component="th" scope="row">{car.reg}</TableCell>

                <TableCell component="th" scope="row">R{car.cost}</TableCell>

                <TableCell component="th" scope="row">R{car.retail}</TableCell>

                <TableCell component="th" scope="row">{car.date}</TableCell>

                <TableCell>
                    <Button
                        startIcon={<EditIcon />}
                        onClick={() => onEdit(car)}
                    >
                        View 
                    </Button>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Expenses
                            </Typography>

                            <Table size="small" aria-label="expenses">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Expense Type</TableCell>
                                        <TableCell>Cost (R)</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {car.expenses.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell component="th" scope="row">{expense.type}</TableCell>
                                            <TableCell>{expense.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
