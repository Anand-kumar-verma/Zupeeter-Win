import { Box, Container } from "@mui/material";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../../component/layout/Layout";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint, zubgback } from "../../../services/urls";

const QRScreen = ({ deposit_req_data, OrderData }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account");
    }, 120000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const callback = async () => {
    try {
      const res = await apiConnectorGet(endpoint.call_back_url + `?order_id=${OrderData}`)
      if (res?.data?.data?.tr15_status !== "Pending")
        navigate("/account");
    }
    catch (e) {
      toast("something went wrong")
    }
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      callback()
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  return (
    <Layout footer={false}>
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
          <p className="!text-center">My QR Code</p>
        </Box>
        <div className="!text-black !bg-white !flex !flex-col justify-center items-center no-scrollbar">
          <img
            className="!h-2/3 !w-2/3 "
            src="https://i.pinimg.com/originals/e4/af/9f/e4af9f0025a8ce68bee2cf5a1360a501.gif"
            alt="QR Loader"
          />
          <div className="!bg-white ">
            <iframe
              src={deposit_req_data}
              className="!h-[650px] !w-[100%]"
              title="QR Code Frame"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default QRScreen;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
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
};
