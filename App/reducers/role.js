import { types } from '../actions/role';

const initState = {
    items: [],
    caps: [],
    loaded: false,
    itemsSelect: []
};

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.GET_LIST_SUCCESS:
            return {
                ...state,
                items: action.data,
                loaded: true,
                itemsSelect: action.data.map(x => ({ id: x.id, name: x.name }))
            }
        case types.GET_CAPS_SUCCESS:
            return {
                ...state,
                caps: action.data,
            }
        case types.CREATE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.data]
            };
        case types.UPDATE_SUCCESS:
            index = state.items.findIndex(item => item.id == action.data.id);
            if (index >= 0) {
                state.items[index] = action.data;
            }
            return {
                ...state
            };
        case types.DELETE_SUCCESS:
            state.items = state.items.filter(item => item.id != action.meta);
            return {
                ...state
            };
        case types.UPDATE_CAPS_SUCCESS:
            index = state.items.findIndex(item => item.id == action.meta);
            if (index >= 0) {
                state.items[index]['caps'] = action.params;
            }
            return {
                ...state
            }
        default:
            return state;
    }
}