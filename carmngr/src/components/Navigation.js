import { AppBar, Toolbar, IconButton } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton component={Link} to="/" color="inherit">
          <AddIcon />
        </IconButton>
        {/* <IconButton component={Link} to="/about" color="inherit">
          <AddIcon />
        </IconButton> */}
        {/* Add more icons linked to different paths here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 