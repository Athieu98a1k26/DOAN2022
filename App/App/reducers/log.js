import { types } from "../actions/log";

const initState = {
  items: [],
  loaded: false,
  total: 0,
};

export default function user(state = initState, action) {
  let index;
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
      return {
        ...state,
        items: action.data.list,
        total: action.data.total,
        loaded: true,
      };
    default:
      return state;
  }
}
