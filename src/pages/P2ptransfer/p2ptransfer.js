import { Box, Button, Container, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import Layout from "../../component/layout/Layout";
import {
  ProfileDataFunction,
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { apiConnectorGet, apiConnectorPost } from "../../services/apiconnector";
import theme from "../../utils/theme";
import moment from "moment/moment";

const P2PTransfer = () => {
  const [username, setusername] = useState("");
  const client = useQueryClient();

  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setvisibleData] = useState([]);

  const { isLoading, data } = useQuery(
    ["p2p_transfer"],
    () => apiConnectorGet(endpoint?.p2p_transfer_history),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:false,
      retryOnMount:false,
      refetchOnWindowFocus:false
    }
  );

  const res = data?.data?.data || [];

  useEffect(() => {
    isAllValue ? setvisibleData(res) : setvisibleData(res?.slice(0, 3));
  }, [isAllValue, res]);

  const [value, setValue] = useState(1);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { data: wallet_amount } = useQuery(
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
  const wallet_amount_data = wallet_amount?.data?.data || 0;

  const initialValue = {
    from_wallet_type: "",
    to_id: "",
    transfer_amount: "",
    from_password: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        from_password: fk.values.from_password,
        transfer_amount: fk.values.transfer_amount,
        to_id: username?.id,
        from_wallet_type: fk.values.from_wallet_type,
      };

      if (
        !reqBody.from_password ||
        !reqBody.transfer_amount ||
        !reqBody.to_id ||
        !reqBody.from_wallet_type
      )
        return toast("Plese enter all data");
      insertFundFn(reqBody);
    },
  });

  async function insertFundFn(reqBody) {
    try {
      const res = await apiConnectorPost(endpoint?.p2p_transfer, reqBody);
      toast(res?.data?.msg);
      fk.handleReset();
      client.refetchQueries("wallet_amount_amount")
    } catch (e) {
      console.log(e);
    }
  }
  async function getIntroFn() {
    try {
      const res = await apiConnectorGet(`${endpoint.get_user_intro_name}?userid=${fk.values.to_id}`);
      console.log(res);
      setusername(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getIntroFn();
  }, [fk.values.to_id]);

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
        <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
          <span className="col-span-2 justify-end">
            <div className="flex justify-between">
              <span className="font-bold">P2P Fund Transfer</span>
            </div>
            <div className="flex justify-end gap-2 my-5 mr-2 !font-bold !text-orange-500">
              <span className="">Wallet</span> :
              <p className="">{wallet_amount_data?.wallet}</p>
            </div>
          </span>


          <span>Transfer Id*</span>
          <div>
            <TextField
              id="to_id"
              name="to_id"
              value={fk.values.to_id}
              onChange={(e) => {
                fk.handleChange(e);

              }}
              className="!w-[100%]"
            />
            {username && username !== "false" && (
              <p className="!text-[10px] !text-red-500 pl-2">{username?.full_name}</p>
            )}
          </div>

          <span>Transfer Amount*</span>
          <TextField
            id="transfer_amount"
            name="transfer_amount"
            placeholder="Enter Amount"
            value={fk.values.transfer_amount}
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Transaction Password*</span>
          <TextField
            type="password"
            id="from_password"
            name="from_password"
            placeholder="Enter password"
            value={fk.values.from_password}
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Select From wallet Type*</span>
          <TextField
            size="small"
            select
            id="from_wallet_type"
            name="from_wallet_type"
            placeholder="Enter Amount"
            value={fk.values.from_wallet_type}
            onChange={fk.handleChange}
            className="!w-[100%]"
          >
            <MenuItem value={1}>Main Wallet</MenuItem>
            <MenuItem value={2}>Game Wallet</MenuItem>
          </TextField>
          <div className="col-span-2 flex gap-2 mt-4">
            <Button
              className="!bg-[#FD565C] !text-white"
              onClick={() => fk.handleReset()}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#BF6DFE] !text-white"
              onClick={() => fk.handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
        <Box>
          <Typography
            className=" !text-black px-4 pt-4 !font-bold"
          >
            P2P Transfer History
          </Typography>
        </Box>
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
             <p></p>
              <Box
                sx={{
                  color: "#888",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {i?.l01_status===1?"Success" : "Pending" }
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
              <Typography variant="body1">₹ {i?.l01_amount}</Typography>
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
               Date/Time
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="!text-green-500"
              >
                {moment(i?.l01_date)?.format("DD-MM-YYYY HH:mm:ss")}
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
                Description
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
                  { i?.l01_transection_type?.substring(0,27) }<br/>
                  { i?.l01_transection_type?.substring(27) }
                </Typography>
              
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
    </Layout>
  );
};

export default P2PTransfer;
const style = {
  paytmbtntwo: {
    borderRadius: "20px", textTransform: "capitalize", mb: 2,
    width: "92%", mt: 2, mx: 2, padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
}