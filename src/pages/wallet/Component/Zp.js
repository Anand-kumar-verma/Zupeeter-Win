import { History } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import atmchip from "../../../assets/images/atmchip.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import audiovoice from "../../../assets/images/bankvoice.mp3";
import cip from "../../../assets/images/cip.png";
import payment from "../../../assets/images/payment.png";
import refresh from "../../../assets/images/refwhite.png";
import zp from "../../../assets/images/zptoken.png";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";

function Zp() {
  const audioRefMusic = React.useRef(null);
  const [amount, setAmount] = useState("100");
  const [bnb, setBnb] = useState();
  const [zptoken, setZP] = useState();
  const [transactionhash, setTransactionhash] = useState();
  const [gasprice, setGasPrice] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

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
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);


  return (
    <Container sx={{ background: "#F7F8FF" }}>
      {audio}
      <CustomCircularProgress isLoading={isLoading } />
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
          onClick={()=>navigate("/deposit")}
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
          
          className={"!cursor-pointer"}
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
        <Button
          sx={style.wdbtn}
        //   onClick={fk.handleSubmit}
        //   className={`${fk.values.amount ? "!bg-[#F48901]" : "!bg-gray-400"}`}
        >
          Connect Your Wallet
        </Button>
        <div className="m-3">
        <div className="flex  justify-start !font-bold !gap-4">
        <p>BNB</p> <p>{bnb}</p>
        </div>
        <div className="flex justify-start !font-bold !gap-4">
        <p>ZP</p> <p>{zptoken}</p>
        </div></div>
        <div className='!my-4'>
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
            <p className='text-[#F48901] !text-sm !font-bold'> INR </p>
          </IconButton>
          <InputBase
            name="amount"
            id="amount"
            value={amount}
            sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
            placeholder="Please enter the amount"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
     
      </div>
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
            <p className='text-[#F48901] !text-sm !font-bold'> ZP </p>
          </IconButton>
          <InputBase
            name="amount"
            id="amount"
            value={Number(Number(amount || 0) / 5.4)?.toFixed(4)}
            sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
      <Button
          sx={style.wdbtn1}
        //   onClick={fk.handleSubmit}
          className="!bg-[#F48901]"
        >
          Confirm
        </Button>
        <div className="m-3">
        <div className=" flex  justify-start !font-bold !gap-4">
        <p>Transaction Hash</p> <p>{transactionhash}</p>
        </div>
        <div className="flex justify-start !font-bold !gap-4">
        <p>Gas Price</p> <p>{gasprice}</p>
        </div>
        <div className="flex justify-start !font-bold !gap-4">
        <p>Transaction Status</p> <p>{status}</p>
        </div>
        </div>
       </Box>
       
    </Container>
  );
}
export default Zp;

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
  wdbtn1: {
    width: "95% !important",
    boxShadow: "0 0.05333rem #b6bad0",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    // width: "100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
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
    background:
      "linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%), linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%)",
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