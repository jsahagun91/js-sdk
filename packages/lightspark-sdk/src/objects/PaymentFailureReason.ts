// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

export enum PaymentFailureReason {
  /**
   * This is an enum value that represents values that could be added in the future.
   * Clients should support unknown values as more of them could be added without notice.
   */
  FUTURE_VALUE = "FUTURE_VALUE",

  NONE = "NONE",

  TIMEOUT = "TIMEOUT",

  NO_ROUTE = "NO_ROUTE",

  ERROR = "ERROR",

  INCORRECT_PAYMENT_DETAILS = "INCORRECT_PAYMENT_DETAILS",

  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",

  INVOICE_ALREADY_PAID = "INVOICE_ALREADY_PAID",

  SELF_PAYMENT = "SELF_PAYMENT",

  INVOICE_EXPIRED = "INVOICE_EXPIRED",
}

export default PaymentFailureReason;
