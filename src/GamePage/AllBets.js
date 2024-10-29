import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useSocket } from "../shared/socket/SocketContext";

const AllBets = ({ formik, fk }) => {
  const [allbetsdata, setAllBetsData] = useState([]);
  const [isLoading, setisLoding] = useState(false);
  const [combineTime, setcombineTime] = useState("0_0");
  let seconds = Number(combineTime?.split("_")?.[1]);
  const socket = useSocket();

  useEffect(() => {
    const handleBet = (data) => {
      const cashoutValue = (data.amount * data.multiplier).toFixed(2);
      setAllBetsData((prevAllBetsData) => [
        { ...data, amountcashed: cashoutValue },
        ...prevAllBetsData,
      ]);
    };

    const handleSeconds = (seconds) => {
      setcombineTime(seconds);
    };

    const user_bet_cashoutFn = (data) => {
      const cashoutValue = (data.amount * data.multiplier).toFixed(2);
      setAllBetsData((prevAllBetsData) =>
        prevAllBetsData.map((i) => {
          if (i.id === data.id) {
            return {
              ...i,
              amountcashed: cashoutValue,
              multiplier: data.multiplier,
            };
          }
          return i;
        })
      );
    };

    const handleSetLoader = (setloder) => {
      setcombineTime("0_0");
      setAllBetsData([]);

      const characters = "abcdefghijklmnopqrstuvwxyz";
      const array = Array(Math.floor(Math.random() * 30) + 1)
        .fill(0)
        .map((_, index) => {
          const amount = Math.floor(Math.random() * 1000) + 1; // Use 10 if amountdata is set
          const multiplier = (Math.random() * (6 - 1) + 1).toFixed(2);
          return {
            id: index + 1,
            email: `${characters.charAt(Math.floor(Math.random() * characters.length))}${characters.charAt(Math.floor(Math.random() * characters.length))}@gmail.com`,
            multiplier: multiplier,
            amountcashed: (amount * multiplier).toFixed(2),
            amount: amount,
          };
        });
      setAllBetsData(array);
    };

    socket.on("setloder", handleSetLoader);
    socket.on("seconds", handleSeconds);
    socket.on("user_bet", handleBet);
    socket.on("user_bet_cashout", user_bet_cashoutFn);

    return () => {
      socket.off("user_bet", handleBet);
      socket.off("seconds", handleSeconds);
      socket.off("setloder", handleSetLoader);
      socket.off("user_bet_cashout", user_bet_cashoutFn);
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  // Filter bets based on seconds
  const filteredBets = allbetsdata.filter((bet) => Number(bet.multiplier) <= seconds);

  return (
    <div className="max-h-[90%] overflow-auto hide flex flex-col gap-1 relative">
      <div className="w-full !bg-black">
        <p className="text-white text-[12px]">
          <span>All Bets: </span>
          <span>{filteredBets.length || 0}</span>
        </p>
        <div className="grid grid-cols-3 place-items-start !bg-black px-1">
          <p className="text-[10px] text-gray-500">User</p>
          <p className="text-[10px] text-gray-500">Bet INT x</p>
          <p className="text-[10px] text-gray-500">Cash out, INR</p>
        </div>
      </div>
      {filteredBets.map((i, index) => {
        const isFirstRow = index === 3;
        const isMidRow = index === 8;
        const isLastRow = index === filteredBets.length - 5;

        return (
          <div
            key={index}
            className={`${isFirstRow || isLastRow || isMidRow
              ? "bg-[#006400] !text-white" // Dark green for first and last rows
              : "bg-black bg-opacity-30 border-[2px] border-[#1e430ff6]" // Fixed color for middle rows
              } w-auto grid grid-cols-3 place-items-start !py-1 items-center rounded-md px-1`}
          >
            <div>
              <p className="flex items-center gap-3">
                <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 24, height: 24, fontSize: 10 }}
                />
                <span className="text-[10px] text-gray-500">
                  {(i.email.substring(0, 1) || "*") + "**" + (i.email.substring(1, 2) || "*")}
                </span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-gray-500">
                {Number(i.amount || 0).toFixed(2)}
              </span>
              <span className="bg-black rounded-full px-3 py-1 text-[10px]">
                {Number(i.multiplier || 0).toFixed(2)} x
              </span>
            </div>
            <div className="flex w-full justify-end">
              <div className="flex gap-2 items-center">
                <span className="text-[10px] text-white">
                  {Number(i.amountcashed || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
     
    </div>
  );
};

export default AllBets;
