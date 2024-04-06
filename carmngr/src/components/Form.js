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
    const [carBrand, setCarBrand] = useState("")
    const [year, setYear] = useState("")
    const [model, setModel] = useState("")
    const [colour, setColour] = useState("")
    const [mileage, setMileage] = useState("")
    const [reg, setReg] = useState("")
    const [cost, setCost] = useState("")
    const [retail, setRetail] = useState("")
    const [date, setDate] = useState(dayjs())

    // Using useSWR hook to fetch data
    const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    console.log(cars)

    const submitForm = (carBrand) => {
        fetchx("/cars").then(res => res.json())
    }  
    return (
        <div>
            <div>
                <TextField 
                    id="year" 
                    label="Year" 
                    variant="outlined"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <div>    
                <TextField 
                    id="brand" 
                    label="Brand (Audi, BMW, Volkswagen, ...)" 
                    variant="outlined"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="model" 
                    label="Model (eg. 320d, C200, A3...)" 
                    variant="outlined"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="colour" 
                    label="Colour" 
                    variant="outlined"
                    value={colour}
                    onChange={(e) => setColour(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="mileage" 
                    label="Mileage" 
                    variant="outlined"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="reg" 
                    label="Registration Number" 
                    variant="outlined"
                    value={reg}
                    onChange={(e) => setReg(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="cost" 
                    label="Cost Price (R)" 
                    variant="outlined"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />
            </div>
            <div>
                <TextField 
                    id="retail" 
                    label="Retail Price (R)" 
                    variant="outlined"
                    value={retail}
                    onChange={(e) => setRetail(e.target.value)}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Date Purchased"
                    value={date}
                    onChange={(e) => setDate(e)}
                />
            </LocalizationProvider>
            <div>
                <Button 
                    id="submit"
                    variant="contained"
                    onClick={() => {
                        submitForm(carBrand)
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