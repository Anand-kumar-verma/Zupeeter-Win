export const domain = "https://zupeeter-win-timer.onrender.com";
export const game_domain = "https://bet.zupeeter.com";
export const aviatordomain = "https://zupeeter-win-timer.onrender.com";


// export const game_domain = "http://192.168.18.183:9000";

export const rupees = "₹";
export const zubgback = "#F48901";
export const front_end_domain = "https://zupeeter.com";
export const download_app_url = "https://play.zupeeter.com/ZUPEETER.pdf";
export const tokenContractAddress ="0x79E952d542D2BdD7eb77446ECaeFd8fe8eeEd6e2";



export const endpoint = {
  login: `${game_domain}/api/v1/user_login`,
  signup: `${game_domain}/api/v1/signup`,
  get_user_intro_name: `${game_domain}/api/v1/get-sponsor-name`,
  profile_function: `${game_domain}/api/v1/profileapi`,
  get_level_general: `${game_domain}/api/v1/get_level_general_data`,
  yesterday_income: `${game_domain}/api/v1/get-total-betA-ad-income-yesterday`,
  get_level: `${game_domain}/api/v1/get-level`,
  subordinate_data: `${game_domain}/api/v1/get-subordinate-data-funx`,
  commission_data: `${game_domain}/api/v1/get-commisssion-data-funx`,
  bet_placed: `${game_domain}/api/v1/bet`,
  my_history: `${game_domain}/api/v1/getbet-game-results`,
  game_history: `${game_domain}/api/v1/colour_result`,
  get_balance: `${game_domain}/api/v1/userwallet`,
  status: `${game_domain}/api/v1/get-status`,
  win_list_top: `${game_domain}/api/v1/get-top-winners`,
  daily_salary_income: `${game_domain}/api/v1/daily-salary-icome`,
  weekly_salary_income: `${game_domain}/api/v1/weekly-salary-icome`,
  deposit_bonus: `${game_domain}/api/v1/get-deposit-bonus-income/`,
  vip_income: `${game_domain}/api/v1/vip-bonus`,
  incom_gift: `${game_domain}/api/v1/gift-bonus-list`,
  recharge_income: `${game_domain}/api/v1/team-recharge-bonus`,
  company_promoter_income: `${game_domain}/api/v1/company-promoter-bonus`,
  welcomebonus_income: `${game_domain}/api/v1/welcome-bonus-list`,
  payment_inr: `${game_domain}/api/v1/inr-payin-request`,
  call_back_url: `${game_domain}/api/v1/inr-payin-request-inr-call-back-user-screen`,
  payment_request: `${game_domain}/api/deposit-request`,
  deposit_history: `${game_domain}/api/v1/deposit-history-inr`,
  deposit_history_usdt: `${game_domain}/api/v1/deposit-history-usdt`,
  admin_qr_address: `${game_domain}/api/v1/admin-qr-address`,
  user_bank_details: `${game_domain}/api/v1/user-bank-details`,
  user_bank_add: `${game_domain}/api/v1/bank-add`,
  get_claim_card: `${game_domain}/api/v1/clame-bonus`,
  get_card: `${game_domain}/api/v1/get-gift-card-list`,
  level_income: `${game_domain}/api/v1/level-income`,
  p2p_transfer: `${game_domain}/api/v1/p-to-p-fund_transfer`,
  p2p_transfer_history: `${game_domain}/api/v1/p-to-p-fund_transfer-history`,
  ticket_raised: `${game_domain}/api/v1/ticket-raised`,
  ticket_raised_history: `${game_domain}/api/v1/ticket-raised-history`,
  forget_password: `${game_domain}/api/v1/change-password`,
  zp_payout: `${game_domain}/api/v1/zp-user-payout`,
  Zp_withdrawal_history: `${game_domain}/api/v1/zp-withdrawal-history`,
  Zp_deposit_history: `${game_domain}/api/v1/zp-deposit-history`,
  zp_own_address: `${game_domain}/api/v1/zp-payin-ownr-address`,
  zp_paying: `${game_domain}/api/v1/zp-payin-request`,
  view_withdrwal_new_inr: `${game_domain}/api/v1/withdrawal-history-inr`,
  withdrwal_history: `${game_domain}/api/v1/withdrawal-history-inr`,
  wallet_withdrawl: `${game_domain}/api/v1/inr-payout-request`,
  cashback_bonus: `${game_domain}/api/v1/getCashBack-report`,
  update_bank_details: `${game_domain}/api/update_bank_details_new`,
  update_upi_details: `${game_domain}/api/update_upi_details`,
  update_password: `${game_domain}/api/update_password`,
  pin_password: `${game_domain}/api/update_pin_password`,
  payin_response: `${game_domain}/api/payin_response`,
  payin_response_akash: `${game_domain}/api/payin_response_new`,
  payin_response_ico_token_akash: `${game_domain}/api/payin_response_upi_token`,
  registration_bonus: `${game_domain}/api/view_direct_referral_income`,
  view_bank_details: `${game_domain}/api/view_bank_details_new`,
  view_upi_details: `${game_domain}/api/view_upi_details`,
  view_usdt_address: `${game_domain}/api/view_wallet_address`,
  update_usdt_address: `${game_domain}/api/update_usdt_address`,
  info_promotion: `${game_domain}/api/get_info`,
  team_info: `${game_domain}/api/team_count`,
  team_report: `${game_domain}/api/TeamReport`,
  team_data: `${game_domain}/api/get_all`,

  // ovi panel api's
  trx_bet_placed_node: `${game_domain}/api/v1/trx-bet`,
  trx_game_history: `${game_domain}/api/v1/trx-auto-genrated-result`, //////// done in node js
  trx_my_history_new: `${game_domain}/api/v1/trx-getColourBets-temp`, /// done  in node js


  node_api: {
    get_leder_data: `${domain}/api/v1/get-ledger-data`,
    my_history: `${domain}/api/v1/my-history-by-user-id`,
    login_with_node: `${domain}/api/v1/createuser`,
    main_wallet: `${domain}/main-wallet-to-aviator`,
    aviator_main: `${domain}/aviator-to-main-wallet`,
    get_top_users: `${domain}/api/v1/get-top-users`,
  },
  token_data: {
    main_wallet: "",
  },

  node:{
    top_two_winners:game_domain+"/api/v1/getTopTwo_winner",
    top_winners:game_domain+"/api/v1/getTopWinners",
    history_my: game_domain + "/api/v1/getMyHistory-roulette",
     game_result: game_domain + "/api/v1/getRouletteGameHistory",
     bet_satta: game_domain + "/api/v1/betPlacedSatta",
    satta_game_Lastfour: game_domain + "/api/v1/getSattaGameHistoryLastFour",
    satta_game_gamehistory: game_domain + "/api/v1/getSattaGameHistory",
    satta_game_myhistory: game_domain + "/api/v1/getSattaMyHistory",
    getStatusSattaMatka: game_domain + "/api/v1/getStatusSattaMatka",
    referral_bonus: game_domain + "/api/v1/getReferralBonus",
    level_income: game_domain + "/api/v1/getLevelIncome",
    cashback_income: game_domain + "/api/v1/cash-back-income",
    get_bank_list: game_domain + "/api/v1/get-bank-Details",
    get_upi_list: game_domain + "/api/v1/get-upi-details",
    deposite_request: game_domain + "/api/v1/payin-request",
    withdraw_payment: game_domain + "/api/v1/payout-request",
    add_bank: game_domain + "/api/v1/add-bank-upi",
    // bank_details: game_domain + "/api/v1/user-bank-details",
    withdrawl_history: game_domain + "/api/v1/withdrawal-history",
    deposit_history: game_domain + "/api/v1/deposit-history",     
  },

  rollet: {
    bet_now: game_domain + "/api/v1/betPlacedRoulette",
  },
};
