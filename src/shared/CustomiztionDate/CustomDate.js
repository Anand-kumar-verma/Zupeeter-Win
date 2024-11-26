import React, { useState, useEffect } from "react";
import { ProfileDataFunction } from "../../services/apiCallings";
import { useQuery } from "react-query";
import moment from "moment";

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
      <div className="text-white flex justify-start gap-5">
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
    <div className="App">
      <CountdownTimer targetDate={targetDateObj} />
    </div>
  );
};

export default CustomDate;
