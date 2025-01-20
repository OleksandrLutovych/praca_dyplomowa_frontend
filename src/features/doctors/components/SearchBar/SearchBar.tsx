import { Button, InputBase, Paper } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setSearchParams(prevParams => {
      prevParams.set('search', searchValue);
      return prevParams;
    });
    setSearchValue('');
  }

  return (
    <Paper
      component={'form'}
      onSubmit={onSubmit}
      sx={{ p: '10px 10px', display: 'flex', alignItems: 'center', borderRadius: 3, mb: 1 }}
    >
      <IoSearchCircleOutline size={30} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Wyszukaj lekarza"
        value={searchValue}
        onChange={onSearchChange}
      />
      <Button type="submit">Wyszukaj</Button>
    </Paper>
  );
};

export default SearchBar;