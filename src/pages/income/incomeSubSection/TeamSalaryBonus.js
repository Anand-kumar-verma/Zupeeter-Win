import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";
import Layout from "../../../component/layout/Layout";
import scratch from "../../../assets/Capture.PNG"
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import { registrationBonusFn } from "../../../services/apiCallings";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import toast from "react-hot-toast";
import ScratchCard from "./ScratchCard";
import { Close } from "@mui/icons-material";
const zubgback = "#F48901"
const zubgmid = "#F48901"
const zubgbackgrad = "#F48901"

function TeamSalaryBonus() {
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openGift, setOpenGift] = React.useState(false);
  const [scratched, setScratched] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const client = useQueryClient();
  const handleScratch = () => {
    setScratched(true);
  };

  const ClaimIncomeFn = async (id ,amnt) => {
    setAmount(amnt)
    try {
      const response = await apiConnectorGet(
        `${endpoint.get_claim_card}?t_id=${id}`
      );
      toast(response?.data?.msg, { id: 1 });
      if (response?.data?.msg === "Claim Accepeted Successfully.") {
        setOpenGift(true);

        client.refetchQueries("get_card_list");
        client.refetchQueries("wallet_amount_amount");
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };


  const { isLoading, data } = useQuery(
    ["get_card_list"],
    () => apiConnectorGet(endpoint?.get_card),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const res = data?.data?.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      res?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, res]);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOpenGift(false);
  //   }, 10000); 
  //   return () => clearTimeout(timer);
  // }, []);


  if (!isLoading && !res)
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
            <p>Scrached Coupon</p>
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
          <p>Scrached Coupon</p>
        </Box>
        <div className="!overflow-x-auto" style={{ width: "95%", marginLeft: '2.5%', marginTop: '16px', }}>
          <Table sx={{ background: "#F48901", boxShadow: "#fff" }}>
            <TableHead>
              <TableRow className="!h-10" >
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-sm !border-r  !text-center !border-b !border-white" id="tablepadding">S.No</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-sm !border-r !text-center  !border-b !border-white" id="tablepadding">Date/Time</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-sm !border-r !text-center  !border-b !border-white" id="tablepadding">Coupon</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-sm !border-r !text-center  !border-b !border-white" id="tablepadding">Amount</TableCell>
                <TableCell sx={{ color: 'white' }} className=" !font-bold !border !text-sm !border-r !text-center  !border-b !border-white" id="tablepadding">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((i, index) => (
                <TableRow key={i?.id}>
                  <TableCell sx={{ color: 'white', padding: '10px !important' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{index + 1}</TableCell>
                  <TableCell sx={{ color: 'white', padding: '10px !important' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">
                    {moment(i?.created_at).format("DD-MM-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', padding: '10px !important' }} className=" !border !border-r !text-xs !text-center  !border-b !border-white"
                    onClick={() => i?.is_screached === 0 && ClaimIncomeFn(i?.id , i?.coupon_amount)}
                  ><span className="">
                      {i?.is_screached === 0 ?
                        <Button className="!text-white !bg-green-400 !h-6">
                          Claim
                        </Button> : "Achived"}</span></TableCell>
                  <TableCell sx={{ color: 'white', padding: '10px !important' }} className="!border !border-r !text-xs !text-center !border-b !border-white" >  {i?.is_screached === 0
                    ?
                    "Pending" : <span>{i?.coupon_amount}</span>} </TableCell>
                  <TableCell  sx={{ color: 'white', padding: '10px !important' }} className="!border !border-r !text-xs !text-center !border-b !border-white">{i?.coupon_code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {openGift && (
                    <div className="dialog">
                      <ScratchCard
                        width={300}
                        height={180}
                        imageSrc={scratch}
                        onScratch={handleScratch}
                        message={<div>🎁 Congratulations! You  <br/>
                       have 🎉 won <br/>{amount}</div>}
                      />
                      <Close onClick={() => setOpenGift(false)}/>
                    </div>
                  )}
          <Box className="paginationTable ">
            <TablePagination
              sx={{
                background: "#F48901",
                color: "white",
                borderRadius: "10px",
                marginTop: "10px",
                mb: 10,
              }}
              rowsPerPageOptions={[10, 15, 25, 35]}
              component="div"
              count={res?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows"
            />
          </Box>
        </div>
      </Container>
    </Layout>
  );
}

export default TeamSalaryBonus;

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


