import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api/v1"
      : "/api/v1",
  withCredentials: true,
});
