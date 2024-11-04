
import { ArrowBack } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { stardarkblue, stargold, stargrad } from "../../../shared/color";
import { download_app_url } from "../../../services/urls";


function LocationListChart() {
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  return (

        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={styles.container}
        >
          <div style={styles.banner}>
            <div className="px-2 py-2 flex justify-between">
              <div className="flex items-center gap-2" style={styles.bannerText}>
                <Box component={NavLink} to="/SattaChart">
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

          <div className="mt-2 w-full" style={styles.contentContainer}>

            <Box sx={styles.contentBox} component={NavLink} to='/location/chart'>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">Gaziabad</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  59</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>25</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>

            <Box sx={styles.contentBox} component={NavLink} to='/location/chart'>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">Noida</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  59</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>25</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox} component={NavLink} to='/location/chart'>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">Lucknow</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  59</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>25</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox} component={NavLink} to='/location/chart'>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">Jharekhapur</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  59</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>25</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox} component={NavLink} to='/location/chart'>
              <Box sx={styles.textContainer}>
                <Typography variant="body1" sx={styles.textWhite} className="fp15">Motipur</Typography>
                <Typography variant="body1" sx={styles.textWhite} className="fp13">Winner Result:  59</Typography>
              </Box>
              <Box sx={styles.imageContainer}>
                <Typography variant="body1" className="fp18" sx={{ color: 'white', }}>25</Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Button variant="text" color="primary" sx={styles.openButton}>View Chart</Button>
              </Box>
            </Box>
          </div>
        </Container>
     
  );
}

export default LocationListChart;

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
