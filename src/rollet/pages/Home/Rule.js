import React, { useEffect } from "react";
import rule from "../../assets/images/rule.png";
import { Box, Drawer } from "@mui/material";

const Rule = ({ setOpen2, open2, style }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Drawer
        className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
        sx={{
          "&>div": {
            background: "transparent",
            width: "320px",
           
            ...style.flex,
          },
        }}
        anchor="top"
        open={open2}
        onClose={() => {
          setOpen2(open2);
        }}
      >
        <Box
          className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
          sx={{
            width: "100%",
            height: "100%",
            background: "black",
            // transform: "rotate(90deg)",
            // borderRadius: "10px",
            padding: "10px",
            color: "white",
            borderColor: "yellow  !important",
          }}
        >
          {" "}
          <div
            className="!text-white  text-[10px] !text-left w-8 px-1 border border-yellow-400"
            onClick={() => {
              setOpen2(false);
            }}
          >
            Back{" "}
          </div>
          <div className="flex flex-col !pl-1">
          <p className="!text-center"> Jackpot Game Rules</p> 
            <p className="text-[10px] py-2 ">
         1. Game Overview <br/>
          The game "Jackpot" consists of slots numbered from 0 to 36, each assigned one of three colors: Red, Black, or Blue. Players 
           <br/>can place bets on any of these numbers or colors.
          </p>
            <p className="text-[10px] py-2 ">
            2. Placing Bets
            <br/>
            * Players can place bets on numbers (0 to 36) or colors (Red, Black, Blue). 
           <br/> * The minimum bet is 10, and bets can be increased in increments of 10 (e.g., 10, 20, 30, etc.).
          </p>
          <p className="text-[10px] py-2 ">
          3. Betting Time
            <br/>
              * Players can place bets every minute. 
           <br/> * In the final minute, betting is allowed until 15 seconds before the round ends. The screen will block betting in the last 15 
           seconds.
          </p>
          <p className="text-[10px] py-2 ">
          4. Winning Conditions
            <br/>
            * If the ball lands on 0: The payout is x50 of the bet amount.
           <br/>  * If the ball lands on any number from 1 to 36: The payout is x35 of the bet amount.
           <br/> * If the ball lands on a Black slot: The payout is x2 of the bet amount.
           <br/> * If the ball lands on a Red slot: The payout is x2 of the bet amount.
           <br/> * If the ball lands on a Blue slot: The payout is x2 of the bet amount.
          </p>
          <p className="text-[10px] py-2 ">
          5. Betting Restrictions
            <br/>
            * Bets cannot be placed or adjusted in the last 15 seconds of each round.
           <br/>
           <br/>
           Good luck, and may you hit the Jackpot!
          </p>
          </div>
     
        </Box>
      </Drawer>
    </>
  );
};

export default Rule;
