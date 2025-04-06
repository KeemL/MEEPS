"use client";

import { Autocomplete, Box, Button, CircularProgress, FormLabel, Snackbar, TextField } from '@mui/material';
import { useState } from "react";
import axios from 'axios';
import { useHeatMap } from '@/components/HeatMapProvider';
import { unpopulatedGeojson } from './map/data';
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home() {

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { setPoints } = useHeatMap();
  const router = useRouter();
  const [checkedConditions, setCheckedConditions] = useState(['']);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    // Make sure the new autocomplete component properly populates conditions.
    // data should contain the geojson with the field "risk_factor"
    // For each feature, the backend assigns a list to risk_factor which takes one or more of the following values:
    // Pollen, Air Pollution, UV Index, Heat
    // 
    // If we have extra time: Add a weight field based on indices provided by 3rd party api.
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      birthDate: formData.get('birthDate'),
      address: formData.get('address'),
      conditions: checkedConditions,
      geojson: unpopulatedGeojson
    }

    // .toISOString()
    

    if (data.firstName === "" || data.lastName === "" || data.birthDate === "" || data.address === "") {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }


    const birthDate = new Date(data.birthDate as string);

    if (birthDate > new Date() || birthDate < new Date("1900-01-01")) {
      setError("Invalid birth date.");
      setIsLoading(false);
      return;
    }


    try {
      const response = await axios.post("http://localhost:8080/submit", data)
      console.log(data);

      // Data received from the Spring API
      // If not implemented we can use some default values.
      setPoints(response.data.geojson || data.geojson);
      router.push("/map");
    } catch (error) {
      console.error("Error submitting data:", error)
      // Optionally show a user-friendly error message here

      setError("Error submitting data. Please try again.");

    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='fade-in flex flex-col gap-6 rounded-xl p-6 shadow-lg bg-white h-fit w-lg' id='patient-form'>
        <h1 className='text-2xl font-bold'>Patient Information</h1>

        <Snackbar
          anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
          open={ error !== ""}
          autoHideDuration={3000}
          onClose={ () => setError("") }
          message={error}
          action={ <Button onClick={ () => setError("") } color="inherit">Close</Button> }
        />

        <TextField 
          name='firstName' 
          label="First Name" 
        />
        <TextField 
          name='lastName' 
          label="Last Name" 
        />

        <FormLabel component="legend">When were you born?</FormLabel>
        <TextField
          name='birthDate'
          type="date"
        />

        <TextField
          name='address'
          label="Address"
        />

        {/*
         * Replaced in the future with Autocomplete. Ensure data formatted correctly here.
         */}
        <FormLabel component="legend">Relevant Conditions</FormLabel>
        <Autocomplete
          multiple options={['Pollen Allergy', 'Pregnancy', 'Cardiovascular disease', 'Asthma']}
          onChange={(event, newValues: string[] | null) => {
            setCheckedConditions(newValues || ['']);
          }}
          renderInput={(params) => {
            return <TextField {...params} label="Asthma, Pollen allergy, etc." name='condition' />
          }}
        />

        <Box className='flex justify-end'>
          <Button
            type='submit'
            className='bg-blue-500 text-white rounded-md p-2'
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
