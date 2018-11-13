// types
const LIST = 'block/LIST';

const initState = {
  isloading: true,
};

// reducers
const reducers = {
  blocks (state = initState, action = {}){
    switch (action.type) {
      case LIST:
        return {
          isloading: false,
          data: action.payload.blocks,
          pagination: action.payload.pagination,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getBlockList: (page = 1, limit = 16) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('blocks')}`, { params: {page, limit}});
    dispatch({
      type: LIST,
      payload: data,
    })
  }

};

export default reducers;
export { actions };