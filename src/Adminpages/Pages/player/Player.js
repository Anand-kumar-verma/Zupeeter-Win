import { FilterAlt } from "@mui/icons-material";
import { Button, Switch, TablePagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const Player = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);

  const userListFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.user_list, {
        start_date: from_date,
        end_date: to_date,
        search: search,
      });
      setData(res?.data?.data || []);
      if (res) {
        setTo_date("");
        setFrom_date("");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    userListFunction();
  }, []);

  const changePlayerStatusFunction = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${API_URLS?.update_user_status}?u_id=${id}`
      );
      toast.success(res?.data?.msg);
      if (res) userListFunction();
    } catch (e) {
      console.log(e);
    }
  };
  const tablehead = [
    <span>Id</span>,
    <span>Name</span>,
    <span>User Id</span>,
    <span>Sponsor Id</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Password</span>,
    <span>Wallet</span>,
    <span>Winning Wallet</span>,
    <span>Active/Deactive</span>,
    <span>Total Deposit</span>,
    <span>Total Withdrawal</span>,
    <span>Yesterday Income</span>,
    <span>Direct Reg.</span>,
    <span>Team Reg.</span>,
    <span>Bet</span>,
    <span>Total Bet</span>,
    <span>Status</span>,
  ];

  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.full_name}</span>,
      <span>{i?.username}</span>,
      <span>{i?.spon_id}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.email}</span>,
      <span>{i?.password}</span>,
      <span>{i?.wallet}</span>,
      <span>{i?.winning_wallet}</span>,
      <span>{String(i?.status) === "1" ? "Active" : "Inactive"}</span>,
      <span>{i?.total_payin}</span>,
      <span>{i?.total_payout}</span>,
      <span>{i?.yesterday_income}</span>,
      <span>{i?.direct_reg}</span>,
      <span>{i?.team_reg}</span>,
      <span>{i?.need_to_bet}</span>,
      <span>{i?.total_betting_by_user}</span>,
      <span>
        <Switch
          className="!text-green-500"
          onClick={() => {
            changePlayerStatusFunction(i?.id);
          }}
          checked={String(i?.status) === "1" ? true : false}
        />
      </span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 gap-5 !justify-start py-2">
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
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => userListFunction()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
      </div>
      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={loding} />
    </div>
  );
};

export default Player;
