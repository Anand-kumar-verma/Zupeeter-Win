import React from "react";
import Layout from "../../component/layout/Layout";
import { Box, Container, Drawer, Stack, Typography } from "@mui/material";
import theme from "../../utils/theme";
import {  ArrowDropDown, ExpandMore } from "@mui/icons-material";
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from "react-router-dom";
import Calendar from "./Calender";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import moment from "moment";
import { endpoint } from "../../services/urls";
import { apiConnectorPost } from "../../services/apiconnector";



const MyCommission = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(moment(Date.now())?.format("YYYY-MM-DD"));
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleDateSelect = (date) => {
        const selected = dayjs(date)?.format("YYYY-MM-DD");
        const today = dayjs().format("YYYY-MM-DD");

        if (dayjs(selected).isAfter(today)) {
            toast.error('Future dates are not allowed. Please select today or an earlier date');
            return;
        }
        setSelectedDate(selected);
        setIsOpen(false);

        // setSelectedDate(dayjs(date)?.format("YYYY-MM-DD"));

    };

    const fetchData = async () => {
        setLoading(true);
        const reqbody = {
            in_date: selectedDate,
        };
        try {
            const response = await apiConnectorPost(`${endpoint.commission_data}`, reqbody);
            if (response?.data?.msg === "Data get successfully") {
                setData(response.data?.data);
            } else {
                toast.error('Data not found');
            }
        } catch (e) {
            toast.error(e?.message || 'An error occurred');
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, [selectedDate]);

    return <>

        <Layout header={false}>
            <Container
                sx={{
                    width: "100%",
                    height: "100vh",
                    overflow: "auto",

                }}
            >
                <Box sx={style.header}>
                    <Typography variant="body1" color="initial">
                    <NavLink to="/promotion">
          <Box component="img" src={backbtn} width={25}></Box>
        </NavLink>
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-white">
                        Commission Income
                    </Typography>
                    <Box >

                    </Box>
                </Box>
                <Stack direction="row" justifyContent={"space-between"} className='!mt-5 !mx-3 ' sx={{ pb: 2 }}>
                    <Box className="!border !w-1/2 !p-2 !flex !justify-between"
                        onClick={() => setIsOpen(true)}>
                        {selectedDate} <ArrowDropDown />
                    </Box>
                </Stack>
                {data?.map((item) => {
                    return <div className="flex flex-col justify-center gap-1 mt-5 !mb-20 m-2" >

                        <div className="flex flex-col   justify-center shadow-xl rounded-lg    p-3" style={{ background: "#F48901", color: "white", }}>
                            <p className='' >Settlement successfully </p>
                            <p className='' >{item?.satelment_date || 0}</p>
                            The commission has been automatically credited to your balance
                        </div>
                        <div className="flex justify-between shadow-xl  rounded-lg    p-3" style={{ background: "#F48901", color: "white", }}>
                            <p className='' >Number of bettors</p>
                            <p className='font-bold'>{item?.num_of_betters || 0}</p>
                        </div>
                        <div className="flex justify-between shadow-xl  rounded-lg    p-3" style={{ background: "#F48901", color: "white", }}>
                            <p className='' >Bet Amount</p>
                            <p className='font-bold'>{item?.better_amount || 0}</p>
                        </div>
                        <div className="flex justify-between shadow-xl  rounded-lg    p-3" style={{ background: "#F48901", color: "white", }}>
                            <p className='' >Commission Payout</p>
                            <p className='font-bold'>{item?.total_commission_user || 0}</p>
                        </div>
                        <div className="flex justify-between shadow-xl  rounded-lg    p-3" style={{ background: "#F48901", color: "white", }}>
                            <p className='' >Date</p>
                            <p className='font-bold'>{item?.clossing_date || 0}</p>
                        </div>
                    </div>
                })}
            </Container>
        </Layout>
        <div className={`drawer ${isOpen ? 'open' : ''}  px-1`}>
                    <div className='!flex flex-col justify-between my-5'>
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} className="!mt-10" />
                    </div>
                </div>
    </>
}
export default MyCommission;
const style = {
    header: {
        padding: 1,
        background: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > p": {
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            color: "white",
        },
    },
}