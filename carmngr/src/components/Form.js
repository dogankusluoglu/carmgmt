import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from "react"
import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

const Form = () => {

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
        date: dayjs(),
    })

    const handleChange = (e, newDate) => {
        if (e?.target) {
            setCarData({ ...carData, [e.target.name]: e.target.value });
        } else {
            setCarData({ ...carData, date: newDate })
        }
    };

    // Using useSWR hook to fetch data
    const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    // console.log(cars)


    const username = 'dogie';
    const password = 'dogie';
    const headers = new Headers();

    // Encode username and password base64
    const encodedCredentials = btoa(`${username}:${password}`);

    headers.append('Authorization', `Basic ${encodedCredentials}`);
    headers.append('Content-Type', 'application/json');

    const submitForm = (carData) => {
        // carData.preventDefault()
        fetchx("/cars/", {
            method: 'POST',
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
    return (
        <div>
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
                <Button 
                    id="submit"
                    variant="contained"
                    onClick={() => {
                        submitForm(carData)
                        console.log(carData)
                    }}
                > Submit </Button>
            </div>

            {/* <div>
                { cars.map(car => (
                    <div>
                        {car.name}
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Form