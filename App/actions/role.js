export const types = {
    GET_LIST_SUCCESS: 'ROLE_GET_LIST_SUCCESS',
    CREATE_SUCCESS: 'ROLE_CREATE_SUCCESS',
    UPDATE_SUCCESS: 'ROLE_UPDATE_SUCESS',
    DELETE_SUCCESS: 'ROLE_DELETE_SUCCESS',
    GET_CAPS_SUCCESS: 'ROLE_GET_CAPS_SUCCESS',
    UPDATE_CAPS_SUCCESS: 'ROLE_UPDATE_CAPS_SUCCESS'
}


export const getList = () => {
    return {
        url: '/api/roles',
        types: {
            success: types.GET_LIST_SUCCESS,
        }
    };
};

export const getDetail = (id) => {
    return {
        url: '/api/roles/' + id,
        params: {
            id
        }
    };
};

export const search = (filter) => {
    return {
        url: '/api/roles',
        params: {
            ...filter
        }
    };
};

export const create = (data) => {
    return {
        url: '/api/roles',
        method: 'post',
        params: {
            ...data
        },
        types: {
            success: types.CREATE_SUCCESS,
        }
    };
};

export const update = (data) => {
    return {
        url: '/api/roles/' + data.id,
        method: 'put',
        params: {
            ...data
        },
        types: {
            success: types.UPDATE_SUCCESS,
        }
    };
};

export const remove = (id) => {
    return {
        url: '/api/roles/' + id,
        method: 'delete',
        meta: id,
        types: {
            success: types.DELETE_SUCCESS,
        }
    };
};


export const getCaps = () => {
    return {
        url: '/api/roles/capabilities',
        types: {
            success: types.GET_CAPS_SUCCESS,
        }
    };
};

export const updateCaps = (id, params) => {
    return {
        url: '/api/roles/' + id + '/capabilities',
        method: 'put',
        params: params,
        meta: id,
        types: {
            success: types.UPDATE_CAPS_SUCCESS,
        }
    };
};