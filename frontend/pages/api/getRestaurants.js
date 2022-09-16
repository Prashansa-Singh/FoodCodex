import { axiosInstance } from "./axiosConfig";

const url = '/retrieve/6310521c744ac9f1587375fa';

export function getRestaurants(){
    return axiosInstance.get(url);
}