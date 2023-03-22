// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

export enum WithdrawalRequestStatus {
  /**
   * This is an enum value that represents values that could be added in the future.
   * Clients should support unknown values as more of them could be added without notice.
   */
  FUTURE_VALUE = "FUTURE_VALUE",

  FAILED = "FAILED",

  IN_PROGRESS = "IN_PROGRESS",

  SUCCESSFUL = "SUCCESSFUL",
}

export default WithdrawalRequestStatus;
