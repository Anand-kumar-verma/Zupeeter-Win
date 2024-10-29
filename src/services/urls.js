export const dummy_aviator = "https://zupeeter-win-timer.onrender.com";
export const domain = "https://zupeeter-win-timer.onrender.com";
// export const domain_ovi_node = "https://bet.zupeeter.com";
// export const game_domain = "https://bet.zupeeter.com";
export const tokenContractAddress ="0x79E952d542D2BdD7eb77446ECaeFd8fe8eeEd6e2";
export const rupees = "₹";
export const zubgback = "#F48901";
// export const baseUrl = "https://bet.zupeeter.com";
export const front_end_domain = "https://play.zupeeter.com";
export const usdt_base_url = "https://zupeegame.info";
export const download_app_url = "https://play.zupeeter.com/ZUPEETER.pdf";
export const baseUrl = "http://192.168.18.183:9000";
export const domain_ovi_node = "http://192.168.18.183:9000";
export const game_domain = "http://192.168.18.183:9000";

export const endpoint = {
  get_royality_date: `${domain_ovi_node}/get-royality-date`,
  usdt_deposit_request: `${baseUrl}/api/insert_coin_payment_gateway`,
  login: `${game_domain}/api/v1/user_login`,
  signup: `${game_domain}/api/v1/signup`,
  get_user_intro_name: `${game_domain}/api/v1/get-sponsor-name`,
  profile_function: `${game_domain}/api/v1/profileapi`,
  get_level_general: `${game_domain}/api/v1/get_level_general_data`,
  yesterday_income: `${game_domain}/api/v1/get-total-betA-ad-income-yesterday`,
  get_level: `${game_domain}/api/v1/get-level`,
  subordinate_data: `${game_domain}/api/v1/get-subordinate-data-funx`,
  commission_data: `${game_domain}/api/v1/get-commisssion-data-funx`,

  //wingo
  // bet_placed: `${baseUrl}/api/betnew_color`,
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
  payment: `${game_domain}/api/v1/payment`,
  payment_request: `${game_domain}/api/deposit-request`,
  deposit_history: `${game_domain}/api/v1/deposit-history-inr`,
  deposit_history_usdt: `${game_domain}/api/v1/deposit-history-usdt`,
  admin_qr_address: `${game_domain}/api/v1/admin-qr-address`,
  deposite_usdt_payin: `${game_domain}/api/v1/payin-request`,
  bank_details: `${game_domain}/api/v1/user-bank-details`,
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
  withdrawal_request_usdt: `${game_domain}/api/v1/payout-request`,
  withdrawal_address_usdt: `${game_domain}/api/v1/add-usdt-address`,
  get_address_list: `${game_domain}/api/v1/usdt-address-record`,
  withdrawl_usdt_history: `${game_domain}/api/v1/withdrawal-history-usdt`,
  cashback_bonus: `${game_domain}/api/v1/getCashBack-report`,

  total_withdrawal_bet: `${baseUrl}/api/total_withdrawal_bet`,
  my_team_level: `${baseUrl}/api/my_team`,
  my_team_level_report_indevidual: `${baseUrl}/api/member_report`,
  bank: `${baseUrl}/api/bank`,
  update_bank_details: `${baseUrl}/api/update_bank_details_new`,
  update_upi_details: `${baseUrl}/api/update_upi_details`,
  fund_transfer_history: `${baseUrl}/api/view_fund_transfer`,
  fund_recieve: `${baseUrl}/api/view_fund_receive`,
  // get_user_intro_name: `${baseUrl}/api/get_intro_name`,
  insert_fund_transfer: `${baseUrl}/api/insert_fund_transfer`,
  view_salary_income: `${baseUrl}/api/view_salary_income`,
  get_token_price: `${baseUrl}/api/token_price`,
  get_token_price_in_dooler: `${baseUrl}/api/get_price_ico`,
  update_password: `${baseUrl}/api/update_password`,
  pin_password: `${baseUrl}/api/update_pin_password`,
  view_ico_purchaseing: `${baseUrl}/api/view_ico_purchaseing`,
  insert_ico_purchase: `${baseUrl}/api/insert_ico_purchase`,

  // wallet_deposit_history: `${baseUrl}/api/wallet_deposit`,

  wallet_deposit: `${baseUrl}/api/wallet_deposit_insert`,
  wallet_withdrawl: `${baseUrl}/api/insert_withdrawal_request_inr_new`,
  usdt_withdrawl: `${baseUrl}/api/insert_withdrawal_request_usdt`,
  // withdrawl_status: `${baseUrl}/api/status`,
  // payment
  payin_response: `${baseUrl}/api/payin_response`,
  payin_response_akash: `${baseUrl}/api/payin_response_new`,
  payin_response_ico_token_akash: `${baseUrl}/api/payin_response_upi_token`,

  indian_insert_deposite: `${baseUrl}/api/indian_insert_deposite`,

  registration_bonus: `${baseUrl}/api/view_direct_referral_income`,
  view_bank_details: `${baseUrl}/api/view_bank_details_new`,
  view_upi_details: `${baseUrl}/api/view_upi_details`,
  view_usdt_address: `${baseUrl}/api/view_wallet_address`,
  update_usdt_address: `${baseUrl}/api/update_usdt_address`,
  token_launch: `${baseUrl}/api/token_launch`,
  info_promotion: `${baseUrl}/api/get_info`,
  team_info: `${baseUrl}/api/team_count`,
  team_report: `${baseUrl}/api/TeamReport`,
  team_data: `${baseUrl}/api/get_all`,
  view_paying_api: `${baseUrl}/api/view_paying_api`,
  update_profile_pic: `${baseUrl}/api/update_profile_pic`,

  payin_status: `${baseUrl}/api/payin_api`,
  swnl_pay_in_api: `${baseUrl}/api/insert_fund_request_vapayout`,

  // ovi panel api's
  trx_bet_placed_node: `${game_domain}/api/v1/trx-bet`,
  trx_game_history: `${game_domain}/api/v1/trx-auto-genrated-result`, //////// done in node js
  trx_my_history_new: `${game_domain}/api/v1/trx-getColourBets-temp`, /// done  in node js

  // ticket_raised: `${domain_ovi_node}/ticket-raised`,
  // ticket_raised_history: `${domain_ovi_node}/ticket-raised-history`,

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
  //////// testing only
  // trx_testing: `${domain_ovi_node}/trx_result-node-test`,
};
