import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { style } from "./CommonCss";
const Third12 = ({
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
          width: "82%",
          height: "100%",

        }}
        className=" !h-full !grid !grid-cols-3 "
      >
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.red, borderRadius: '0px 0px 20px 0px' }}>
            <p
              id="36"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(36);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 36);
                if (isContainsPre) {
                  // setOpenDialogBox(36);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      36,
                      36,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(36, 36, amount);
                }
                e.stopPropagation();
              }}
            >
              36
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="361000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(361000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 361000);
                if (isContainsPre) {
                  // setOpenDialogBox(361000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      361000,
                      [33, 36],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(361000, [33, 36], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="362000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(362000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 362000);
                if (isContainsPre) {
                  // setOpenDialogBox(362000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      362000,
                      [35, 36],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(362000, [35, 36], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="363000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(363000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 363000);
                if (isContainsPre) {
                  // setOpenDialogBox(363000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      363000,
                      [32, 33, 35, 36],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(363000, [32, 33, 35, 36], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* <p className="absolute  top-[5%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="342000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(342000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 342000);
                if (isContainsPre) {
                  // setOpenDialogBox(342000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      342000,
                      [34, 35, 36],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(342000, [34, 35, 36], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="33"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(33);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 33);
                if (isContainsPre) {
                  // setOpenDialogBox(33);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      33,
                      33,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(33, 33, amount);
                }
                e.stopPropagation();
              }}
            >
              33
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="331000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(331000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 331000);
                if (isContainsPre) {
                  // setOpenDialogBox(331000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      331000,
                      [30, 33],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(331000, [30, 33], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="332000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(332000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 332000);
                if (isContainsPre) {
                  // setOpenDialogBox(332000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      332000,
                      [32, 33],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(332000, [32, 33], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="333000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(333000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 333000);
                if (isContainsPre) {
                  // setOpenDialogBox(333000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      333000,
                      [29, 30, 32, 33],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(333000, [29, 30, 32, 33], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="312000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(312000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 312000);
                if (isContainsPre) {
                  // setOpenDialogBox(312000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      312000,
                      [31, 32, 33],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(312000, [31, 32, 33], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="30"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(30);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 30);
                if (isContainsPre) {
                  // setOpenDialogBox(30);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      30,
                      30,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(30, 30, amount);
                }
                e.stopPropagation();
              }}
            >
              30
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4  !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="301000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(301000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 301000);
                if (isContainsPre) {
                  // setOpenDialogBox(301000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      301000,
                      [27, 30],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(301000, [27, 30], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[55%] left-[82%] h-4 w-4  !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="302000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(302000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 302000);
                if (isContainsPre) {
                  // setOpenDialogBox(302000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      302000,
                      [29, 30],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(302000, [29, 30], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="303000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(303000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 303000);
                if (isContainsPre) {
                  // setOpenDialogBox(303000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      303000,
                      [26, 27, 29, 30],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(303000, [26, 27, 29, 30], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* <p className="absolute top-[55%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="282000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(282000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 282000);
                if (isContainsPre) {
                  // setOpenDialogBox(282000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      282000,
                      [28, 29, 30],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(282000, [28, 29, 30], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="27"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(27);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 27);
                if (isContainsPre) {
                  // setOpenDialogBox(27);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      27,
                      27,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(27, 27, amount);
                }
                e.stopPropagation();
              }}
            >
              27
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="271000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(271000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 271000);
                if (isContainsPre) {
                  // setOpenDialogBox(271000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      271000,
                      [24, 27],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(271000, [24, 27], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="272000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(272000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 272000);
                if (isContainsPre) {
                  // setOpenDialogBox(272000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      272000,
                      [26, 27],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(272000, [26, 27], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="273000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(273000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 273000);
                if (isContainsPre) {
                  // setOpenDialogBox(273000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      273000,
                      [23, 24, 26, 27],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(273000, [23, 24, 26, 27], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* <p className="absolute top-[80%] left-[-20%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="252000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(252000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 252000);
                if (isContainsPre) {
                  // setOpenDialogBox(252000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      252000,
                      [25, 26, 27],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(252000, [25, 26, 27], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full !relative">
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="35"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(35);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 35);
                if (isContainsPre) {
                  // setOpenDialogBox(35);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      35,
                      [35],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(35, [35], amount);
                }
                e.stopPropagation();
              }}
            >
              35
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="351000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(351000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 351000);
                if (isContainsPre) {
                  // setOpenDialogBox(351000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      351000,
                      [32, 35],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(351000, [32, 35], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="352000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(352000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 352000);
                if (isContainsPre) {
                  // setOpenDialogBox(352000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      352000,
                      [34, 35],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(352000, [34, 35], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="353000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(353000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 353000);
                if (isContainsPre) {
                  // setOpenDialogBox(353000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      353000,
                      [31, 32, 34, 35],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(353000, [31, 32, 34, 35], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="32"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(32);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 32);
                if (isContainsPre) {
                  // setOpenDialogBox(32);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      32,
                      32,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(32, 32, amount);
                }
                e.stopPropagation();
              }}
            >
              32
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="321000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(321000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 321000);
                if (isContainsPre) {
                  // setOpenDialogBox(321000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      321000,
                      [29, 32],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(321000, [29, 32], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="322000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(322000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 322000);
                if (isContainsPre) {
                  // setOpenDialogBox(322000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      322000,
                      [31, 32],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(322000, [31, 32], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="323000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(323000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 323000);
                if (isContainsPre) {
                  // setOpenDialogBox(323000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      323000,
                      [28, 29, 31, 32],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(323000, [28, 29, 31, 32], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="29"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(29);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 29);
                if (isContainsPre) {
                  // setOpenDialogBox(29);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      29,
                      29,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(29, 29, amount);
                }
                e.stopPropagation();
              }}
            >
              29
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="291000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(291000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 291000);
                if (isContainsPre) {
                  // setOpenDialogBox(291000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      291000,
                      [26, 29],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(291000, [26, 29], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="292000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(292000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 292000);
                if (isContainsPre) {
                  // setOpenDialogBox(292000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      292000,
                      [28, 29],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(292000, [28, 29], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="293000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(293000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 293000);
                if (isContainsPre) {
                  // setOpenDialogBox(293000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      293000,
                      [25, 26, 28, 29],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(293000, [25, 26, 28, 29], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          <IconButton sx={{ ...style.btn2, ...style.blue }}>
            <p
              id="26"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(26);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 26);
                if (isContainsPre) {
                  // setOpenDialogBox(26);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      26,
                      26,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(26, 26, amount);
                }
                e.stopPropagation();
              }}
            >
              26
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="261000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(261000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 261000);
                if (isContainsPre) {
                  // setOpenDialogBox(261000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      261000,
                      [23, 26],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(261000, [23, 26], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
          {/* <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="262000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(262000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 262000);
                if (isContainsPre) {
                  // setOpenDialogBox(262000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      262000,
                      [25, 26],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(262000, [25, 26], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* quadratic */}
          {/* <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="263000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(263000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 263000);
                if (isContainsPre) {
                  // setOpenDialogBox(263000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      263000,
                      [22, 23, 25, 26],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(263000, [22, 23, 25, 26], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full !relative">
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="34"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(34);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 34);
                if (isContainsPre) {
                  // setOpenDialogBox(34);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      34,
                      [34],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(34, 34, amount);
                }
                e.stopPropagation();
              }}
            >
              34
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="341000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(341000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 341000);
                if (isContainsPre) {
                  // setOpenDialogBox(341000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      341000,
                      [31, 34],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(341000, [31, 34], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}

          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="31"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(31);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 31);
                if (isContainsPre) {
                  // setOpenDialogBox(31);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      31,
                      31,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(31, 31, amount);
                }
                e.stopPropagation();
              }}
            >
              31
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="311000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(311000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 311000);
                if (isContainsPre) {
                  // setOpenDialogBox(311000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      311000,
                      [28, 31],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(311000, [28, 31], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}

          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="28"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(28);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 28);
                if (isContainsPre) {
                  // setOpenDialogBox(28);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      28,
                      28,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(28, 28, amount);
                }
                e.stopPropagation();
              }}
            >
              28
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="281000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(281000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 281000);
                if (isContainsPre) {
                  // setOpenDialogBox(281000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      281000,
                      [25, 28],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(281000, [25, 28], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}

          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="25"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(25);
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === 25);
                if (isContainsPre) {
                  // setOpenDialogBox(25);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      25,
                      [25],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(25, [25], amount);
                }
                e.stopPropagation();
              }}
            >
              25
            </p>
          </IconButton>
          {/* Buttom */}
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="251000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(251000);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 251000);
                if (isContainsPre) {
                  // setOpenDialogBox(251000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      251000,
                      [22, 25],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(251000, [22, 25], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p> */}
          {/* right */}
        </span>
      </Stack>
      <div
        className="w-[18%] !grid grid-rows-1   !place-items-center"
        style={{
          ...style.flex,
          border: "1px solid white",
          background: 'red',
          borderRadius: '0px 20px 0px 0px'
        }}
      >
        <IconButton className="!p-0" style={{ transform: "rotate(270deg)" }}>
          <Typography variant="body1" color="initial">
            <span
              style={{ color: "white", fontWeight: 800 }}
              className="whitespace-nowrap !text-[12px] !text-white"
              id="312"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(312);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast(
                    <span
                      className="!p-2"
                      style={{
                        marginTop: "10% ",
                        
                        backgroundColor: "black",
                      }}
                    >
                      Please select amount greater than 10
                    </span>
                  );
                let isContainsPre = bet?.find((i) => i?.id === 312);
                if (isContainsPre) {
                  // setOpenDialogBox(312);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      <span
                        className="!p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Bet must be greater than 10 and less that 50000 Rupees
                      </span>
                    );
                  } else {
                    setBetFuncton(
                      312,
                      39,
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(312, 39, amount);
                }
                e.stopPropagation();
              }}
            >
              {/* 3rd 12 */}
              Red
            </span>
          </Typography>
        </IconButton>
      </div>
    </Stack>
  );
};

export default Third12;
