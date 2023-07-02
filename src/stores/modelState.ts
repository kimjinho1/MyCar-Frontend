import { atom } from "recoil";
import { Drive, Engine, Mission } from "@/apis/api";

export type ModelInfo = {
  code: string;
  fullName: string;
  name: string;
  price: number;
};

export const modelInfoState = atom<ModelInfo>({
  key: "modelInfoState",
  default: {
    code: "",
    fullName: "",
    name: "",
    price: 0,
  },
});

export const engineCodeState = atom<string>({
  key: "engineCodeState",
  default: "",
});

export const missionCodeState = atom<string>({
  key: "missionCodeState",
  default: "",
});

export const driveCodeState = atom<string | null>({
  key: "driveCodeState",
  default: null,
});
