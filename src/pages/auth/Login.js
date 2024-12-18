import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import backbtn from "../../assets/images/backBtn.png";
import custom from "../../assets/images/custom.png";
import logemailactive from "../../assets/images/logemailactive.png";
import logemaildeactive from "../../assets/images/logemaildeactive.png";
import logphoneactive from "../../assets/images/logphoneactive.png";
import logphonedeactive from "../../assets/images/logphonedeactive.png";
import password from "../../assets/images/password.png";
import phoneaa from "../../assets/images/phoneaa.png";
import { storeCookies } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { ClientJS } from 'clientjs';

function Login() {
  const client = new ClientJS();
  const [visitorId, setVisitorId] = useState(null);
  const [value, setValue] = useState("one");
  const navigate = useNavigate();
  const [country, setCountry] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loding, setloding] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangesetCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleMobileChange = (event) => {
    const inputMobile = event.target.value;
    if (inputMobile?.length > 10) {
      setMobileError("Invalid mobile number. It must be a 10-digit number");
    } else {
      setMobileError("");
    }
  };

  const initialValue = {
    email: "",
    password: "",
    mobile: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      const reqBody = {
        username: value === "one" ? String(fk.values.mobile) : fk.values.email,
        password: fk.values.password,
        ipAddress: "",
        u_finger_id: visitorId,
      };
      if (!reqBody.password || !reqBody.username)
        return toast("Plese enter all fields");
      loginFunction(reqBody);
    },
  });

  const loginFunction = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(endpoint?.login, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      toast.success(response?.data?.msg);
      if (response?.data?.msg === "Login Successfully") {
        const value = response?.data?.token;
        localStorage.setItem(
          "user_id",
          CryptoJS.AES.encrypt(
            JSON.stringify({
              UserID: response?.data?.UserID,
              user_type: response?.data?.user_type,
            }),
            "anand"
          )?.toString()
        );
        localStorage.setItem("token", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        setloding(false);
        storeCookies();
        ["User", "Dummy User" ,"Support Agent"]?.includes(response?.data?.user_type)
          ? navigate("/before-login")
          : ["Admin", "Super Admin"]?.includes(response?.data?.user_type) &&
            navigate("/master");
        window.location.reload();
      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };

  // useEffect(() => {
  //   user_id &&
  //   navigate("/before-login");
  // }, [user_id]);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        fk.handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [fk]);

  useEffect(() => {
    // Initialize FingerprintJS and fetch the visitor ID
    const fetchVisitorId = async () => {
      const fingerprint = client.getFingerprint();
      // const result = await fp.get();
      setVisitorId(fingerprint);
      // console.log(fingerprint);
    };
 

    fetchVisitorId().catch(console.error);
  }, []);
  return (
    <Container>
      <Box
        sx={{
          padding: 1,
          background:
            "linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)",
          px: 2,
          "&>p": { color: "white" },
        }}
      >
        <NavLink to="/">
          <Box component="img" src={backbtn} width={25}></Box>
        </NavLink>
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "600", mt: 2, mb: 1, fontSize: "14px" }}
        >
          Log in
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "400", fontSize: "12px" }}
        >
          Please log in with your phone number or email
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "400", fontSize: "12px", mb: 3 }}
        >
          If you forget your password, please contact customer service
        </Typography>
      </Box>
      <Box sx={{ width: "92%", margin: "auto" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            sx={{ width: "50%" }}
            value="one"
            label={
              <Box>
                {value === "one" ? (
                  <Box
                    component="img"
                    src={logphoneactive}
                    sx={{
                      margin: "auto",
                      width: "25px",
                      mb: "10px !important",
                    }}
                  ></Box>
                ) : (
                  <Box
                    component="img"
                    src={logphonedeactive}
                    sx={{
                      margin: "auto",
                      width: "25px",
                      mb: "10px !important",
                    }}
                  ></Box>
                )}
                Log in with phone
              </Box>
            }
          />
          <Tab
            sx={{ width: "50%" }}
            value="two"
            label={
              <Box>
                {value === "two" ? (
                  <Box
                    component="img"
                    src={logemaildeactive}
                    sx={{
                      margin: "auto",
                      width: "25px",
                      mb: "10px !important",
                    }}
                  ></Box>
                ) : (
                  <Box
                    component="img"
                    src={logemailactive}
                    sx={{
                      margin: "auto",
                      width: "25px",
                      mb: "10px !important",
                    }}
                  ></Box>
                )}
                Log in with email
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
        {value === "one" && (
          <Box component="form" onSubmit={fk.handleSubmit}>
            <Stack direction="row" alignItems="center">
              <Box
                component="img"
                src={phoneaa}
                sx={{ width: "25px", mr: 1 }}
              ></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
              >
                Phone number
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ width: "30%" }}>
                <FormControl fullWidth sx={{ ...style.selectfield }}>
                  <Select
                    value={country}
                    onChange={handleChangesetCountry}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>+91 India</em>
                    </MenuItem>
                    <MenuItem value={+971}>+971 UAE </MenuItem>
                    <MenuItem value={+977}>+977 Nepal</MenuItem>
                    <MenuItem value={+92}>+92 Pakistan</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "65%" }}>
                <FormControl fullWidth sx={{ ...style.inputfield }}>
                  <TextField
                    id="mobile"
                    name="mobile"
                    onChange={(e) => {
                      fk.handleChange(e);
                      handleMobileChange(e);
                    }}
                    value={fk.values.mobile}
                    label=""
                    placeholder="Enter number"
                    fullWidth
                    type="number"
                  />
                </FormControl>
                   {mobileError && <Typography color="warning">{mobileError}</Typography>}
              </Box>
            </Stack>

            <Box mt={2}>
              <Stack direction="row" alignItems="center">
                <Box
                  component="img"
                  src={password}
                  sx={{ width: "25px", mr: 1 }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
                >
                  Password
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.passwordfield }}>
                <FilledInput
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  onChange={fk.handleChange}
                  value={fk.values.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )}
        {value === "two" && (
          <Box component="form" onSubmit={fk.handleSubmit}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Box
                  component="img"
                  src={logemaildeactive}
                  sx={{ width: "25px", mr: 1 }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
                >
                  Mail
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.inputfield }}>
                <TextField
                  class="sub"
                  id="email"
                  name="email"
                  onChange={fk.handleChange}
                  value={fk.values.email}
                  label=""
                  placeholder="please input your email"
                  fullWidth
                  type="email"
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <Stack direction="row" alignItems="center">
                <Box
                  component="img"
                  src={password}
                  sx={{ width: "25px", mr: 1 }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
                >
                  Password
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ ...style.passwordfield }}>
                <FilledInput
                  placeholder="please input your password"
                  id="password"
                  name="password"
                  onChange={fk.handleChange}
                  value={fk.values.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )}
        <Box mt={3}>
          <FormGroup mt={3}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember password"
            />
          </FormGroup>
        </Box>
        <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
          <Button
            // onClick={() => fk.handleClickShowPassword()}
            onClick={() => fk.handleSubmit()}
            sx={{
              boxShadow: " 0px 3px #b6bad0",
              padding: "10px",
              width: "100%",
              background: "#CACCDB",
              color: "white",
              borderRadius: "20px",
              mb: 2,
              fontWeight: "700",
              "&:hover": { background: "#b6bad0" },
            }}
            disableElevation
            className={`${
              (fk.values.email || fk.values.password || fk.values.mobile) &&
              "!bg-orange-400"
            } `}
          >
            Log in
          </Button>
          <NavLink to="/register">
            <Button
              sx={{
                width: "100%",
                borderRadius: "20px",
                fontSize: "17px",
                fontWeight: "700",
              }}
              variant="outlined"
            >
              Register
            </Button>
          </NavLink>
        </Box>
        <Box sx={{ mt: 3 }}></Box>
        <Box
          sx={{ width: "80%", margin: "auto" }}
          component={NavLink}
          to="/CustomerService"
        >
          <Box
            component="img"
            src={custom}
            sx={{ width: "50px", margin: "auto" }}
          ></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ textAlign: "center" }}
          >
            Customer Service
          </Typography>
        </Box>
        <Box className="!text-center !text-gray-500"> Version 1.1</Box>
      </Box>
    </Container>
  );
}

export default Login;

const style = {
  inputfield: {
    mt: 2,
    "&>div>div>input": {
      background: "white",
      padding: 3,
      borderRadius: "10px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
    },
    "&>div>div>fieldset ": { border: "none !important" },
    "&>div>div>input:focus": { outline: "1px solid #F18401" },
    // "sub>active>button":{background:"#eb8a1f"},
  },

  passwordfield: {
    "&>div>input": { padding: 3 },
    "&>div": {
      mt: 2,
      background: "white",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "10px",
    },
    "&>div::before": { border: "none !important" },
    "&>div::after:focus": {
      border: "none !important",
      border: "1px solid #F18401  !important",
    },
  },
  selectfield: {
    "&>div>div": {
      background: "white",
      borderRadius: "10px",
      padding: "11px 3px",
      borderRadius: "10px",
    },
    "&>div>fieldset": {
      border: "1px solid white",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "10px",
    },
    "&>div": { mt: 2 },
  },
};
