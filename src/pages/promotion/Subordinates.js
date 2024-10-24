import { ArrowDropDown, KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { Box, Container, Stack, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import dayjs from 'dayjs';
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import { apiConnectorPost } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import Calendar from './Calender';

function Subordinates() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen1, setIsOpen1] = React.useState(false);
    const [loding, setLoading] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(moment(Date.now())?.format("YYYY-MM-DD"));
    const [data, setData] = React.useState(null);
    const [selectedLevel, setSelectedLevel] = React.useState("1");

    const handleLevelSelect = (level) => {
        setSelectedLevel(level.toString());
        setIsOpen(false); // Close the drawer after selecting a level
    };
    const handleDateSelect = (date) => {
        const selected = dayjs(date)?.format("YYYY-MM-DD");
        const today = dayjs().format("YYYY-MM-DD");

        if (dayjs(selected).isAfter(today)) {
            toast.error('Future dates are not allowed. Please select today or an earlier date');
            return;
        }
        setSelectedDate(selected);
        setIsOpen1(false);

        // setSelectedDate(dayjs(date)?.format("YYYY-MM-DD"));

    };

    const reqbody = {
        level_no: Number(selectedLevel) || 0,
        in_date: selectedDate,
    };
    const subordinate_data = async () => {
        setLoading(true);
        try {
            const response = await apiConnectorPost(`${endpoint.subordinate_data}`, reqbody);
            toast(response?.data?.msg, {id:1})
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
        subordinate_data();
    }, [selectedLevel, selectedDate]);

    return (
        <Layout header={false}>
            <Container sx={{ background: "", width: '100%', padding: '10px', }}>
                <CustomCircularProgress isLoading={loding} />
                <Box sx={style.header}>
                    <Box component={NavLink} to='/promotion/'>
                        <KeyboardArrowLeftOutlined sx={{ color: "white" }} />
                    </Box>
                    <Typography variant="body1" sx={{ color: "white" }}>Subordinates Income</Typography>
                    <Typography variant="body1" sx={{ color: "white" }}> </Typography>
                </Box>
                <Stack direction="row" justifyContent={"space-between"} className='!mt-5 !mx-3 ' sx={{ pb: 2 }}>
                    <Box className="!border !w-1/2 !p-2 mr-4 !flex !justify-between "
                     onClick={() => setIsOpen(true)} >
                        Level {selectedLevel}   <ArrowDropDown />
                    </Box>
                    <Box className="!border !w-1/2 !p-2 !flex !justify-between"
                        onClick={() => setIsOpen1(true)}>
                        {selectedDate} <ArrowDropDown />
                    </Box>
                </Stack>
                <Box sx={style.promotionBoxOuter}>
                    <Stack direction="row">

                    </Stack>
                    <Stack direction="row">
                        <Box>
                            <Typography variant="body1" color="initial">
                                {data?.filter(level => level.lev_id === Number(selectedLevel) && Number(level.deposit) > 0).length || 0}
                            </Typography>
                            <Typography className="!text-gray-300">Deposite number</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="initial">
                                {data?.filter(level => level.lev_id === Number(selectedLevel) && Number(level.betting) > 0).length || 0}

                            </Typography>
                            <Typography variant="body1" color="initial">
                                Number of bettors
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row">
                        <Box>
                            <Typography variant="body1" color="initial">
                                {data?.filter((j) => j?.lev_id === Number(selectedLevel))?.reduce((a, b) => a + Number(b?.deposit || 0), 0) || 0}
                            </Typography>
                            <Typography variant="body1" color="initial">
                                Deposit Amount
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="initial">
                                {data?.filter((j) => j?.lev_id === Number(selectedLevel))?.reduce((a, b) => a + Number(b?.betting || 0), 0) || 0}
                            </Typography>
                            <Typography variant="body1" color="initial">
                                Total Bet
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box className="!mb-20 !m-3">

                    {data?.map((item) => {
                        return (<Box sx={{ background: "#F48901", color: "white", borderRadius: '5px', padding: '5px', mb: 2, mt: 2, }}>
                            <Typography className='!border-b !border-white !my-1 !text-xl'>UID : {item?.userid}
                            </Typography>
                            <Box className="!mx-1 ">
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' >Level</Typography>
                                    <Typography className='hunp13' >{item?.lev_id || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' >Deposit Amount</Typography>
                                    <Typography className='hunp13' >{item?.deposit || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' >Bet Amount </Typography>
                                    <Typography className='hunp13' >{item?.betting || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' >Commission </Typography>
                                    <Typography className='hunp13' >{(item?.betting > 0 ? item?.commission : 0) || 0}</Typography>
                                </Stack>

                            </Box>
                        </Box>)
                    })}

                </Box>
                <div 
                className={`drawer ${isOpen ? 'open' : ''} !pb-10`}
                >
                    <div className='!flex justify-between m-5'>
                        <p onClick={() => setIsOpen(false)} className='!cursor-pointer'>Cancel</p>
                        <p className='text-orange-500 !cursor-pointer'  ></p>
                    </div>
                    <div className=" !py-10 !text-center">
                        {[1, 2, 3, 4, 5, 6].map(level => (
                            <p key={level} className='!py-2 !cursor-pointer' onClick={() => handleLevelSelect(level)}>Level {level}</p>
                        ))}
                    </div>
                </div>
                {/* date */}
                <div className={`drawer ${isOpen1 ? 'open' : ''}  px-1`}>
                    <div className='!flex flex-col justify-between my-5'>
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} className="!mt-10" />
                    </div>
                </div>
            </Container >
        </Layout>
    )
}
export default Subordinates;
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
    promotionBoxOuter: {
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        width: "92%",
        background: "#ffffff",
        padding: "10px",
        mt: "20px",
        borderRadius: "5px",
        marginLeft: "2.5%",
        paddingBottom: "15px",
        "&>div:nth-child(2)>div:nth-child(1)": {
            my: "10px",
            borderRight: "1px solid gray",
            width: "50%",
            textAlign: "center",
        },
        "&>div:nth-child(2)>div:nth-child(2)": {
            my: "10px",
            width: "50%",
            textAlign: "center",
        },
        "&>div:nth-child(2)>div>p:nth-child(1)": { color: "black !important" },
        "&>div:nth-child(2)>div>p:nth-child(2)": {
            fontSize: "13px",
            fontWeight: 500,
            color: "grey !important",
        },
        "&>div:nth-child(3)>div:nth-child(1)": {
            my: "10px",
            borderRight: "1px solid gray",
            width: "50%",
            textAlign: "center",
        },
        "&>div:nth-child(3)>div:nth-child(2)": {
            my: "10px",
            width: "50%",
            textAlign: "center",
        },
        "&>div:nth-child(3)>div>p:nth-child(1)": { color: "black !important" },
        "&>div:nth-child(3)>div>p:nth-child(2)": {
            fontSize: "13px",
            fontWeight: 500,
            color: "grey !important",
        },
    },
}