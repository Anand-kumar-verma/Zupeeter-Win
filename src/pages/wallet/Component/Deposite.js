import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import atmchip from "../../../assets/images/atmchip.png";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import cip from "../../../assets/images/cip.png";
import user from "../../../assets/images/instruction.png";
import payment from "../../../assets/images/payment.png";
import refresh from "../../../assets/images/refwhite.png";
import zp from "../../../assets/images/zptoken.png";
import upiimg from "../../../assets/images/upiimg.png";
import withdravalhistory from "../../../assets/images/withdrawalhistory.png";
import theme from "../../../utils/theme";
import {
  depositHistoryFunction,
  getBalanceFunction,
} from "../../../services/apiCallings";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import audiovoice from "../../../assets/images/bankvoice.mp3";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

import { endpoint } from "../../../services/urls";
import QRScreen from "./QRScreen";
import { deCryptData } from "../../../shared/secret";
import { History } from "@mui/icons-material";
import { apiConnectorGet, apiConnectorPost } from "../../../services/apiconnector";
function Deposite() {
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setvisibleData] = useState([]);
  const audioRefMusic = React.useRef(null);
  const [selectedGateway, setSelectedGateway] = React.useState("");
  const [loding, setloding] = useState(false);
  const [show_time, set_show_time] = React.useState("0_0");
  const [deposit_req_data, setDeposit_req_data] = React.useState();
  const { isLoading: history, data } = useQuery(
    ["deposit_history"],
    () => apiConnectorGet(endpoint.deposit_history),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = data?.data?.data|| [];

  useEffect(() => {
    isAllValue ? setvisibleData(res) : setvisibleData(res?.slice(0, 3));
  }, [isAllValue, res]);

  const { isLoading, data: wallet_amount } = useQuery(
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
  const initialValues = {
    amount:  0,
    all_data: { t_id: "", amount: "", date: "" },
  };

  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      const transaction_id = `${Date.now()}${user_id}`;
      // setT_id(transaction_id);
      const fd = new FormData();
      fd.append("UserID", "7704002732");
      fd.append("Email", "mailto:sunlottery@gmail.com");
      fd.append("txtamt", fk.values.amount);
      fd.append("Name", "");
      fd.append("TransactionID", transaction_id);

      // return toast("We are upgrading for smooth and fast payin please wait...");

      paymentRequest(fd, fk.values.amount);
      fk.setFieldValue("all_data", {
        t_id: fd.get("TransactionID") || "",
        amount: fk.values.amount,
        date: new Date(),
      });
      localStorage.removeItem("amount_set");
    },
  });

  // sajid api
  async function paymentRequest(fd, amnt) {
    if (!amnt) {
      toast("Please Enter the amount");
      return;

    }
    const reqbody = {
      amount: amnt || 1000,
      transection_id: fd.get("TransactionID"),
    };
    const fdata = new FormData();
    fdata.append("user_id", reqbody.user_id);
    fdata.append("type_gateway", selectedGateway === "Gateway1" ? "1" : "2");
    fdata.append("amount", reqbody.amount);
    fdata.append("transection_id", reqbody.transection_id);
    fdata.append("Deposit_type", "Null");
    fdata.append("server_provider", "Null");
    try {
      const res = await apiConnectorPost(`${endpoint.payment_request}`, fdata);
      const qr_url =
        (res?.data?.data && JSON.parse(res?.data?.data)?.upi_deep_link) || "";
      // const qr_url = JSON.parse(res?.data?.data) || "";
      console.log(res);
      if (qr_url) {
        setDeposit_req_data(qr_url);
      } else {
        res?.data?.msg ? toast(res?.data?.msg) : toast("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }
  const initialValuesss = {
    amount: 10,
  };

  const formik = useFormik({
    initialValues: initialValuesss,
    onSubmit: () => {
      const fd = new FormData();
      payment(formik.values.amount);
    },
  });
  async function payment(amnt) {
    setloding(true);
    if (!amnt) {
      toast("Please Enter the amount");
      return;
    }
    const formdata = {
      amount: Number(amnt),
    };
    const response = await apiConnectorPost(`${endpoint.payment}`, formdata);
   
    setloding(false);
  }
  const navigate = useNavigate();
  React.useEffect(() => {
    handlePlaySound();
  }, []);


  if (deposit_req_data) {
    window.open(deposit_req_data);
  } 

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
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);

  if (deposit_req_data) {
    return (
      <QRScreen deposit_req_data={deposit_req_data} show_time={show_time} />
    );
  }

  return (
    <Container sx={{ background: "#F7F8FF" }}>
      {audio}
      <CustomCircularProgress isLoading={isLoading || loding || history} />
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
         <NavLink onClick={()=>navigate('/account')}>
            <Box component="img" src={backbtn} width={25}></Box>
          </NavLink>
          <Box sx={{ position: "absolute", left: "40%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              Deposit
            </Typography>
          </Box>
          <NavLink to="/depositehistory">
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
            ₹
                {(
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
            onClick={()=>navigate("/zp")}
            sx={{
              width: "120px",
              background: "#FFFFFF",
              padding: 2,
              borderRadius: 2,
              mr: 2,
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          className={"!cursor-pointer"}>
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
              ZP
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          width: "92%",
          margin: "auto",
          background: "#ffffff",
          mt: 2,
          borderRadius: "10px",
          padding: 1,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
        className="!cursor-pointer"
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={payment} width={30}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "20px ",
              color: "black",
              ml: "10px",
              fontWeight: "600",
            }}
          >
            Deposit amount
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => formik.setFieldValue("amount", 500)}
          >
            ₹ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => { setDeposit_req_data(null);
              formik.setFieldValue("amount", 1000)}}
          >
            ₹ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => formik.setFieldValue("amount", 5000)}
          >
            ₹ 5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => formik.setFieldValue("amount", 10000)}
          >
            ₹ 10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => formik.setFieldValue("amount", 15000)}
          >
            ₹ 15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => formik.setFieldValue("amount", 20000)}
          >
            ₹ 20K
          </Button>
        </Stack>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            background: "#F2F2F2",
            borderRadius: "20px",
            border: "none",
            boxShadow: "none",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <CurrencyRupeeIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <InputBase
            name="amount"
            id="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
            placeholder="Please enter the amount"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <Button
          sx={style.wdbtn}
          onClick={fk.handleSubmit}
          className={`${fk.values.amount ? "!bg-[#F48901]" : "!bg-gray-400"}`}
        >
          Deposit
        </Button>
      </Box>

      <Box
        sx={{
          width: "92%",
          margin: "auto",
          background: "#ffffff",
          mt: 2,
          borderRadius: "10px",
          padding: 1,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={user} width={30}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "black", ml: "10px" }}
          >
            Recharge instructions
          </Typography>
        </Stack>
        <Box
          sx={{ border: "1px solid #d2d2d2", padding: 2, borderRadius: "10px" }}
        >
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              Note: do not cancel the deposit order after the money has been
              transferred.
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
          Deposit history
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
                <Typography className="!bg-orange-400 !text-white rounded px-2 py-1 !flex justify-center">
                  Deposit
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
                {i?.tr15_status}
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
              <Typography variant="body1">₹ {i?.tr15_amt}</Typography>
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
                {i?.type}
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
                {moment(i?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}
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
                  {i?.tr15_trans}
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
export default Deposite;

const style = {
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
  paytmbtn: {
    mb: 2,
    color: theme.palette.primary.main,
    width: "31%",
    border: `1px solid  #eaeaea`,
    padding: "10px",
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { color: "#939393 !important", fontSize: "13px" },
  },
};
