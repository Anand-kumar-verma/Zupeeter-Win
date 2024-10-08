import { ContactSupportOutlined } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

export const apiConnectorGet = async (endpoint, params) => {
  try {
    const response = await axios?.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      {
        params: params,
      }
    );
    response?.data?.msg ==="Invalid Token." &&
    toast(
      "Login in another device " 
    )
    return response;
  } catch (e) {
    
    return {
      msg: e?.message,
    };
  }
};
export const apiConnectorPost = async (endpoint, reqBody) => {
  try {
    const response = await axios?.post(
      endpoint,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }   
    );
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
