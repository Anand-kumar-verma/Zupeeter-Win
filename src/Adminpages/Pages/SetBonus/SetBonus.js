import {
    Button,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    styled,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import { useQuery } from "react-query";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.MuiTableCell-head`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.MuiTableCell-body`]: {
        fontSize: 14,
        padding: "10px 8px !important",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
 
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));



//   {Number(ownaddress?.token_amnt)?.toFixed(4)}

const SetBonus = () => {
    const [loading, setLoading] = useState(false);
    const [amounts, setAmounts] = useState({});
    const handleReset = () => {
        setAmounts({}); // Reset amounts state to clear inputs
    };
    const setBonusFunction = async (id) => {
        setLoading(true);
        const req = {
            t_id: id,
            zp_amount : Number(amounts[id]) || 0,
        };
        try {
            const res = await axiosInstance.post(`${API_URLS?.zp_Amount}`, req);
            toast.success(res?.data?.msg);
            if (res?.data?.msg === "Updated successfully.") {
                handleReset();
            }
            console.log(res);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.msg || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };
    const { data: walletaddress } = useQuery(
        ["address_own"],
        () => apiConnectorGet(endpoint?.zp_own_address), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
      }
      )
      const ownaddress = walletaddress?.data?.data?.[0]


    const setBonusData = [
        { id: 1,
             name: "Registration",
              unit: "Amount" 
             },
    ];

    const tableHead = [
        "S.No.",
        "Bonus",
        "Unit",
        "Amount",
        "Enter Amount",
        "Action",
    ];

    const tableRow = setBonusData?.map((item, index) => (
        <StyledTableRow key={item.id}
            className="hover:!bg-purple-200 cursor-pointer"
        >
            <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">{index + 1}</StyledTableCell>
            <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">{item.name}</StyledTableCell>
            <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">{item.unit}</StyledTableCell>
                    <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">{Number(ownaddress?.token_amnt)?.toFixed(4)}</StyledTableCell>
            <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">
                <TextField
                    type="number"
                    value={amounts[item?.id] || ""}
                    onChange={(e) => setAmounts({ ...amounts, [item?.id]: e.target.value })}
                />
            </StyledTableCell>
            <StyledTableCell 
             component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">
                <Button
                    variant="contained"
                    className="!bg-[#198754]"
                    onClick={() => setBonusFunction(item.id)}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </StyledTableCell>
        </StyledTableRow>
    ));

    return (
        <div>
            <TableContainer>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableHead.map((column, index) => (
                                <StyledTableCell key={index} className="!text-black !font-bold !bg-white !bg-opacity-50 !text-center">
                                    {column}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array?.from(new Array(4))?.map((_, i) => (
                                <StyledTableRow key={i}>
                                    {tableHead.map((_, index) => (
                                        <StyledTableCell key={index}>
                                            <Skeleton />
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))
                        ) : tableRow?.length === 0 ? (
                            <TableRow>
                                <StyledTableCell colSpan={tableHead.length} align="center">
                                    No data Found
                                </StyledTableCell>
                            </TableRow>
                        ) : (
                            tableRow
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SetBonus;
