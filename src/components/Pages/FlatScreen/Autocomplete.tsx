import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import MiuAutocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export interface AutocompleteOption {
  label: string;
  value: string;
}

interface Props {
  inputValue: string;
  options: AutocompleteOption[];
  handleChange: (event: React.ChangeEvent<{ value: string }>) => void;
  handleSelect: (option: AutocompleteOption) => void;
}

const Autocomplete: React.FC<Props> = ({
  inputValue,
  options,
  handleChange,
  handleSelect,
}) => {
  return (
    <MiuAutocomplete
      freeSolo
      sx={{ width: 500 }}
      disableClearable
      options={inputValue ? options.map((option) => option) : []}
      onChange={(event, value) => handleSelect(value as AutocompleteOption)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="City"
          placeholder="Type something"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    handleSelect({ label: inputValue, value: inputValue })
                  }
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            type: 'text',
          }}
        />
      )}
    />
  );
};

export default Autocomplete;
