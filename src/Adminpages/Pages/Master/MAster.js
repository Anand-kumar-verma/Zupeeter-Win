import {
    Button,
    Skeleton,
    Switch,
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
import { useQuery, useQueryClient } from "react-query";
import { Refresh } from "@mui/icons-material";

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


const Master = () => {

    const client = useQueryClient()
    const { data } = useQuery(["game_status"],
        () => apiConnectorGet(endpoint.status), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    })
    const status = data?.data?.data

    const { data: statta_matka_staus } = useQuery(
        ["status_of_satta_matka"],
        () => apiConnectorGet(endpoint?.node?.getStatusSattaMatka),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    );
    const statta_matka_staus_result = statta_matka_staus?.data?.data || [];

    const [loading, setLoading] = useState(false);

    const MasterFunction = async (id) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(API_URLS?.set_game_status + `?t_id=${id}`)
            toast(res?.data?.msg, { id: 1 })
            client.refetchQueries("game_status")
            client.refetchQueries("status_of_satta_matka")
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    const RefreshFunction = async (id) => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(API_URLS?.refresh_status + `?t_id=${id}`)
            toast(res?.data?.msg, { id: 1 })
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    const MasterData = [
        {
            id: 1,
            name: "Approve For Login ",
        },
        {
            id: 15,
            name: "TRX",
        },
        {
            id: 14,
            name: "WINGO",
        },
        {
            id: 16,
            name: "AVIATOR",
        },
        {
            id: 21,
            name: "SATTA MATKA",
        },
        {
            id: 23,
            name: "DESAWAR",
        },
        {
            id: 24,
            name: "GALI",
        },
        {
            id: 25,
            name: "FARIDABAD",
        },
        {
            id: 26,
            name: "GHAZIABAD",
        },
        {
            id: 22,
            name: "ROULETTE",
        },
    ];

    const tableHead = [
        "S.No.",
        "Game",
        "Action",
    ];

    const tableRow = MasterData?.map((item, index) => (
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
                className="capitalize !text-center !py-[10px]"
            >
                {item?.id === 1 ? (
                    <Refresh 
                    className="!text-green-600" onClick={() => RefreshFunction(item?.id)} />

                ) : [23, 24, 25, 26].includes(item?.id) ? (
                    <Switch
                        checked={
                            statta_matka_staus_result?.find((i) => i?.id === item?.id)
                                ?.longtext === "1"
                        }
                        className="!text-green-600"
                        onChange={() => MasterFunction(item?.id)}
                    />
                ) : (
                    <Switch
                        checked={
                            status?.find((i) => i?.id === item?.id)?.longtext === "1"
                        }
                        className="!text-green-600"
                        onChange={() => MasterFunction(item?.id)}
                    />
                )}
            </StyledTableCell>


            {/* <StyledTableCell
                component="th"
                scope="row"
                className="capitalize !text-center !py-[10px]">
                {[23, 24, 25, 26].includes(item?.id) ? (
                    <Switch
                        checked={statta_matka_staus_result?.find((i) => i?.id === item?.id)?.longtext === "1" ? true : false}
                        className="!text-green-600"
                        onChange={() => MasterFunction(item?.id)}
                    />
                ) : (
                    <Switch
                        checked={status?.find((i) => i?.id === item?.id)?.longtext === "1" ? true : false}
                        className="!text-green-600"
                        onChange={() => MasterFunction(item?.id)}
                    />
                ):(
                    ye tab hit jb id 1 ho 
                    <Switch
                        // checked={status?.find((i) => i?.id === item?.id)?.longtext === "1" ? true : false}
                        className="!text-green-600"
                        onChange={() => RefreshFunction(item?.id)}
                    />
                )}
            </StyledTableCell> */}
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

export default Master;
