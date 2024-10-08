import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import empty from "../../../assets/images/empty.png";

const MyHistory = ({ gid }) => {



  return (
    <Box mt={2}>
      <Typography className=" mx-10 text-center text-lg">
        <img src={empty} alt="" className="mx-10" />
        No data
      </Typography>
    </Box>
  );
};

export default MyHistory;
