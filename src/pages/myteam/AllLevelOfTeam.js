import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import nodatafoundimage from "../../assets/images/nodatafoundimage.png";
import Layout from "../../component/layout/Layout";
import { MyTeamLevel, registrationBonusFn } from "../../services/apiCallings";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";

const zubgback = "#F48901";
const zubgmid = "#F48901";
const zubgbackgrad = "#F48901";
function AllLevelOfTeam() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useQuery(
    ["get_level"],
    () => apiConnectorGet(endpoint?.get_level),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const result = data?.data?.data;

  if (!isLoading && !result)
    return (
      <Layout>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            overflow: "auto",
            mb: 5,
          }}
        >
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p> Subordinate data</p>
          </Box>
          <div>
            <img className="" src={nodatafoundimage} />
          </div>
        </Container>
      </Layout>
    );
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
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <p className="!font-bold !text-xl"> Subordinate Data</p>
        </Box>
        <Box >
          <Box
            className="!mb-10"
            sx={{
              background: "white",
              boxShadow: "#fff",

              padding: "20px 16px",
              "&>div": { mb: 1 },
              "&>div>div:nth-child(1)": {
                borderRight: "1px solid black",
                width: "50%",
                textAlign: "center",
              },
              "&>div>div:nth-child(2)": { width: "50%", textAlign: "center" },
              "&>div>div>p": {
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          >
            <div style={{ paddingTop: '16px', color: "white", background: "#F48901", padding: '10px', borderRadius: '5px' }} className="!grid !grid-cols-6   !place-items-center ">
              <span>S.No.</span>
              {/* <span>User Id</span> */}
              <span className="!col-span-2">Name</span>
              <span className="!col-span-2">Mobile No</span>
            </div>
            {result?.filter((j) => j?.LEVEL === 1)?.map((i, index) => {
              return (
                <div style={{ color: 'white', background: "#F48901", color: 'white', borderRadius: '5px', padding: '10px 20px', }} className="!grid !grid-cols-6   !place-items-center">
                  <span >{index + 1}</span>
                  {/* <span>{i?.username}</span> */}
                  <span className="!text-center !col-span-2">{i?.full_name || "No data found"}</span>
                  <span className="!col-span-2">{i?.mobile || "987654210"}</span>
                </div>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default AllLevelOfTeam;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
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
    background: zubgmid,
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
    background: zubgmid,
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
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
