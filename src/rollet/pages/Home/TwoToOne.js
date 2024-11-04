import { Box, Stack } from "@mui/material";
import React from "react";
import { style } from "./CommonCss";
import First12 from "./First12";
import Second12 from "./Second12";
import Third12 from "./Third12";
import Zero from "./Zero";
const TwoToOne = ({
  isSelectedDropBet,
  removeSingleBetFunction,
  bet,
  setBetFuncton,
  amount,
}) => {
  return (
    <Box>
      <Box sx={style.bettable} className={""}>
        <Stack className={"!w-[100%]"} direction="row" justifyContent="end">
          {/* <span
            className="!grid !grid-cols-3  !w-[64%] !h-[30px]"
            style={{ border: "3px solid white" }}
          >
            <IconButton sx={style.btn1}>
              <p
                id="336"
                onClick={(e) => {
                  if (isSelectedDropBet) {
                    removeSingleBetFunction(336);
                    return;
                  }
                  if (amount < 10 || amount > 50000)
                    return toast(
                      <span
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Please select amount greater than 10
                      </span>
                    );
                  let isContainsPre = bet?.find((i) => i?.id === 336);
                  if (isContainsPre) {
                    // setOpenDialogBox(336);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        <span
                          className="p-2"
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
                        336,
                        [336],
                        Number(isContainsPre?.amount) + amount
                      );
                    }
                  } else {
                    setBetFuncton(336, [336], amount);
                  }
                  e.stopPropagation();
                }}
              >
                2 to 1
              </p>
            </IconButton>
            <IconButton sx={style.btn1}>
              <p
                id="235"
                onClick={(e) => {
                  if (isSelectedDropBet) {
                    removeSingleBetFunction(235);
                    return;
                  }
                  if (amount < 10 || amount > 50000)
                    return toast(
                      <span
                        className="p-2"
                        style={{
                          marginTop: "100%",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Please select amount greater than 10
                      </span>
                    );
                  let isContainsPre = bet?.find((i) => i?.id === 235);
                  if (isContainsPre) {
                    // setOpenDialogBox(235);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        <span
                          className="p-2"
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
                        235,
                        [235],
                        Number(isContainsPre?.amount) + amount
                      );
                    }
                  } else {
                    setBetFuncton(235, [235], amount);
                  }
                  e.stopPropagation();
                }}
              >
                2 to 1
              </p>
            </IconButton>
            <IconButton sx={style.btn1}>
              <p
                id="134"
                onClick={(e) => {
                  if (isSelectedDropBet) {
                    removeSingleBetFunction(134);
                    return;
                  }
                  if (amount < 10 || amount > 50000)
                    return toast(
                      <span
                        className="p-2"
                        style={{
                          marginTop: "10% ",
                          
                          backgroundColor: "black",
                        }}
                      >
                        Please select amount greater than 10
                      </span>
                    );
                  let isContainsPre = bet?.find((i) => i?.id === 134);
                  if (isContainsPre) {
                    // setOpenDialogBox(134);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        <span
                          className="!p-2"
                          style={{
                            marginTop: "10% ",
                            alignItems: "center",
                            
                            backgroundColor: "black",
                          }}
                        >
                          Bet must be greater than 10 and less that 50000 Rupees
                        </span>
                      );
                    } else {
                      setBetFuncton(
                        134,
                        [134],
                        Number(isContainsPre?.amount) + amount
                      );
                    }
                  } else {
                    setBetFuncton(134, [134], amount);
                  }
                  e.stopPropagation();
                }}
              >
                2 to 1
              </p>
            </IconButton>
          </span> */}
        </Stack>
        <Third12
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          // setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <Second12
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          // setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <First12
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          // setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <Zero
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          // setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
      </Box>
    </Box>
  );
};

export default TwoToOne;
