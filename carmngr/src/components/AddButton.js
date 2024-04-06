import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const AddButton = () => {
  return (
    <Stack spacing={2} direction="row">
        <Button 
            variant="contained"
            onClick={() => {
                console.log("poes");
              }}
        >
            Contained</Button>
    </Stack>
  );
}

export default AddButton