import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { style } from "./CommonCss";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
const Second12 = ({
  isSelectedDropBet,
  removeSingleBetFunction,
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
}) => {
  return (
    <Stack direction="row" justifyContent="end" sx={{ height: "31%" }}>
      <Stack
        sx={{
          width: "82% !important",
          height: "100%",
          // borderRight: "1px solid white",
          // borderLeft: "1px solid white",
        }}
        className=" !h-full !grid !grid-cols-3 "
      >
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="24"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(24);
                  return;
                }

                let isContainsPre = bet?.find((i) => i?.id === 24);
                if (isContainsPre) {
                  // setOpenDialogBox(24);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      24,
                      24,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(24, 24, amount);
                }
                e.stopPropagation();
              }}
            >
              24
            </p>
          </IconButton>
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="241000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(241000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 241000);
                if (isContainsPre) {
                  // setOpenDialogBox(241000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      241000, [21, 24],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(241000, [21, 24], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="242000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(242000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 242000);
                if (isContainsPre) {
                  // setOpenDialogBox(242000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      242000, [23, 24],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(242000, [23, 24], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="243000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(243000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 243000);
                if (isContainsPre) {
                  // setOpenDialogBox(243000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      243000, [20, 21, 23, 24],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(243000, [20, 21, 23, 24], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="222000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(222000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 222000);
                if (isContainsPre) {
                  // setOpenDialogBox(222000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      222000, [22, 23, 24],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(222000, [22, 23, 24], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="21"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(21);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 21);
                if (isContainsPre) {
                  // setOpenDialogBox(21);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      21,
                      21,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(21, 21, amount);
                }
                e.stopPropagation();
              }}
            >
              21
            </p>
          </IconButton>
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="211000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(211000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 211000);
                if (isContainsPre) {
                  // setOpenDialogBox(211000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      211000, [18, 21],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(211000, [18, 21], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="212000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(212000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 212000);
                if (isContainsPre) {
                  // setOpenDialogBox(212000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      212000, [20, 21],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(212000, [20, 21], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="213000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(213000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 213000);
                if (isContainsPre) {
                  // setOpenDialogBox(213000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      213000, [17, 18, 20, 21],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(213000, [17, 18, 20, 21], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="192000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(192000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 192000);
                if (isContainsPre) {
                  // setOpenDialogBox(192000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      192000, [19, 20, 21],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(192000, [19, 20, 21], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="18"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(18);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 18);
                if (isContainsPre) {
                  // setOpenDialogBox(18);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      18,
                      18,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(18, 18, amount);
                }
                e.stopPropagation();
              }}
            >
              18
            </p>
          </IconButton>
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="181000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(181000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 181000);
                if (isContainsPre) {
                  // setOpenDialogBox(181000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      181000, [15, 18],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(181000, [15, 18], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="182000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(182000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 182000);
                if (isContainsPre) {
                  // setOpenDialogBox(182000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      182000, [17, 18],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(182000, [17, 18], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="183000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(183000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 183000);
                if (isContainsPre) {
                  // setOpenDialogBox(183000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      183000, [14, 15, 17, 18],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(183000, [14, 15, 17, 18], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="162000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(162000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 162000);
                if (isContainsPre) {
                  // setOpenDialogBox(162000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      162000, [16, 17, 18],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(162000, [16, 17, 18], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="15"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(15);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 15);
                if (isContainsPre) {
                  // setOpenDialogBox(15);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      15,
                      15,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(15, 15, amount);
                }
                e.stopPropagation();
              }}
            >
              15
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="151000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(151000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 151000);
                if (isContainsPre) {
                  // setOpenDialogBox(151000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      151000, [12, 15],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(151000, [12, 15], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="152000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(152000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 152000);
                if (isContainsPre) {
                  // setOpenDialogBox(152000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      152000, [14, 15],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(152000, [14, 15], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="153000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(153000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 153000);
                if (isContainsPre) {
                  // setOpenDialogBox(153000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      153000, [11, 12, 14, 15],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(153000, [11, 12, 14, 15], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[80%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="132000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(132000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 132000);
                if (isContainsPre) {
                  // setOpenDialogBox(132000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      132000, [13, 14, 15],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(132000, [13, 14, 15], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="23"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(23);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 23);
                if (isContainsPre) {
                  // setOpenDialogBox(23);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      23,
                      23,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(23, 23, amount);
                }
                e.stopPropagation();
              }}
            >
              23
            </p>
          </IconButton>
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="231000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(231000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 231000);
                if (isContainsPre) {
                  // setOpenDialogBox(231000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      231000, [20, 23],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(231000, [20, 23], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="232000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(232000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 232000);
                if (isContainsPre) {
                  // setOpenDialogBox(232000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      232000, [22, 23],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(232000, [22, 23], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="233000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(233000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 233000);
                if (isContainsPre) {
                  // setOpenDialogBox(233000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      233000, [19, 20, 22, 23],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(233000, [19, 20, 22, 23], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="20"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(20);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 20);
                if (isContainsPre) {
                  // setOpenDialogBox(20);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      20,
                      20,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(20, 20, amount);
                }
                e.stopPropagation();
              }}
            >
              20
            </p>
          </IconButton>
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="201000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(201000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 201000);
                if (isContainsPre) {
                  // setOpenDialogBox(201000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      201000, [17, 20],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(201000, [17, 20], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="202000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(202000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 202000);
                if (isContainsPre) {
                  // setOpenDialogBox(202000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      202000, [19, 20],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(202000, [19, 20], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="203000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(203000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 203000);
                if (isContainsPre) {
                  // setOpenDialogBox(203000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      203000, [16, 17, 19, 20],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(203000, [16, 17, 19, 20], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="17"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(17);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 17);
                if (isContainsPre) {
                  // setOpenDialogBox(17);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      17,
                      17,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(17, 17, amount);
                }
                e.stopPropagation();
              }}
            >
              17
            </p>
          </IconButton>
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="171000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(171000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 171000);
                if (isContainsPre) {
                  // setOpenDialogBox(171000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      171000, [14, 17],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(171000, [14, 17], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="172000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(172000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 172000);
                if (isContainsPre) {
                  // setOpenDialogBox(172000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      172000, [16, 17],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(172000, [16, 17], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="173000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(173000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 173000);
                if (isContainsPre) {
                  // setOpenDialogBox(173000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      173000, [13, 14, 16, 17],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(173000, [13, 14, 16, 17], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.blue }}>
            <p
              id="14"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(14);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 14);
                if (isContainsPre) {
                  // setOpenDialogBox(14);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      14,
                      14,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(14, 14, amount);
                }
                e.stopPropagation();
              }}
            >
              14
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="141000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(141000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 141000);
                if (isContainsPre) {
                  // setOpenDialogBox(141000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      141000, [11, 14],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(141000, [11, 14], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="142000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(142000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 142000);
                if (isContainsPre) {
                  // setOpenDialogBox(142000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      142000, [13, 14],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(142000, [13, 14], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="143000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(143000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 143000);
                if (isContainsPre) {
                  // setOpenDialogBox(143000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      143000, [10, 11, 13, 14],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(143000, [10, 11, 13, 14], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="22"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(22);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 22);
                if (isContainsPre) {
                  // setOpenDialogBox(22);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      22,
                      22,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(22, 22, amount);
                }
                e.stopPropagation();
              }}
            >
              22
            </p>
          </IconButton>
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="221000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(221000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 221000);
                if (isContainsPre) {
                  // setOpenDialogBox(221000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      221000, [19, 22],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(221000, [19, 22], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}

          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="19"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(19);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 19);
                if (isContainsPre) {
                  // setOpenDialogBox(19);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      19,
                      19,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(19, 19, amount);
                }
                e.stopPropagation();
              }}
            >
              19
            </p>
          </IconButton>
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="191000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(191000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 191000);
                if (isContainsPre) {
                  // setOpenDialogBox(191000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      191000, [16, 19],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(191000, [16, 19], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}

          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="16"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(16);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 16);
                if (isContainsPre) {
                  // setOpenDialogBox(16);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      16,
                      16,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(16, 16, amount);
                }
                e.stopPropagation();
              }}
            >
              16
            </p>
          </IconButton>
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="161000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(161000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 161000);
                if (isContainsPre) {
                  // setOpenDialogBox(161000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      161000, [13, 16],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(161000, [13, 16], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}

          <IconButton
            sx={{
              ...style.btn2,
              ...style.blue,
            }}
          >
            <p
              id="13"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(13);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 13);
                if (isContainsPre) {
                  // setOpenDialogBox(13);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{ marginTop: "10% ", backgroundColor: "black" }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      13,
                      13,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(13, 13, amount);
                }
                e.stopPropagation();
              }}
            >
              13
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="131000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(131000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                    Please select amount greater than 10
                  </span>);
                let isContainsPre = bet?.find((i) => i?.id === 131000);
                if (isContainsPre) {
                  // setOpenDialogBox(131000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      131000, [10, 13],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(131000, [10, 13], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
        </span>
      </Stack>
      <div
        className="w-[18%]   "
        style={{
          background: "yellow",
          border: "1px solid white",
        }}
      >
        {/* <Box sx={{ width: '100%', height: '50%', background: 'red', ...style.flex }} >
          <NavLink
            id="200"
            onClick={(e) => {
              if (isSelectedDropBet) {
                removeSingleBetFunction(200)
                return
              }
              if (amount < 10 || amount > 50000)
                return toast(<span style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                  Please select amount greater than 10
                </span>);
              let isContainsPre = bet?.find((i) => i?.id === 200);
              if (isContainsPre) {
                // setOpenDialogBox(200);
                if (
                  isContainsPre?.amount + amount > 50000 ||
                  isContainsPre?.amount < 10
                ) {
                  return toast(
                    <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                      Bet must be greater than 10 and less that 50000 Rupees
                    </span>
                  );
                } else {
                  setBetFuncton(
                    200, [200],
                    Number(isContainsPre?.amount) + amount
                  );
                }
              } else {
                setBetFuncton(200, [200], amount);
              }
              e.stopPropagation();
            }}>
            <Typography variant="body1" color="initial" sx={{ color: 'white', fontSize: '12px', fontWeight: '700', transform: 'rotate(90deg)' }}>Red</Typography>
          </NavLink>
        </Box> */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "#5352FF",
            ...style.flex,
          }}
        >
          <NavLink
            id="201"
            onClick={(e) => {
              if (isSelectedDropBet) {
                removeSingleBetFunction(201);
                return;
              }
              if (amount < 10 || amount > 50000)
                return toast(
                  <span style={{ marginTop: "10% ", backgroundColor: "black" }}>
                    Please select amount greater than 10
                  </span>
                );
              let isContainsPre = bet?.find((i) => i?.id === 201);
              if (isContainsPre) {
                // setOpenDialogBox(201);
                if (
                  isContainsPre?.amount + amount > 50000 ||
                  isContainsPre?.amount < 10
                ) {
                  return toast(
                    <span
                      className="!p-2"
                      style={{ marginTop: "10% ", backgroundColor: "black" }}
                    >
                      Bet must be greater than 10 and less that 50000 Rupees
                    </span>
                  );
                } else {
                  setBetFuncton(
                    201,
                    37,
                    Number(isContainsPre?.amount) + amount
                  );
                }
              } else {
                setBetFuncton(201, 37, amount);
              }
              e.stopPropagation();
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "white",
                fontSize: "12px",
                fontWeight: "700",
                transform: "rotate(270deg)",
              }}
            >
              Blue
            </Typography>
          </NavLink>
        </Box>
      </div>
    </Stack>
  );
};

export default Second12;
