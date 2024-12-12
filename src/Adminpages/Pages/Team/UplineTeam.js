import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { getUplineTeam } from "../../Services";
import CustomTable from "../../Shared/CustomTable";

const UplineTeam = () => {
    const [search, setSearch] = useState("");
    const [downlinedata, setdownlinedata] = useState([]);
    const [loding, setloding] = useState(false);
    const [user_sub_data, setuser_sub_data] = React.useState({});

    const getUplineTeamfunction = async (value) => {
        setloding(true)
        try {
            await getUplineTeam({ username: value }).then((result) => {
                setdownlinedata(result?.data?.data)
                setuser_sub_data(result?.data);

            }).catch((e) => {
               toast("Something went wrong")
            })
        }
        catch (e) {
            console.log(e)
        }
        setloding(false)
    }

  useEffect(()=>{
    getUplineTeamfunction()
  },[])

    const tablehead = [
        <span>S.No.</span>,
        <span>Level</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Mobile</span>,
        <span>Deposit</span>,
        <span>Withdrawal</span>,
        <span>Password</span>,
        <span>Type</span>
    ];

    const tablerow = downlinedata?.map((i, index) => [
        <span>{index + 1}</span>,
        <span>{i?.level_id}</span>,
        <span>{i?.username}</span>,
        <span>{i?.full_name}</span>,
        <span>{i?.mobile}</span>,
        <span>{Number(i?.total_my_deposit_till_yest)?.toFixed(2)}</span>,
        <span>{Number(i?.total_my_withdr_till_yest)?.toFixed(2)}</span>,
        <span>{i?.password}</span>,
        <span>{i?.user_type}</span>
    ]);

    return (
        <div>
            <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
                <div>

                    <TextField
                        className="!h-[10%]"
                       
                        id="username"
                        name="username"
                        placeholder="User Id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <Button
                    onClick={() => getUplineTeamfunction(search)}
                    variant="contained"
                    endIcon={<FilterAltIcon />}
                >
                    Filter
                </Button>
            </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={loding}
                isTotal={
                    <div className="!w-full flex justify-between !bg-white !bg-opacity-30 !pt-1 !py-1 !px-2 !font-bold">
                      <p>
                        Total Deposit:{" "}
                        {Number(user_sub_data?.total_deposit || 0)?.toFixed(2)}
                      </p>
                      <p>
                       Total Withdrawal:{" "}
                        {Number(user_sub_data?.total_withdrawal || 0)?.toFixed(2)}
                      </p>
                     
                    </div>
                  }
            />
         
        </div>
    );
};

export default UplineTeam;
