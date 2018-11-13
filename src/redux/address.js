// types
const GET_DETAIL = 'addr/GETDETAIL';
const DETAIL = 'addr/DETAIL';

const initState = {
  isloading: true,
  data: {}
};
const blocks = {};
// reducers
const reducers = {
  address (state = initState, action = {}){
    switch (action.type) {
      case DETAIL:
        blocks[action.id] = action.payload;
        return {
          isloading: false,
          data: blocks,
        };
      case GET_DETAIL:
        return initState;
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getAddressDetail: (address, page) => async dispatch => {
    dispatch({
      type: GET_DETAIL
    });
    const data = await _ajax.get(`${_conf.get_path('address')}/${address}`, { params: { page } });
    dispatch({
      type: DETAIL,
      payload: data,
      id: address
    });
  }

};

export default reducers;
export { actions };