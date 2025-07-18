import { Search } from '@mui/icons-material';
import { InputAdornment, Paper, TextField } from '@mui/material';

interface SpotlightSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SpotlightSearch({
  value,
  onChange,
  placeholder = 'Search ...',
}: SpotlightSearchProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 0.5,
        borderRadius: '16px',
        mb: 4,
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '14px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
          },
        }}
      />
    </Paper>
  );
}
