import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material';

export default function Home() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center bg-linear-to-br from-cyan-500 to-blue-500'>
        <form className='flex flex-col gap-6 rounded-xl p-6 shadow-lg bg-white h-fit w-lg' action={async (formData) => {
          'use server'
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const birthDate = formData.get('birthDate');
          const checkedConditions = formData.getAll('condition');

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
          <FormGroup>
            <FormControlLabel control={<Checkbox value="Pollen Allergy" name='condition' />} label="Pollen Allergy" />
            <FormControlLabel control={<Checkbox value="Pregnancy" name='condition' />} label="Pregnancy" />
            <FormControlLabel control={<Checkbox name='condition' />} label="Cardiovascular disease" />
            <FormControlLabel control={<Checkbox name='condition' />} label="Asthma" />
          </FormGroup>
          <Box className='flex justify-end'>
            <Button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Submit</Button>
          </Box>
        </form>
      </div>
    </>
  );
}
