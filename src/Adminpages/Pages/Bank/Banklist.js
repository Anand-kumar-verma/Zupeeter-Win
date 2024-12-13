import { FilterAlt } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const AddBank = () => {
    const [loding, setloding] = useState(false);
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    const BankListFn = async () => {
        const reqbody = {
            search: search
        }
        try {
            const response = await axiosInstance.post(API_URLS.get_bank_data, reqbody);
            setData(response?.data?.data);
        } catch (e) {
            console.log(e);
        }
    };
    const initialValue = {
        holder_name: data?.holder_name,
        t_id: data?.id,
        bank_name: data?.bank_name,
        account: data?.account,
        ifsc: data?.ifsc,
        email: data?.email,
        mobile: data?.mobile,
    };

    const fk = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        onSubmit: () => {
            AddBankFn(fk.values);
        },
    });

    async function AddBankFn(reqBody) {
        const req = {
            t_id: reqBody?.t_id,
            holder_name: reqBody?.holder_name,
            bank_name: reqBody?.bank_name,
            account: reqBody?.account,
            ifsc: reqBody?.ifsc,
            mobile: reqBody?.mobile,
            email: reqBody?.email,
        };
        setloding(true);
        try {
            console.log()
            const res = await axiosInstance.post(API_URLS.update_bank, req);
            toast.success(res?.data?.msg);
            if (res?.data?.msg === "Successfully") {
                BankListFn()
                fk.handleReset();
            }
        } catch (e) {
            console.log(e);
        }
        setloding(false);
    }

    if (loding)
        return (
            <div className="w-[100%] h-[100%] flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    return (
     <>
        <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
        <span className="font-bold">Search:</span>
        <TextField
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <Button
            onClick={() => BankListFn()}
            variant="contained"
            startIcon={<FilterAlt />}
        >
            Filter
        </Button>
    </div>
        <div className="!flex justify-center items-center w-full">
           
            <div className="p-5  md:w-3/4 w-full bg-white !bg-opacity-30 !rounded-lg">
                <p className="!text-center font-bold !py-4 text-lg">Update Bank</p>
                
                <div className="grid grid-cols-2 gap-[6%] gap-y-4">
                   
                    <div>
                        <p className="font-bold">Bank Name</p>
                        <TextField
                            type="text"
                            fullWidth
                            id="bank_name"
                            name="bank_name"
                            placeholder="Bank Name"
                            value={fk.values.bank_name}
                            onChange={fk.handleChange}
                        />
                    </div>
                    <div>
                        <p className="font-bold">IFSC Code</p>
                        <TextField
                            fullWidth
                            type="text"
                            id="ifsc"
                            name="ifsc"
                            placeholder="IFSC Code"
                            value={fk.values.ifsc}
                            onChange={fk.handleChange}
                        />
                    </div>
                    <div>
                        <p className="font-bold">Account No</p>
                        <TextField
                            fullWidth
                            type="text"
                            id="account"
                            name="account"
                            placeholder="Account No"
                            value={fk.values.account}
                            onChange={fk.handleChange}
                        />
                    </div>
                    <div>
                        <p className="font-bold">Account Holder Name</p>
                        <TextField
                            fullWidth
                            type="text"
                            id="holder_name"
                            name="holder_name"
                            placeholder="Account Holder Name"
                            value={fk.values.holder_name}
                            onChange={fk.handleChange}
                        />
                    </div>
                    <div>
                        <p className="font-bold">Mobile No</p>
                        <TextField
                            fullWidth
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder="Mobile No"
                            value={fk.values.mobile}
                            onChange={fk.handleChange}
                        />
                    </div>
                    <div>
                        <p className="font-bold">Email</p>
                        <TextField
                            fullWidth
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={fk.values.email}
                            onChange={fk.handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 !mt-5">
                    <Button
                        onClick={() => fk.handleReset()}
                        variant="contained"
                        className="!bg-[#E74C3C]"
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={() => fk.handleSubmit()}
                        variant="contained"
                        className="!bg-[#07BC0C]"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div></>
    );
};

export default AddBank;
