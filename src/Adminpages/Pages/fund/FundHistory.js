import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, TablePagination, TextField } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const FundHistory = () => {
  const [loding, setloding] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [data, setData] = useState([]);
   const [from_date, setFrom_date] = useState();
  const [to_date, setTo_date] = useState();

  const withdrawlRequestFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.get(API_URLS?.get_fund_history);
      setData(res?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    withdrawlRequestFunction();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, data]);

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile No.</span>,
    <span>Type</span>,
    <span>Amount</span>,
    <span>Status</span>,
    <span>Transaction Id</span>,
    <span>Date</span>,
  ];

  const tablerow = visibleRows?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.username}</span>,
      <span>{i?.full_name}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.Deposit_type}</span>,
      <span>{Number(i?.tr15_amt)?.toFixed(2)}</span>,
      <span className="text-green-800">{i?.tr15_status}</span>,
      <span>{i?.tr15_trans}</span>,
      <span>{moment(i?.tr15_date)?.format("YYYY-MM-DD")}</span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
        <span className="font-bold">From:</span>
        <TextField
          type="date"
         
          value={from_date}
          onChange={(e) => setFrom_date(e.target.value)}
        />
        <span className="font-bold">To:</span>
        <TextField
          type="date"
         
          value={to_date}
          onChange={(e) => setTo_date(e.target.value)}
        />
        <Button
          onClick={() => withdrawlRequestFunction()}
          variant="contained"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <TablePagination
        rowsPerPageOptions={[8, 10, 20, 50]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default FundHistory;