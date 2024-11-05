
import { ArrowBackRounded, Wallet } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { starblue, starbluegrad, stardarkblue, stargrad } from '../../../shared/color';
import { apiConnectorGet, apiConnectorPost } from '../../../services/apiconnector';
import { endpoint } from '../../../services/urls';
import { useQuery } from 'react-query';
import moment from 'moment';

function LocationChart() {
 const location = useLocation()
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const { data } = useQuery(
    ['game_history',  fromDate, toDate, location?.state?.satta_type ],
    () => apiConnectorPost(endpoint.node.satta_game_gamehistory,
       { startDate: fromDate, endDate: toDate, satta_type: location?.state?.satta_type }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount:false
    }
  );

  const gaming = data?.data?.data || []

  const { data: wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const newdata = wallet?.data?.data || 0;
  

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
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>Andar/ Bahar Chart </Typography>
              </Box>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Wallet sx={{ mr: 1, color: 'white', }} />
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>₹ {newdata?.wallet}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={style.filterContainer} className=" !text-white" mt={4}>
            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}  className='!text-white'>
              <TextField
                label="Start Date"
                placeholder="Select start date"
                type="date"
                className=''
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
            {/* <Button variant="contained" onClick={handleFilter} sx={style.filterButton}>
              Apply Filter
            </Button> */}
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Box className="w95">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
                {gaming?.map((item) => (
                  <Button
                    variant="contained"
                    sx={{
                      width: '50px',
                      height: '50px',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <Typography sx={{ color: 'white' }} className='fp18' color="initial"> {item?.number}</Typography>
                      <Typography sx={{ color: 'white' }} className='fp13' color="initial"> {moment(item?.datetime)?.format("HH:mm:ss")}</Typography>
                    </Box>
                  </Button>
                ))}
              </Box>
              <Box sx={{py: 3}}></Box>
            </Box>
          </Box>
        </Container>
    

  )
}

export default LocationChart;

const style = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },

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


