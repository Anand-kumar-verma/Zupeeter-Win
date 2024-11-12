import { History } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
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
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../services/apiconnector";
import { endpoint, tokenContractAddress } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import { enCryptData } from "../../../shared/secret";
import theme from "../../../utils/theme";
import Header from "../../../component/layout/component/Header";
const tokenABI = [
  // balanceOf function ABI
  "function balanceOf(address owner) view returns (uint256)",
  // transfer function ABI
  "function transfer(address to, uint256 amount) returns (bool)",
];
function Zptokenadd() {
  const audioRefMusic = React.useRef(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");
  const [gasprice, setGasPrice] = useState("");
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);
  const client = useQueryClient();

//   const { isLoading, data: wallet_amount } = useQuery(
//     ["wallet_amount"],
//     () => apiConnectorGet(endpoint?.get_balance),
//     {
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       retryOnMount: false,
//       refetchOnWindowFocus: false,
//     }
//   );
//   const wallet_amount_data = wallet_amount?.data?.data || 0;

//   const { data: address } = useQuery(
//     ["address_own"],
//     () => apiConnectorGet(endpoint?.zp_own_address),
//     {
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: false,
//       retryOnMount: false,
//       refetchOnWindowFocus: false,
//     }
//   );
//   const ownaddress = address?.data?.data?.[0];

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

  const fk = useFormik({
    initialValues: {
      inr_value: "",
    },
  });

  async function requestAccount() {
    setLoding(true);
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAccount = accounts[0];
        setWalletAddress(userAccount);
        // Create a provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the native token balance (BNB)
        const nativeBalance = await provider.getBalance(userAccount);
        setBnb(ethers.utils.formatEther(nativeBalance));
        // Create a contract instance for the ZP token
        const tokenContract = new ethers.Contract(
          tokenContractAddress,
          tokenABI,
          provider
        );
        // Get the balance of the ZP token for the user account
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
      } catch (error) {
        toast("Error connecting...", error);
      }
    } else {
      toast("MetaMask not detected.");
    }
    setLoding(false);
  }

  async function sendTokenTransaction() {
    if (!walletAddress) return toast("Plese Connect your wallet.");
    setLoding(true);
    if (!window.ethereum) {
      toast("MetaMask not detected");
      setLoding(false);
      return;
    }

    if (!fk.values.inr_value) {
      setLoding(false);
      return toast("Enter Your Amount.");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const tokenAmount = ethers.utils.parseUnits(
        String(
          Number(Number(fk.values.inr_value) /0.5)?.toFixed(
            6
          )
        ),
        18
      ); // Sending 1 ZP token

      // Create a contract instance for the ZP token
      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenABI,
        signer
      );
      const gasPrice = await provider.getGasPrice();

      const gasEstimate = await tokenContract.estimateGas.transfer(
        // ownaddress?.payin_token_address,
        tokenAmount // Amount of tokens to transfer
      );
      // Calculate total gas cost in BNB
      const totalGasCost = gasEstimate.mul(gasPrice);
      setGasPrice(ethers.utils.formatEther(totalGasCost));
      const bnbBalance = await provider.getBalance(await signer.getAddress());
      // console.log("BNB Balance:", ethers.utils.formatEther(bnbBalance));
      if (bnbBalance.lt(totalGasCost)) {
        setLoding(false);
        return toast(
          `Insufficient BNB for gas fees. You need at least ${ethers.utils.formatEther(
            totalGasCost
          )} BNB.`
        );
      }
      // Call the transfer function on the token contract
      const transactionResponse = await tokenContract.transfer(
        // ownaddress?.payin_token_address, 
        tokenAmount // Amount of tokens to transfer
      );
      // Wait for transaction confirmation
      const receipt = await transactionResponse.wait();
      // Update UI with transaction status
      setTransactionHash(transactionResponse.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");
      if (receipt.status === 1) {
        PayinZp(
          ethers.utils.formatEther(totalGasCost),
          transactionResponse.hash,
          2
        ); // gas price, wallet address, hash, bnb
        // hit function
      } else {
        PayinZp(
          ethers.utils.formatEther(totalGasCost),
          transactionResponse.hash,
          3
        );
        // hit function
      }
    } catch (error) {
      console.log(error);
      toast("Token transaction failed", error);
    }
    setLoding(false);
  }

  async function PayinZp(gasPrice, tr_hash, status) {
    const reqbody = {
      req_amount: fk.values.inr_value,
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: bnb,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
    };
    try {
      const res = await apiConnectorPost(endpoint?.zp_paying, {
        payload: enCryptData(reqbody),
      });
      toast(res?.data?.msg);
      client.refetchQueries("wallet_amount_amount");
      client.refetchQueries("wallet_amount");
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container sx={{ background: "#F7F8FF" }}>

      {audio}
      {/* <CustomCircularProgress isLoading={isLoading || loding} /> */}
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
          <Box
            component="img"
            src={backbtn}
            width={25}
            onClick={() => navigate("/account")}
          ></Box>

          <Box sx={{ position: "absolute", left: "40%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              Deposit
            </Typography>
          </Box>
          <NavLink to="/zpdeposit">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "11px", color: "white" }}
            >
              <History />
            </Typography>
          </NavLink>
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
          onClick={requestAccount}
          className="!bg-[#F48901]"
        >
          Connect Your Wallet
        </Button>
        <div className="m-3">
          <div className="flex flex-wrap justify-start">
            <span className="!font-bold">Address : </span>{" "}
            <span>{walletAddress}</span>
          </div>
          <p className="!font-bold mt-2">Wallet Balance</p>
          <div className="flex flex-wrap justify-start">
            <p className="!font-semibold">BNB : </p> <p>{bnb}</p>
          </div>
          <div className="flex flex-wrap  justify-start">
            <p className="!font-semibold">ZP : </p> <p>{no_of_Tokne}</p>
          </div>
        </div>
        <div className="!my-4">
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
              <p className="text-[#F48901] !text-sm !font-bold"> INR </p>
            </IconButton>
            <InputBase
              name="inr_value"
              id="inr_value"
              value={fk.values.inr_value}
              sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
              inputProps={{ "aria-label": "search google maps" }}
              onChange={fk.handleChange}
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
            <p className="text-[#F48901] !text-sm !font-bold"> ZP </p>
          </IconButton>
          <InputBase
            value={Number(
              Number(fk.values.inr_value) / 0.5
            )?.toFixed(4)}
            sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <Button
          sx={style.wdbtn1}
          onClick={sendTokenTransaction}
          className="!bg-[#F48901]"
        >
          Confirm
        </Button>
        <div className="m-3">
          <div className=" flex flex-wrap justify-start">
            <p>Transaction Hash : </p>{" "}
            <p className="!text-[9px] whitespace-break-spaces">
              {transactionHash}
            </p>
          </div>
          <div className="flex flex-wrap justify-start !gap-4">
            <p>Gas Price : </p> <p className="!font-bold">{gasprice}</p>
          </div>
          <div className="flex flex-wrap justify-start !gap-4">
            <p>Transaction Status : </p>{" "}
            <p className="!font-bold">{receiptStatus}</p>
          </div>
        </div>
      </Box>
    </Container>
  );
}
export default Zptokenadd;

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
    // width: "100%",
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
