import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { stargrad } from "../../../shared/color";
import toast from "react-hot-toast";

function Jodi({ betArray, setBetArray }) {
  const buttons = Array.from({ length: 100 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [amount, setAmount] = useState(0);
  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const myElementRef = useRef(null);

  const handleClick = () => {
    toggleDrawer(false);

    if (myElementRef.current) {
      myElementRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleClickbtn = (number) => {
    setSelectedNumber(number);
  };

  const addNumberINBetArray = (number, amount) => {
    const body = {
      number: number,
      amount: amount,
    };
    const existingIndex = betArray.findIndex(
      (item) => Number(item.number) === Number(number)
    );

    if (existingIndex !== -1) {
      const updatedBetArray = betArray.map((item, index) =>
        index === existingIndex ? { ...item, amount: amount } : item
      );
      setBetArray(updatedBetArray);
    } else {
      setBetArray([...betArray, body]);
    }
    setAmount(0);
  };

  console.log(betArray);
  return (
    <Box className="w95">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          my: 5,
        }}
      >
        {buttons.map((number) => (
          <Button
            onClick={() => {
              handleClickbtn(number);
              setAmount(
                betArray?.find(
                  (i) => Number(i?.number) === Number(selectedNumber || number)
                )?.amount || null
              );
              toggleDrawer(true);
            }}
            key={number}
            variant="contained"
            sx={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              background: betArray?.find(
                (i) => Number(i?.number) === Number(number)
              )
                ? "#4caf50"
                : "#8d819f",
              color: "white",
              "&:hover": {
                background: number === selectedNumber ? "#45a049" : "#6a4a71", // Hover color based on selection
              },
            }}
          >
            <p className="!flex !flex-col !justify-center">
              <span>{number}</span>
              <span className="!text-[10px]">
                {
                  betArray?.find((i) => Number(i?.number) === Number(number))
                    ?.amount
                }
              </span>
            </p>
          </Button>
        ))}
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#2C092D",
            borderRadius: "16px 16px 0 0",
            padding: "8px",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: "20px 16px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "10px", fontSize: "25px", fontWeight: "600px" }}
          >
            {selectedNumber}
          </Typography>
          <Typography
            variant="subtitle1"
            className="fp15"
            sx={{ marginBottom: "10px" }}
          >
            Enter Bid Amount
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            placeholder="00"
            sx={{
              backgroundColor: "#4A234F",
              borderRadius: "50px",
              input: { color: "#fff" },
            }}
          />
          <Button
            className="fp15"
            fullWidth
            variant="contained"
            onClick={() => {
              handleClick();
              selectedNumber !== "" &&
                amount !== "" &&
                amount !== 0 &&
                (Number(amount) < 10
                  ? toast("Amount should be greater or equal to 10")
                  : addNumberINBetArray(selectedNumber, amount));
            }}
            sx={{
              marginTop: "16px",
              background: stargrad,
              color: "#fff",
              borderRadius: "8px",
              py: 1,
              mb: 2,
            }}
          >
            ADD BID
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{
              marginTop: "8px",
              color: "#fff",
              textDecoration: "underline",
            }}
          >
            Remove this bet
          </Button>
        </Box>
      </Drawer>
      <Box sx={{ py: 2 }}></Box>
      <div ref={myElementRef}></div>
    </Box>
  );
}

export default Jodi;
