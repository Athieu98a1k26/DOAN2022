import { types } from '../actions/app';

const initState = {
    enums: {},
    options: {},
    fields: {},
    sidebarMini: true,
    exportExcel: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_ENUMS:
            return {
                ...state,
                enums: action.data,
            }
        case types.GET_FIELDS:
            return {
                ...state,
                fields: action.data,
            }
        case types.GET_OPTIONS:
            return {
                ...state,
                options: action.data
            }
        case types.SET_OPTIONS:
            return {
                ...state,
                options: action.params
            }

        case types.SET_OPTIONS_NAME:
            return {
                ...state,
                options: { ...state.options, [action.meta]: action.params }
            }
        case types.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarMini: !state.sidebarMini
            }
        case types.TOGGLE_EXCEL:
            return {
                ...state,
                exportExcel: action.params
            }
        default:
            return state;
    }
    return state;
}