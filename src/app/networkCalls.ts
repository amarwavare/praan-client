import axios, { AxiosResponse } from 'axios';

export interface IAxios {
    method: 'get'|'post'|'put'|'delete';
    url: string;
    requestData: any;
    params: any;
}

export const baseUrl = 'http://localhost:8080';

const ContentTypeFileHeaders = {
    'Content-Type' : 'multipart/form-data'
}

const ContentTypeHeaders = {
    "Content-Type" : "application/json"
  }

export const praanAxiosFileInterceptor = ({method, url, requestData, params}:IAxios) => {
    return axios.request({
        method:method,
        baseURL:baseUrl,
        url:url,
        data:requestData,
        headers:ContentTypeFileHeaders,
        params:params,
    })
}

export const praanAxiosInterceptor = ({method, url, requestData, params}:IAxios) => {
    return axios.request({
        method:method,
        baseURL:baseUrl,
        url:url,
        data:requestData,
        headers:ContentTypeHeaders,
        params:params,
    })
}