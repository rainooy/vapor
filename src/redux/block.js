// types
const DETAIL = 'block/DETAIL';

const initState = {
  isloading: false,
  data: {}
};
const blocks = {};
// reducers
const reducers = {
  block (state = initState, action = {}){
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
  getBlockDetail: (height, hash) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('block')}/${height || hash}`);
    dispatch({
      type: DETAIL,
      payload: data,
      id: height || hash
    })
  }

};

export default reducers;
export { actions };