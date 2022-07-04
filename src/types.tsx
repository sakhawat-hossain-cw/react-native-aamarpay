export enum RejectCodes {
  APIInitFailure = 'APIInitFailure',
  PaymentInitFailure = 'PaymentInitFailure', 
  PaymentFailure = 'PaymentFailure', 
  PaymentProcessingFailure = 'PaymentProcessingFailure', 
  PaymentCancel = 'PaymentCancel', 
}

export type JSONURLs = {
  success_url: string;
  success_url_suffix: string;
  fail_url: string;
  fail_url_suffix: string;
  cancel_url: string;
  cancel_url_suffix: string;
}

export type PaymentInfo = {
  amount: string;     
  amount_bdt: string;
  amount_currency: string;
  approval_code: string;
  bank_trxid: string;
  bin_cardcategory: string;
  bin_cardtype: string;
  bin_country: string;
  bin_issuer: string;
  call_type: string;
  number: string;
  checkout_status: string;
  convertion_rate: string;
  currency: string;
  currency_merchant: string;
  cus_email: string;
  cus_name: string;
  cus_phone: string;
  date: string;
  date_processed: string;
  desc: string;
  doc_recived: string;
  email_send: string;
  error_code: string;
  error_title: string;
  ip: string;
  mer_txnid: string;
  merchant_id: string;
  opt_a: string;
  opt_b: string;
  opt_c: string;
  opt_d: string;
  pay_status: string;
  payment_processor: string;
  payment_type: string;
  pg_txnid: string;
  processing_charge: string;
  processing_ratio: string;
  rec_amount: string;
  risk_level: string;
  risk_title: string;
  status_code: string;
  us_title: string;
  store_id: string;
  verify_status: string;
}

export type FailureResponse = {
  code: RejectCodes;
  message: string;
}
