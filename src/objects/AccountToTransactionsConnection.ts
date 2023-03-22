// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import CurrencyAmount, { CurrencyAmountFromJson } from "./CurrencyAmount.js";
import PageInfo, { PageInfoFromJson } from "./PageInfo.js";
import Transaction, { TransactionFromJson } from "./Transaction.js";

type AccountToTransactionsConnection = {
  /**
   * The total count of objects in this connection, using the current filters. It is different from the
   * number of objects returned in the current page (in the `entities` field).
   **/
  count: number;

  /** The transactions for the current page of this connection. **/
  entities: Transaction[];

  /** An object that holds pagination information about the objects in this connection. **/
  pageInfo: PageInfo;

  /**
   * Profit (or loss) generated by the transactions in this connection, with the set of filters and
   * constraints provided.
   **/
  profitLoss?: CurrencyAmount;

  /**
   * Average fee earned for the transactions in this connection, with the set of filters and constraints
   * provided.
   **/
  averageFeeEarned?: CurrencyAmount;

  /**
   * Total amount transacted by the transactions in this connection, with the set of filters and
   * constraints provided.
   **/
  totalAmountTransacted?: CurrencyAmount;
};

export const AccountToTransactionsConnectionFromJson = (
  obj: any
): AccountToTransactionsConnection => {
  return {
    count: obj["account_to_transactions_connection_count"],
    entities: obj["account_to_transactions_connection_entities"].map((e) =>
      TransactionFromJson(e)
    ),
    pageInfo: PageInfoFromJson(
      obj["account_to_transactions_connection_page_info"]
    ),
    profitLoss: !!obj["account_to_transactions_connection_profit_loss"]
      ? CurrencyAmountFromJson(
          obj["account_to_transactions_connection_profit_loss"]
        )
      : undefined,
    averageFeeEarned: !!obj[
      "account_to_transactions_connection_average_fee_earned"
    ]
      ? CurrencyAmountFromJson(
          obj["account_to_transactions_connection_average_fee_earned"]
        )
      : undefined,
    totalAmountTransacted: !!obj[
      "account_to_transactions_connection_total_amount_transacted"
    ]
      ? CurrencyAmountFromJson(
          obj["account_to_transactions_connection_total_amount_transacted"]
        )
      : undefined,
  } as AccountToTransactionsConnection;
};

export const FRAGMENT = `
fragment AccountToTransactionsConnectionFragment on AccountToTransactionsConnection {
    __typename
    account_to_transactions_connection_profit_loss: profit_loss {
        __typename
        currency_amount_value: value
        currency_amount_unit: unit
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    account_to_transactions_connection_average_fee_earned: average_fee_earned {
        __typename
        currency_amount_value: value
        currency_amount_unit: unit
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    account_to_transactions_connection_count: count
    account_to_transactions_connection_total_amount_transacted: total_amount_transacted {
        __typename
        currency_amount_value: value
        currency_amount_unit: unit
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    account_to_transactions_connection_entities: entities {
        id
    }
    account_to_transactions_connection_page_info: page_info {
        __typename
        page_info_has_next_page: has_next_page
        page_info_has_previous_page: has_previous_page
        page_info_start_cursor: start_cursor
        page_info_end_cursor: end_cursor
    }
}`;

export default AccountToTransactionsConnection;
