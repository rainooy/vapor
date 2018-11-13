// types
const RANK = 'rank/LIST';

const initState = {
  isloading: true,
};

// reducers
const reducers = {
  ranks (state = initState, action = {}){
    switch (action.type) {
      case RANK:
        return {
          isloading: false,
          data: action.payload.addresses,
          pagination: action.payload.pagination,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getRankList: (asset_id = '', page = 1, limit = 16) => async dispatch => {
    const data = await _ajax.get(_conf.get_path('rank') + ( asset_id && `/${asset_id}`), { params: { page, limit }});
    dispatch({
      type: RANK,
      payload: data,
    })
  }

};

export default reducers;
export { actions };