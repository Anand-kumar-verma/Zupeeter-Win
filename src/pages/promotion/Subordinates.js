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
    const toggleDrawer = () => { setIsOpen(!isOpen); }
    const toggleDrawer1 = () => { setIsOpen1(!isOpen1); };

    const handleDateSelect = (date) => {
        const selected = dayjs(date)?.format("YYYY-MM-DD");
        const today = dayjs().format("YYYY-MM-DD");

        if (dayjs(selected).isAfter(today)) {
            toast.error('Future dates are not allowed. Please select today or an earlier date');
            return;
        }

        setSelectedDate(selected);

        // setSelectedDate(dayjs(date)?.format("YYYY-MM-DD"));

    };

    const login_data =
        (localStorage.getItem("logindataen") &&
            CryptoJS.AES.decrypt(
                localStorage.getItem("logindataen"),
                "anand"
            )?.toString(CryptoJS.enc.Utf8)) ||
        null;
    const user_id = login_data && JSON.parse(login_data)?.UserID;

    const reqbody = {
        level_no: Number(selectedLevel) || 0,
        in_date: selectedDate,
    };
    const subordinate_data = async () => {
        setLoading(true);
        try {
            const response = await apiConnectorPost(`${endpoint.subordinate_data}`, reqbody);
            toast(response?.data?.msg, [-1])
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
    }, [selectedLevel, selectedDate, user_id]);

    return (
        <Layout header={false}>
            <Container sx={{ background: "#F48901", width: '100%', padding: '10px', }}>
                <CustomCircularProgress isLoading={loding} />
                <Box sx={style.header}>
                    <Box component={NavLink} to='/promotion/'>
                        <KeyboardArrowLeftOutlined sx={{ color: "white" }} />
                    </Box>
                    <Typography variant="body1" sx={{ color: "white" }}>Subordinates Income</Typography>
                    <Typography variant="body1" sx={{ color: "white" }}> </Typography>
                </Box>
                <Stack direction="row" justifyContent={"space-between"} className='!mt-5 !mx-3 ' sx={{ pb: 2 }}>
                    <Box className="!border !w-1/2 !p-2 mr-4 !flex !justify-between " sx={{ color: 'white' }}
                        onClick={toggleDrawer} >
                        Level {selectedLevel}   <ArrowDropDown />
                    </Box>
                    <Box className="!border !w-1/2 !p-2 !flex !justify-between" sx={{ color: 'white' }}
                        onClick={toggleDrawer1}>
                        {selectedDate} <ArrowDropDown />
                    </Box>
                </Stack>
                <Box sx={style.subcordinateBox} className="!mb-20">

                    <Box sx={style.boxStyles}>
                        <Box sx={style.innerBoxStyles}>
                            <Box sx={style.subcordinatelist}>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'white' }}

                                >
                                    {data?.filter(level => level.lev_id === Number(selectedLevel) && Number(level.deposit) > 0).length || 0}

                                </Typography>
                                <Typography
                                    variant="body1">
                                    Deposite number
                                </Typography>
                            </Box>
                            <Box sx={style.subcordinatelist}>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'white' }}>
                                    {data?.filter(level => level.lev_id === Number(selectedLevel) && Number(level.betting) > 0).length || 0}
                                </Typography>
                                <Typography
                                    variant="body1" >
                                    Number of bettors
                                </Typography>
                            </Box>

                        </Box>

                        <Box sx={style.innerBoxStylestwo}>
                            <Box sx={style.subcordinatelist}>
                                <Typography variant="body1"
                                    sx={{ color: 'white' }}>
                                    {data?.filter((j) => j?.lev_id === Number(selectedLevel))?.reduce((a, b) => a + Number(b?.deposit || 0), 0) || 0}

                                </Typography>
                                <Typography variant="body1" >

                                    Deposit amount
                                </Typography>
                            </Box>
                            <Box sx={style.subcordinatelist}>
                                <Typography variant="body1"
                                    sx={{ color: 'white' }} >
                                    {data?.filter((j) => j?.lev_id === Number(selectedLevel))?.reduce((a, b) => a + Number(b?.betting || 0), 0) || 0}
                                </Typography>
                                <Typography variant="body1" >

                                    Total Bet
                                </Typography>
                            </Box>

                        </Box>
                    </Box>
                    {data?.map((item) => {
                        return (<Box sx={{ background: "#F48901", borderRadius: '5px', padding: '5px', mb: 2, mt: 2, }}>
                            <Typography sx={{ color: 'black' }} className='!border-b !border-gray-400 !my-1 !text-xl'>UID : {item?.userid}
                            </Typography>
                            <Box className="!mx-1 !text-gray-500">
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' sx={{ color: 'black' }}>Level</Typography>
                                    <Typography className='hunp13' sx={{ color: 'black' }}>{item?.lev_id || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' sx={{ color: 'black' }}>Deposit Amount</Typography>
                                    <Typography className='hunp13' sx={{ color: 'black' }}>{item?.deposit || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' sx={{ color: 'black' }}>Bet Amount </Typography>
                                    <Typography className='hunp13' sx={{ color: 'black' }}>{item?.betting || 0}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Typography className='hunp15' sx={{ color: 'black' }}>Commission </Typography>
                                    <Typography className='hunp13' sx={{ color: 'black' }}>{(item?.betting > 0 ? item?.commission:0) || 0}</Typography>
                                </Stack>

                            </Box>
                        </Box>)
                    })}

                </Box>
                <div className={`drawer ${isOpen ? 'open' : ''} !pb-10`}>
                    <div className='!flex justify-between m-5'>
                        <p onClick={toggleDrawer} className='!cursor-pointer'>Cancel</p>
                        <p className='text-orange-500 !cursor-pointer' onClick={toggleDrawer} >Confirm</p>
                    </div>
                    <div className=" !py-10  !text-center">
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('1')}>Level 1</p>
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('2')}>Level 2</p>
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('3')}>Level 3</p>
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('4')}>Level 4</p>
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('5')}>Level 5</p>
                        <p className='!py-2 !cursor-pointer'
                            onClick={() => setSelectedLevel('6')}>Level 6</p>
                    </div>
                </div>
                {/* date */}
                <div className={`drawer ${isOpen1 ? 'open' : ''} !pb-20 px-1`}>
                    <div className='!flex flex-col justify-between my-5'>
                        <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} className="!mt-10" />

                        <div className='!flex justify-between px-5'>
                            <p className=' !cursor-pointer' onClick={toggleDrawer1} >Cancel</p>
                            <p className='text-orange-500 !cursor-pointer' onClick={toggleDrawer1} >Confirm</p>
                        </div>
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
}