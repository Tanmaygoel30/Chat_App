import { axiosInstance } from "./axios";

export const check = async () => {
  try {
    const res = await axiosInstance.get("/auth/check");

    return res.data;
  } catch {
    return null;
  }
};
