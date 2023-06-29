import axios, { AxiosError } from "axios";

export const isAxiosError = <Response>(
  error: unknown
): error is AxiosError<Response> => {
  return axios.isAxiosError(error);
};
