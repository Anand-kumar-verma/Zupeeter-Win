import React, { useState } from "react";
import { useSocket } from "../../../shared/socket/SocketContext";
import countdownfirst from "../../assets/images/30_second_left.wav";
import place_your_bet from "../../assets/images/place_your_bet.wav";

const SvgCircle = () => {
  const socket = useSocket();
  const [angle, setAngle] = useState(360);
  const [time, setTime] = useState();
  const audioRefMusic = React.useRef(null);
  const audioRefMusicPlaceBet = React.useRef(null);
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      x,
      y,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");

    return d;
  };

  const arcPath = describeArc(50, 50, 50, 0, angle);

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  const handlePlaySoundPlaceBet = async () => {
    try {
      if (audioRefMusicPlaceBet?.current?.pause) {
        await audioRefMusicPlaceBet?.current?.play();
      } else {
        await audioRefMusicPlaceBet?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  React.useEffect(() => {
    const handleOneMin = (onemin) => {
      // setOne_min_time(onemin);
      setAngle(onemin === 0 ? 0 : ((60-onemin+1)) * 6);
      setTime(onemin);
      if (onemin === 30) {
        handlePlaySound();
      }
      if (onemin === 57) {
        handlePlaySoundPlaceBet();
      }
    };
    socket.on("oneminrollet", handleOneMin);
    return () => {
      socket.off("oneminrollet", handleOneMin);
    };
  }, []);

  return (
    <div className="!w-full !h-full !flex !justify-center !items-center transform rotate-90">
      {React.useMemo(() => {
        return (
          <>
            <audio ref={audioRefMusic} hidden>
              <source src={`${countdownfirst}`} type="audio/mp3" />
            </audio>
            <audio ref={audioRefMusicPlaceBet} hidden>
              <source src={`${place_your_bet}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [audioRefMusic, audioRefMusicPlaceBet])}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d={arcPath}
          fill={
            (time  <= 30 && time  > 15)
              ? "#ffff0080" // yellow
              : time  <= 15
                ? "#ff000080" // red
                : "#008000a6" // green
          }
        />
      </svg>
    </div>
  );
};

export default SvgCircle;
