import { ArrowBackRounded, RuleSharp, Wallet } from "@mui/icons-material";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import { stardarkblue, stargrad } from "../../../shared/color";
import { getSattaType } from "../../../shared/sharedFunction";
import AndarBaharTable from "./AnderBaherGame";
import Jodi from "./LocationGame";
import { useQuery, useQueryClient } from "react-query";
import moment from "moment";
import SattaRule from "./SattaRule";
function Sattagameplay() {
  const location = useLocation();
  const [open2, setOpen2] = useState(false);
  const game_type = location?.state?.satta_type;
  const [value, setValue] = useState(0);
  const client = useQueryClient();
  const [minut, setMinut] = useState(0);
  const [betArray, setBetArray] = useState([
    {
      number: "1000",
      amount: null,
    },
    {
      number: "1001",
      amount: null,
    },
    {
      number: "1002",
      amount: null,
    },
    {
      number: "1003",
      amount: null,
    },
    {
      number: "1004",
      amount: null,
    },
    {
      number: "1005",
      amount: null,
    },
    {
      number: "1006",
      amount: null,
    },
    {
      number: "1007",
      amount: null,
    },
    {
      number: "1008",
      amount: null,
    },
    {
      number: "1009",
      amount: null,
    },
    {
      number: "2000",
      amount: null,
    },
    {
      number: "2001",
      amount: null,
    },
    {
      number: "2002",
      amount: null,
    },
    {
      number: "2003",
      amount: null,
    },
    {
      number: "2004",
      amount: null,
    },
    {
      number: "2005",
      amount: null,
    },
    {
      number: "2006",
      amount: null,
    },
    {
      number: "2007",
      amount: null,
    },
    {
      number: "2008",
      amount: null,
    },
    {
      number: "2009",
      amount: null,
    },
  ]);

  async function placeBet() {
    try {
      betArray?.forEach((i) => {
        if (i?.amount !== null && Number(i?.amount) < 5)
          return toast(
            "Your Amount is less than 5 on " +
            `${Number(i?.number) >= 1000 && Number(i?.number) <= 1009
              ? "Andar"
              : "Bahar"
            } ${Number(i?.number) % 10}`
          );
      });
      const newArrya = betArray?.filter((i) => i?.amount !== null);
      if (newArrya?.length <= 0) return toast("Please choose no.");
      const reqBody = {
        bet_array: JSON.stringify(newArrya),
        satta_type_user: game_type,
      };
      const response = await apiConnectorPost(
        endpoint?.node?.bet_satta,
        reqBody
      );
      toast(response?.data?.msg);
      client.refetchQueries("walletamount");
    } catch (e) {
      toast("Something went wrong", e);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data: wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const newdata = wallet?.data?.data || 0;
  useEffect(() => {
    const timer = setInterval(() => {
      setMinut(moment(Date.now())?.format("mm"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
   
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={style.container}
        >
          <Box sx={{ background: stargrad, py: 2 }}>
            <Box className="w95" sx={style.flexbetween}>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Box component={NavLink} to="/satta/matka">
                  <ArrowBackRounded sx={{ mr: 1, color: "white" }} />
                </Box>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "white" }}
                >
                  {getSattaType?.find((i) => i?.type === game_type)?.name}{" "}
                </Typography>

              </Box>

              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
          <SattaRule setOpen2={setOpen2} open2={open2} style={style} />

              <p className="text-white !mx-2" onClick={() => {
                  setOpen2(true);
                }}> Rule</p>
                <Wallet sx={{ mr: 1, color: "white" }} />
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "white" }}
                >
                  ₹{" "}
                  {Number(
                    Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
                  )?.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", mt: 1 }} className={"!w-[100%]"}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Tab label="Jodi" sx={{ flex: 1, color: "white" }} />
              <Tab label="Andar / Bahar" sx={{ flex: 1, color: "white" }} />
            </Tabs>
            {value === 0 && (
              <Jodi betArray={betArray} setBetArray={setBetArray} />
            )}
            {value === 1 && (
              <AndarBaharTable betArray={betArray} setBetArray={setBetArray} />
            )}
            <Box
              //  className="w95 !fixed !bottom-14 bg-[#0A001B] !py-2 !px-3  !flex !justify-between"

              className="lg:!w-[48%] !w-[100%] !fixed !bottom-14 bg-[#0A001B] !py-2 !px-3  !flex !justify-between"
              sx={style.flexbetween}
            >
              <Box className="">
                <Typography
                  variant="body1"
                  className="fp13"
                  sx={{ color: "white" }}
                >
                  Total Amount:
                </Typography>
                <Typography
                  variant="body1"
                  className="fp18"
                  sx={{ color: "white" }}
                >
                  ₹{" "}
                  {betArray
                    ?.reduce((a, b) => a + Number(b?.amount || 0), 0)
                    ?.toFixed(2) || 0}
                </Typography>
              </Box>
              {!(
                (Number(minut) < 30 && 30 - Number(minut) <= 5) ||
                (Number(minut) > 30 && 60 - Number(minut) <= 5)
              ) && (
                  <Button
                    className="!bg-[#24cc3b] !text-white "
                    onClick={() => placeBet()}
                  >
                    Place Bid
                  </Button>
                )}
            </Box>
          </Box>
        </Container>
   
  );
}

export default Sattagameplay;

const style = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },
  banner: { background: stargrad, padding: "10px 0px" },
  bannerText: { color: "white" },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};
