// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

export enum WebhookEventType {
  /**
   * This is an enum value that represents values that could be added in the future.
   * Clients should support unknown values as more of them could be added without notice.
   */
  FUTURE_VALUE = "FUTURE_VALUE",

  PAYMENT_FINISHED = "PAYMENT_FINISHED",

  NODE_STATUS = "NODE_STATUS",

  WALLET_STATUS = "WALLET_STATUS",

  WALLET_OUTGOING_PAYMENT_FINISHED = "WALLET_OUTGOING_PAYMENT_FINISHED",

  WALLET_INCOMING_PAYMENT_FINISHED = "WALLET_INCOMING_PAYMENT_FINISHED",

  WALLET_WITHDRAWAL_FINISHED = "WALLET_WITHDRAWAL_FINISHED",

  WALLET_FUNDS_RECEIVED = "WALLET_FUNDS_RECEIVED",
}

export default WebhookEventType;
