import { Add } from "@mui/icons-material";
import { Button, Switch, TablePagination } from "@mui/material";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { getCompany } from "../../Services";
import CustomTable from "../../Shared/CustomTable";

const Company = () => {

    const client = useQueryClient()
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(
        ["Company_prm"],
        () => getCompany(),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus:false
        }
    );
    const company_data = data?.data?.data || [];

   const UpdateCompany = async (id)=>{
    try{
        const res = await axiosInstance.get(API_URLS?.update_company_record+id)
        toast(res?.data?.msg,{id:1})
        client.refetchQueries("Company_prm");
    }
    catch(e){
        console.log(e)
    }    
 }

   const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setVisibleRows(
            company_data?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            )
        );
    }, [page, rowsPerPage, company_data]);

    const tablehead = [
        <span>S.No.</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Email</span>,
        <span>Mobile</span>,
        <span>Type</span>,
        <span>Action</span>,
    ];

    const tablerow = visibleRows?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.username}</span>,
            <span>{i?.full_name}</span>,
            <span>{i?.email}</span>,
            <span>{i?.mobile}</span>,
            <span>{i?.user_type}</span>,
            <span>
                <Switch
                // checked={i?.coupon_status==="Active" ? true :false}
                    className="!text-green-600"
                    onChange={()=>UpdateCompany(i?.username)}
                />
            </span>
        ];
    });

    return (
        <div>
           
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />
            
            <TablePagination
                rowsPerPageOptions={[8, 10, 20, 50]}
                component="div"
                count={company_data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Company;
