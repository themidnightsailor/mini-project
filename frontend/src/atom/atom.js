import { atom } from "recoil";

export const check = atom({
  key: "signupStatus",  // unique + better naming
  default: false,
});
