export const types = {
    GET_LIST_SUCCESS: 'LOG_GET_LIST_SUCCESS',
}

export const getList = (filter) => {
    return {
        url: '/api/log',
         params: {
            ...filter
        },
        types: {
            success: types.GET_LIST_SUCCESS,
        }
    };
};

export const filter = (filter) => {
    return {
        url: '/api/log',
        params: {
            ...filter
        },
    };
};


