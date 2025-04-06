import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";
import { useFilterSet } from "./FilterSetProvider";

const options = [
  { label: "Pollen" },
  { label: "Air Pollution" },
  { label: "UV Index" },
  { label: "Heat" },
];

const FilterAutocomplete: FC = () => {
  const { setFilterSet } = useFilterSet();
  return (
    <>
      <Autocomplete
        className="bg-white w-xl"
        multiple
        id="tags-standard"
        options={options}
        getOptionLabel={(option) => option.label}
        defaultValue={[options[2]]}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Environmental filters" placeholder="Filter" />
        )}
        onChange={(event, value) =>
          setFilterSet(new Set(value.map((item) => item.label)))
        }
      />  

      
    </>
    
  );
};

export default FilterAutocomplete;