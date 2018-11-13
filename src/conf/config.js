import icon_btm from '../assets/images/asset/asset-BTM-bytom.svg';
import icon_mmt from '../assets/images/asset/asset-MMT-mimi.svg';
const config = {
  path: {
    api_url: {
      block: '/block',  // int:id, string:hash
      blocks: '/blocks',
      address: '/address',
      search: '/search',
      txs: '/transaction',
      rank: '/rank',
      info: '/stat/total',
      infoDaily: '/daily/total',
      miner: '/stat/miner', // /from to
      minerDaily: '/daily/miner', // /from to
      hashrate: '/stat/hash-rate',
      kline: '/kline', // btm_usd btm_eth btn_btc
      klineDaily: '/daily/kline', // btm_usd btm_eth btn_btc
      nodes: '/nodes',// /nodes?country=cn (cn,sg,jp,es,de,us,kr,ca,ru,uk,other)
      assets: '/assets',  // page, limit
      asset: '/asset',   // /asset/<id>, page,limit
      star: '/star',   // github star
    },
    links: {},
  },
  default_lang: 'zh-cn',
  btm_asset_id: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  coinbase_asset_id: '0000000000000000000000000000000000000000000000000000000000000000',
  btm_amount: 21000000000000,
  token: {
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff': {
      name: 'BTM',
      logo: <Svg width="32" svg={icon_btm} />,
      price: '￥0.25',
      site: 'https://bytom.io'
    },
    'mmt': {
      name: 'MMT',
      logo: <Svg width="32" svg={icon_mmt} />,
      price: '￥100',
    }
  }
};

const get_path = (key) => {
  if (!key) throw new Error('key is required.');
  if (!config.path.api_url[key]) throw new Error('not found.');
  const api_base_url = window.env.apiHost || 'https://blockmeta.com/api/v2';
  return api_base_url + config.path.api_url[key]
};

export default config;
export { config, get_path };