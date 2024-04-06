import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from "react"
import { fetchx, fetcher } from "../utils";
import useSWR from "swr";

const Form = () => {
    const [carBrand, setCarBrand] = useState("")
    const [year, setYear] = useState("")
    const [model, setModel] = useState("")
    const [colour, setColour] = useState("")

    // Using useSWR hook to fetch data
    const { data:cars, error, isLoading } = useSWR('/cars', fetcher);
    console.log(cars)

    const submitForm = (carBrand) => {
        fetchx("/cars").then(res => res.json())
    }  
    return (
        <div>
            <TextField 
                id="outlined-basic" 
                label="Year" 
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Brand (Audi, BMW, Volkswagen, ...)" 
                variant="outlined"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Model (eg. 320d, C200, A3...)" 
                variant="outlined"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Colour" 
                variant="outlined"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
            />
            <Button 
                variant="contained"
                onClick={() => {
                    submitForm(carBrand)
                }}
            > Submit </Button>

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