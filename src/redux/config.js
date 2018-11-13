// types
const CHANGE_LANG = 'config/CHANGE_LANG';
const user_lang = ((navigator.language||navigator.userLanguage) || 'en').substr(0, 2);
const initState = {
  isloading: false,
  lang: user_lang === 'zh' ? 'zh' : 'en',
};
!window.env.lang && (window.env.lang = user_lang);
// reducers
const reducers = {
  config (state = initState, action = {}){
    switch (action.type) {
      case CHANGE_LANG:
        window.env.lang = action.payload;
        return {
          isloading: false,
          lang: action.payload
        };
      default: 
        return state;
    }
  },

};

// action creators
const actions = {
  switchLang: (lang) => dispatch => {
    dispatch({
      type: CHANGE_LANG,
      payload: lang,
    })
  },
};

export default reducers;
export { actions };