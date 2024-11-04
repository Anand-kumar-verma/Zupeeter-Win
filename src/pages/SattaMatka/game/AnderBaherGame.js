import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const AndarBaharTable = ({ betArray, setBetArray }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const existingIndex = betArray.findIndex(
      (item) => Number(item.number) === Number(name)
    );
    const updatedBetArray = betArray.map((item, index) =>
      index === existingIndex ? { ...item, amount: value } : item
    );
    setBetArray(updatedBetArray);
  };

  const renderRowsa = (labelPrefix) => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid container key={index} spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            className="fp13"
            align="center"
            sx={{ color: "white", mt: 1 }}
          >
            {`${index}${labelPrefix}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&:hover fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            placeholder="₹"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            id={`100${index}`}
            name={`100${index}`}
            value={
              betArray?.find((i) => Number(i?.number) === Number(`100${index}`))
                ?.amount
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
    ));
  };
  const renderRowsb = (labelPrefix) => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid container key={index} spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            className="fp13"
            align="center"
            sx={{ color: "white", mt: 1 }}
          >
            {`${labelPrefix}${index}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&:hover fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            placeholder="₹"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            id={`200${index}`}
            name={`200${index}`}
            value={
              betArray?.find((i) => Number(i?.number) === Number(`200${index}`))
                ?.amount
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2 }} className="w95 !mb-[10%]" mt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ border: "1px solid white", width: "48%", borderRadius: "5px" }}
        >
          <Typography
            className="fp15"
            variant="body1"
            sx={{
              color: "white",
              py: 1,
              borderBottom: "1px solid white",
              margin: 0,
            }}
            align="center"
            gutterBottom
          >
            ANDAR
          </Typography>
          {renderRowsa("*")}
        </Box>
        <Box
          sx={{ border: "1px solid white", width: "48%", borderRadius: "5px" }}
        >
          <Typography
            className="fp15"
            variant="h5"
            sx={{
              color: "white",
              py: 1,
              borderBottom: "1px solid white",
              margin: 0,
            }}
            align="center"
            gutterBottom
          >
            BAHAR
          </Typography>
          {renderRowsb("*")}
        </Box>
      </Box>
    </Box>
  );
};

export default AndarBaharTable;

