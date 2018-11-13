// types
const LIST = 'node/LIST';

const initState = {
  isloading: true,
};

// reducers
const reducers = {
  nodes (state = initState, action = {}){
    switch (action.type) {
      case LIST:
        return {
          isloading: false,
          data: action.payload.nodes,
          pagination: action.payload.pagination,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getNodeList: (page = 1, limit = 16) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('nodes')}`, { params: {page, limit}});
    dispatch({
      type: LIST,
      payload: data,
    })
  }

};

export default reducers;
export { actions };