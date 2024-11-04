import { ArrowBack, History } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { stardarkblue, stargold, stargrad } from "../../../shared/color";
import one from "../../../pages/SattaMatka/assets/images/Top-Reasons-Why-Satta-Matka-is-so-Famous-1024x538-Photoroom (1).jpg";
import { apiConnectorGet } from "../../../services/apiconnector";
import { download_app_url, endpoint } from "../../../services/urls";

function SattaChart() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const navigate = useNavigate();


  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const { data } = useQuery(["game"], () => apiConnectorGet(endpoint?.node?.satta_game_Lastfour), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
  const game_history= data?.data?.data|| 0

  return (
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={styles.container}
        >
          <div style={styles.banner}>
            <div className="px-2 py-2 flex justify-between">
              <div className="flex items-center gap-2" style={styles.bannerText}>
                <Box component={NavLink} to="/satta/matka">
                  <ArrowBack sx={{ color: 'white' }} />
                </Box>
                <span className="text-[14px]">Welcome To 5 Star xxx Satta Matka</span>
              </div>
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => (document.location.href = `${download_app_url}`)}
                style={styles.downloadSection}
              >
                <CloudDownloadIcon sx={styles.downloadIcon} />
                <span className="text-[12px]" style={styles.downloadText}></span>
              </div>
            </div>
          </div>
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
              <div className="autoplay-progress" slot="container-end" style={styles.autoplayProgress}>
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </Box>

          <Box sx={{ ...styles.flexbetween, width: '95%', ml: '2.5%' }} >
            <Button component={NavLink} to='/satta/matka' sx={styles.chartButton}>Play satta matka</Button>
            <Button component={NavLink} to='/history' startIcon={<History/>} sx={styles.walletButton}>My History</Button>
          </Box>

          <div className="mt-2 w-full" style={styles.contentContainer}>

            <Box sx={styles.contentBox}  onClick={() => navigate("/location/chart",{
              state:{
                satta_type:1
              }
            })}>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15" >GAZIABAD</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:   {game_history?.[0]?.gaziyabad}</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>{game_history?.[0]?.gaziyabad}</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox}  onClick={() => navigate("/location/chart",{
              state:{
                satta_type:2
              }
            })}>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">FARIDABAD</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  {game_history?.[0]?.faridabad}</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>{game_history?.[0]?.faridabad}</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox}  onClick={() => navigate("/location/chart",{
              state:{
                satta_type:3
              }
            })}>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">GALI</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  {game_history?.[0]?.gali}</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>{game_history?.[0]?.gali}</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox}  onClick={() => navigate("/location/chart",{
              state:{
                satta_type:4
              }
            })}>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">DISAWAR</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result: {game_history?.[0]?.disawar}</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>{game_history?.[0]?.disawar}</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
          </div>
        </Container>
    
  );
}

export default SattaChart;

const styles = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },
  banner: { background: stargrad, padding: '10px 0px' },
  bannerText: { color: "white" },
  downloadSection: { display: 'flex', gap: '1rem', alignItems: 'center' },
  downloadIcon: { color: "white" },
  downloadText: { color: "white" },
  swiperContainer: { height: '30vh !important', borderRadius: '5px', overflow: 'hidden', marginBottom: '16px' },
  swiperSlide: { height: '30vh !important', borderRadius: '5px', overflow: 'hidden' },
  swiperImage: { width: "100%", height: "25vh", objectFit: "fill" },
  autoplayProgress: { opacity: 0 },
  flexbetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
  chartButton: { width: '48%', background: '#761EBC', color: 'white', textTransform: 'capitalize', padding: '8px', "&:hover": { backgroundColor: '#24cc3b', }, },
  walletButton: { width: '48%', background: '#761EBC', color: 'white', textTransform: 'capitalize', padding: '8px', "&:hover": { backgroundColor: '#24cc3b', }, },
  contentContainer: { width: "95%", marginLeft: "2.5%", marginTop: "20px", marginBottom: "30px" },
  contentBox: { padding: '10px', background: '#29023B', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  imageContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', maxHeight: '50px', height: '50px', maxWidth: '50px', background: '#761EBC', borderRadius: '50%', padding: '10px' },
  image: { width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)', maxWidth: '50px', },
  textContainer: { width: '45%' },
  textWhite: { color: 'white' },
  buttonContainer: { width: '35%', },
  openButton: {
    width: '100%', background: '#24cc3b', textTransform: 'capitalize', borderRadius: '5px', color: 'white', mb: 1,
    "&:hover": { backgroundColor: '#24cc3b', },
  },
  playButton: {
    width: '100%', background: stargold, textTransform: 'capitalize', borderRadius: '5px', color: 'white',
    "&:hover": { backgroundColor: stargold, },
  }
};
