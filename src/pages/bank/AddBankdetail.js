import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  colors,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
// import { withdrawAmountSchemaValidaton } from "../../../Shared/Validation";

import Layout from "../../component/layout/Layout";
import { endpoint } from "../../services/urls";
import { apiConnectorPost } from "../../services/apiconnector";

function AddBankDetails() {
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const client = useQueryClient();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const initialValues = {
    email: "",
    mobile: "",
    bank_name: "",
    name: "",
    ifsc: "",
    account_number: "",
  };

  const fk = useFormik({
    initialValues: initialValues,
    // validationSchema: withdrawAmountSchemaValidaton,
    onSubmit: () => {
      console.log(fk.values);
      const capitalizedIFSC = fk.values.ifsc.toUpperCase();
      const reqbody = {
        email: fk.values.email,
        bank_name: fk.values.bank_name,
        name: fk.values.name,
        email: fk.values.email,
        user_id: user_id,
        mobile: fk.values.mobile,
        ifsc_code: capitalizedIFSC,
        account_number: fk.values.account_number,
      }

      addbankDetailsFunction(reqbody);

    },
  });

  const addbankDetailsFunction = async (reqbody) => {
    try {

      const response = await apiConnectorPost(`${endpoint?.bank_details}`, reqbody)
      toast(response?.data?.msg);
      client.refetchQueries("bank_list_details");
      if (response?.data?.msg) {
        navigate("/bank-details");
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  return (
    <Layout header={false}>
      <Container
        className="no-scrollbar"
        sx={{
          background: "white",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1">
            Add Bank Details
          </Typography>
          <Box

          >
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Box mt={2} component="form" onSubmit={fk.handleSubmit}>
              <FormControl fullWidth sx={{ mt: "1px" }}>
                <Stack direction="row" >
                  <Typography>
                    Account holder name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  value={fk.values.name}
                  onChange={fk.handleChange}
                  placeholder="Enter account holder name *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.name && fk.errors.name && (
                  <div className="error">{fk.errors.name}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" >
                  <Typography >
                    Enter Email <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  value={fk.values.email}
                  onChange={fk.handleChange}
                  placeholder="Enter email *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.email && fk.errors.email && (
                  <div className="error">{fk.errors.email}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" >
                  <Typography >
                    Enter Mobile <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="mobile"
                  name="mobile"
                  type="number"
                  value={fk.values.mobile}
                  onChange={fk.handleChange}
                  placeholder="Enter mobile *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.mobile && fk.errors.mobile && (
                  <div className="error">{fk.errors.mobile}</div>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" >
                  <Typography >
                    Bank name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="bank_name"
                  name="bank_name"
                  type="text"
                  value={fk.values.bank_name}
                  onChange={fk.handleChange}
                  placeholder="Enter bank name *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.bank_name && fk.errors.bank_name && (
                  <div className="error">{fk.errors.bank_name}</div>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" >
                  <Typography >
                    IFSC code <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="ifsc"
                  name="ifsc"
                  type="text"
                  value={fk.values.ifsc}
                  onChange={fk.handleChange}
                  placeholder="Enter IFSC code *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.ifsc && fk.errors.ifsc && (
                  <div className="error">{fk.errors.ifsc}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" >
                  <Typography >
                    Account number <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="account_number"
                  name="account_number"
                  type="text"
                  value={fk.values.account_number}
                  onChange={fk.handleChange}
                  placeholder="Enter account number *"
                  className=""
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.account_number && fk.errors.account_number && (
                  <div className="error">{fk.errors.account_number}</div>
                )}
              </FormControl>

              <Button
                sx={style.wdbtn}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
                Submit{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default AddBankDetails;

const style = {
  header: {
    color: "white !important",
    padding: "10px 8px",
    background: "#F48901",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
    },
    "& > a > svg": {
      fontSize: "35px",
    },
  },
  wdbtn: {
    width: "95% !important",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    width: "100%",
    background:
      "#F48901",
    backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
  },
};
