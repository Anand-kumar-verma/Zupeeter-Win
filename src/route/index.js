import D5lotre from "../pages/5DLotre/D5lotre";
import Contactus from "../pages/Contact/Contactus";
import ServiceCollections from "../pages/Contact/component/ServiceCollection";
import SupportPage from "../pages/Contact/component/SupportPage";
import Account from "../pages/account/Account";
import RiskDisclosureAgreement from "../pages/auth/Component/RiskDisclosureAgreement";
import ComingSoon from "../pages/comingsoon/ComingSoon";
import Dashboard from "../pages/home/Dashboard";
import K3 from "../pages/k3lotre/K3";
import Promotion from "../pages/promotion/Promotion";
import TRX from "../pages/trx/TRX";
import AddBankAccount from "../pages/wallet/Component/AddBankAccount";
import Bankaccount from "../pages/wallet/Component/Bankaccount";
import Depositehistory from "../pages/wallet/Component/Depositehistory";
import Withdraval from "../pages/wallet/Component/Withdraval";
import Withdrawlhistory from "../pages/wallet/Component/Withdrawlhistory";
import Wallet from "../pages/wallet/Wallet";
import Activity from "../pages/activity/Activity";
import Deposite from "../pages/wallet/Component/Deposite";
import TronScanPage from "../pages/trx/component/TronScanPage";
import BankDetails from "../pages/bank/BankDetails";
import Banks from "../pages/bank/Banks";
import UPIDetails from "../pages/upi/UPIDetails";
import RegistrationBonus from "../pages/income/incomeSubSection/RegistrationBonus";
import MainPageOFIncome from "../pages/income/MainPageOFIncome";
import ReferralBonus from "../pages/income/incomeSubSection/ReferralBonus";
import TeamBettingBonus from "../pages/income/incomeSubSection/TeamBettingBonus";
import TeamSalaryBonus from "../pages/income/incomeSubSection/TeamSalaryBonus";
import RoyalityBonus from "../pages/income/incomeSubSection/RoyalityBonus";
import LevelBonus from "../pages/income/incomeSubSection/LevelBonus";
import ICOLevelBonus from "../pages/income/incomeSubSection/ICOLevelBonus";
import BettingBonus from "../pages/income/incomeSubSection/BettingBonus";
import AllLevelOfTeam from "../pages/myteam/AllLevelOfTeam";
import Tables from "../pages/myteam/Tables";
import TeamIncome from "../pages/account/TeamIncome";
import TeamReport from "../pages/promotion/TeamReport";
import TeamData from "../pages/promotion/TeamData";
import MyCommission from "../pages/promotion/MyCommission";
import Subordinates from "../pages/promotion/Subordinates";
import Server from "../pages/promotion/Server";
import RebateRatio from "../pages/promotion/RebateRatio";
import PromotionRule from "../pages/promotion/PromotionRule";
import ChangePassword from "../pages/password/ChangePassword";
import AccountPassword from "../pages/password/AccountPassword";
import TransactionPassword from "../pages/password/TransactionPassword";
import Soon from "../pages/comingsoon/Soon";
import Ticket from "../pages/Ticket/Ticket";
import QRSCREENUSDT from "../pages/wallet/Component/QRSCREENUSDT";
import UsdtDetails from "../pages/bank/UsdtDetails";
import Wingo from "../pages/wingo/Wingo";
import Gift from "../pages/activity/Gift";
import P2PTransfer from "../pages/P2ptransfer/p2ptransfer";
import Zp from "../pages/wallet/Component/ZpDeposit";
import ZpWithdrawal from "../pages/wallet/Component/Zpwithdrawal";
import Zpdeposithistory from "../pages/wallet/Component/zpdeposithoistory";
import ZpWithdrawlhistory from "../pages/wallet/Component/ZpWithdrawalhistory";
import CashBackBonus from "../pages/income/incomeSubSection/CashbackBonus";
import Satta from "../pages/SattaMatka/game/Satta";
import Home from "../rollet/pages/Home/Home";
import History from "../pages/SattaMatka/game/History";
import SattaChart from "../pages/SattaMatka/game/Chart";
import LocationChart from "../pages/SattaMatka/game/LocationChart";
import Sattagameplay from "../pages/SattaMatka/game/Sattagameplay";
import AnderBaherChart from "../pages/SattaMatka/game/AnderBaherChart";
import LocationListChart from "../pages/SattaMatka/game/LocationListChart";

export const routes = [

  {
    path: "/rollet",
    element: <Home />,
  },
  {
    path: "/SattaChart",
    element: <SattaChart />
},
{
    path: "/satta/play",
    element: <Sattagameplay />
},
{
    path: "/history",
    element: <History />
},
{
    path: "/anderbaher/chart",
    element: <AnderBaherChart />
},
{
    path: "/location/chart/list",
    element: <LocationListChart />
},
{
    path: "/location/chart",
    element: <LocationChart />
},
  {
    path: "/satta/matka",
    element: <Satta />,
  },
  {
    path: "/RiskDisclosureAgreement",
    element: <RiskDisclosureAgreement />,
  },
  {
    path: "/zp",
    element: <Zp />,
  },
  {
    path: "/zp-withdrawal",
    element: <ZpWithdrawal />,
  },
  {
    path: "/usdt-address",
    element: <UsdtDetails />,
  },

  {
    path: "/qr-screen-usdt",
    element: <QRSCREENUSDT />,
  },
 
  {
    path: "/supportPage",
    element: <SupportPage />,
  },
  {
    path: "/ticket",
    element: <Ticket />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/withdrawlhistory",
    element: <Withdrawlhistory />,
  },
  {
    path: "/depositehistory",
    element: <Depositehistory />,
  },
  {
    path: "/promotion",
    element: <Promotion />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
  {
    path: "/bankcard",
    element: <Bankaccount />,
  },
  {
    path: "/addbankaccount",
    element: <AddBankAccount />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/wingo",
    element: <Wingo />,
  },
  {
    path: "/trx",
    element: <TRX />,
  },
  {
    path: "/k3",
    element: <K3 />,
  },
  {
    path: "/D5lotre",
    element: <D5lotre />,
  },
  {
    path: "/CustomerService",
    element: <Contactus />,
  },
  {
    path: "/ServiceCollections",
    element: <ServiceCollections />,
  },
  {
    path: "/comingsoon",
    element: <ComingSoon />,
  },
  {
    path: "/comingsoonavaitor",
    element: <Soon />,
  },
  {
    path: "/withdraw",
    element: <Withdraval />,
  },
  {
    path: "/gift",
    element: <Gift />,
  },
  {
    path: "/deposit",
    element: <Deposite />,
  },
  {
    path: "/trx/tron-scan",
    element: <TronScanPage />,
  },
  {
    path: "/bank",
    element: <BankDetails />,
  },
  {
    path: "/banks-details",
    element: <Banks />,
  },
  {
    path: "/banks-upi",
    element: <UPIDetails />,
  },

  {
    path: "/account/income-main/registration-bonus",
    element: <RegistrationBonus />,
  },
  {
    path: "/account/income-main",
    element: <MainPageOFIncome />,
  },
  {
    path: "/account/income-main/referral-bonus",
    element: <ReferralBonus />,
  },
  {
    path: "/account/income-main/team-betting-bonus",
    element: <TeamBettingBonus />,
  },
  {
    path: "/account/income-main/team-salary-bonus",
    element: <TeamSalaryBonus />,
  },
  {
    path: "/account/income-main/royality-bonus",
    element: <RoyalityBonus />,
  },
  {
    path: "/account/income-main/level-bonus",
    element: <LevelBonus />,
  },
  {
    path: "/account/income-main/ico-level-bonus",
    element: <ICOLevelBonus />,
  },
  {
    path: "/account/income-main/betting-bonus",
    element: <BettingBonus />,
  },
  {
    path: "/account/income-main/my-team",
    element: <AllLevelOfTeam />,
  },
  {
    path: "/account/income-main/my-team/levels",
    element: <Tables />,
  },
 
  {
    path: "/account/Teamincome",
    element: <TeamIncome />,
  },
  {
    path: "/p2p",
    element: <P2PTransfer />,
  },
  {
    path: "/promotion/TeamReport",
    element: <TeamReport />,
  },
  {
    path: "/promotion/Teamdata",
    element: <TeamData />,
  },
  {
    path: "/promotion/MyCommission",
    element: <MyCommission />,
  },
  {
    path: "/promotion/Subordinates",
    element: <Subordinates />,
  },
  {
    path: "/promotion/Server",
    element: <Server />,
  },
  {
    path: "/promotion/Rebate",
    element: <RebateRatio />,
  },
  {
    path: "/promotion/PromotionRule",
    element: <PromotionRule />,
  },
  {
    path: "password",
    element: <ChangePassword />,
  },
  {
    path: "/password/account",
    element: <AccountPassword />,
  },
  {
    path: "/password/transction",
    element: <TransactionPassword />,
  },
  {
    path: "/zpdeposit",
    element: <Zpdeposithistory />,
  },
  {
    path: "/zpwithdraw",
    element: <ZpWithdrawlhistory />,
  },
  {
    path: "/account/income-main/cashback-bonus",
    element: <CashBackBonus />,
  },
];
