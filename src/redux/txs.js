// types
const DETAIL = 'txs/DETAIL';

const initState = {
  isloading: false,
  data: {}
};
const blocks = {};
// reducers
const reducers = {
  txs (state = initState, action = {}){
    switch (action.type) {
      case DETAIL:
        blocks[action.id] = action.payload;
        return {
          isloading: false,
          data: blocks,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getDetail: (txs) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('txs')}/${txs}`);
    dispatch({
      type: DETAIL,
      payload: data,
      id: txs
    });
  }

};

export default reducers;
export { actions };