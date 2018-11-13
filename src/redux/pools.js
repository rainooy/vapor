import { format, subDays } from 'date-fns';
// types
const POOL = 'pool/LIST';

const initState = {
  isloading: true,
};

// reducers
const reducers = {
  pools (state = initState, action = {}){
    switch (action.type) {
      case POOL:
        return {
          isloading: false,
          data: action.payload,
          // pagination: action.payload.pagination,
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  getPoolList: (from = format(subDays(new Date(), 1), 'X'), to = format(new Date(), 'X')) => async dispatch => {
    const data = await _ajax.get(_conf.get_path('miner'), { params: { from, to }});
    dispatch({
      type: POOL,
      payload: data,
    })
  }

};

export default reducers;
export { actions };