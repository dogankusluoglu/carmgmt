import { AppBar, Toolbar, Button } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AddIcon from '@mui/icons-material/Add';
import PaidIcon from '@mui/icons-material/Paid';

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit" startIcon={<AddIcon />}>
          Add Car
        </Button>

        <Button component={Link} to="/viewcars" color="inherit" startIcon={<CarRentalIcon />}>
          Cars
        </Button>

        <Button component={Link} to="/expenses" color="inherit" startIcon={<PaidIcon />}>
          Expenses
        </Button>
        
        {/* Add more icons linked to different paths here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 