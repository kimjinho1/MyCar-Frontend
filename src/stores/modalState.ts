import { DefaultValue, atom, selector } from "recoil";

/** 바뀌는 옵션들 정보 관련 모달 */
export const changeOptionModalState = atom<boolean>({
  key: "changeOptionModalState",
  default: false,
});

export type errorModalProps = {
  isOpen: boolean;
  isRedirect: boolean;
  messages: string[];
};

/** 에러 모달  */
export const errorModalState = atom<errorModalProps>({
  key: "errorModalState",
  default: {
    isOpen: false,
    isRedirect: false,
    messages: [],
  },
});

/** SET: 옵션 선택 */
export const setErrorModalInfoState = selector({
  key: "setErrorModalInfoState",
  get: ({}) => {
    throw new Error("Cannot get value of setErrorModalInfo selector");
  },
  set: (
    { set, get, reset },
    newValue: { messages: string; isRedirect: boolean } | DefaultValue
  ) => {
    const errorModal = get(errorModalState);
    if (errorModal.isOpen) {
      return;
    }
    if (newValue instanceof DefaultValue) {
      // Handle resetting the state if needed
      reset(errorModalState);
      return;
    }
    const { messages, isRedirect } = newValue;
    if (typeof messages === "string") {
      set(errorModalState, {
        isOpen: true,
        isRedirect,
        messages: messages.split("\n"),
      });
    }
  },
});
