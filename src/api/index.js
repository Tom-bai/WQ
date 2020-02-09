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
        url: `${baseUrl}/advertising/rules`,
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

export const userAttentionDelete = data => {
    return request({
        url: `${baseUrl}/attention`,
        method: 'delete',
        data: data,
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

export const adminGetGoldRules = query => {
    return request({
        url: `${baseUrl}/goldRules`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminPutGoldRules = putData => {
    return request({
        url: `${baseUrl}/goldRules`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminGetCapacity = query => {
    return request({
        url: `${baseUrl}/account/capacity`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userGetCapacity = query => {
    return request({
        url: `${baseUrl}/account/childcount`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminAccountDelete = id => {
    return request({
        url: `${baseUrl}/account/${id}`,
        method: 'delete',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const userAdvertisingDelete = data => {
    return request({
        url: `${baseUrl}/advertising`,
        method: 'delete',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminSite = query => {
    return request({
        url: `${baseUrl}/site`,
        method: 'get',
        params: query,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminSiteQuery = query => {
    return request({
        url: `${baseUrl}/site/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminPostSite = data => {
    return request({
        url: `${baseUrl}/site`,
        method: 'post',
        data: data,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminPutSite = putData => {
    return request({
        url: `${baseUrl}/site`,
        method: 'put',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminDeleteSite = query => {
    return request({
        url: `${baseUrl}/site/${query}`,
        method: 'delete',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminCanAddGroup = query => {
    return request({
        url: `${baseUrl}/attention/canAddGroup`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminRealsite = query => {
    return request({
        url: `${baseUrl}/realsite/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminInfotemp = query => {
    return request({
        url: `${baseUrl}/infotemp`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminInfotempGet = query => {
    return request({
        url: `${baseUrl}/infotemp/${query}`,
        method: 'get',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminDeleteInfotemp = query => {
    return request({
        url: `${baseUrl}/infotemp/${query}`,
        method: 'delete',
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};

export const adminPostInfotemp = putData => {
    return request({
        url: `${baseUrl}/infotemp`,
        method: 'post',
        data: putData,
        headers: {
            Authentication: localStorage.getItem('token')
        },
    });
};