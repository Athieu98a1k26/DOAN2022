import { types } from "../actions/user";

const initState = {
  items: [],
  loaded: false,
  total: 0,
  itemSelect: []
};

export default (state = initState, action) => {
  let index;
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
      return {
        ...state,
        items: action.data.items,
        total: action.data.total,
        loaded: true,
        itemSelect: action.data.items.map(x => ({ id: x.id, name: x.fullName }))

      };
    case types.CREATE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.data],
        total: state.total + 1,
      };
    case types.UPDATE_SUCCESS:
      index = state.items.findIndex((item) => item.id == action.data.id);
      if (index >= 0) {
        state.items[index] = action.data;
      }
      return {
        ...state,
      };
    case types.DELETE_SUCCESS:
      state.items = state.items.filter((item) => item.id != action.meta);
      return {
        ...state,
        total: state.total - 1,
      };
    default:
      return state;
  }
};
