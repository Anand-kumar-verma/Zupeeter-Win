import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import rollatesidebar from "../../assets/images/roulettesidebar.png";
import toast from "react-hot-toast";
const NeighbourHoodBet = ({
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
  open,
  setOpen,
  isSelectedDropBet,
  removeSingleBetFunction,
}) => {
  return (
    <Box
      className={"!bg-black"}
      sx={{ width: "100%", height: "100%", position: "relative" }}
    >
      {/* <Box
        sx={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          zIndex: "5000000",
        }}
      >
        <NavLink
          onClick={() => {
            setOpen(!open);
          }}
        >
          <CloseIcon sx={{ color: "white", fontSize: "40px" }} />
        </NavLink>
      </Box> */}

      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            // 
            width: 600,
            height: 300,
            top: "35%",
            left: "-14%",
            background: "black",
          }}
          className={"!flex !justify-center !items-center !rounded-lg"}
        >
        <div className="!text-white !z-50 !absolute !top-0 !right-0 !px-5 !py-4">
        <NavLink
          onClick={() => {
            setOpen(!open);
          }}
        >
          <CloseIcon sx={{ color: "white", fontSize: "40px" }} />
        </NavLink>
        </div>

          <Box component="img" src={rollatesidebar} className="!px-[10%]"></Box>
          <Box
            // component={NavLink}
            sx={{
              width: "143px",
              height: "62px",
              position: "absolute",
              top: "40%",
              left: "15%",
              clipPath: "polygon(0 0, 65% 0, 100% 100%, 0% 100%)",
              // background: 'red',
            }}
            className={"!flex !justify-center !items-center "}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="101"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction("101");
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === "101");
                if (isContainsPre) {
                  // setOpenDialogBox("0");
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                    <span className="!p-2" style={{ marginTop: "10% ", backgroundColor: 'black' }}>
                                Bet must be greater than 10 and less that 50000 Rupees
                              </span>
                    );
                  } else {
                    setBetFuncton(
                      "101",
                      [101],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton("101", [101], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 133,
              height: 62,
              position: "absolute",
              top: "40%",
              left: "32%",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
              WebkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
              // backgroundColor: 'green',
            }}
            className={"!flex !justify-center !items-center "}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="102"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction("102");
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === "102");
                if (isContainsPre) {
                  // setOpenDialogBox("0");
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                    <span className="!p-2" style={{ marginTop: "10% ",  backgroundColor: 'black' }}>
                                Bet must be greater than 10 and less that 50000 Rupees
                              </span>
                    );
                  } else {
                    setBetFuncton(
                      "102",
                      [102],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton("102", [102], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 125,
              height: 62,
              position: "absolute",
              top: "40%",
              left: "51%",
              // backgroundColor: 'yellow',
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="103"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction("103");
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === "103");
                if (isContainsPre) {
                  // setOpenDialogBox("0");
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                    <span className="!p-2" style={{ marginTop: "10% ", backgroundColor: 'black' }}>
                                Bet must be greater than 10 and less that 50000 Rupees
                              </span>
                    );
                  } else {
                    setBetFuncton(
                      "103",
                      [103],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton("103", [103], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 73,
              height: 62,
              position: "absolute",
              top: "40%",
              right: "15%",
              // backgroundColor: 'blue',
              borderRadius: "25px",
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="104"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction("104");
                  return;
                }
                let isContainsPre = bet?.find((i) => i?.id === "104");
                if (isContainsPre) {
                  // setOpenDialogBox("0");
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                    <span className="!p-2" style={{ marginTop: "10% ", backgroundColor: 'black' }}>
                                Bet must be greater than 10 and less that 50000 Rupees
                              </span>
                    );
                  } else {
                    setBetFuncton(
                      "104",
                      [104],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton("104", [104], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NeighbourHoodBet;
