
import {
    Box,
    Button,
    Container,
    FormControl,
    MenuItem,
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
import { useNavigate } from "react-router-dom";
import Layout from "../../../component/layout/Layout";
import { endpoint } from "../../../services/urls";
import { apiConnectorPost } from "../../../services/apiconnector";

function AddAddressUsdt() {
    const client = useQueryClient()
    const [lodint, setloding] = React.useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const initialValues = {
        address: "",
        usdt_type :""

    };
    const fk = useFormik({
        initialValues: initialValues,
        onSubmit: () => {
            if (!fk.values.address  ||  !fk.values.usdt_type) {
                toast.error("Please Enter Address field");
                return;
            }
            const reqbody = {
                address: fk.values.address ,
                usdt_type :fk.values.usdt_type === "USDT.BEP20" ? "1": "2" 
            }
            withdraw_request_Function(reqbody)
        },
    });
    const withdraw_request_Function = async (reqbody) => {
        setloding(true);
        try {
            const response = await apiConnectorPost(`${endpoint.withdrawal_address_usdt}`, reqbody);
            if (response) {
                toast.success(response?.data?.msg);
                fk.handleReset();
                client.refetchQueries("address_list_details")
                navigate('/usdt-withdrawl-request')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
            console.error(error);
        }
        setloding(false);
    };
    return (
        <Layout>
            <Container
                className="no-scrollbar"
                sx={{
                    background: "",
                    width: "100%",
                    height: "100vh",
                    overflow: "auto",
                    mb: 4,
                  
                }}
            >

                    <Typography
                        variant="body1"
                        color="initial"
                        className="!font-bold text-center"
                        sx={{ fontSize: "18px ", color: 'black', ml: "10px" ,mt:5 }}
                    >
                        Add USDT Address
                    </Typography>
             
                {/* <CustomCircularProgress isLoading={isLoading || lodint} /> */}
                <Box>
                    <Box
                        sx={{

                            padding: "10px",
                            width: "95%",
                            margin: "auto",
                            mt: "20px",
                            background: "",
                            borderRadius: "10px",
                            mb: 5,
                        }}
                    >
                        <Box mt={2}>
                            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
                                <Typography
                                    variant="body1"

                                    sx={{ fontSize: "15px ", ml: "10px", color: 'black' }}
                                >
                                    To Ensure  the safety of your funds , please link your wallet
                                </Typography>

                            </Stack>



                            <FormControl fullWidth sx={{ mt: "10px" }}>
                                <Stack direction="row" className="loginlabel">
                                    <Typography variant="" sx={{ color: 'black' }} className="!font-bold">
                                        Select Network 
                                    </Typography>
                                </Stack>
                                <TextField
                                    select
                                    id="usdt_type"
                                    name="usdt_type"
                                    value={fk.values.usdt_type}
                                    onChange={fk.handleChange}
                                    className="withdrawalfield2 !mt-1"
                                    sx={{
                                        background: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: '0px',
                                    }}
                                    InputProps={{
                                        style: {
                                            borderWidth: "1px",
                                            color: "black",
                                            borderRadius: "10px",
                                            border: "none",
                                            padding: '10px !important',
                                            '&>div': { padding: '0px !important', },
                                        },
                                    }}
                                >
                                    <MenuItem value="USDT Bep20">USDT Bep20</MenuItem>
                                    {/* <MenuItem value="USDT.TRC20">USDT.TRC20</MenuItem> */}
                                </TextField>
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: "5px" }} className="!mt-10">
                                <Stack direction="row" className="loginlabel">
                                <Typography variant="" sx={{ color: 'black' }} className="!font-bold">
                                        USDT Address 
                                    </Typography>
                                </Stack>
                                <TextField
                                size="large"
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={fk.values.address}
                                    onChange={fk.handleChange}
                                    placeholder="Please Enter the USDT Address *"
                                    className="withdrawalfield2 !mt-1"
                                />

                            </FormControl>
                            <Button
                                className="!mt-10 !bg-[#F39E2A] !text-white"
                                sx={style.paytmbtntwo}
                                type="submit"
                                onClick={(e) => {
                                    fk.handleSubmit();
                                }}
                            >
                                Save{" "}
                            </Button>
                        </Box>
                    </Box>

                </Box>

            </Container>
        </Layout >
    );
}

export default AddAddressUsdt;

const style = {
    header: {
        padding: "15px 8px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > p": {
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            color: "white",
        },
        "& > a > svg": {
            color: "white",
            fontSize: "35px",
        },
    },
    wthui: {
        textAlign: "center",
        width: "32%",
        minHeight: "15vh",
        background: "#F39E2A",
        borderRadius: "10px",
        mb: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&>div>p": { color: "white" },
    },
    paymentlink: {
        width: "32%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "15vh",
        background: "#F39E2A",
        borderRadius: "10px",
        mb: "10px",
        "&>p": {
            color: "white",
            fontSize: "12px",
            fontWeight: "500",
            textAlign: "center",
            mt: "5px",
        },
    },
    paymentBoxOuter: {
        width: "95%",
        margin: "auto",
        my: "10px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    paytmbtn: {
        mb: 2,
        background: "#F39E2A",
        color: "white !important",
        width: "31%",
        border: "1px solid white",
        padding: "10px",
       
    },
    paytmbtntwo: {
        borderRadius: "5px",
        textTransform: "capitalize",
        mb: 2,
        background: "white",
        color: "",
        width: "100%",
        mt: "20px",
        padding: "10px",
       
    },
    rechargeinstext: {
        mb: "10px",
        alignItems: "center",
        justifyContent: "start",
        "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
    },
};