import CloseIcon from "@mui/icons-material/Close";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Container,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import { useSocket } from "../../../shared/socket/SocketContext";
import btbg1 from "../../../assets/btbg1.png";
import btbg2 from "../../../assets/btbg2.png";
import btbg3 from "../../../assets/btbg3.png";
import roulette from "../../../assets/mainrollet.png";
import model2 from "../../../rollet/assets/images/model2.png";
import dealer from "../../../rollet/assets/images/model3.png";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import placebetmusic from "../../assets/images/applybet_music.mp3";
import mouse_click from "../../assets/images/mouse_click.mp3";
import wheel_roulette from "../../assets/images/rotate_wheel_ball_music.mp3";
import stop_ball_music from "../../assets/images/stop_ball_music.mp3";
import rouletteBORD from "../../assets/images/thumbs_bgs.png";
import watch from "../../assets/images/watch.png";
import {
  addWinCap,
  black_array,
  confirmBet,
  justDouble,
  justHalf,
  rebetFuncton,
  red_array,
  spinFunction,
} from "../../sharedFunction";
import Rolletball from "../Rolletball";
import Coin from "./Coin";
import { style } from "./CommonCss";
import ConfirmationDialogBox from "./ConfirmationDialogBox";
import Rule from "./Rule";
import SvgCircle from "./SvgCircle";
import MyTableComponent from "./Tablehistory";
import TwoToOne from "./TwoToOne";
import { ProfileDataFunction } from "../../../services/apiCallings";
import Layout from "../../../component/layout/Layout";

function Home() {
  const isAlreadyAppliedBet = localStorage?.getItem("rollet_bet_placed");
  let isPreBet = localStorage.getItem("isPreBet");
  let total_amount_bet = localStorage.getItem("total_amount_bet") || 0;
  const client = useQueryClient();
  const socket = useSocket();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const audioRefMusic = useRef();
  const audioRefMusicStopBall = useRef();
  const mouseClickSoundref = useRef();
  const placeBetMusic = useRef();
  const [open1, setOpen1] = useState();
  const [open3, setOpen3] = useState();
  const [loding, setloding] = useState(false);
  const [isOpenPreRoundDialogBox, setisOpenPreRoundDialogBox] = useState(false);
  const [isSelectedDropBet, setisSelectedDropBet] = useState(false);
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
  const { data: wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.get_balance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const newdata = wallet?.data?.data || 0;


  const { data } = useQuery(["profile_rollet"], () => ProfileDataFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus:false
  });

  const profileData = data?.data?.data || 0;

  const { data: hist } = useQuery(
    ["history_rollet"],
    () => apiConnectorGet(endpoint.node.history_my),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = hist?.data?.data || [];

  const { data: bet_result_history } = useQuery(
    ["history_rollet_result"],
    () => apiConnectorGet(endpoint.node.game_result),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus:false
    }
  );

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
        Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
      )?.toFixed(2)
    )
      return toast(
        <span
          className=" !py-2 !px-4 !text-white"
          style={{ display: "inline-block" }}
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
      newelement.innerHTML = `${
        amount >= 1000 ? String(amount / 1000) + "k" : amount
      }`;
    } else {
      newelement = document.createElement("span");
      let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
      newelement.innerHTML = `${vlaue}`;
      newelement.style.position = "absolute"; // Make the span position absolute
      newelement.style.top = "50%"; // Center vertically
      newelement.style.left = "50%"; // Center horizontally
      if (String(id) === "112")
        newelement.style.transform = "translate(-50%, -50%) rotate(269deg)";
      else if (String(id) === "201")
        newelement.style.transform = "translate(-50%, -50%) rotate(179deg)";
      else if (String(id) === "312")
        newelement.style.transform = "translate(-50%, -50%) rotate(270deg)";
      else {
        newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
      }
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
      newelement.style.rotate = "50";
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
          newdata,
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
        setOpen3(false);
        setIsPreBetHandle(true);
        localStorage.setItem("total_amount_bet", 0);
      }
      if (onemin === 55) localStorage?.setItem("rollet_bet_placed", false);
      if (onemin === 0) {
        setOpen3(true);
        handlePlaySound();
      }

      if (onemin === 15) {
        setOpen3(false);
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
      console.log(onemin, "roulette result function");
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
    // oneminrollet
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
      const response = await apiConnectorGet(endpoint.node.history_my);
      const newupdatedArray = response?.data?.data?.[0]?.win || [];
      console.log(response?.data?.data?.[0]?.win, "ff");
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

  return (
    <Container className="!bg-transparent">
    <Box className="home" sx={style.root}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        className="w95"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReplyOutlinedIcon
            sx={{ color: "gray", width: "20px", mr: 1 }}
            onClick={() => {
              mouseClickSound();
              setOpen1(true);
            }}
          />
          <Box sx={style.p15}>
            {" "}
            <Typography variant="h6" color="initial" sx={style.p13}>
              Balance ₹{" "}
              {Number(
                Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
              )?.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ListOutlinedIcon
            sx={{ color: "gray", width: "20px" }}
            onClick={() => {
              mouseClickSound();
              one_min_time > 10 && setopenDialogBoxhistory(true);
            }}
          />
        </Box>
      </Stack>
      <Stack
        sx={{ alignItems: "center", justifyContent: "space-between" }}
        direction="row"
      >
        <Stack
          sx={{ alignItems: "center", justifyContent: "space-between" }}
          direction="row"
        >
          <Box
            sx={{
              width: "50px",
              height: "40px",
              background: "#BA903B",
              borderRadius: "5px",
              border: "1px solid white",
              mr: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "25px",
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              {" "}
              {result_rollet}
            </Typography>
          </Box>
          <Box>
            <Typography className="!text-xs " variant="body1" sx={style.p13}>
              {" "}
              {profileData?.full_name
                ? profileData?.full_name?.substring(0, 10) + "..."
                : "*******"}
            </Typography>
            <Typography className="!text-xs" variant="body1" sx={style.p13}>
              {" "}
              Bet :{" "}
              {bet?.reduce((a, b) => a + Number(b?.amount), 0) ||
                Number(total_amount_bet)?.toFixed(2)}
            </Typography>
            <Typography
              className="!-mb-2 !text-xs"
              variant="body1"
              sx={style.p13}
            >
              {" "}
              Win : {Number(res?.[0]?.win || 0)?.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
        <Collapse in={open3}>
          <Box
            sx={{
              position: "absolute",
              width: "90%",
              height: "50%",
              background: "red",
              zIndex: "1000",
              left: "5%",
              top: "25%",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                // backgroundImage: `url(${roulettebg})`,
                // backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                // background: '#BA903B',
                backgroundImage: `url(${rouletteBORD})`,
                borderRadius: "10px",
                border: "1px solid white",
              }}
            >
              <div
                // style={{
                //   width: "250px",
                //   height: "250px",
                //   position: "absolute",
                //   top: "5%",
                //   right: "15%",
                // }}
                // style={{
                //   width: '300px',
                //   height: '300px',
                //   bottom:"12px",
                //   left:"12px",
                //   position: 'absolute',
                //  }}
                className=" !flex !justify-center !items-center animation_image z-50"
              >
                <img
                  src={roulette}
                  alt=""
                  className="!h-full !w-full !bg-no-repeat "
                />
                <Rolletball/>
              </div>
            </Box>
          </Box>
        </Collapse>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            background: "#BA903B",
            borderRadius: "5px",
            border: "1px solid white",
          }}
        >
          {useMemo(() => {
            return (
              <>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <div className=" !flex !justify-center !items-center animation_image">
                    <img
                      src={roulette}
                      className="!h-full !w-full !bg-no-repeat "
                    />
                    {/* <Rolletball /> */}
                  </div>
                </Box>

                {/* <Box sx={{ width: '50px', height: '25px', background: '#BA903B', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', mt: 1, }}
                onClick={toggleDrawer3(true)}>
                  <Typography  variant="body1" color="initial" sx={{ fontWeight: '500', color: 'white', borderRadius: '5px', }}><RemoveRedEyeIcon /></Typography>
                </Box> */}
              </>
            );
          }, [])}
        </Box>
      </Stack>

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
      
      <Box>
        <Box>
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
         
              <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              sx={{
                position: "absolute",
                top: "11%",
                right: "1%",
                width: "97%",
                "&>button": {
                  py: "10px",
                  background: "transparent",
                  "&.Mui-disabled": {
                    backgroundColor: "transparent",
                    color: "#757575",
                    cursor: "not-allowed",
                    opacity: "0.5",
                  },
                  "&:hover": { backgroundColor: "transparent" },
                },
                "&>button:nth-child(1)": {
                  backgroundImage: `url(${btbg1})`,
                  backgroundSize: "100% 100%",
                  color: "white",
                  width: "15%",
                },
                }}
            >
            <Button
              variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  // borderRadius: "5px",
                }}
                onClick={() => {
                  setOpen2(true);
                }}
              >
               Rule
              </Button>
               </ButtonGroup>
      
          {/* <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          > */}
          <ConfirmationDialogBox
            style={style}
            handleConfirm={handleConfirm}
            open1={open1}
            setOpen1={setOpen1}
            isOpenPreRoundDialogBox={isOpenPreRoundDialogBox}
          />
          {/* <Box sx={style.naiming100}>
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <Typography variant="body1" color="initial">
                {profileData?.full_name
                  ? profileData?.full_name?.substring(0, 10) + "..."
                  : "*******"}
              </Typography>
            </Box> */}
          {/* <Box sx={style.naiming200}>
              <Typography variant="body1" color="initial">
                Bet Amount
              </Typography>
              <Typography variant="body1" color="initial">
                {bet?.reduce((a, b) => a + Number(b?.amount), 0) ||
                  Number(total_amount_bet)?.toFixed(2)}
              </Typography>
            </Box> */}
          {/* <Box sx={style.naiming300}>
              <Typography variant="body1" color="initial">
                You Win
              </Typography>
              <Typography variant="body1" color="initial">
                {openDialogBox ? Number(openDialogBox || 0)?.toFixed(2) : 0}
              </Typography>
            </Box> */}
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
          {/* </Box> */}
          <Box
            direction={"row"}
            sx={{ ...style.winnerlooserouter2, ...style.flex }}
          >
            <Box
              sx={{
                width: "45px",
                height: "100%",
                position: "absolute",
                right: 0,
                border: "2px solid white",
                borderRadius: "5px",
              }}
            ></Box>
            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]?.map((ele) => {
              return (
                <Box key={ele} sx={{ ...style.winnerLooserList }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "green" }}
                  >
                    {black_array?.includes(
                      Number(bet_result_history_Data?.[ele]?.number)
                    ) && Number(bet_result_history_Data?.[ele]?.number)}
                    {/* {ele} */}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "green" }}
                  >
                    {0 === Number(bet_result_history_Data?.[ele]?.number) &&
                      Number(bet_result_history_Data?.[ele]?.number)}
                    {/* {ele} */}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "green" }}
                  >
                    {red_array?.includes(
                      Number(bet_result_history_Data?.[ele]?.number)
                    ) && Number(bet_result_history_Data?.[ele]?.number)}
                    {/* {ele} */}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          {/* <Box
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
          </Box> */}
          <TwoToOne
            isSelectedDropBet={isSelectedDropBet}
            removeSingleBetFunction={removeSingleBetFunction}
            // setOpenDialogBox={setOpenDialogBox}
            bet={bet}
            setBetFuncton={setBetFuncton}
            amount={amount}
          />
          {/* {useMemo(() => {
            return (
              <Box sx={{ width: '110px', height: '110px', background: '#ff000000', backdropFilter: 'blur(5px)', border: `1px solid #6C10ED`, transform: 'rotate(180deg)', display: 'flex', position: 'absolute', bottom: '14%', right: '2%', padding: '5px', borderRadius: '5px' }}>
                <Box sx={{ width: '70px', height: '100px', background: 'transparent' }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
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
          }, [])} */}
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
                    onClick={() => justDouble(bet, setBet, newdata)}
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
                    onClick={() => rebetFuncton(bet, rebet, setBet, newdata)}
                    variant="body1"
                    color="initial"
                  >
                    Re - bet
                  </Typography>
                </Box>
              </>
            )}
            {/* <Box sx={style.naiming}>
              <Typography variant="body1" color="initial">
                POINT BALANCE
              </Typography>
              <Typography variant="body1" color="initial">
                {Number(
                  Number(wallet_amount_data?.wallet || 0) +
                  Number(wallet_amount_data?.winning || 0)
                )?.toFixed(2)}
              </Typography>
            </Box> */}
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

            {/* <Box
              sx={style.naiming4}
              onClick={() => {
                mouseClickSound();
                setOpen1(true);
              }}
            >
              <Typography variant="body1" color="initial">
                LEAVE TABLE
              </Typography>
            </Box> */}
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              sx={{
                position: "absolute",
                bottom: "7%",
                right: "2%",
                width: "96%",
                "&>button": {
                  py: "10px",
                  background: "transparent",
                  "&.Mui-disabled": {
                    backgroundColor: "transparent",
                    color: "#757575",
                    cursor: "not-allowed",
                    opacity: "0.5",
                  },
                  "&:hover": { backgroundColor: "transparent" },
                },
                "&>button:nth-child(1)": {
                  backgroundImage: `url(${btbg1})`,
                  backgroundSize: "100% 100%",
                  color: "white",
                  width: "25%",
                },
                "&>button:nth-child(2)": {
                  backgroundImage: `url(${btbg2})`,
                  backgroundSize: "100% 100%",
                  color: "white",
                  width: "25%",
                },
                "&>button:nth-child(3)": {
                  backgroundImage: `url(${btbg1})`,
                  backgroundSize: "100% 100%",
                  color: "white",
                  width: "25%",
                },
                "&>button:nth-child(4)": {
                  backgroundImage: `url(${btbg3})`,
                  backgroundSize: "100% 100%",
                  color: "white",
                  width: "25%",
                },
              }}
            >
              <Button
                disabled={
                  one_min_time < 10 ||
                  !(bet?.length > 0 && isAlreadyAppliedBet === "false")
                }
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  borderRadius: "5px",
                }}
                onClick={() => removeBetFunctonAll()}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundImage: `url(${btbg3})`,
                  backgroundSize: "100% 100%",
                  color: "white !important",
                  fontSize: "20px",
                  fontWeight: "700",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                onClick={() => justHalf(bet, setBet, newdata)}
              >
                -
              </Button>
              <Button
                onClick={() => {
                  mouseClickSound();
                  confirmBet(
                    setloding,
                    rebet,
                    setrebet,
                    bet,
                    setBet,
                    user_id,
                    newdata,
                    client
                  );
                }}
                className="text-white w-[25%] !text-center pt-3 !cursor-pointer"
                sx={{
                  backgroundImage: `url(${btbg1})`,
                  backgroundSize: "100% 100%",
                  "&>div>input": {
                    color: "white !important",
                    fontSize: "20px",
                    fontWeight: "700",
                  },
                }}
              >
                {bet?.reduce((a, b) => a + Number(b?.amount), 0) ||
                  Number(total_amount_bet)?.toFixed(2)}
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundImage: `url(${btbg3})`,
                  backgroundSize: "100% 100%",
                  color: "white !important",
                  fontSize: "20px",
                  fontWeight: "700",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                onClick={() => justDouble(bet, setBet, newdata)}
              >
                +
              </Button>
              {/* <Button variant="contained" disabled={one_min_time < 10 || !(bet?.length > 0 && isAlreadyAppliedBet === "false")} onClick={() => removeBetFunctonAll()}>Clear Bet</Button> */}
              {/* <Button variant="contained" disabled={one_min_time < 10} onClick={() => {
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
              >Confirm</Button> */}
            </ButtonGroup>
            {/* {one_min_time > 10 && (
              <>
                <Box sx={{ ...style.naiming5 }} className={"!flex !gap-3"}>
                  <Typography
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
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          borderRadius: "5px",
                        }}
                      >
                        CLEAR BET
                      </Typography>
                    </Box>
                  </>
                )}
              </>
            )} */}
          </Box>
          <Box
            component="img"
            src={dealer}
            sx={{
              width: "230px",
              position: "absolute",
              bottom: "18%",
              left: "-3%",
              filter: "drop-shadow(2px 4px 30px #1B9E6F )",
            }}
          ></Box>
          <Box
            component="img"
            src={model2}
            sx={{
              width: "90px",
              position: "absolute",
              top: "-2%",
              right: "28%",
            }}
          ></Box>
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
                background: "#BA903B",
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
                width: "100%",
                height: "55%",
                // // transform: "rotate(90deg)",
                // width: "150%",
                // height: "55%",
                background: "white",
                // transform: "rotate(90deg)",
                borderRadius: "5px",
                padding: "0px",
              }}
            >
              <Stack direction="row" sx={{ float: "right", mx: 2 }}>
                <CloseIcon onClick={() => setopenDialogBoxhistory("")} />
              </Stack>
              <MyTableComponent res={res} />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
    </Container>
   
   
  );
}
export default Home;
