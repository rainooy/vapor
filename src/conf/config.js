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
};

const get_path = (key) => {
  if (!key) throw new Error('key is required.');
  if (!config.path.api_url[key]) throw new Error('not found.');
  const localApiHost = localStorage.getItem('curEnv') && localStorage.getItem('apiHost');
  const api_base_url = localApiHost || window.env.api;
  return api_base_url + config.path.api_url[key]
};

export default config;
export { config, get_path };