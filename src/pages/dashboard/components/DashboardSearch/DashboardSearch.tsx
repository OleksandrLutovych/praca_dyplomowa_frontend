import { Button, Divider, InputBase, Paper } from '@mui/material';
import { CiSearch as SearchIcon } from "react-icons/ci";
const DashboardSearch = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', width: 810, height: 81, borderRadius: 3 }}
    >
      <SearchIcon size={25} style={{ marginLeft: 10 }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Wyszukaj lekarza"
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <Divider sx={{ height: 28, mr: 3 }} orientation="vertical" />
      <Button variant='contained' sx={{ borderRadius: 2 }}>Wyszukaj</Button>
    </Paper>
  );
};

export default DashboardSearch;