
import Signup from "../Adminpages/Authentication/Signup";
import Changepassword from "../Adminpages/Pages/changepassword/Changepassword";
import ColorPrediction1Min from "../Adminpages/Pages/colorprediction/ColorPrediction1Min";
import ColorPrediction2Min from "../Adminpages/Pages/colorprediction/ColorPrediction2Min";
import ColorPrediction3Min from "../Adminpages/Pages/colorprediction/ColorPrediction3Min";
import AddCompany from "../Adminpages/Pages/companypromoter/AddCompany";
import AddCoupon from "../Adminpages/Pages/Coupon/addcoupon";
import Coupon from "../Adminpages/Pages/Coupon/coupon";
import DirectCoupon from "../Adminpages/Pages/Coupon/directCoupon";
import Dashboard from "../Adminpages/Pages/dashboard/Dashboard";
import DayBookReport from "../Adminpages/Pages/DayBookReport/daybookreport";
import Fund from "../Adminpages/Pages/fund/Fund";
import FundHistory from "../Adminpages/Pages/fund/FundHistory";
import P2pHistory from "../Adminpages/Pages/fund/P2pHistory";
import ApprovedRequest from "../Adminpages/Pages/gamewithdrawlrequest/ApprovedRequest";
import GameWithdrawlRequest from "../Adminpages/Pages/gamewithdrawlrequest/GameWithdrawlRequest";
import PendingRequest from "../Adminpages/Pages/gamewithdrawlrequest/PendingRequest";
import RejectRequest from "../Adminpages/Pages/gamewithdrawlrequest/RejectRequest";
import CashbackBonus from "../Adminpages/Pages/genealogy/CashbackBonus";
import DownLine from "../Adminpages/Pages/genealogy/DownLine";
import GiftBonus from "../Adminpages/Pages/genealogy/GiftBonus";
import LevelBonus from "../Adminpages/Pages/genealogy/LevelBonus";
import SalaryBonus from "../Adminpages/Pages/genealogy/SailaryBonus";
import SelfDepositBonus from "../Adminpages/Pages/genealogy/SelfDepositBonus";
import TeamReferral from "../Adminpages/Pages/genealogy/TeamRefferral";
import VipBonus from "../Adminpages/Pages/genealogy/VipBonus";
import WeeklyBonus from "../Adminpages/Pages/genealogy/WeeklyBonus";
import Master from "../Adminpages/Pages/Master/MAster";
import UserPermission from "../Adminpages/Pages/Permission/Userpermission";
import LogInApproval from "../Adminpages/Pages/player/LogInApproval";
import Player from "../Adminpages/Pages/player/Player";
import AviatorReport from "../Adminpages/Pages/Report/AvaitorReport";
import TrxReport from "../Adminpages/Pages/Report/TrxReport";
import WingoReport from "../Adminpages/Pages/Report/WingoReport";
import SetBonus from "../Adminpages/Pages/SetBonus/SetBonus";
import DownlineTeam from "../Adminpages/Pages/Team/DownlineTeam";
import UplineTeam from "../Adminpages/Pages/Team/UplineTeam";
import ZpToken from "../Adminpages/Pages/Zptoken/ZpToken";
import ZpTokenPayout from "../Adminpages/Pages/Zptoken/ZpTokenPayout";


export const adminroutes = [ 
  {
    id: 1,
    path: "/master",
    component: <Master />,
    navItem: "Master",
  },
  {
    id: 2,
    path: "/admindashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },
  {
    id: 1,
    path: "/signUp",
    component: <Signup />,
    navItem: "Registration",
  },
  {
    id: 3,
    path: "/player",
    component: <Player />,
    navItem: "Player",
  },
 
  {
    id: 5,
    path: "/game-withdrawl-request",
    component: <GameWithdrawlRequest />,
    navItem: "Game Withdrawl Request",
  },

  {
    id: 7,
    path: "/genealogy/downline",
    component: <DownLine />,
    navItem: "Downline",
  },
  {
    id: 10,
    path: "/coupon",
    component: <Coupon />,
    navItem: "coupon",
  },
  {
    id: 11,
    path: "/addcoupon",
    component: <AddCoupon/>,
    navItem: "coupon",
  },
  {
    id: 6,
    path: "/addcouponuser",
    component: <DirectCoupon />,
    navItem: "CouponToUser",
  },
  {
    id: 66,
    path: "/company_promoter",
    component: <AddCompany />,
    navItem: "Company Promoter",
  },
  {
    id: 9,
    path: "/fund",
    component: <Fund/>,
    navItem: "Fund",
  },
  {
    id: 9,
    path: "/fund/p2p-history",
    component: <P2pHistory/>,
    navItem: "P2P History",
  },
  {
    id: 11,
    path: "/change-password",
    component: <Changepassword/>,
    navItem: "Change Password",
  },
  {
    id: 12,
    path: "/game-withdrawl-request/approved-request",
    component: <ApprovedRequest/>,
    navItem: "Approved Request",
  },
  {
    id: 13,
    path: "/game-withdrawl-request/reject-request",
    component: <RejectRequest/>,
    navItem: "Reject Request",
  },
  {
    id: 15,
    path: "/selfdepositBonus",
    component: <SelfDepositBonus/>,
    navItem: "First Deposit Bonus",
  },
  {
    id: 15,
    path: "/teamreferal",
    component: <TeamReferral/>,
    navItem: "Team Recharge Bonus",
  },
  {
    id: 16,
    path: "/cashbackBonus",
    component: <CashbackBonus/>,
    navItem: "CashBack Bonus",
  },
  {
    id: 17,
    path: "/giftBonus",
    component: <GiftBonus/>,
    navItem: "Gift Bonus",
  },
  {
    id: 41,
    path: "/salarybonus",
    component: <SalaryBonus/>,
    navItem: "Salary Bonus",
  },
  {
    id: 42,
    path: "/weeklybonus",
    component: <WeeklyBonus/>,
    navItem: "Weekly Recovery",
  },
  {
    id: 42,
    path: "/vipbonus",
    component: <VipBonus/>,
    navItem: "Vip Bonus",
  },
  {
    id: 19,
    path: "/levelBonus",
    component: <LevelBonus/>,
    navItem: "Team Trading Bonus",
  },
  {
    id: 20,
    path: "/game-withdrawl-request/pending-request",
    component: <PendingRequest/>,
    navItem: "Gateway Pending Request",
  },
  {
    id: 23,
    path: "/color-prediction-1-min",
    component: <ColorPrediction1Min/>,
    navItem: "Color Prediction 1 Min",
  },
  {
    id: 24,
    path: "/color-prediction-2-min",
    component: <ColorPrediction2Min/>,
    navItem: "Color Prediction 2 Min",
  },
  {
    id: 25,
    path: "/color-prediction-3-min",
    component: <ColorPrediction3Min/>,
    navItem: "Color Prediction 3 Min",
  },
  {
    id: 26,
    path: "/fund/transfer-fund-history",
    component: <FundHistory/>,
    navItem: "Transfer Fund History",
  },
  {
    id: 27,
    path: "/aviator_report",
    component: <AviatorReport/>,
    navItem: "Aviator Report",
  },
  {
    id: 28,
    path: "/wingo_report",
    component: <WingoReport/>,
    navItem: "Wingo Report",
  },
  {
    id: 29,
    path: "/trx_report",
    component: <TrxReport/>,
    navItem: "Trx Report",
  },
  {
    id: 30,
    path: "/user_permission",
    component: <UserPermission/>,
    navItem: "User Permission",
  },
  {
    id: 31,
    path: "/daybook_report",
    component: <DayBookReport/>,
    navItem: "Day Book Report",
  },
  {
    id: 32,
    path: "/upline_team",
    component: <UplineTeam/>,
    navItem: "UpLine Team",
  },
  {
    id: 33,
    path: "/down_team",
    component: <DownlineTeam/>,
    navItem: "DownLine Team",
  },
  {
    id: 34,
    path: "/set_bonus",
    component: <SetBonus/>,
    navItem: "Set ZP Amount ",
  },
  {
    id: 35,
    path: "/loginApproval",
    component: <LogInApproval/>,
    navItem: "LogIn Approval",
  },
  {
    id: 36,
    path: "/zp_token",
    component: <ZpToken/>,
    navItem: "Paying",
  },
  {
    id: 36,
    path: "/zp_token_payout",
    component: <ZpTokenPayout/>,
    navItem: "Payout",
  },
];

// UpdatePermissions