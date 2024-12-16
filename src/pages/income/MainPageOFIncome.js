import { Diversity2 } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Container } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import { ProfileDataFunction } from "../../services/apiCallings";

function MainPageOFIncome() {
  const { data } = useQuery(["profile"], () => ProfileDataFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const profile = data?.data?.data || [];

  const data_array = [
    {
      to: "/account/income-main/royality-bonus",
      name: "First Deposit Bonus",
      logo: (
        <StoreIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/betting-bonus",
      name: "Referral / Team Recharge Bonus",
      logo: (
        <AccountBalanceIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/level-bonus",
      name: "VIP Bonus",
      logo: (
        <CardGiftcardIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/registration-bonus",
      name: "Team Trading Bonus",
      logo: (
        <CurrencyExchangeIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/team-salary-bonus",
      name: "Scratched Coupon Bonus",
      logo: (
        <AccountBalanceIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/team-betting-bonus",
      name: "Salary Bonus",
      logo: (
        <LocalConvenienceStoreIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/cashback-bonus",
      name: "Cashback Bonus",
      logo: (
        <StoreIcon
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/company_promoter",
      name: "Company Promoter Bonus",
      logo: (
        <Diversity2
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/welcomebonus",
      name: "Registration Bonus",
      logo: (
        <Diversity2
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    },
  ];

  // Conditionally adding the Staking Bonus item to the array
  if (profile?.success_date) {
    data_array?.push({
      to: "/account/income-main/loss_recovery",
      name: "Staking Bonus",
      logo: (
        <Diversity2
          className="!w-[40px] !h-[40px] !text-[#F48901]"
          color="#8f5206"
        />
      ),
    });
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
      >
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              mb: "25px",
            },
          }}
        >
          <div className="!w-full !grid !grid-cols-2 !place-items-center">
            {data_array.map((i, index) => (
              <Box
                key={index}
                component={NavLink}
                to={i.to}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: "10px",
                  "&>p": {
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    mt: "5px",
                  },
                }}
              >
                <p>{i.logo}</p>
                <p className="lg:!whitespace-nowrap !text-center !text-black !text-[10px]">
                  {i.name}
                </p>
              </Box>
            ))}
          </div>
        </Box>
      </Container>
    </Layout>
  );
}

export default MainPageOFIncome;
