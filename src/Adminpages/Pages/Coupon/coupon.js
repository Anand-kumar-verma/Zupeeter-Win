import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Switch, TablePagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCoupon } from "../../Services";
import CustomTable from "../../Shared/CustomTable";
import moment from "moment";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../../services/urls";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";

const Coupon = () => {

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const navigate = useNavigate();
    const { isLoading, data } = useQuery(
        ["coupon"],
        () => getCoupon(),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
        }
    );
    const coupon_data = data?.data?.data || [];

 const UpdateCoupon = async (id)=>{
    try{
        const res = await axiosInstance.get(API_URLS?.update_coupon_record+id)
        toast(res?.data?.msg)
    }
    catch(e){
        console.log(e)
    }
    
 }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setVisibleRows(
            coupon_data?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            )
        );
    }, [page, rowsPerPage, coupon_data]);

    const tablehead = [
        <span>S.No.</span>,
        <span>Coupon Code</span>,
        <span>Amount</span>,
        <span>Status</span>,
        <span>Limit</span>,
        <span>No. of Uses</span>,
        
        <span>Date/Time</span>,
        <span>Action</span>,

    ];

    const tablerow = visibleRows?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.coupon_code}</span>,
            <span>{i?.coupon_amount}</span>,
            <span>{i?.coupon_status}</span>,
            <span>{i?.coupon_limit}</span>,
            <span>{i?.coupon_uses}</span>,
            <span>{moment(i?.created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
            <span>
                <Switch
                checked={i?.coupon_status==="Active" ? true :false}
                    className="!text-green-600"
                    onChange={()=>UpdateCoupon(i?.id)}
                />
            </span>
        ];
    });

    return (
        <div>
           <div className="!flex !justify-end">
           <Button
             className="!my-5 !bg-white"
                onClick={() => navigate('/addcoupon')}
                endIcon={<Add />}
            >
                Add Coupon
            </Button>
           </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />
            
            <TablePagination
                rowsPerPageOptions={[8, 10, 20, 50]}
                component="div"
                count={coupon_data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Coupon;
