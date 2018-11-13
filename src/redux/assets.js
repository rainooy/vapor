// types
const LIST = 'asset/LIST';

const initState = {
  isloading: true,
};

// reducers
const reducers = {
  assets (state = initState, action = {}){
    switch (action.type) {
      case LIST:
        return {
          isloading: false,
          data: action.payload.assets,
          pagination: action.payload.pagination,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getAssetsList: (page = 1, limit = 16) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('assets')}`, { params: {page, limit}});
    dispatch({
      type: LIST,
      payload: data,
    })
  }

};

export default reducers;
export { actions };