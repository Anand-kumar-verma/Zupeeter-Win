import { Accordion, AccordionDetails, AccordionSummary, Box, Container } from "@mui/material";
import "jspdf-autotable";
import * as React from "react";
import { useQuery } from "react-query";
import Layout from "../../component/layout/Layout";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint, zubgback } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { ArrowDownwardOutlined, KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
export default function Tables() {
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
        <Box>
        <Box sx={style.header}>
          <Box component={NavLink} onClick={()=>navigate('/promotion')}>
            <KeyboardArrowLeftOutlined />
          </Box>
          <p className="!font-bold !text-xl"> Team Data</p>
        </Box>
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#F48901", color: "white", mt: 2 }}
              className="!rounded-lg"
            >
              <div className="w-full grid grid-cols-3 pr-2">
                <span className="">Levels</span>
                <p className="">Members</p>
                <p className="">Deposit Amount</p>
              </div>
            </AccordionSummary>
          </Accordion>
        }
        {[1, 2, 3, 4, 5, 6]?.map((i) => {
          return (
            <Box
              sx={{
                width: "95%",
                margin: "10px 2.5% 10px 2.5%",
                borderRadius: "5px",
              }}
            >
              <Accordion className="!rounded-lg">
                <AccordionSummary
                  expandIcon={<ArrowDownwardOutlined className="!text-white" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    background: theme.palette.primary.light,
                    color: "white",
                    borderRadius: "0px",
                  }}
                >
                  <div className="w-full grid grid-cols-3 pr-2">
                    <span className="">Level: {i}</span>
                    <p className="">
                      {result?.filter((j) => j?.LEVEL === i)?.length}
                    </p>
                    <p className="">
                  
                      <span className="text-green-200">
                        {result
                          ?.filter((j) => j?.LEVEL === i)
                          ?.reduce(
                            (a, b) => a + Number(b?.deposit_amount || 0),
                            0
                          ) || 0}
                      </span>{" "}
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background:"white",
                    color: "white",
                  }}
                >
                  <Box>
                    <Box sx={style.accordian}>
                      <div
                        style={{ color: "black" }}
                        className="!grid !grid-cols-6"
                      >
                        <span className="!text-center">S.No.</span>
                        <span className="!col-span-3 !text-center">User Id</span>
                        <span className="!text-center !col-span-2">Name</span>
                      </div>
                      <div className="h-[2px] w-full "></div>
                      {result
                        ?.filter((j) => j?.LEVEL === i)
                        ?.map((i, index) => {
                          return (
                            <div
                              style={{
                                color: "white",
                                background: "#F48901",
                                color: "white",
                                borderRadius: "5px",
                                padding: "10px 20px",
                              }}
                              className="!grid !grid-cols-6  "
                            >
                              <span>{index + 1}</span>
                              <span className="!col-span-3">
                                {i?.username || "No data found"}
                              </span>
                              <span className="!col-span-2">
                                {i?.full_name || "No data found"}
                              </span>
                            </div>
                          );
                        })}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
        </Box>
      </Container>
    </Layout>
  );
}
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
  accordian: {
    backgroundColor: "zubgwhite",
    "&>div": { mb: 1 },
    "&>div>div:nth-child(1)": {
      borderRight: "1px solid black",
    },
    "&>div>div:nth-child(2)": {},
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
}