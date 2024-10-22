import { Button, Container, MenuItem, TextField } from "@mui/material";
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

const P2PTransfer = () => {
  const [username, setusername] = useState("");
  const client = useQueryClient();

  const { data } = useQuery(
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
  const profile = data?.data?.earning || [];

  const { data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => apiConnectorGet(endpoint.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:false,
      retryOnMount:false,
      refetchOnWindowFocus:false
    }
  );
  const wallet_amount_data = wallet_amount?.data?.data || 0;

  const initialValue = {
    from_wallet_type: "",
    userid: "",
    to_id: "",
    transfer_amount: "",
    from_password : "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        userid: profile?.rec?.Login_Id,
        from_password: fk.values.from_password ,
        transfer_amount: fk.values.transfer_amount,
        to_id: username?.id,
        from_wallet_type: fk.values.from_wallet_type,
      }; 
      if (reqBody.userid === reqBody.to_id) {
        return toast("Can not send fund to yourself");
      }
      if (
        !reqBody.userid ||
        !reqBody.from_password ||
        !reqBody.transfer_amount ||
        !reqBody.to_id ||
        !reqBody.from_wallet_type
      )
        return toast("Plese enter all data");
        // return toast("Softeware is under maintainence.")
      insertFundFn(reqBody);
    },
  });

  async function insertFundFn(reqBody) {
    try {
      const res = await apiConnectorPost(endpoint?.p2p_transfer, reqBody);
      toast(res?.data?.msg);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }
  async function getIntroFn() {
    console.log("Function is hit now");
    const reqBody = {
      userid: fk.values.userid,
    };
    try {
      const res = await apiConnectorGet(endpoint?.get_user_intro_name,{
        params: reqBody
      });
      setusername(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }

  useEffect(() => {
    getIntroFn();
  }, [fk.values.userid]);
  
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
          </span>
          <span>Wallet*</span>
          <p className="!w-[100%]">{wallet_amount_data?.wallet}</p>
          <span>Transfer Id*</span>
          <div>
            <TextField
              id="to_id"
              name="to_id"
              value={fk.values.to_id}
              onChange={(e) => {
                fk.handleChange(e);
                if (e.target.value === profile?.rec?.Login_Id) {
                 return toast("Can not send fund to yourself ");
                } 
              }}
              className="!w-[100%]"
            />
            {username && username !== "false" && (
              <p className="!text-[10px] !text-red-500 pl-2">{username?.full_name}</p>
            )}
          </div>

          <span>Tranfer Amount*</span>
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
      </Container>
    </Layout>
  );
};

export default P2PTransfer;
