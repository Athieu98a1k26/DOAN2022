export const types = {
    CHANGE_LANGUAGE: 'APP_CHANGE_LANGUAGE',
    GET_OPTIONS: 'APP_GET_OPTIONS',
    SET_OPTIONS_NAME :'SET_OPTIONS_NAME',
    SET_OPTIONS: 'APP_SET_OPTIONS',
    GET_ENUMS: 'APP_GET_ENUMS',
    GET_FIELDS: 'APP_GET_FIELDS',
    TOGGLE_SIDEBAR: 'APP_TOGGLE_SIDEBAR',
    TOGGLE_EXCEL:"TOGGLE_EXCEL"
}


export const getEnums = () => {
    return {
        url: '/api/enums',
        types: {
            success: types.GET_ENUMS,
        }
    };
};

export const getFields = () => {
    return {
        url: '/api/fields',
        types: {
            success: types.GET_FIELDS,
        }
    };
};

export const getOptions = () => {
    return {
        url: '/api/options',
        types: {
            success: types.GET_OPTIONS,
        }
    };
};

export const updateOptions = (options) => {
    return {
        url: '/api/options',
        params: options,
        method: 'post',
        types: {
            success: types.SET_OPTIONS,
        }
    };
};

export const updateOptionsName = (name,options) => {
    return {
        url: `/api/options/${name}`,
        params: options,
        meta:name,
        method: 'post',
        types: {
            success: types.SET_OPTIONS_NAME,
        }
    };
};

export const toggleSidebar = () => {
    return {
        type: types.TOGGLE_SIDEBAR
    }
}

export const getGoogleProfile = () => {
    return {
        url: '/api/google-driver/profile',
        method: 'get'
    };
}


export const loginGoogle = (code) => {
    return {
        url: '/api/google-driver/set-token',
        params: { code },
        method: 'post'
    };
}


export const logoutGoogle = () => {
    return {
        url: '/api/google-driver/remove-token',
        method: 'post'
    };
}

export const toggleExcel = (param) => {
    return {
        params:param,
        type: types.TOGGLE_EXCEL
    }
}



