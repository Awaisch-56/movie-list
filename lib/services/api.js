import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class API {
  instance;
  constructor() {
    this.instance = Axios.create({
      baseURL: "http://localhost:3030/",
    });
    this.instance.interceptors.request.use(
      this.requestInterceptor,
      this.requestErrorInterceptor
    );
    this.instance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }
  requestInterceptor(config) {
    const token = localStorage.getItem("token");
    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  requestErrorInterceptor(error) {
    return Promise.reject(error);
  }
  responseInterceptor(response) {
    return response;
  }
  responseErrorInterceptor(error) {
    if (error.response) {
      if (Array.isArray(error.response.data.message)) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    } else if (error.request) {
      toast.error("No response received from the server");
    } else {
      toast.error("Error occurred while making the request");
    }
    return Promise.reject(error);
  }
  get(url) {
    return this.instance.get(url).then(this.handleApiResponse);
  }
  post(url, data) {
    return this.instance.post(url, data).then(this.handleApiResponse);
  }
  put(url, data) {
    return this.instance.put(url, data).then(this.handleApiResponse);
  }
  delete(url) {
    return this.instance.delete(url).then(this.handleApiResponse);
  }
  handleApiResponse(response) {
    return response;
  }
}

const api = new API();
export default api;
