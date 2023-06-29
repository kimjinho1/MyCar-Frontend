import { atom } from 'recoil';

export type ModelInfo = {
  code: string;
  fullName: string;
  name: string;
  price: number;
};

const defaultModelInfo: ModelInfo = {
  code: '',
  fullName: '',
  name: '',
  price: 0,
};

export const modelInfoState = atom<ModelInfo>({
  key: 'modelInfoState',
  default: defaultModelInfo,
});
