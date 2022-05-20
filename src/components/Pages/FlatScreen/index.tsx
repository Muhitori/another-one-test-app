import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FlatService } from '../../../services';
import { googleAutocomplete } from '../../../services/autocomplete.service';
import { Flat } from '../../../types';
import Autocomplete, { AutocompleteOption } from './Autocomplete';
import FlatList from './FlatList';

const FlatScreen: React.FC = () => {
  const history = useHistory();

  const [flats, setFlats] = useState<Flat[] | null>(null);

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteOption | null>(null);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    setSelectedOption(option);
    history.push(`/flats/flags?city=${option.value}`);
  };

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  useEffect(() => {
    const manageFlats = async () => {
      if (!selectedOption) {
        setFlats(await FlatService.getAll());
      } else {
        setFlats(await FlatService.getByAddress(selectedOption.value));
      }
    };
    manageFlats();
  }, [selectedOption]);

  useEffect(() => {
    const manageOptions = async () => {
      if (inputValue) {
        const result = await googleAutocomplete(inputValue);

        if (!result) return;

        const cities = result.map((city) => ({
          label: city.description,
          value: city.structured_formatting.main_text,
        }));

        setOptions(cities);
      } else {
        setSelectedOption(null);
        setOptions([]);
        history.push('/flats');
      }
    };
    manageOptions();
  }, [history, inputValue]);

  return (
    <Box ml={2} mt={2} height="100%">
      <Autocomplete
        inputValue={inputValue}
        handleChange={handleChange}
        handleSelect={handleSelect}
        options={options}
      />
      <Typography mt={2} mb={2} variant="h2">
        Flats to rent
      </Typography>
      <FlatList flats={flats} />
    </Box>
  );
};

export default FlatScreen;
