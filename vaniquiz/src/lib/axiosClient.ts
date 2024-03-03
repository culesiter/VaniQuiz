import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import queryString from "query-string";
import * as https from "https";
import { getCookie, setCookie } from "cookies-next";

const headers: Readonly<Record<string, string | boolean>> = {
	Accept: "application/json",
	// "Content-Type": "application/json; charset=utf-8",
	// "Access-Control-Allow-Credentials": true,
	// "Access-Control-Allow-Origin": "*",
};

const agent = new https.Agent({
	rejectUnauthorized: false,
});

const config: AxiosRequestConfig = {
	baseURL: process.env.NEXT_PUBLIC_BASE_API_SERVER,
	headers,
	httpsAgent: agent,
	paramsSerializer: (params) => queryString.stringify(params),
	// withCredentials: false,
	timeout: 1000 * 300,
	validateStatus: function (status) {
		return status >= 200 && status < 400;
	},
};

const axiosClient: AxiosInstance = axios.create(config);

axiosClient.interceptors.request.use(async (config) => {
	const token = getCookie("token");
	// @ts-ignore
	// if (config.headers["X-Auth"] === true) {
	//     const session = await getSession();
	//     // @ts-ignore
	//     if (!!session?.accessToken) {
	//         config.headers = {
	//             ...config.headers,
	//             Authorization: `Bearer ${session?.accessToken}`,
	//         };
	//     }
	// }

	config.headers = {
		...config.headers,
		// Authorization: `Bearer ${ACCESS_TOKEN}`,
	};
	// console.log(token, 222, "token");
	// @ts-ignore
	if (token && token !== "") {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response?.data && response?.data?.data) {
			return response.data.data;
		}

		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	async (error) => {
		if (error.response) {
			if (error.response.status === 505 && typeof window !== "undefined") {
				setCookie("token", "");
				window.location.href = "/";
			}
			if (error.response?.data) {
				return Promise.reject(error.response.data);
			}
			return Promise.reject(error.response);
		} else if (error.request) {
			return Promise.reject(error.request);
		} else {
			return Promise.reject(error.message);
		}
	},
);

export default axiosClient;
