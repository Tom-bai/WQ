import request from '../utils/request';
const baseUrl = '/api'

export const file = data => {
    return request({
        url: `${baseUrl}/file`,
        method: 'post',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const login = query => {
    return request({
        url: `${baseUrl}/user/login`,
        method: 'get',
        params: query
    });
};

export const info = query => {
    return request({
        url: `${baseUrl}/user/info`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAccount = query => {
    return request({
        url: `${baseUrl}/account`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminChildcount = query => {
    return request({
        url: `${baseUrl}/account/childcount`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userChildcount = query => {
    return request({
        url: `${baseUrl}/account/count`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userChildgoldCoin = query => {
    return request({
        url: `${baseUrl}/account/goldCoin`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdd = data => {
    return request({
        url: `${baseUrl}/account`,
        method: 'post',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAccountSearch = query => {
    return request({
        url: `${baseUrl}/account/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAccounEdit = putData => {
    return request({
        url: `${baseUrl}/account`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};


export const adminPasswordEdit = putData => {
    return request({
        url: `${baseUrl}/user/password`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};
export const adminAdvertising = query => {
    return request({
        url: `${baseUrl}/advertising`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingAll = query => {
    return request({
        url: `${baseUrl}/advertising/list`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingSearch = query => {
    return request({
        url: `${baseUrl}/advertising/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingPost = data => {
    return request({
        url: `${baseUrl}/advertising`,
        method: 'post',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingPut = putData => {
    return request({
        url: `${baseUrl}/advertising`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingRulesPut = putData => {
    return request({
        url: `${baseUrl}/advertising`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAdvertisingRules = query => {
    return request({
        url: `${baseUrl}/advertising/rules`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userAttention = query => {
    return request({
        url: `${baseUrl}/attention`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userAttentionAdd = data => {
    return request({
        url: `${baseUrl}/attention`,
        method: 'post',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userAttentionEdit = putData => {
    return request({
        url: `${baseUrl}/attention`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userAttentionSearch = query => {
    return request({
        url: `${baseUrl}/attention/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminInformationInfotemp = query => {
    return request({
        url: `${baseUrl}/infotemp`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminInformationEdit = putData => {
    return request({
        url: `${baseUrl}/infotemp`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userInformationInfo = query => {
    return request({
        url: `${baseUrl}/info`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userInformationEdit = putData => {
    return request({
        url: `${baseUrl}/info`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};