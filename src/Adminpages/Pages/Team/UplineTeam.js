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
    const getUplineTeamfunction = async (value) => {
        setloding(true)
        try {
            await getUplineTeam({ username: value }).then((result) => {
                setdownlinedata(result?.data?.data)
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
        <span>Password</span>,
        <span>Type</span>
    ];

    const tablerow = downlinedata?.map((i, index) => [
        <span>{index + 1}</span>,
        <span>{i?.level_id}</span>,
        <span>{i?.username}</span>,
        <span>{i?.full_name}</span>,
        <span>{i?.mobile}</span>,
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
            />
         
        </div>
    );
};

export default UplineTeam;
