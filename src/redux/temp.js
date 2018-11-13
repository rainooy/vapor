// types
const DETAIL = 'block/DETAIL';

const initState = {
  isloading: false,
};

// reducers
const reducers = {
  rankList (state = initState, action = {}){
    switch (action.type) {
      case DETAIL:
        return {
          isloading: false,
          ...action.payload,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getRankList: (page = 1, limit = 10, asset_id = '') => async dispatch => {
    const data = await axios.get(get_path('rank'), { params: { page, limit }});
    dispatch({
      type: RANK,
      payload: data.data,
    })
  }

};

export default reducers;
export { actions };