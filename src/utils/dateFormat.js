import { distanceInWordsToNow, format  } from 'date-fns';

const locales = {
  zh: require('date-fns/locale/zh_cn'),
  en: require('date-fns/locale/en'),
}

export default {
  distanceInWordsToNow(date, opts) {
    return distanceInWordsToNow(date, Object.assign({}, opts, {
      locale: locales[window.env.lang || 'en']
    }));
  },
  format(date, formatStr = 'YYYY-MM-DD HH:mm:ss', opts) {
    return format(date, formatStr, Object.assign({}, opts, {
      locale: locales[window.env.lang || 'en']
    }));
  },
}