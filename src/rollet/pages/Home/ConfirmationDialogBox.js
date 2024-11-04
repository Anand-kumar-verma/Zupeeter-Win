import { Box, Drawer } from "@mui/material";
import React from "react";

const ConfirmationDialogBox = ({
  style,
  handleConfirm,
  open1,
  setOpen1,
  isOpenPreRoundDialogBox,
}) => {
  return (
    <>
      <Drawer
        sx={{
          "&>div": {
            background: "transparent",
            width: "400px",
            height: "85vh",
            ...style.flex,
          },
        }}
        anchor="top"
        open={open1}
        onClose={() => {
          setOpen1(open1);
        }}
      >
        <Box
          sx={{
            width: "350px",
            height: "150px",
            background: "black",
            // transform: "rotate(90deg)",
            borderRadius: "10px",
            padding: "20px",
            color: "yellow",
            borderColor: "yellow  !important",
          }}
        >
          <div className=" !flex flex-col !justify-center !items-center mt-4">
            <div>
              <p className="text-2xl font-bold ">Are you sure want to exit</p>
            </div>
            <div className="!flex !justify-center gap-12 mt-4">
              <button
                onClick={handleConfirm}
                className="font-bold text-xl rounded border border-yellow-300 px-4"
              >
                OK
              </button>
              <button
                onClick={() => setOpen1(false)}
                className="font-bold text-xl rounded border border-yellow-300 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Drawer>
      <Drawer
        sx={{
          "&>div": {
            background: "transparent",
            // width: "400px",
            height: "85vh",
            ...style.flex,
          },
        }}
        anchor="top"
        open={isOpenPreRoundDialogBox}
        // onClose={() => {
        //   setopenDialogBoxhistory(!openDialogBoxhistory);
        // }}
      >
        <Box
          className="!text-yellow-500 !font-extrabold  "
          sx={{
            // width: "100%",
            // height: "50%",
            background: "black !important ",
            // transform: "rotate(90deg)",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          PLEASE &nbsp; WAIT&nbsp; TO &nbsp;COMPLETE &nbsp; LAST &nbsp; GAME
        </Box>
      </Drawer>
    </>
  );
};

export default ConfirmationDialogBox;
