import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import { apiConnectorPost } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";

const AccountPassword = () => {

  const navigate= useNavigate()
  const initialValue = {
    old_pass: "",
    new_pass: "",
    confirm_new_pass: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (
        !fk.values.old_pass ||
        !fk.values.new_pass ||
        !fk.values.confirm_new_pass
      ) {
        toast.error("Please enter all fields");
        return;
      }
      const reqbody = {
        old_pass: fk.values.old_pass,
        new_pass: fk.values.new_pass,
        confirm_new_pass: fk.values.confirm_new_pass,
      };
      changePasswordFn(reqbody);
    },
  });

  async function changePasswordFn(reqBody) {
    try {
      const res = await apiConnectorPost(endpoint?.forget_password, reqBody);
      toast(res?.data?.msg);
      navigate("/account");
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }

  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
          <span className="col-span-2 justify-end">
            <div className="flex justify-between">
              <span className="font-bold">Change Password</span>
            </div>
          </span>
          <span>Old Password*</span>
          <TextField
            id="old_pass"
            name="old_pass"
            value={fk.values.old_pass}
            onChange={fk.handleChange}
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            placeholder="Enter Old Password"
            className="!w-[100%]"
          ></TextField>
          <span>New Password*</span>
          <TextField
            id="new_pass"
            name="new_pass"
            value={fk.values.new_pass}
            placeholder="Enter New Password"
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Confirm Password*</span>
          <TextField
            id="confirm_new_pass"
            name="confirm_new_pass"
            placeholder="Enter Confirm Password"
            value={fk.values.confirm_new_pass}
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <div className="col-span-2 flex gap-2 mt-4">
            <Button
              className="!bg-[#FD565C] !text-white"
              onClick={() => fk.handleReset()}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#BF6DFE] !text-white"
              onClick={() => fk.handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AccountPassword;
