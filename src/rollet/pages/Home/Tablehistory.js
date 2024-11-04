import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { zubgback } from "../../../shared/color";

const MyTableComponent = ({ res }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the number of pages
  const pageCount = Math.ceil(res?.length / itemsPerPage);

  // Get the data for the current page
  const paginatedData = res?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: zubgback,
          // width: "100%",
          // height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
      >
        <Table size="small" aria-label="a dense table" className="!text-white">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="!text-white">
                S.No.
              </TableCell>
              <TableCell align="center" className="!text-white">
                BetNumber/Amount
              </TableCell>
              <TableCell align="center" className="!text-white">
                Bet Amount
              </TableCell>
              <TableCell align="center" className="!text-white">
                Res. Color
              </TableCell>
              <TableCell align="center" className="!text-white">
                Res. No
              </TableCell>
              <TableCell align="center" className="!text-white">
                Win
              </TableCell>
              <TableCell align="center" className="!text-white">
                Total Win
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="!text-white"
              >
                <TableCell align="center" className="!text-white">
                  {(page - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell align="center" className="!text-white">
                  <div>
                    <p className="!flex">
                      {row?.number?.split(",")?.map((j, index) => (
                        <span
                          key={index}
                          className="!text-white !w-[90px] text-center !border-2 !border-white px-1 py-1"
                        >
                          {j === "37"
                            ? "Blue"
                            : j === "38"
                            ? "Black"
                            : j === "39"
                            ? "Red"
                            : j}
                        </span>
                      ))}
                    </p>
                    <p className="!flex">
                      {row?.amount_string?.split(",")?.map((j, index) => (
                        <span
                          key={index}
                          className="!text-white !w-[90px] text-center !border-2 !border-white px-1 py-1"
                        >
                          {j === "37"
                            ? "Blue"
                            : j === "38"
                            ? "Black"
                            : j === "39"
                            ? "Red"
                            : j}
                        </span>
                      ))}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="center" className="!text-white">
                  {Number(row?.amount || 0)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center" className="!text-white">
                  {row?.result_color}
                </TableCell>
                <TableCell align="center" className="!text-white">
                  {Number(row?.result_number)?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center" className="!text-white">
                  {row?.win_string?.split(" ")?.map((i) => {
                    return Number(i || 0)?.toFixed(1) + ",";
                  }) || ""}
                </TableCell>
                <TableCell align="center" className="!text-white">
                  {Number(row?.win || 0)?.toFixed(2) || 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className="!text-white !bg-white"
        count={pageCount}
        variant="outlined"
        shape="rounded"
        sx={{ my: 2 }}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
};

export default MyTableComponent;
