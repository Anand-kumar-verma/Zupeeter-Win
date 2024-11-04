import React, { useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import { Close } from "@mui/icons-material";

const SattaRule = ({ setOpen2, open2, style }) => {

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
                        height:"90vh",

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
                        background: "#0A001B ",
                        // transform: "rotate(90deg)",
                        // borderRadius: "10px",
                        padding: "10px",
                        color: "white",
                        borderColor: "yellow  !important",
                    }}
                >
                    {" "}
                    <div
                        className="!text-white  text-[10px] flex justify-between px-1 "
                        onClick={() => {
                            setOpen2(false);
                        }}
                    > <Close/>{" "}
                         <p className="!text-center !text-lg">Satta Matka Game Rules</p>
                        <p></p> <p></p>
                       
                    </div>
                    <div className="flex flex-col !pl-1">
                
                        <p className="!text-[10px] py-2 pt-5">
                            Game Name: Satta Matka
                             <br />
                            Satta Matka offers four different betting types:
                            <br />1. Gali <br />
                            2. Desawar  <br />
                            3. Ghaziabad  <br />
                            4. Faridabad
                        </p>
                        <p className="text-[10px] py-2 ">
                        All four types share the same betting structure, with slots ranging from 00 to 99, along with two additional betting options:
                            <br />
                            	1. Andar (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)  .
                            <br /> 2. Bahar (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) .
                        </p>
                        <p className="text-[10px] py-2 ">
                        Steps to Play :
                            <br /> <br /> 
                            1. Placing Bets  <br/>
                            - Players can place bets on numbers from 00 to 99 and/or on Andar/Bahar.
                            <br /> -  Minimum bet: <br/>
                            - 00 to 99 slots: Minimum bet is 10. <br/>
                            - Andar/Bahar slots: Minimum bet is 5.
                        </p>
                        <p className="text-[10px] py-2 ">
                        2. Betting Time  
                            <br />
                            - Bets can be placed every 30 minutes.
                            <br />  - The betting window closes 5 minutes before the end of each round, and no bets can be placed or adjusted during this period.
                            
                        </p>
                        <p className="text-[10px] py-2 ">
                        3. Winning Conditions  
                            <br />
                            - If the winning number is between 00 and 99: The payout is x97 of the bet amount.
                            <br />
                            - If the winning combination is Andar/Bahar: The payout is x100 of the bet amount.
                          
                        </p>
                        <p className="text-[10px] py-2 ">
                        4. Betting Restrictions 
                            <br />
                            - No bets can be placed or changed in the final 5 minutes of each betting round for both the number slots and Andar/Bahar options.  
                            <br />
                            <br />
                            Enjoy the game, and good luck!
                        </p>
                    </div>

                </Box>
            </Drawer>
        </>
    );
};

export default SattaRule;
