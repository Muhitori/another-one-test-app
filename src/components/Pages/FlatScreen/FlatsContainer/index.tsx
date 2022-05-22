import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FlatService } from '../../../../services';
import { Flat } from '../../../../types';
import Autocomplete, { AutocompleteOption } from './Autocomplete';
import FlatList from './FlatList';
import useStyles from '../styles';

const FlatsContainer: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [flats, setFlats] = useState<Flat[] | null>(null);

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteOption | null>(null);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const handleSelect = useCallback(
    (option: AutocompleteOption) => {
      setInputValue(option.label);
      setSelectedOption(option);

      history.replace({ search: `?city=${option.value}` });
    },
    [history],
  );

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleDetailsClicked = useCallback(
    (id: string, city: string) => {
      const query = city ? `?city=${city}` : '';
      history.push(`/flats/${id}${query}`);
    },
    [history],
  );

  useEffect(() => {
    const manageFlats = async () => {
      if (!selectedOption) {
        setFlats(await FlatService.getAll());
      } else {
        const url = new URLSearchParams(location.search);
        const city = url.get('city');
        if (city) {
          setFlats(await FlatService.getByAddress(city));
        }
      }
    };
    manageFlats();
  }, [location.search, selectedOption]);

  useEffect(() => {
    const manageOptions = async () => {
      if (inputValue) {
        const places =
          await new window.google.maps.places.AutocompleteService().getPlacePredictions(
            { input: inputValue, types: ['(cities)'] },
          );

        const cities = places.predictions.map((city) => ({
          label: city.description,
          value: city.structured_formatting.main_text,
        }));

        setOptions(cities);
      } else {
        setSelectedOption(null);
        setOptions([]);
        history.replace({ search: '' });
      }
    };
    manageOptions();
  }, [history, inputValue]);
  return (
    <>
      <Box className={classes.sticky}>
        <Autocomplete
          inputValue={inputValue}
          handleChange={handleChange}
          handleSelect={handleSelect}
          options={options}
        />
      </Box>
      <Typography mt={2} mb={2} variant="h2">
        Flats to rent
      </Typography>
      <FlatList flats={flats} handleDetailsClicked={handleDetailsClicked} />
    </>
  );
};

export default FlatsContainer;
