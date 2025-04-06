"use client"

import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material';
import { useState } from "react";
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      birthDate: formData.get('birthDate'),
      conditions: formData.getAll('condition')
    };
    console.log(data);
    
    try {
      // Finish URL in near future
      const response = await axios.post('/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 rounded-xl p-6 shadow-lg bg-white h-fit w-lg'>
        <h1 className='text-2xl font-bold'>Patient Information</h1>

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

        <FormLabel component="legend">Relevant Conditions</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox value="Pollen Allergy" name='condition' />} label="Pollen Allergy" />
          <FormControlLabel control={<Checkbox value="Pregnancy" name='condition' />} label="Pregnancy" />
          <FormControlLabel control={<Checkbox value="Cardiovascular disease" name='condition' />} label="Cardiovascular disease" />
          <FormControlLabel control={<Checkbox value="Asthma" name='condition' />} label="Asthma" />
        </FormGroup>
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