"use client";
import { Autocomplete, Box, Button, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';

export default function Home() {

  const [checkedConditions, setCheckedConditions] = useState(['']);

  
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <form className='flex flex-col gap-6 rounded-xl p-6 shadow-lg bg-white h-fit w-lg' action={async (formData) => {
          // 'use server'
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const birthDate = formData.get('birthDate');

          console.log(firstName)
          console.log(lastName)
          console.log(birthDate)
          console.log(checkedConditions);
        }}>
          <h1 className='text-2xl font-bold'>Patient Information</h1>

          <TextField name='firstName' label={"First Name"} id='firstName'/>
          <TextField name='lastName' label={"Last Name"} />

          <FormLabel component="legend">When were you born?</FormLabel>
          <TextField
            name='birthDate'
            type="date"
          />

          <FormLabel component="legend">Relevant Conditions</FormLabel>

          <Autocomplete 
          multiple options={['Pollen Allergy', 'Pregnancy', 'Cardiovascular disease', 'Asthma']} 
          onChange={(event, newValues: string[] | null) => {
            setCheckedConditions(newValues || ['']);
          }}
          renderInput={(params) => {
            return <TextField {...params} label="Asthma, Pollen allergy, etc." name='condition'   />}}  
          />

          <Box className='flex justify-end'>
            <Button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Submit</Button>
          </Box>
        </form>
      </div>
    </>
  );
}
