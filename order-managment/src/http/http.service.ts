import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.PRODUCT_API_BASE_URL,
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${process.env.PRODUCT_SECRET_TOKEN}`,
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = process.env.SECRET_TOKEN;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }
}
