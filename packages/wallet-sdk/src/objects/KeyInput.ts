// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import KeyType from "./KeyType.js";

type KeyInput = {
  type: KeyType;

  publicKey: string;
};

export const KeyInputFromJson = (obj: any): KeyInput => {
  return {
    type: KeyType[obj["key_input_type"]] ?? KeyType.FUTURE_VALUE,
    publicKey: obj["key_input_public_key"],
  } as KeyInput;
};

export default KeyInput;
