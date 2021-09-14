import axios, { AxiosInstance, AxiosResponse } from "axios";

import { CURRENT_ENV } from "@core/configs/env";

interface Axios extends AxiosInstance {
  [key: string]: any;
}

const axiosBase: Axios = axios.create({ baseURL: CURRENT_ENV.API_URL });

const authAxios: Axios = axios.create({ baseURL: CURRENT_ENV.API_URL });
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
authAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      window.location.reload();
    }

    return error;
  },
);

type CallWithParamsMethod = (
  method: "get" | "delete",
  url: string,
  body?: Record<string, any>,
  options?: Record<string, any>,
  useAuth?: boolean,
  usePrefix?: boolean
) => Promise<any>;
type CallWithBodyMethod = (
  method: "post" | "put" | "patch",
  url: string,
  body?: Record<string, any>,
  options?: Record<string, any>,
  useAuth?: boolean,
  usePrefix?: boolean
) => Promise<any>;
type VerbMethod = (
  url: string,
  body?: Record<string, any>,
  options?: Record<string, any>,
  useAuth?: boolean,
  usePrefix?: boolean
) => Promise<any>;

class BaseService {
  public constructor(private prefix: string, private useAuth = true) {}

  public callWithParams: CallWithParamsMethod = (
    method,
    url,
    params,
    options,
    useAuth,
    usePrefix = true,
  ) => {
    if (useAuth && this.useAuth) {
      return authAxios[method](usePrefix ? `${this.prefix}${url}` : url, {
        params,
        ...options,
      }).then(({ data }: AxiosResponse) => data);
    }

    return axiosBase[method](usePrefix ? `${this.prefix}${url}` : url, {
      params,
      ...options,
    }).then(({ data }: AxiosResponse) => data);
  };

  public callWithBody: CallWithBodyMethod = (
    method,
    url,
    body,
    options,
    useAuth,
    usePrefix = true,
  ) => {
    if (useAuth && this.useAuth) {
      return authAxios[method](
        usePrefix ? `${this.prefix}${url}` : url,
        body,
        options,
      ).then(({ data }: AxiosResponse) => data);
    }

    return axiosBase[method](
      usePrefix ? `${this.prefix}${url}` : url,
      body,
      options,
    ).then(({ data }: AxiosResponse) => data);
  };

  public get: VerbMethod = (url, params, options, useAuth, usePrefix = true) => {
    return this.callWithParams("get", url, params, options, useAuth, usePrefix);
  };

  public post: VerbMethod = (url, body, options, useAuth, usePrefix = true) => {
    return this.callWithBody("post", url, body, options, useAuth, usePrefix);
  };

  public put: VerbMethod = (url, body, options, useAuth, usePrefix = true) => {
    return this.callWithBody("put", url, body, options, useAuth, usePrefix);
  };

  public patch: VerbMethod = (url, body, options, useAuth, usePrefix = true) => {
    return this.callWithBody("patch", url, body, options, useAuth, usePrefix);
  };

  public delete: VerbMethod = (url, params, options, useAuth, usePrefix = true) => {
    return this.callWithParams(
      "delete",
      url,
      params,
      options,
      useAuth,
      usePrefix,
    );
  };
}

export default BaseService;
