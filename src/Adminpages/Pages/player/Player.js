import { Edit, FilterAlt } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getComparator } from "../../../services/sortingFunctoins";
const Player = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);
  const [to_amount, setTo_amount] = useState("");
  const [from_amount, setFrom_amount] = useState("");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("total_amount");

  const fk = useFormik({
    initialValues: {
      user_name: "",
      user_id: "",
    },
  });

  const userListFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.user_list, {
        start_date: from_date,
        end_date: to_date,
        search: search,
        to_amount: to_amount,
        from_amount: from_amount,
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

  useEffect(() => {}, []);
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

  const UpdatePlayerFn = async () => {
    try {
      const req = {
        u_user_id: currentUser.id,
        u_user_name: fk.values.user_name,
      };
      const res = await axiosInstance.post(
        `${API_URLS?.update_user_name}`,
        req
      );
      toast.success(res?.data?.msg);
      userListFunction();
      setOpen(false);
    } catch (e) {
      toast.error("Failed to update name");
      console.log(e);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(() => {
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  const tablehead = [
    <span key={"id"}>Id</span>,
    <span>Action</span>,
    <span>
      Name{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "full_name")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>User Id</span>,
    <span>Sponsor Id</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Password</span>,
    <span>
      Wallet{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "wallet")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Winning Wallet{" "}
      <IconButton
        onClick={(event) => handleRequestSort(event, "winning_wallet")}
      >
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Total{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "total_amount")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>Active/Deactive</span>,
    <span>
      Total Deposit{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "total_payin")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Total Withdrawal{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "total_payout")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>Type</span>,
    <span>
      Yesterday Income{" "}
      <IconButton
        onClick={(event) => handleRequestSort(event, "yesterday_income")}
      >
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Direct Reg.{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "direct_reg")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Team Reg.{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "team_reg")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Bet{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "need_to_bet")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Total Bet{" "}
      <IconButton
        onClick={(event) => handleRequestSort(event, "total_betting_by_user")}
      >
        <FilterAltIcon />
      </IconButton>
    </span>,
    <span>
      Status{" "}
      <IconButton onClick={(event) => handleRequestSort(event, "status")}>
        <FilterAltIcon />
      </IconButton>
    </span>,
  ];

  const tablerow = visibleRows?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>
        <Edit
          className="!text-green-500 cursor-pointer"
          onClick={() => {
            setCurrentUser(i);
            fk.setFieldValue("user_name", i.full_name);
            setOpen(true);
          }}
        />
      </span>,
      <span>{i?.full_name}</span>,
      <span>{i?.username}</span>,
      <span>{i?.spon_id}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.email}</span>,
      <span>{i?.password}</span>,
      <span>{Number(i?.wallet || 0)?.toFixed(2)}</span>,
      <span>{Number(i?.winning_wallet || 0)?.toFixed(2)}</span>,
      <span>
        {Number(
          Number(i?.winning_wallet || 0) + Number(i?.wallet || 0)
        )?.toFixed(2)}
      </span>,
      <span>{String(i?.status) === "1" ? "Active" : "Inactive"}</span>,
      <span>{Number(i?.total_payin || 0)?.toFixed(2)}</span>,
      <span>{Number(i?.total_payout || 0)?.toFixed(2)}</span>,
      <span>{i?.user_type}</span>,
      <span>{Number(i?.yesterday_income || 0)?.toFixed(2)}</span>,
      <span>{i?.direct_reg}</span>,
      <span>{i?.team_reg}</span>,
      <span>{Number(i?.need_to_bet || 0)?.toFixed(2)}</span>,
      <span>{Number(i?.total_betting_by_user || 0)?.toFixed(2)}</span>,
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
        <TextField
          type="search"
          placeholder="Search by From amount"
          value={from_amount}
          onChange={(e) => setFrom_amount(e.target.value)}
        />
        <TextField
          type="search"
          placeholder="Search by To amount"
          value={to_amount}
          onChange={(e) => setTo_amount(e.target.value)}
        />
        <Button
          onClick={() => userListFunction()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Name</DialogTitle>
        <DialogContent>
          <TextField
            className="!mt-2"
            label="Name"
            fullWidth
            value={fk.values.user_name}
            onChange={(e) => fk.setFieldValue("user_name", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={UpdatePlayerFn} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Player;
