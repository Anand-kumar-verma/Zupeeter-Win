
import { CopyAll, GroupAddRounded } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import a1 from "../../assets/images/a1.png";
import b1 from "../../assets/images/b1.png";
import c1 from "../../assets/images/c1.png";
import dep from "../../assets/images/dep.png";
import depo from "../../assets/images/depo.png";
import f1 from "../../assets/images/f1.png";
import l1 from "../../assets/images/l1.png";
import n1 from "../../assets/images/n1.png";
import s1 from "../../assets/images/s1.png";
import vip from "../../assets/images/vip.png";
import wal from "../../assets/images/wal.png";
import wih from "../../assets/images/with.png";
import wit from "../../assets/images/witt.png";
import zp from "../../assets/zptoken.png";
import Layout from "../../component/layout/Layout";
import { ProfileDataFunction, logOutFunction } from "../../services/apiCallings";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";
import ImageSelectorModal from "./ImageSelectorModal";
import CustomDate from "../../shared/CustomiztionDate/CustomDate";

function Account() {
  const userData = deCryptData(localStorage.getItem("user_id"));
  const isAuthenticated = userData ? true : false;
  const or_m_user_type = deCryptData(localStorage.getItem("or_m_user_type"))
  const navigate = useNavigate();
  const [opend, setOpend] = useState(false);
  const [selectedImages, setselectedImages] = useState("");
  const images = [
    "https://mui.com/static/images/avatar/2.jpg",
    "https://mui.com/static/images/avatar/3.jpg",
    "https://mui.com/static/images/avatar/4.jpg",
    "https://mui.com/static/images/avatar/1.jpg",
    "https://mui.com/static/images/avatar/5.jpg"
  ];
  const { isLoading, data } = useQuery(["profile"], () => ProfileDataFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const profile = data?.data?.data || [];



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


  return (
    <Layout header={false}>
      <Container>
        <CustomCircularProgress isLoading={isLoading} />
        <Box
          sx={{
            padding: 1,
            background:
              "linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)",
            px: 2,
          }}
        >
          <Box className="flex justify-start items-center gap-1 ">
            <Typography className=" !mt-10 !mr-1"
            // onClick={() => setOpend(true)}
            >
              <img src={"https://mui.com/static/images/avatar/2.jpg"} alt="" className='!rounded-full  w-[72px] h-[72px]' />
              {/* <BorderColor fontSize="small" className="!text-white !-mt-10 !ml-10 !rounded-full !bg-gray-400  " /> */}
            </Typography>
            <ImageSelectorModal
              setOpend={setOpend}
              setselectedImages={setselectedImages}
              open={opend}
              onClose={() => setOpend(false)}
              images={images} />
            <Box className="flex flex-col gap-1">
              <Box className="flex justify-start items-center">
                <Typography className="!mt-5 !font-bold text-white">{profile?.full_name}</Typography>
                <Typography>
                  <img src={vip} alt="" className=" w-10 mt-6" />
                </Typography>
              </Box>
              <Box className="bg-gray-600 !w-fit h-6 rounded-full p-1   realtive !left-40 flex gap-3 justify-center">
                <Typography className="text-white !text-xs">UID </Typography>
                <Typography className="text-white !text-xs">| </Typography>
                <Typography className="text-white !text-xs">{profile?.username} <CopyAll fontSize="small" /> </Typography>
              </Box>
              <Typography className="text-white !text-xs">{profile?.is_company_promotor === 1 ? <p>Company Promoter</p> : ""} </Typography>
             


            </Box>

          </Box>
          <Box className="bg-white shadow-xl rounded-lg py-5 relative top-8">
            <Typography className="!text-gray-500 px-3">Total Balance</Typography>
            <Typography className="!font-bold px-3">   ₹
              {(
                Number(
                  Number(wallet_amount_data?.winning || 0) + Number(wallet_amount_data?.wallet || 0)
                ) || 0
              )?.toFixed(2)}{" "}
            </Typography>
            <Box className="flex justify-center gap-8 pt-5">
              <NavLink to="/wallet">
                <Box className="flex flex-col justify-center items-center">
                  <Typography><img src={wal} alt="" className="w-8" /></Typography>
                  <Typography>Wallet</Typography>
                </Box>
              </NavLink>


              <Box className="flex cursor-pointer flex-col justify-center items-center"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/deposit');
                  }
                }}>
                <Typography> <img src={dep} alt="" className="w-8" /> </Typography>
                <Typography> Deposit</Typography>
              </Box>
              <Box className="flex cursor-pointer flex-col justify-center items-center"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/withdraw');
                  }
                }}>
                <Typography><img src={wih} alt="" className="w-8" /></Typography>
                <Typography>Withdraw</Typography>
              </Box>
              <Box className="flex flex-col justify-center cursor-pointer items-center"
                onClick={() => {
                  if (or_m_user_type === "Dummy User") {
                    toast("Dummy User");
                  } else {
                    navigate('/deposit');
                  }
                }}>
                <Typography><img src={zp} alt="" className="w-8" /></Typography>
                <Typography className="">ZP</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="grid grid-cols-2 gap-3 m-4  !my-8">
          <Box className="flex gap-1 p-1 py-4 cursor-pointer justify-center items-center shadow-xl bg-white rounded-lg"
            onClick={() => {
              if (or_m_user_type === "Dummy User") {
                toast("Dummy User");
              } else {
                navigate('/depositehistory');
              }
            }}>
            <Typography><img src={depo} alt="" className="w-10" /></Typography>
            <Typography>Deposit <br /><span className="!text-xs !text-gray-500"> My Deposit history</span></Typography>
          </Box>
          <Box className="flex gap-1 p-1 py-4 justify-center items-center cursor-pointer shadow-xl bg-white rounded-lg"
            onClick={() => {
              if (or_m_user_type === "Dummy User") {
                toast("Dummy User");
              } else {
                navigate('/withdrawlhistory');
              }
            }}>
            <Typography><img src={wit} alt="" className="w-10" /></Typography>
            <Typography>Withdraw <br /><span className="!text-xs !text-gray-500"> My Withdraw history</span></Typography>
          </Box>

        </Box>
        <p className="flex justify-center gap-2 border-b-2 p-2 m-3 py-5"
          onClick={() => navigate("/account/Teamincome")}
        >
          <Typography> <GroupAddRounded className="text-[#F48901] !mt-1" /></Typography>
          <Typography className="!mt-1 !text-lg text-gray-700 cursor-pointer"> Team/Income</Typography>
        </p>

        <Box className="bg-white shadow-xl rounded-lg !m-3 py-5">
          <Typography className=" px-3">Service Center</Typography>
          <Box className="grid grid-cols-3 m-5 justify-center gap-5">
            <Box className="flex flex-col justify-center items-center m-2">
              <Typography><img src={s1} alt="" className="w-8 " /></Typography>
              <Typography className="!text-sm">Settings</Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography><img src={f1} alt="" className="w-8 " /></Typography>
              <Typography className="!text-sm">Feedback</Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography><img src={n1} alt="" className="w-8 " /></Typography>
              <Typography className="!text-sm">Notification</Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography><img src={c1} alt="" className="w-8 " /></Typography>
              <Typography className=" !text-sm ml-2"> Service</Typography>
            </Box>
            {isAuthenticated && (userData.user_type === "Admin" || userData.user_type === "Super Admin") &&
              <Box className="flex flex-col justify-center items-center" onClick={() => navigate('/admindashboard')}>
                <Typography><img src={b1} alt="" className="w-8 " /></Typography>
                <Typography className=" !text-sm"> Admin</Typography>
              </Box>}
            <Box className="flex flex-col justify-center items-center">
              <Typography><img src={a1} alt="" className="w-8 " /></Typography>
              <Typography className="!text-sm">About us</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="!flex !gap-1 !justify-center m-5 text-gray-500   p-1 bg-white shadow-2xl rounded-full  border border-gray-600">
          <img src={l1} alt="" className="w-5 !mt-1" />
          <button className=""
            onClick={() => logOutFunction()}>
            Logout
          </button>
        </Box>
      </Container>
    </Layout>
  );
}

export default Account;

