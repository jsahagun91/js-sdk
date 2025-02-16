// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import AuthProvider from "./AuthProvider.js";

export default class StubAuthProvider implements AuthProvider {
  async addAuthHeaders(headers: any): Promise<any> {
    return headers;
  }
  async isAuthorized(): Promise<boolean> {
    return false;
  }

  async addWsConnectionParams(params: any): Promise<any> {
    return params;
  }
}
