// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Checkbox,
//   FilledInput,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import invite from "../../assets/images/invite.png";
// import password from "../../assets/images/password.png";
// import phoneaa from "../../assets/images/phoneaa.png";
// import { storeCookies } from "../../services/apiCallings";
// import { endpoint } from "../../services/urls";
// import { signupSchemaValidataon } from "../../services/validation";
// import theme from "../../utils/theme";
// import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
// import { enCryptData } from "../../shared/secret";
// const RegistrationByMobile = () => {
//   const [username, setusername] = useState("");
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [country, setCountry] = React.useState("");
//   const navigate = useNavigate();
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const [isLoading, setisLoding] = useState(false);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleChangesetCountry = (event) => {
//     setCountry(event.target.value);
//   };
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const inviteid = params.get("inviteid");
//   const initialValue = {
//     invite_code: inviteid || "",
//     password: "",
//     confirmed_password: "",
//     mobile: "",
//     name: "",
//   };

//   const fk = useFormik({
//     initialValues: initialValue,
//     validationSchema: signupSchemaValidataon,
//     onSubmit: () => {
//       if (!username) return toast("Correct your invite code.");
//       const reqBody = {
//         txtregid: "1",
//         txtname: fk.values.name,
//         txtintroducer_id: fk.values.invite_code,
//         txtintroducer_name: username,
//         txtemail: "",
//         txtmobile: fk.values.mobile,
//         txtpassword: fk.values.password,
//       };

//       if (fk.values.password !== fk.values.confirmed_password)
//         return toast("Password and confirm password should be same");
//       signupSubmit(reqBody);
//     },
//   });

//   async function signupSubmit(reqBody) {
//     setisLoding(true);
//     try {
//       const res = await axios.post(endpoint.register_candidate_mobile, reqBody);
//       console.log(res);
//       if (res?.data?.status === true) {
//         storeCookies();
//         toast(res?.data?.msg);
//         localStorage.setItem("user_id", enCryptData(res?.data?.userid));
//         navigate("/dashboard");
//       } else {
//         toast(res?.data?.msg);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     setisLoding(false);
//   }

//   async function getIntroFn() {
//     console.log("Function is hit now");
//     const reqBody = {
//       userid: fk.values.invite_code,
//     };
//     try {
//       const res = await axios.post(endpoint?.get_user_intro_name, reqBody);
//       setusername(res?.data?.earning?.name);
//     } catch (e) {
//       console.log(e);
//     }
//     // client.refetchQueries("bank_details");
//   }

//   useEffect(() => {
//     getIntroFn();
//   }, [fk.values.invite_code]);

//   useEffect(() => {
//     const handleEnterKeyPress = (event) => {
//       if (event.key === "Enter") {
//         fk.handleSubmit();
//       }
//     };
//     window.addEventListener("keydown", handleEnterKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleEnterKeyPress);
//     };
//   }, [fk]);

//   return (
//     <>
//       <Box component="form" onSubmit={fk.handleSubmit}>
//       <CustomCircularProgress isLoading={isLoading} />
//         <Stack direction="row" alignItems="center">
//           <Box
//             component="img"
//             src={phoneaa}
//             sx={{ width: "25px", mr: 1 }}
//           ></Box>
//           <Typography
//             variant="body1"
//             color="initial"
//             sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
//           >
//             Phone number
//           </Typography>
//         </Stack>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Box sx={{ width: "30%" }}>
//             <FormControl fullWidth sx={{ ...style.selectfield }}>
//               <Select
//                 value={country}
//                 onChange={handleChangesetCountry}
//                 displayEmpty
//               >
//                 <MenuItem value="">
//                   <em>+91 India</em>
//                 </MenuItem>
//                 <MenuItem value={+971}>+971 UAE </MenuItem>
//                 <MenuItem value={+977}>+977 Nepal</MenuItem>
//                 <MenuItem value={+92}>+92 Pakistan</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ width: "65%" }}>
//             <FormControl fullWidth sx={{ ...style.inputfield }}>
//               <TextField
//                 id="mobile"
//                 name="mobile"
//                 onChange={fk.handleChange}
//                 value={fk.values.mobile}
//                 label=""
//                 placeholder=" Enter number"
//                 fullWidth
//                 type="number"
//               />
//               {fk.touched.mobile && fk.errors.mobile && (
//                 <div className="error">{fk.errors.mobile}</div>
//               )}
//             </FormControl>
//           </Box>
//         </Stack>
//         <Box mt={2}>
//           <Stack direction="row" alignItems="center">
//             <Box
//               component="img"
//               src={password}
//               sx={{ width: "25px", mr: 1 }}
//             ></Box>
//             <Typography
//               variant="body1"
//               color="initial"
//               sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
//             >
//               Name
//             </Typography>
//           </Stack>
//           <FormControl fullWidth sx={{ ...style.passwordfield }}>
//             <FilledInput
//               placeholder="Name"
//               id="name"
//               name="name"
//               onChange={fk.handleChange}
//               value={fk.values.name}
//               type={"text"}
//             />
//             {fk.touched.name && fk.errors.name && (
//               <div className="error">{fk.errors.name}</div>
//             )}
//           </FormControl>
//         </Box>
//         <Box mt={2}>
//           <Stack direction="row" alignItems="center">
//             <Box
//               component="img"
//               src={password}
//               sx={{ width: "25px", mr: 1 }}
//             ></Box>
//             <Typography
//               variant="body1"
//               color="initial"
//               sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
//             >
//               Set password
//             </Typography>
//           </Stack>
//           <FormControl fullWidth sx={{ ...style.passwordfield }}>
//             <FilledInput
//               placeholder="Set password"
//               id="password"
//               name="password"
//               onChange={fk.handleChange}
//               value={fk.values.password}
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//             {fk.touched.password && fk.errors.password && (
//               <div className="error">{fk.errors.password}</div>
//             )}
//           </FormControl>
//         </Box>
//         <Box mt={2}>
//           <Stack direction="row" alignItems="center">
//             <Box
//               component="img"
//               src={password}
//               sx={{ width: "25px", mr: 1 }}
//             ></Box>
//             <Typography
//               variant="body1"
//               color="initial"
//               sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
//             >
//               Confirm password
//             </Typography>
//           </Stack>
//           <FormControl fullWidth sx={{ ...style.passwordfield }}>
//             <FilledInput
//               placeholder="Confirm password"
//               id="confirmed_password"
//               name="confirmed_password"
//               onChange={fk.handleChange}
//               value={fk.values.confirmed_password}
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//             {fk.touched.confirmed_password && fk.errors.confirmed_password && (
//               <div className="error">{fk.errors.confirmed_password}</div>
//             )}
//           </FormControl>
//         </Box>
//         <Box mt={2}>
//           <Stack direction="row" alignItems="center">
//             <Box
//               component="img"
//               src={invite}
//               sx={{ width: "25px", mr: 1 }}
//             ></Box>
//             <Typography
//               variant="body1"
//               color="initial"
//               sx={{ fontSize: "15px", fontWeight: "500", color: "gray" }}
//             >
//               Invite code
//             </Typography>
//           </Stack>
//           <FormControl fullWidth sx={{ ...style.inputfield }}>
//             <TextField
//               id="invite_code"
//               name="invite_code"
//               onChange={fk.handleChange}
//               value={fk.values.invite_code}
//               label=""
//               placeholder="please input Invite code"
//               fullWidth
//               type="text"
//             />
//             {username !== "false" ? (
//               <div className="no-error">{username}</div>
//             ) : (
//               fk.touched.invite_code &&
//               fk.errors.invite_code && (
//                 <div className="error">{fk.errors.invite_code}</div>
//               )
//             )}
//           </FormControl>
//         </Box>
//       </Box>
//       <Box mt={3}>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox defaultChecked />}
//             label={
//               <Stack direction="row">
//                 <Typography
//                   variant="body1"
//                   color="initial"
//                   sx={{ fontSize: "13px" }}
//                 >
//                   I have read and agree{" "}
//                 </Typography>
//                 <NavLink to="/RiskDisclosureAgreement">
//                   <Typography
//                     variant="body1"
//                     color="initial"
//                     sx={{ fontSize: "14px", color: "#EB8A1F" }}
//                   >
//                     【Privacy Agreement】
//                   </Typography>
//                 </NavLink>
//               </Stack>
//             }
//           />
//         </FormGroup>
//       </Box>
//       <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
//         <Button
//           onClick={() => fk.handleSubmit()}
//           sx={{
//             boxShadow: " 0px 3px #b6bad0",
//             padding: "10px",
//             width: "100%",
//             background: "#CACCDB",
//             color: "white",
//             borderRadius: "20px",
//             mb: 2,
//             fontWeight: "700",
//           }}
//           disableElevation
//           className={`${
//             !fk.values.password ||
//             !fk.values.confirmed_password ||
//             !fk.values.mobile ||
//             !fk.values.name ||
//             !fk.values.invite_code
//               ? "!bg-gray-500"
//               : "!bg-[#FC9401]"
//           }`}
//         >
//           Register
//         </Button>
//         <NavLink to="/">
//           <Button
//             sx={{
//               width: "100%",
//               borderRadius: "20px",
//               fontSize: "13px",
//               fontWeight: "500",
//               color: "black",
//               "&>span": {
//                 color: theme.palette.primary.main,
//                 ml: 1,
//                 fontSize: "16px",
//                 fontWeight: "700",
//               },
//             }}
//             variant="outlined"
//           >
//             I have an account <span> Login</span>
//           </Button>
//         </NavLink>
//       </Box>
//     </>
//   );
// };

// export default RegistrationByMobile;

// const style = {
//   inputfield: {
//     mt: 2,
//     "&>div>div>input": {
//       background: "white",
//       padding: 3,
//       borderRadius: "10px",
//       boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
//     },
//     "&>div>div>fieldset ": { border: "none !important" },
//     "&>div>div>input:focus": { outline: "1px solid #F18401" },
//   },
//   passwordfield: {
//     "&>div>input": { padding: 3 },
//     "&>div": {
//       mt: 2,
//       background: "white",
//       boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
//       borderRadius: "10px",
//     },
//     "&>div::before": { border: "none !important" },
//     "&>div::after:focus": {
//       border: "none !important",
//       border: "1px solid #F18401  !important",
//     },
//   },
//   selectfield: {
//     "&>div>div": {
//       background: "white",
//       borderRadius: "10px",
//       padding: "11px 3px",
//       borderRadius: "10px",
//     },
//     "&>div>fieldset": {
//       border: "1px solid white",
//       boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
//       borderRadius: "10px",
//     },
//     "&>div": { mt: 2 },
//   },
// };
