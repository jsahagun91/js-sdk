// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import BitcoinNetwork from "./BitcoinNetwork.js";
import CurrencyAmount, { CurrencyAmountFromJson } from "./CurrencyAmount.js";
import PaymentRequestData from "./PaymentRequestData.js";

/** This object represents the BOLT #11 invoice protocol for Lightning Payments. See https://github.com/lightning/bolts/blob/master/11-payment-encoding.md. **/
type InvoiceData = PaymentRequestData & {
  encodedPaymentRequest: string;

  bitcoinNetwork: BitcoinNetwork;

  /** The payment hash of this invoice. **/
  paymentHash: string;

  /**
   * The requested amount in this invoice. If it is equal to 0, the sender should choose the amount to
   * send.
   **/
  amount: CurrencyAmount;

  /** The date and time when this invoice was created. **/
  createdAt: string;

  /** The date and time when this invoice will expire. **/
  expiresAt: string;

  /** The typename of the object **/
  typename: string;

  /** A short, UTF-8 encoded, description of the purpose of this invoice. **/
  memo?: string;
};

export const InvoiceDataFromJson = (obj: any): InvoiceData => {
  return {
    encodedPaymentRequest: obj["invoice_data_encoded_payment_request"],
    bitcoinNetwork:
      BitcoinNetwork[obj["invoice_data_bitcoin_network"]] ??
      BitcoinNetwork.FUTURE_VALUE,
    paymentHash: obj["invoice_data_payment_hash"],
    amount: CurrencyAmountFromJson(obj["invoice_data_amount"]),
    createdAt: obj["invoice_data_created_at"],
    expiresAt: obj["invoice_data_expires_at"],
    typename: "InvoiceData",
    memo: obj["invoice_data_memo"],
  } as InvoiceData;
};

export const FRAGMENT = `
fragment InvoiceDataFragment on InvoiceData {
    __typename
    invoice_data_encoded_payment_request: encoded_payment_request
    invoice_data_bitcoin_network: bitcoin_network
    invoice_data_payment_hash: payment_hash
    invoice_data_amount: amount {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    invoice_data_created_at: created_at
    invoice_data_expires_at: expires_at
    invoice_data_memo: memo
}`;

export default InvoiceData;
