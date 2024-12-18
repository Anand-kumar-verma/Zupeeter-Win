import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import depositeimg from "../../assets/images/deposite.png";
import dhistory from "../../assets/images/dhistory.png";
import whistory from "../../assets/images/whistory.png";
import withdraw from "../../assets/images/withdraw.png";
import Layout from "../../component/layout/Layout";
import {
  ProfileDataFunction,
  checkTokenValidity
} from "../../services/apiCallings";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";

function Wallet() {
  const or_m_user_type = localStorage.getItem("or_m_user_type");

  const { isLoading, data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => apiConnectorGet(endpoint.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const navigate = useNavigate();
  const wallet_amount_data = wallet_amount?.data?.data || 0;

  const { data: user } = useQuery(
    ["profile"],
    () => ProfileDataFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const profile = user?.data?.data || [];

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);


  return (
    <Layout header={false}
    > <Container
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",

      }}>
        <Box sx={style.header}>
          <Typography variant="body1" color="initial"></Typography>
          <Typography variant="body1" color="initial">

          </Typography>
          <Box component={NavLink} to="/promotion/Subordinate/"></Box>
        </Box>
        <Box
          sx={{
            padding: "15px 15px 5px 15px",
            background: theme.palette.primary.main,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-start"
            gap={1}
            sx={{ flexDirection: "row" }}
            className="!mx-7"
          >

            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px", fontWeight: "400", color: "white" }}
            >
              UserId/Name :
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px", fontWeight: "500", color: "white" }}
            >
              {profile?.username} / {profile?.full_name}
            </Typography>

          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-start"
            gap={1}
            sx={{ flexDirection: "row" }}
            className="!mx-7"
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px", fontWeight: "400", color: "white" }}
            >
              Wallet :
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "18px", fontWeight: "500", color: "white" }}
            >

              ₹ {(
                Number(
                  Number(wallet_amount_data?.winning || 0) + Number(wallet_amount_data?.wallet || 0)
                ) || 0
              )?.toFixed(2)}{" "}
            </Typography>

          </Stack>
        </Box>
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={{ background: theme.palette.primary.main, pb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            {/* <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "20px", fontWeight: "500", color: "white" }}
            >
          ₹{(
                  Number(
                    Number(wallet_amount_data?.winning || 0) + Number(wallet_amount_data?.wallet || 0)
                  ) || 0
                )?.toFixed(2)}{" "}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px", fontWeight: "400", color: "white" }}
            >
              Total amount
            </Typography>
          </Box> */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "20px", fontWeight: "500", color: "white" }}
              >
                {/* {rupees} 0 */}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "14px", fontWeight: "400", color: "white" }}
              >
                {/* Total deposit amount */}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "92%",
            margin: "auto",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#ffffff",
              padding: 1,
              borderRadius: "10px",
              mt: -1,
            }}
          >
            <Stack

              direction="row"
              sx={{
                my: 5,
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "50%", position: "relative" }}>
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { color: "black", fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography variant="body1" color="initial">
                   
                  ₹ {(
                      Number(wallet_amount_data?.wallet || 0)
                    )
                      ?.toFixed(2)}{" "}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Main wallet
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "50%", position: "relative" }}>

                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { color: "black", fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  {/* <Typography variant="body1" color="initial">
                    ₹ {wallet_amount?.data?.total_withdrawal}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Total Withdrawl
                  </Typography> */}
                </Box>
              </Box>
            </Stack>
            <Button sx={style.mainwallettrbutton}>Main wallet transfer</Button>

            <Stack direction="row" sx={style.stack}
            >
              <Box sx={style.box}
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/deposit');
                  }
                }}>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={depositeimg}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Deposit
                </Typography>
              </Box>

              <Box sx={style.box}
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdraw');
                  }
                }}>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={withdraw}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Withdraw
                </Typography>
              </Box>
              <Box sx={style.box}
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/depositehistory');
                  }
                }}>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={dhistory}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Deposit history
                </Typography>
              </Box>
              <Box sx={style.box}
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdrawlhistory');
                  }
                }}>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={whistory}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Withdrawal history
                </Typography>
              </Box>
            </Stack>

          </Box>
        </Box>
      </Container>


    </Layout>
  );
}

export default Wallet;

const style = {
  header: {
    padding: 1,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },
  stack: {
    width: "100%",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 3,
  },
  box: {
    width: "23%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerBox: {
    padding: 1,
    background: "#ffffff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "15px",
  },
  innerBoximg: {
    width: 35,
  },
  typography: {
    fontFamily: '"PT Serif", serif !important',
    fontSize: "12px",
    color: "gray",
    marginTop: 1,
    textAlign: "center",
  },
  mainButton: {
    width: "100%",
    height: "0.93333rem",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.01333rem",
    border: "none",
    borderRadius: "20px",
    background: "#eb8a1f",
    boxShadow: "0 3px #e74141",
    padding: "20px 10px",
    marginTop: 2,
    "&:hover": {
      color: "white",
      background: "#eb8a1f",
    },
  },
  mainwallettrbutton: {
    width: "100%",
    height: "0.93333rem",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.01333rem",
    border: "none",
    borderRadius: "20px",
    background: "#eb8a1f",
    boxShadow: "0 3px #e74141",
    padding: "20px 10px",
    mt: 2,
    "&:hover": {
      color: "white",
      background: "#eb8a1f",
    },
  },
  fx: {
    width: "31%",
    height: "100px",
    background: "linear-gradient(180deg, #e97e0f 0%, #fcbc42 100%)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 1.5,
  },
  fxone: {
    width: "31%",
    height: "100px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    mb: 1.5,
  },
};
