import { History, List } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSocket } from "../../../shared/socket/SocketContext";
import { stardarkblue, stargrad } from "../../../shared/color";
import one from "../../../pages/SattaMatka/assets/images/Top-Reasons-Why-Satta-Matka-is-so-Famous-1024x538-Photoroom (1).jpg";
import buildings from "../../../pages/SattaMatka/assets/images/buildings.png";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import Layout from "../../../component/layout/Layout";

function Satta() {
  const socket = useSocket();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const navigate = useNavigate();
  const [minut, setMinut] = useState(0);
  const [one_min_time, setOne_min_time] = useState(0);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { data } = useQuery(
    ["game"],
    () => apiConnectorGet(endpoint?.node?.satta_game_Lastfour),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const game_history = data?.data?.data || 0;
  const { data: statta_matka_staus } = useQuery(
    ["status_of_satta_matka"],
    () => apiConnectorGet(endpoint?.node?.getStatusSattaMatka),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const statta_matka_staus_result = statta_matka_staus?.data?.data || [];

  useEffect(() => {
    const handleOneMin = (onemin) => {
      const t = Number(String(onemin)?.split("_")?.[1]);
      const min = Number(String(onemin)?.split("_")?.[0]);
      const time_to_be_intro = t > 0 ? 60 - t : t;
      const time_to_be_intro_mid_min = min > 0 ? 60 - min : min;

      const time_to_be_intro_min = time_to_be_intro_mid_min >= 30 ? time_to_be_intro_mid_min - 30 : time_to_be_intro_mid_min
      setOne_min_time(time_to_be_intro);
      setMinut(time_to_be_intro_min)
    };
    socket.on("onemin", handleOneMin);
    return () => {
      socket.off("onemin", handleOneMin);
    };
  }, []);

  return (
    <Container sx={{ background: "#F7F8FF" }}>
      <Layout >
        <Box sx={styles.root}>
          <Container
            className="!h-[100%] !overflow-auto no-scrollbar"
            sx={styles.container}
          >

            <Box className="!px-2" pt={2}>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: false,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
                style={styles.swiperContainer}
              >
                <SwiperSlide sx={styles.swiperSlide}>
                  <Box
                    component="img"
                    src={one}
                    alt="Slide 1"
                    sx={styles.swiperImage}
                  />
                </SwiperSlide>
                <div
                  className="autoplay-progress"
                  slot="container-end"
                  style={styles.autoplayProgress}
                >
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </Swiper>
            </Box>

            <Box sx={{ ...styles.flexbetween, width: "95%", ml: "2.5%" }}>
              <Button
                component={NavLink}
                to="/SattaChart"
                startIcon={<List />}
                sx={styles.chartButton}
              >
                Chart
              </Button>
              <Button
                component={NavLink}
                to="/history"
                startIcon={<History />}
                sx={styles.walletButton}
              >
                My History
              </Button>
            </Box>

            <div className="!text-white !pt-5 !pl-4 !text-sm !w-full !flex !justify-between">
              <span>Time Left:</span>
              <p className="!pr-5">
                <span>
                  {String(minut)?.padStart(2, "0")}  </span>

                :  <span className="!w-[20px]">
                  {String(one_min_time)?.padStart(2, "0")}
                </span>
              </p>
            </div>
            <div className="mt-2 w-full" style={styles.contentContainer}>
              <Box sx={styles.contentBox}>
                <Box sx={styles.imageContainer}>
                  <Box sx={styles.image} component="img" src={buildings}></Box>
                </Box>
                <Box sx={styles.textContainer}>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp15"
                  >
                    GHAZIABAD
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp13"
                  >
                    Last result was : {game_history?.[0]?.gaziyabad}
                  </Typography>
                </Box>
                {!statta_matka_staus_result?.find(
                  (i) => i?.title === "satta_gajiyabad"
                )?.status ? (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "red", textAlign: "center", mb: 1 }}
                    >
                      Closed
                    </Typography>
                    <Button
                      variant="text"
                      className="fp11"
                      sx={styles.upcomingButton}
                    >
                      Upcoming Result{" "}
                    </Button>
                    <Typography
                      variant="body1"
                      className="fp13 !flex !pl-3 !gap-2"
                      sx={{ color: "white", textAlign: "center", mt: 1 }}
                    >
                      <span> Time Left : </span>
                      <p className="!pr-5">
                        <span>
                          {String(minut)?.padStart(2, "0")}
                        </span>
                        :
                        <span className="!w-[20px]">
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </p>
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "green", textAlign: "center", mb: 1 }}
                    >
                      Open
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      sx={styles.playButton}
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 1,
                          },
                        });
                      }}
                    >
                      Play
                    </Button>
                  </Box>
                )}
              </Box>

              <Box sx={styles.contentBox}>
                <Box sx={styles.imageContainer}>
                  <Box sx={styles.image} component="img" src={buildings}></Box>
                </Box>
                <Box sx={styles.textContainer}>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp15"
                  >
                    FARIDABAD
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp13"
                  >
                    Last result was : {game_history?.[0]?.faridabad}
                  </Typography>
                </Box>

                {!statta_matka_staus_result?.find(
                  (i) => i?.title === "satta_faridabad"
                )?.status ? (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "red", textAlign: "center", mb: 1 }}
                    >
                      Closed
                    </Typography>
                    <Button
                      variant="text"
                      className="fp11"
                      sx={styles.upcomingButton}
                    >
                      Upcoming Result{" "}
                    </Button>
                    <Typography
                      variant="body1"
                      className="fp13 !flex !pl-3 !gap-2"
                      sx={{ color: "white", textAlign: "center", mt: 1 }}
                    >
                      <span> Time Left : </span>
                      <p className="!pr-5">
                        <span>
                          {String(minut)?.padStart(2, "0")}
                        </span>
                        :
                        <span className="!w-[20px]">
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </p>
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "green", textAlign: "center", mb: 1 }}
                    >
                      Open
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      sx={styles.playButton}
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 2,
                          },
                        });
                      }}
                    >
                      Play
                    </Button>
                  </Box>
                )}
              </Box>
              <Box sx={styles.contentBox}>
                <Box sx={styles.imageContainer}>
                  <Box sx={styles.image} component="img" src={buildings}></Box>
                </Box>
                <Box sx={styles.textContainer}>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp15"
                  >
                    GALI{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp13"
                  >
                    Last result was : {game_history?.[0]?.gali}
                  </Typography>
                </Box>
                {/* <Box sx={styles.buttonContainer}> */}
                {!statta_matka_staus_result?.find(
                  (i) => i?.title === "satta_gali"
                )?.status ? (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "red", textAlign: "center", mb: 1 }}
                    >
                      Closed
                    </Typography>
                    <Button
                      variant="text"
                      className="fp11"
                      sx={styles.upcomingButton}
                    >
                      Upcoming Result{" "}
                    </Button>
                    <Typography
                      variant="body1"
                      className="fp13 !flex !pl-3 !gap-2"
                      sx={{ color: "white", textAlign: "center", mt: 1 }}
                    >
                      <span> Time Left : </span>
                      <p className="!pr-5">
                        <span>
                          {String(minut)?.padStart(2, "0")}
                        </span>
                        :
                        <span className="!w-[20px]">
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </p>
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "green", textAlign: "center", mb: 1 }}
                    >
                      Open
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      sx={styles.playButton}
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 3,
                          },
                        });
                      }}
                    >
                      Play
                    </Button>
                  </Box>
                )}
              </Box>
              {/* </Box> */}
              <Box sx={styles.contentBox}>
                <Box sx={styles.imageContainer}>
                  <Box sx={styles.image} component="img" src={buildings}></Box>
                </Box>
                <Box sx={styles.textContainer}>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp15"
                  >
                    {" "}
                    DESAWAR
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={styles.textWhite}
                    className="fp13"
                  >
                    Last result was : {game_history?.[0]?.disawar}
                  </Typography>
                </Box>
                {!statta_matka_staus_result?.find(
                  (i) => i?.title === "satta_disawar"
                )?.status ? (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "red", textAlign: "center", mb: 1 }}
                    >
                      Closed
                    </Typography>
                    <Button
                      variant="text"
                      className="fp11"
                      sx={styles.upcomingButton}
                    >
                      Upcoming Result{" "}
                    </Button>
                    <Typography
                      variant="body1"
                      className="fp13 !flex !pl-3 !gap-2"
                      sx={{ color: "white", textAlign: "center", mt: 1 }}
                    >
                      <span> Time Left : </span>
                      <p className="!pr-5">
                        <span>
                          {String(minut)?.padStart(2, "0")}
                        </span>
                        :
                        <span className="!w-[20px]">
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </p>
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={styles.buttonContainer}>
                    <Typography
                      variant="body1"
                      className="fp15"
                      sx={{ color: "green", textAlign: "center", mb: 1 }}
                    >
                      Open
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      sx={styles.playButton}
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 4,
                          },
                        });
                      }}
                    >
                      Play
                    </Button>
                  </Box>
                )}
              </Box>
            </div>
          </Container>
        </Box>
      </Layout>
    </Container>
  );
}

export default Satta;

const styles = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },
  banner: { background: stargrad, padding: "10px 0px" },
  bannerText: { color: "white" },
  downloadSection: { display: "flex", gap: "1rem", alignItems: "center" },
  downloadIcon: { color: "white" },
  downloadText: { color: "white" },
  swiperContainer: {
    height: "30vh !important",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  swiperSlide: {
    height: "30vh !important",
    borderRadius: "5px",
    overflow: "hidden",
  },
  swiperImage: { width: "100%", height: "25vh", objectFit: "fill" },
  autoplayProgress: { opacity: 0 },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  chartButton: {
    width: "48%",
    background: "#761EBC",
    color: "white",
    textTransform: "capitalize",
    padding: "8px",
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  walletButton: {
    width: "48%",
    background: "#761EBC",
    color: "white",
    textTransform: "capitalize",
    padding: "8px",
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  contentContainer: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "20px",
    marginBottom: "30px",
  },
  contentBox: {
    padding: "10px",
    background: "#29023B",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  imageContainer: {
    width: "15%",
    maxHeight: "100px",
    maxWidth: "100px",
    background: "#761EBC",
    borderRadius: "50%",
    padding: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "invert(1)",
    maxWidth: "50px",
  },
  textContainer: { width: "40%" },
  textWhite: { color: "white" },
  buttonContainer: { width: "38%" },
  openButton: {
    width: "100%",
    background: "#24cc3b",
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    mb: 1,
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  playButton: {
    width: "100%",
    background: "#4CBB17",
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    padding: "8px 0px",
    "&:hover": { backgroundColor: "#4CBB17" },
  },
  upcomingButton: {
    width: "100%",
    background: stargrad,
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    padding: "8px 0px",
    "&:hover": { backgroundColor: stargrad },
  },
};
