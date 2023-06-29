import { atom } from 'recoil';

export type CarInfo = {
  code: string;
  name: string;
};

const defaultCarInfo: CarInfo = {
  code: '',
  name: '',
};

export const CarInfoState = atom<CarInfo>({
  key: 'CarInfoState',
  default: defaultCarInfo,
});
