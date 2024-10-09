import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import atmchip from "../../../assets/images/atmchip.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import bankicon from "../../../assets/images/bankicon.png";
import cip from "../../../assets/images/cip.png";
import refresh from "../../../assets/images/refwhite.png";
import zp from "../../../assets/images/zptoken.png";
import withdravalhistory from "../../../assets/images/withdrawalhistory.png";
import theme from "../../../utils/theme";
import {
  BankDetailsFUnction,
  getBalanceFunction,
  getBetFunction,
  USDTAddress,
  withdrawlHistoryFunction,
} from "../../../services/apiCallings";
import { useQuery, useQueryClient } from "react-query";
import moment from "moment";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import withdrawol_voice from "../../../assets/images/withdrawol_voice.mp3";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { endpoint } from "../../../services/urls";
import LockIcon from "@mui/icons-material/Lock";
import { deCryptData } from "../../../shared/secret";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { History } from "@mui/icons-material";
import { apiConnectorGet, apiConnectorPost } from "../../../services/apiconnector";
function USDTWithdrawlRequest() {
  const client = useQueryClient();
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const audioRefMusic = React.useRef(null);
  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setvisibleData] = useState([]);
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const initialValues = {
    request_amount: "",
    req_type: "",
  };

  const fk = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: () => {
      const reqbody = {
        req_type: fk.values.req_type === "USDT.BEP20" ? "1" : "2",
        request_amount: fk.values.request_amount,
      };
      // console.log(reqbody)
      withdraw_payment_Function(reqbody);
    },
  });
  const withdraw_payment_Function = async (reqbody) => {
    setloding(true);
    try {
      const response = await apiConnectorPost(
        `${endpoint.withdrawal_request_usdt}`,
        reqbody
      );
      if (response?.data?.msg === "Request Accepted successfully, Your account will be credited within 24 Hrs.") {
        fk.handleReset();
        client.refetchQueries("wallet_amount_amount");
        client.refetchQueries("withdrawl_history");
      } else {
        toast(response?.data?.msg)
        fk.handleReset()
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading: getbalance, data: wallet_amount } = useQuery(
    ["wallet_amount"],
    () => apiConnectorGet(endpoint?.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const wallet_amount_data = wallet_amount?.data?.data || 0;

  const { isLoading, data } = useQuery(
    ["withdrawl_history"],
    () => apiConnectorGet(endpoint?.withdrawl_usdt_history),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = data?.data?.data || [];

  const {  data: game_history } = useQuery(
    ["usdt_address_details"],
    () => apiConnectorGet(endpoint.get_address_list),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const result = game_history?.data?.data

  useEffect(() => {
    isAllValue ? setvisibleData(res) : setvisibleData(res?.slice(0, 3));
  }, [isAllValue, res]);

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${withdrawol_voice}`} type="audio/mp3" />
      </audio>
    );
  }, []);


  return (
    <Container sx={{ background: "#F7F8FF" }}>
      {audio}
      <CustomCircularProgress isLoading={isLoading || getbalance || loding} />
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)",
          padding: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "end",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <NavLink onClick={goBack}>
            <Box component="img" src={backbtn} width={25}></Box>
          </NavLink>
          <Box sx={{ position: "absolute", left: "40%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              Withdraw
            </Typography>
          </Box>
          <NavLink to="/withdrawlhistory">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "11px", color: "white" }}
            >
             <History/>
            </Typography>
          </NavLink>
        </Stack>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Box
          sx={{
            backgroundImage: `url(${atm})`,
            backgroundSize: "100% 100%",
            padding: "20px 16px",
          }}
        >
          <Stack direction="row">
            <Box component="img" src={wallet} width={20} sx={{ mr: 2 }}></Box>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}
            >
              Available balance
            </Typography>
          </Stack>
          <Stack direction="row" alignItems={"center"} mt={1}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}
            >
              ₹  {(
                  Number(
                    Number(wallet_amount_data?.winning || 0) + Number(wallet_amount_data?.wallet || 0)
                  ) || 0
                )?.toFixed(2)}{" "}
            </Typography>
            <Box
              component="img"
              src={refresh}
              width={20}
              height={16}
              sx={{ ml: 2 }}
            ></Box>
          </Stack>
          <Stack direction="row" alignItems={"center"} mt={3}>
            <Box component="img" src={cip} width={40} height={25}></Box>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Stack direction="row">
          <Stack
            className={"!cursor-pointer"}
            onClick={() => navigate("/withdraw")}
            sx={{
              width: "120px",
              background: "#FFFFFF",
              padding: 2,
              borderRadius: 2,
              mr: 2,
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          >
            <Box
              component="img"
              src={atmchip}
              width={40}
              sx={{ margin: "0px auto" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              BANK CARD
            </Typography>
          </Stack>
          <Stack
            sx={{
              background:
                "-webkit-linear-gradient(top, #e97e0f 0%, #fcbc42 100%)",
              padding: 2,
              borderRadius: 2,
              mr: 2,
              width: "120px",
            }}
          >
            <Box
              component="img"
              src={zp}
              width={40}
              sx={{ margin: "0px auto" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              USDT
            </Typography>
          </Stack>
        </Stack>
      </Box>
      
      <Box
        sx={{
          width: "92%",
          margin: "auto",
          my: 2,
          background: "#FFFFFF",
          padding: "10px 0px 10px 10px",
        }}
      >
        <Box sx={{ width: "35%" }}>
          <Box
            component="img"
            src={bankicon}
            width={30}
            sx={{ margin: "auto" }}
          ></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px", fontWeight: "500", mt: 1 }}
          >
            {/* {game_history?.data?.data[0]?.or_m_wallet_address?.substring(
              0,
              20
            ) + "****"} */}
          </Typography>
        </Box>
      </Box>
      <div className="  my-2 mb-4">
                <p
                  style={{ color: theme.palette.primary.main }}
                  className="!text-center !p-4  w-[87%] ml-6 cursor-pointer  border border-dashed border-gray-400"
                  onClick={() => navigate("/usdtaddress")}
                >
                  {" "}
                  + Add Address
                </p>
              </div>
      <Box
        sx={{
          width: "92%",
          margin: "auto",
          my: 2,
          background: "#FFFFFF",
          padding: "10px",
        }}
      >
       <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="" sx={{ color: "black" }} className="!text-lg !font-bold">
                    Select Address{" "}
                 
                  </Typography>
                </Stack>
                <TextField
                  select
                  size="small"
                  id="req_type"
                  name="req_type"
                  value={fk.values.req_type}
                  onChange={fk.handleChange}
                  className="withdrawalfield2"
                  placeholder="Select address / Network"
                  sx={{
                    background: "white",
                    border: "none",
                
                    padding: "0px",
                  }}
                  InputProps={{
                    style: {
                      borderWidth: "1px",
                      color: "black",
                     
                      border: "none",
                      padding: "1px !important",
                      "&>div": { padding: "0px !important" },
                    },
                  }}
                >
                  <MenuItem value={"Select Address"}>Select Address</MenuItem>
                  {result?.map((i, index) => {
                    return (
                      <MenuItem key={index} value={i?.usdt_type}>
                        {i?.usdt_address}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}  className="!p-1">
                <Stack direction="row" className="">
                  <Typography variant="" sx={{ color: "black" }} className="!text-lg !font-bold">
                    Enter USDT 
                  </Typography>
                </Stack>
                <TextField
                  id="request_amount"
                  name="request_amount"
                  type="number"
                  value={fk.values.request_amount}
                  onChange={fk.handleChange}
                  placeholder="Enter amount *"
                 
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="" sx={{ color: "black" }} className="!text-lg !font-bold">
                    INR
                  </Typography>
                </Stack>
                <TextField
                  type="number"
                  value={Number(Number(fk.values.request_amount) * 92)?.toFixed(
                    4
                  )}
                  placeholder=" 00000 "
                  className=""
                />
              </FormControl>
              
              <Button
              className="!bg-[#F39E2A]"
                sx={style.wdbtn}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
                Withdrawal{" "}
              </Button>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Stack direction="row">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              Withdrawable balance{" "}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "12px",
                color: theme.palette.primary.main,
                ml: 1,
              }}
            >
               {(
                  Number(
                    Number(wallet_amount_data?.winning || 0) + Number(wallet_amount_data?.wallet || 0)
                  ) || 0
                )?.toFixed(2)}{" "}
            </Typography>
          </Stack>

          <Button
            variant="Outlined"
            color="primary"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              padding: 0,
              fontSize: "12px",
              color: "orange",
              borderRadius: "8px",
            }}
          >
            All
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
        >
          <Stack direction="row">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              Withdrawal amount received{" "}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: "12px",
              color: theme.palette.primary.main,
            }}
          >
            ₹ 0.00
          </Typography>
        </Stack>

        {/* <Button
          sx={style.wdbtn}
          className={`${
            fk.values.amount || fk.values.t_password
              ? "!bg-[#F39E2A]"
              : "!bg-gray-400"
          }`}
          onClick={fk.handleSubmit}
        >
          Withdrawal
        </Button> */}
        <Box mt={3}>
          <Stack direction="row" alignItems="center" mt={1}>
            <Box
              sx={{
                width: "5px",
                height: "5px",
                background: theme.palette.primary.main,
                transform: "rotate(45deg)",
                mr: 1,
              }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              Need to bet{" "}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "12px",
                color: theme.palette.primary.main,
                mx: 0.5,
              }}
            >
              {" "}
              {/* ₹ {total_bet?.total_amt || 0} */}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              {" "}
              to be able to withdraw{" "}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" mt={1}>
            <Box
              sx={{
                width: "5px",
                height: "5px",
                background: theme.palette.primary.main,
                transform: "rotate(45deg)",
                mr: 1,
              }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              Withdraw time{" "}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "12px",
                color: theme.palette.primary.main,
                mx: 0.5,
              }}
            >
              00:00-23:50{" "}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" mt={1}>
            <Box
              sx={{
                width: "5px",
                height: "5px",
                background: theme.palette.primary.main,
                transform: "rotate(45deg)",
                mr: 1,
              }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              Please confirm your beneficial account information before
              withdrawing. If your information is incorrect, our company will
              not be liable for the amount of loss{" "}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" mt={1}>
            <Box
              sx={{
                width: "5px",
                height: "5px",
                background: theme.palette.primary.main,
                transform: "rotate(45deg)",
                mr: 1,
              }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "12px" }}
            >
              If your beneficial information is incorrect, please contact
              customer service
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Stack direction="row" sx={{ alignItems: "center", margin: "20px" }}>
        <Box component="img" src={withdravalhistory} width={30}></Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{
            fontSize: "15px ",
            color: "#888",
            ml: "10px",
            fontWeight: "600",
          }}
        >
          Withdrawl history
        </Typography>
      </Stack>

      {visibleData?.map((i, index) => {
        return (
          <Box
            key={index}
            sx={{
              mb: 2,
              padding: "10px",
              borderRadius: "10px",
              background: "#fff",
              width: "92%",
              margin: "auto",
              mt: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                paddingBottom: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #efefef",
              }}
            >
              <Box>
                <Typography className="!bg-orange-400 !text-white rounded px-2 py-1 ">
                  Withdrawl
                </Typography>
              </Box>
              <Box
                sx={{
                  color: "#888",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {i?.call_back_status}
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p:nth-child(1)": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
                "&>p:nth-child(2)": {
                  color: theme.palette.primary.main,
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Balance
              </Typography>
              <Typography variant="body1">₹ {i?.amount}</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Type
              </Typography>
              <Typography variant="body1" color="initial">
                {i?.withdrawal_type === "USDT" ? "ZP Token" : i?.withdrawal_type}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Time
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="!text-green-500"
              >
                {moment(i?.response_date)?.format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Order number
              </Typography>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  {i?.transaction_no}
                </Typography>
                <IconButton sx={{ padding: 0 }}>
                  <ContentCopyIcon
                    sx={{ color: "#888", width: "15px", ml: 1 }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        );
      })}

      <Button
        sx={style.paytmbtntwo}
        variant="outlined"
        onClick={() => setIsAllValue(!isAllValue)}
      >
        {isAllValue ? "Show Less" : " All history"}
      </Button>
    </Container>
  );
}
export default USDTWithdrawlRequest;

const style = {
  header: {
    padding: "15px 8px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "#888",
    },
    "& > a > svg": { color: "#888", fontSize: "35px" },
  },
  withdrawalbtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "20px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: "600",
    padding: "5px 25px",
  },
  depositebtn: {
    background: theme.palette.primary.main,
    borderRadius: "20px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: "600",
    padding: "5px 25px",
    color: "white",
  },
  paytmbtntwo: {
    borderRadius: "20px",
    textTransform: "capitalize",
    mb: 2,
    width: "92%",
    mt: 2,
    mx: 2,
    padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
  wdbtn: {
    width: "95% !important",
    boxShadow: "0 0.05333rem #b6bad0",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    width: "100%",
    // background:
    //   "linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%), linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%)",
    backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
  },
};
