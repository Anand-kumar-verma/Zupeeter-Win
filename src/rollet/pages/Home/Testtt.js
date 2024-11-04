import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Collapse, Drawer, Stack, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../../Shared/CookieStorage";
import { useSocket } from "../../../Shared/SocketContext";
import {  getProfileRollet, logOutFunctoinRoulette, walletamount, } from "../../../services/apicalling";
import axios from "axios";
import { endpoint } from "../../../services/urls";
import placebetmusic from "../../assets/images/applybet_music.mp3";
import mouse_click from "../../assets/images/mouse_click.mp3";
import wheel_roulette from "../../assets/images/rotate_wheel_ball_music.mp3";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import roulettebg from "../../../rollet/assets/images/thumbs_bgs.png";
import roulette from "../../assets/images/realwgeelwith1red.png";
import stop_ball_music from "../../assets/images/stop_ball_music.mp3";
import watch from "../../assets/images/watch.png";
import { addWinCap, black_array, confirmBet, justDouble, rebetFuncton, red_array, spinFunction, } from "../../sharedFunction";
import Rolletball from "../Rolletball";
import Coin from "./Coin";
import { style } from "./CommonCss";
import ConfirmationDialogBox from "./ConfirmationDialogBox";
import Rule from "./Rule";
import SvgCircle from "./SvgCircle";
import MyTableComponent from "./Tablehistory";
import TwoToOne from "./TwoToOne";
import dealer from "../../../rollet/assets/images/pngegg.png";
import { apiConnectorGet } from "../../../services/apiconnector";



function Home() {
  const navigate = useNavigate();
  const isAlreadyAppliedBet = localStorage?.getItem("rollet_bet_placed");
  let isPreBet = localStorage.getItem("isPreBet");
  let total_amount_bet = localStorage.getItem("total_amount_bet") || 0;
  const client = useQueryClient();
  const socket = useSocket();
  const audioRefMusic = useRef();
  const audioRefMusicStopBall = useRef();
  const mouseClickSoundref = useRef();
  const placeBetMusic = useRef();
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const [open1, setOpen1] = useState();
  const [loding, setloding] = useState(false);
  const [isOpenPreRoundDialogBox, setisOpenPreRoundDialogBox] = useState(false);
  const [isSelectedDropBet, setisSelectedDropBet] = useState(false);
  const user_id = value && JSON.parse(value)?.UserID;
  const [openDialogBoxhistory, setopenDialogBoxhistory] = useState(false);
  const [one_min_time, setOne_min_time] = useState(0);
  const [result_rollet, setresult_rollet] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [bet, setBet] = useState([]);
  const [openDialogBox, setOpenDialogBox] = useState("");
  const [amount, setAmount] = useState(10);
  const [rebet, setrebet] = useState([]);
  const [preBetHandle, setIsPreBetHandle] = useState(false);
  useEffect(() => {
    localStorage?.setItem("isPreBet", false);
  }, []);
  const { isLoading: wallet_amont_lodin, data: wallet_amount } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const wallet_amount_data = wallet_amount?.data?.data || 0;
  useMemo(() => {
    console.log(wallet_amount_data);
  }, [wallet_amount?.data?.data]);
  const { isLoading, data } = useQuery(
    ["profile_rollet"],
    () => getProfileRollet(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const profileData = data?.data?.data || 0;

  const { isLoading: bet_result_history_loding, data: bet_result_history } =
    useQuery(["history_rollet_result"], () => apiConnectorGet(endpoint.node.game_result), {
      refetchOnMount: false,
      refetchOnReconnect: true,
    });

  const bet_result_history_Data = useMemo(() => {
    return bet_result_history?.data?.data?.slice(0, 10) || [];
  }, [bet_result_history]);

  function removeSingleBetFunction(id) {
    let filterArray = bet?.filter((i) => i?.id !== id);
    setBet(filterArray);
    let element = document.getElementById(`${id}`);
    let span = element.querySelector("span");
    if (span) {
      element.removeChild(span);
    }
  }

  function setBetFuncton(id, number, amount) {
    if (isAlreadyAppliedBet === "true") return;
    if (one_min_time <= 10) return;
    handlePlaySoundPlacebet();

    const total_bet_amont =
      bet?.reduce((a, b) => a + Number(b?.amount), 0) + amount;

    if (
      total_bet_amont >
      Number(
        Number(wallet_amount_data?.wallet || 0) +
        Number(wallet_amount_data?.winning || 0)
      )?.toFixed(2)
    )
      return toast(
        <span
          className="!bg-blue-800 !py-2 !px-4 !text-white !border-2 !border-red-800 !rounded-full"
          style={{ display: "inline-block", transform: "rotate(90deg)" }}
        >
          Insufficient Wallet Amount
        </span>
      );
    const obj = {
      id: id,
      number: number,
      amount: amount,
    };
    let isContainsPre = bet?.find((i) => i?.id === id);
    if (isContainsPre) {
      const updatedArray = bet?.map((item) => {
        if (item.id === id) {
          return { ...item, amount: amount };
        }
        return item;
      });
      setBet(updatedArray);
    } else {
      console.log("inside else");
      setBet([...bet, obj]);
    }

    let element = document.getElementById(`${id}`);
    element.style.position = "relative"; // Ensure the parent is positioned relatively
    let newelement = element.querySelector("span");

    if (newelement) {
      newelement.innerHTML = `${amount >= 1000 ? String(amount / 1000) + "k" : amount
        }`;
    } else {
      newelement = document.createElement("span");
      let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
      newelement.innerHTML = `${vlaue}`;
      newelement.style.position = "absolute"; // Make the span position absolute
      newelement.style.top = "50%"; // Center vertically
      newelement.style.left = "50%"; // Center horizontally
      newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
      newelement.style.display = "flex"; // Use flexbox for centering content
      newelement.style.alignItems = "center"; // Center content vertically
      newelement.style.justifyContent = "center"; // Center content horizontally
      newelement.style.textAlign = "center";
      newelement.style.height = "15px"; // Ensure height is sufficient
      newelement.style.width = "15px"; // Ensure width is sufficient
      newelement.style.backgroundColor = "white";
      newelement.style.color = "black";
      newelement.style.border = "1px solid blue";
      newelement.style.borderRadius = "50%";
      newelement.style.padding = "3px";
      newelement.style.fontSize = "8px"; // Adjust font size for better visibility
    }

    element.appendChild(newelement);
  }

  useEffect(() => {
    if (one_min_time === 16 && bet?.length > 0) {
      if (isAlreadyAppliedBet === "false" || !isAlreadyAppliedBet) {
        mouseClickSound();
        confirmBet(
          setloding,
          rebet,
          setrebet,
          bet,
          setBet,
          user_id,
          wallet_amount_data,
          client
        );
      }
    }
    if (one_min_time === 59 && bet?.length > 0) {
      removeBetFunctonAll();
    }
  }, [one_min_time]);

  function removeBetFunctonAll() {
    bet?.forEach((ele) => {
      let element = document.getElementById(`${ele?.id}`);
      let span = element.querySelector("span");
      if (span) {
        element.removeChild(span);
      }
    });
    setBet([]);
  }

  useEffect(() => {
    if (!checkTokenValidity()) {
      logOutFunctoinRoulette(navigate);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  useEffect(() => {
    if (bet?.length > 0) setOpenDialogBox(false);
  }, [bet]);

  const speakMessage = (message) => {
    if ("speechSynthesis" in window) {
      let newMessage = "hii";
      if (red_array?.includes(message)) {
        newMessage = String(message) + " " + "Red Wins";
      } else if (black_array?.includes(message)) {
        newMessage = String(message) + " " + "Black Wins";
      } else {
        newMessage = String(message) + " " + "Special";
      }

      const speech = new SpeechSynthesisUtterance(newMessage);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      console.error("Speech Synthesis is not supported in this browser.");
    }
  };

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
  const handlePlaySoundStopBall = async () => {
    try {
      if (audioRefMusicStopBall?.current?.pause) {
        await audioRefMusicStopBall?.current?.play();
      } else {
        await audioRefMusicStopBall?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  const mouseClickSound = async () => {
    try {
      if (mouseClickSoundref?.current?.pause) {
        await mouseClickSoundref?.current?.play();
      } else {
        await mouseClickSoundref?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);

      if (onemin === 58 || onemin === 57) {
        setIsPreBetHandle(true);
        localStorage.setItem("total_amount_bet", 0);
      }
      if (onemin === 55) localStorage?.setItem("rollet_bet_placed", false);
      if (onemin === 0) {
        handlePlaySound();
      }

      if (onemin === 15) {
        let id = localStorage.getItem("result_rollet");
        let element = document.getElementById(`${String(id)}_rotate`);

        element?.classList.add("hidden");
        setresult_rollet("");
      }
      if (onemin > 10) {
        setisOpenPreRoundDialogBox(false);
      }
      if (onemin <= 10) {
        setisSelectedDropBet(false);
        setopenDialogBoxhistory(false);
        setOpen(false);
        setOpen2(false);
        setOpenDialogBox(false);
      }
    };
    const handleOneMinrolletresult = (onemin) => {
      spinFunction(onemin);
      localStorage.setItem("result_rollet", onemin);

      setTimeout(() => {
        handlePlaySound();
      }, 9000);

      setTimeout(() => {
        handlePlaySoundStopBall();
        setresult_rollet(onemin);
        client.refetchQueries("history_rollet");
        client.refetchQueries("walletamount");
        client.refetchQueries("history_rollet_result");
        speakMessage(onemin);
        addWinCap(onemin);
        getWinPopup();
      }, 12000);
    };
    socket.on("oneminrollet", handleOneMin);
    socket.on("rolletresult", handleOneMinrolletresult);
    return () => {
      socket.off("oneminrollet", handleOneMin);
      socket.off("rolletresult", handleOneMinrolletresult);
    };
  }, []);

  useEffect(() => {
    if (one_min_time <= 10) setisOpenPreRoundDialogBox(true);
  }, []);

  async function getWinPopup() {
    let isPlaced = localStorage.getItem("rollet_bet_placed");
    let win_amount = 0;
    try {
      const response = await axios.get(
        endpoint?.rollet?.history + `?userid=${user_id}&limit=0`
      );

      const newupdatedArray = response?.data?.data?.[0] || [];
      console.log(newupdatedArray, "new array");
      win_amount = newupdatedArray?.win || 0;
      if (win_amount > 0 && isPlaced === "true") {
        setOpenDialogBox(win_amount);
        setTimeout(() => {
          localStorage?.setItem("rollet_bet_placed", false);
          localStorage?.setItem("betlen", 0);
        }, 2000);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  }

  const handleConfirm = () => {
    setOpen1(false);
    localStorage.setItem("isPreBet", false);
    window.location.href = "/dashboard";
  };

  const handlePlaySoundPlacebet = async () => {
    try {
      if (placeBetMusic?.current?.pause) {
        await placeBetMusic?.current?.play();
      } else {
        await placeBetMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  const [open3, setOpen3] = useState(false);

  const toggleDrawer3 = (data) => () => {
    setOpen3(data);
  };

  return (
    <Box className="home" sx={style.root}>
      <Collapse in={open3}>
        <Box sx={{ position: 'absolute', width: '90%', height: '50%', background: 'red', zIndex: '1000', left: '5%', top: '25%', borderRadius: '10px' }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundImage: `url(${roulettebg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            borderRadius: '10px'
          }}>
            <div
              style={{
                width: '250px',
                height: '250px',
                position: 'absolute',
                top: '15%',
                right: '10%',
              }}
              className=" !flex !justify-center !items-center animation_image"
            >
              <img
                src={roulette}
                className="!h-full !w-full !bg-no-repeat "
              />
              <Rolletball />
            </div>

            <Box sx={{
              position: "absolute",
              top: "45%",
              left: "-38%",
              width: "92%",
              height: "10%",
              display: "flex",
              justifyContent: "space-around",
              transform: "rotate(90deg)",
            }}>
              <Button sx={{ width: '30%', background: '#E70127' }} onClick={toggleDrawer3(false)} variant="contained">close</Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
      <CustomCircularProgress isLoading={loding} />
      {useMemo(() => {
        return (
          <>
            <audio ref={placeBetMusic} hidden>
              <source src={`${placebetmusic}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [placeBetMusic])}
      <Rule setOpen2={setOpen2} open2={open2} style={style} />
      <Box

      >
        <Box
        >
          {useMemo(() => {
            return (
              <>
                <audio ref={audioRefMusic} hidden>
                  <source src={`${wheel_roulette}`} type="audio/mp3" />
                </audio>
                <audio ref={audioRefMusicStopBall} hidden>
                  <source src={`${stop_ball_music}`} type="audio/mp3" />
                </audio>
                <audio ref={mouseClickSoundref} hidden>
                  <source src={`${mouse_click}`} type="audio/mp3" />
                </audio>
              </>
            );
          }, [audioRefMusic, audioRefMusicStopBall, mouseClickSoundref])}
          {/* {useMemo(() => { */}
          {/* return ( */}

          {/* ); */}
          {/* }, [])} */}
          <Rule setOpen2={setOpen2} open2={open2} style={style} />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <ConfirmationDialogBox
              style={style}
              handleConfirm={handleConfirm}
              open1={open1}
              setOpen1={setOpen1}
              isOpenPreRoundDialogBox={isOpenPreRoundDialogBox}
            />
            <Box sx={style.naiming100}>
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <Typography variant="body1" color="initial">
                {profileData?.full_name
                  ? profileData?.full_name?.substring(0, 10) + "..."
                  : "*******"}
              </Typography>
            </Box>
            <Box sx={style.naiming200}>
              <Typography variant="body1" color="initial">
                Bet Amount
              </Typography>
              <Typography variant="body1" color="initial">
                {bet?.reduce((a, b) => a + Number(b?.amount), 0) ||
                  Number(total_amount_bet)?.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={style.naiming300}>
              <Typography variant="body1" color="initial">
                You Win
              </Typography>
              <Typography variant="body1" color="initial">
                {openDialogBox ? Number(openDialogBox || 0)?.toFixed(2) : 0}
              </Typography>
            </Box>
            {/* <Box direction={"row"} sx={style.winnerlooserouter}>
              <Box sx={style.winnerLooserList2}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                  className="!text-[10px]"
                >
                  Name:{" "}
                  {profileData?.full_name
                    ? profileData?.full_name?.substring(0, 10) + "..."
                    : "*******"}
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  Bet Amount:{" "}
                  <span style={{ color: "red" }}>

                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  You Win :{" "}
                  <span style={{ color: "#15158F !important" }}>
                    {openDialogBox ? Number(openDialogBox || 0)?.toFixed(2) : 0}
                  </span>
                </Typography>
              </Box>
            </Box> */}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Box direction={"row"} sx={style.winnerlooserouter2}>
              {[20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]?.map((ele) => {
                return (
                  <Box key={ele} sx={style.winnerLooserList}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "green" }}
                    >
                      {/* {black_array?.includes(
                        Number(bet_result_history_Data?.[ele]?.number)
                      ) && Number(bet_result_history_Data?.[ele]?.number)} */}
                      {ele}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "green" }}
                      className="!mx-2"
                    >
                      {/* {0 === Number(bet_result_history_Data?.[ele]?.number) &&
                        Number(bet_result_history_Data?.[ele]?.number)} */}
                      {ele}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "green" }}
                    >
                      {/* {red_array?.includes(
                        Number(bet_result_history_Data?.[ele]?.number)
                      ) && Number(bet_result_history_Data?.[ele]?.number)} */}
                      {ele}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Box direction={"row"} sx={style.winnerlooserouter3}>
              <Box sx={style.winnerLooserList3}>
                <Typography
                  variant="body1"
                  color="initial"

                >
                  {result_rollet}
                </Typography>
              </Box>
            </Box>
          </Box>
          <TwoToOne
            isSelectedDropBet={isSelectedDropBet}
            removeSingleBetFunction={removeSingleBetFunction}
            // setOpenDialogBox={setOpenDialogBox}
            bet={bet}
            setBetFuncton={setBetFuncton}
            amount={amount}
          />
          {useMemo(() => {
            return (
              <Box sx={{ width: '110px', height: '110px', background: '#ff000000', backdropFilter: 'blur(5px)', border: `1px solid #6C10ED`, transform: 'rotate(180deg)', display: 'flex', position: 'absolute', bottom: '14%', right: '2%', padding: '5px', borderRadius: '5px' }}>
                <Box sx={{ width: '70px', height: '100px', background: 'transparent' }}>
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      cursor: 'pointer',
                      mt: '16px'
                    }}

                  >
                    <div
                      className=" !flex !justify-center !items-center animation_image"
                    >
                      <img
                        src={roulette}
                        className="!h-full !w-full !bg-no-repeat "
                      />
                      <Rolletball />
                    </div>
                  </Box>
                </Box>
                <Box sx={{ width: '30px', height: '100px', background: '#6C10ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography onClick={toggleDrawer3(true)} variant="body1" color="initial" sx={{ fontWeight: '500', transform: 'rotate(-90deg)', color: 'white', borderRadius: '5px', }}>View</Typography>
                </Box>
              </Box>
            );
          }, [])}
          <Box
            sx={{
              width: "25px",
              height: "100%",
            }}
          >
            {preBetHandle && isPreBet === "true" && one_min_time > 10 && (
              <>
                <Box
                  sx={style.naiming10}
                  component={NavLink}
                  className={"!ml-10"}
                >
                  <Typography
                    onClick={() => justDouble(bet, setBet, wallet_amount_data)}
                    variant="body1"
                    color="initial"
                  >
                    Double
                  </Typography>
                </Box>
                <Box
                  sx={style.naiming11}
                  component={NavLink}
                  className={"!ml-16"}
                >
                  <Typography
                    onClick={() =>
                      rebetFuncton(bet, rebet, setBet, wallet_amount_data)
                    }
                    variant="body1"
                    color="initial"
                  >
                    Re - bet
                  </Typography>
                </Box>
              </>
            )}
            <Box sx={style.naiming}>
              <Typography variant="body1" color="initial">
                POINT BALANCE
              </Typography>
              <Typography variant="body1" color="initial">
                {Number(
                  Number(wallet_amount_data?.wallet || 0) +
                  Number(wallet_amount_data?.winning || 0)
                )?.toFixed(2)}
              </Typography>
            </Box>
            {/* <Box sx={style.naiming2}>
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <Typography variant="body1" color="initial">
                {isLoading ? (
                  <CircularProgress className="!text-red-600" size={"small"} />
                ) : profileData?.full_name ? (
                  profileData?.full_name?.substring(0, 15)
                ) : (
                  "*****"
                )}
              </Typography>
            </Box> */}
            <Coin
              mouseClickSound={mouseClickSound}
              setAmount={setAmount}
              amount={amount}
              setisSelectedDropBet={setisSelectedDropBet}
            />
            <Box sx={style.naiming3}>
              <Typography
                variant="body1"
                color="initial"
                onClick={() => {
                  mouseClickSound();
                  one_min_time > 10 && setopenDialogBoxhistory(true);
                }}
              >
                GAME HISTORY
              </Typography>
            </Box>

            <Box
              sx={style.naiming4}
              onClick={() => {
                mouseClickSound();
                setOpen1(true);
              }}
            >
              <Typography variant="body1" color="initial">
                LEAVE TABLE
              </Typography>
            </Box>
            {one_min_time > 10 && (
              <>
                <Box sx={style.naiming5} className={"!flex !gap-3"}>
                  <Typography
                    className="!bg-[#15158f] !p-1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      mouseClickSound();
                      confirmBet(
                        setloding,
                        rebet,
                        setrebet,
                        bet,
                        setBet,
                        user_id,
                        wallet_amount_data,
                        client
                      );
                    }}
                    variant="body1"
                    color="initial"
                  >
                    CONFIRM
                  </Typography>
                </Box>
                {bet?.length > 0 && isAlreadyAppliedBet === "false" && (
                  <>
                    <Box sx={style.naiming12} className={"!flex !gap-3"}>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          setisSelectedDropBet(true);
                        }}
                        variant="body1"
                        color="initial"
                      >
                        Remove
                      </Typography>
                    </Box>
                    <Box sx={style.naiming13} className={"!flex "}>
                      <Typography
                        onClick={() => removeBetFunctonAll()}
                        variant="body1"
                        color="initial"
                      >
                        CLEAR BET
                      </Typography>
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
          <Box component='img' src={dealer} sx={{ width: "186px", position: 'absolute', zIndex: '1000', top: '16%', right: '-9%', transform: 'rotate(90deg)', }}></Box>
          <Box
            // countdown
            sx={{
              ...style.countdownOuter,
              backgroundImage: `url(${watch})`,
              backgroundSize: "100%",
            }}
            className=" !flex !justify-center !items-center"
          >
            <div
              className="!text-white absolute right-[-40px] !text-[10px] transform rotate-90"
              style={{
                background: "#6C10ED",
                padding: "5px",
                marginRight: "-15px",
                borderRadius: "2px",
              }}
            >
              Time Left: {show_this_one_min_time}
            </div>

            <SvgCircle />
          </Box>

          <Drawer
            sx={{
              "&>div": {
                background: "#0000009e",
                height: "90vh",
                width: "100%",
                //  minWidth:'80% important',
                ...style.flex,
              },
            }}
            anchor="top"
            open={openDialogBoxhistory}
            onClose={() => {
              setopenDialogBoxhistory(!openDialogBoxhistory);
            }}
          >
            <Box
              sx={{
                width: "150%",
                height: "50%",
                background: "white",
                transform: "rotate(90deg)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Stack direction="row" sx={{ float: "right", my: 1 }}>
                <CloseIcon onClick={() => setopenDialogBoxhistory("")} />
              </Stack>
              <MyTableComponent bet_history_Data={bet_history_Data} />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box >
  );
}
export default Home;


















































// home 





































