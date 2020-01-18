import axios from 'axios';
import Vue from 'vue';
import router from '../router'
const service = axios.create({
    timeout: 30000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code === 1004) {
                router.replace({
                    path: '/login'
                })
            } else {
                return response.data;
            }
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
