import { ArrowBackRounded, Wallet } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { starblue, starbluegrad, stardarkblue, stargrad } from '../../../shared/color';

function AnderBaherChart() {
  const buttons = Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFilter = () => {
    console.log('Filtering from:', fromDate, 'to:', toDate);

  };
  return (
  
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={style.container}
        >
          <Box sx={{ background: stargrad, py: 2, }}  >
            <Box className="w95" sx={style.flexbetween}>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Box component={NavLink} to="/SattaChart">
                  <ArrowBackRounded sx={{ mr: 1, color: 'white', }} />
                </Box>
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>Andar / Bahar Chart </Typography>
              </Box>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Wallet sx={{ mr: 1, color: 'white', }} />
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>₹ 10.50</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={style.filterContainer} className="w95" mt={4}>
            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
              <TextField
                label="Start Date"
                placeholder="Select start date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={style.dateField}
              />
              <TextField
                label="End Date"
                placeholder="Select end date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={style.dateField}
              />
            </Box>
            <Button variant="contained" onClick={handleFilter} sx={style.filterButton}>
              Apply Filter
            </Button>
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Box className="w95">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
                {buttons.map((number) => (
                  <Button
                    key={number}
                    variant="contained"
                    sx={{
                      width: '50px',
                      height: '50px',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <Typography sx={{ color: 'white' }} className='fp18' color="initial"> {number}</Typography>
                      <Typography sx={{ color: 'white' }} className='fp13' color="initial"> 03:50</Typography>
                    </Box>
                  </Button>
                ))}
              </Box>
              <Box sx={{ py: 3 }}></Box>
            </Box>
          </Box>
        </Container>
    

  )
}

export default AnderBaherChart;

const style = {
  root: { background: stardarkblue, pb: 6 },
  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  openButton: {
    width: '100%',
    background: '#24cc3b',
    textTransform: 'capitalize',
    borderRadius: '5px',
    color: 'white',
    mb: 1,
    py: 1,
    "&:hover": { backgroundColor: '#24cc3b' },
  },

  dateField: {
    width: '50%',
    padding: '5px',
    borderRadius: '4px',
    backgroundColor: starblue,
    '& .MuiInputBase-root': {
      borderRadius: '4px',
      backgroundColor: starblue,
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
      color: '#ffffff',
      padding: '8px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#ffffff',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#e0e0e0',
      opacity: 1,
    },
  },
  filterButton: {
    width: '100%',
    backgroundColor: starbluegrad,
    color: 'white',
    textTransform: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: starbluegrad,
    },
    marginTop: '8px',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
  },
};


