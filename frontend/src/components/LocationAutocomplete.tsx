import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import axios from 'axios';


const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


export default function LocationAutocomplete() {
    const [options, setOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const fetchPlaces = debounce(async (query: string) => {
        if (!query) return;
        
        // DOES NOT WORK IN LOCALHOST DUE TO CORS POLICY
        // Used chrome extension to bypass CORS policy
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}`)
        
        const data = await response.data;
        if (data.predictions) {
            setOptions(data.predictions.map((prediction: any) => prediction.description));
        }
    }, 300);

    const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
        setInputValue(value);
        fetchPlaces(value);
    };

    return (
        <Autocomplete
            freeSolo
            options={options}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label="Search location" variant="outlined" />}
        />
    );
}