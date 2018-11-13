// types
const DETAIL = 'asset/DETAIL';

const initState = {
  isloading: true,
  data: {}
};
const assets = {};
// reducers
const reducers = {
  asset (state = initState, action = {}){
    switch (action.type) {
      case DETAIL:
        assets[action.id] = action.payload;
        return {
          isloading: false,
          data: assets,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getAssetDetail: (id, page = 1, limit = 16) => async dispatch => {
    const data = await _ajax.get(`${_conf.get_path('asset')}/${id}`, { params: { page, limit }});
    dispatch({
      type: DETAIL,
      payload: data,
      id: id
    })
  }

};

export default reducers;
export { actions };