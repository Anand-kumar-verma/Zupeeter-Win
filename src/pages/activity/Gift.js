import { KeyboardArrowLeftOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Layout from '../../component/layout/Layout'
import { apiConnectorPost } from '../../services/apiconnector'
import { endpoint, zubgback } from '../../services/urls'
import { useQueryClient } from 'react-query'


function Gift() {
  const client = useQueryClient();
  const navigate = useNavigate();
  const initialValue = {
    u_coupon_code: "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.u_coupon_code) {
        return toast(" Please Enter Code ")
      }
      const reqBody = {
        u_coupon_code : fk.values.u_coupon_code ,
      };
      ClaimGiftFn(reqBody);
    },
  });
  async function ClaimGiftFn(reqBody) {
    try {
      const response = await apiConnectorPost(endpoint.generate_gift, reqBody);
      toast(response?.data?.msg, { id: 1 });
      if (response?.data?.msg === "Coupon successfully generated.") {
        fk.handleReset();
        client.refetchQueries("get_card_list");
        navigate('/account/income-main/team-salary-bonus')
      }
    } catch (e) {
      const errorMsg = e.response?.data?.msg || e.message || "An error occurred.";
      toast(errorMsg);
      console.error("Error:", e);
    }
  };


  return (

    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <Box sx={style.header}>
          <Box >
            <KeyboardArrowLeftOutlined className="!text-white" onClick={()=>navigate("/account/income-main")}/>
          </Box>
          <p>Generate Bonus</p>
        </Box>
        <Box sx={{ minHeight: '100vh', padding: '16px', }}>
          <Card sx={{ backgroundColor: '#f48901', color: '#fff', borderRadius: '8px', marginBottom: '16px', }}>
            <CardContent><Typography className='w f15 fw500'>Hi</Typography>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>We have a gift for you</Typography>
              <Typography variant="body2">Please enter the gift code below</Typography>
              <input fullWidth variant="outlined" placeholder="Please enter gift code"
                className='p-2 !text-black rounded w-full my-2'
                id="u_coupon_code"
                name="u_coupon_code"
                value={fk.values.u_coupon_code}
                onChange={fk.handleChange}
                sx={{
                  backgroundColor: 'white', borderRadius: '50px', marginTop: '12px', color: 'black', '& input': { color: 'black', padding: '10px 20px' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent', }, '&:hover fieldset': { borderColor: 'transparent', },
                    '&.Mui-focused fieldset': { borderColor: 'transparent', },
                  },
                }}
              />
              <Button sx={{
                backgroundColor: "white", color: "black", textTransform: 'none',
                fontWeight: 'bold', borderRadius: '24px', marginTop: '12px', width: '100%', padding: '8px 0',
              }} onClick={fk.handleSubmit}>
                Generate
              </Button>
            </CardContent>
          </Card>
        
        </Box>
      </Container>
    </Layout>

  )
}

export default Gift

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  }
};