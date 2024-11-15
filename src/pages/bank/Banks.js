import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Stack,
  Typography
} from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
// import { withdrawAmountSchemaValidaton } from "../../../Shared/Validation";

import moment from "moment/moment";
import Layout from "../../component/layout/Layout";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";

function BankList() {

  const { data } = useQuery(
    ["bank_list_details"],
    () => apiConnectorGet(endpoint?.user_bank_details),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const result = React.useMemo(() => data?.data?.data, [data]);

  return (
    <Layout header={false}>
      <Container
        className="no-scrollbar"
        sx={{
          background: "white",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 6,
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} to="/bank">
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography >
            Bank Details
          </Typography>
          <Box

          >

          </Box>
        </Box>
        {result?.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                mb: 2,
                padding: "10px",
                borderRadius: "10px",
                background: "#fff",
                width: "92%",
                margin: "auto",
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  paddingBottom: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #efefef",
                }}
              >
                <Box>
                  <Typography
                    className="!bg-orange-400 !text-white rounded px-2 py-1 !flex justify-center"
                  >
                    Bank List
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "#888",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    // color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  Account Number
                </Typography>
                <Typography sx={{
                  color: "#888",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                  {i?.account}

                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  Bank Name
                </Typography>
                <Typography >
                  {i?.bank_name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  Account Holder Name
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&>p:nth-child(1)": {
                      color: "#888",
                      fontSize: "13px",
                      fontWeight: "600",
                      py: 1,
                    },
                    "&>p:nth-child(2)": {
                      // color: theme.palette.primary.main,
                      fontSize: "13px",
                      fontWeight: "600",
                    },
                  }}
                >
                  <Typography >
                    {i?.holder_name}
                  </Typography>

                </Stack>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    // color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  Mobile Number
                </Typography>
                <Typography
                  sx={{
                    color: "#888",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}>
                  {/* ₹ */}
                  {i?.mobile}

                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  IFSC
                </Typography>
                <Typography >
                  {i?.ifsc}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography >
                  Time
                </Typography>
                <Typography

                  color="initial"
                  className="!text-green-500"
                >
                  {moment(i?.created_at)?.format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </Stack>

            </Box>
          );
        })}
      </Container>
    </Layout>
  );
}

export default BankList;

const style = {
  header: {
    color: "white !important",
    padding: "10px 8px",
    background: "#F48901",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
    },
    "& > a > svg": {
      fontSize: "35px",
    },
  },
  wdbtn: {
    width: "95% !important",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    // width: "100%",
    background:
      "#F48901",
    backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
  },
};
