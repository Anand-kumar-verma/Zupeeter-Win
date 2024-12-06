import React, { useState, useEffect } from "react";
import { ProfileDataFunction } from "../../services/apiCallings";
import { useQuery } from "react-query";
import moment from "moment";
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { apiConnectorGet } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";

const CountdownTimer = ({ targetDate }) => {
  const [date, setDate] = useState(new Date(targetDate));

  useEffect(() => {
    setDate(new Date(targetDate));
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  function calculateTimeLeft(targetDate) {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  return (
    <div>
      <div className="text-white flex justify-center gap-5">
        {timeLeft && (
          <span>
            <span>{timeLeft.days}d</span> -{" "}
            <span>{timeLeft.hours}h</span> -{" "}
            <span>{timeLeft.minutes}m</span> -{" "}
            <span>{timeLeft.seconds}s</span>
          </span>
        )}
      </div>
    </div>
  );
};

const CustomDate = () => {

  const { data: walletaddress } = useQuery(
    ["address_own"],
    () => apiConnectorGet(endpoint?.zp_own_address), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  }
  )
  const ownaddress = walletaddress?.data?.data?.[0]

  const { data } = useQuery(["profile"], () => ProfileDataFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  const profile = data?.data?.data || [];
  const successDate = profile?.success_date;
  const targetDate = moment(successDate).add(1, 'years').format("YYYY-MM-DD");


  const targetDateObj = new Date(targetDate);
  return (
    <div className="coming-soon-container">
      <div className="background"></div>
      <div className="content">
        <NavLink to="/account/income-main">
          <img src={backbtn} alt='' className='mr-5 pb-10' />
        </NavLink>
        <h1 className="heading"> {profile?.success_date &&
              <Box >ZP : {Number(Number(profile?.tr15_amt || 0) / ownaddress?.token_amnt)?.toFixed(2)}  </Box>
                }</h1>
        <p className="subheading">    Staking Bonus
       </p>
       
        <div className="countdown-box">
          <p className="countdown-text"> 
         </p>
          <div className="timers"> 
            <CountdownTimer targetDate={targetDateObj} /></div>
           
         
        </div>

      </div>
    </div>

  );
};

export default CustomDate;
