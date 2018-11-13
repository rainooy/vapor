import style from '../../assets/common.scss';
import f2pool from '../../assets/images/pool/f2pool@3x.png';
import btccpool from '../../assets/images/pool/btccpool@3x.png';
import uupool from '../../assets/images/pool/uupool-1@3x.png';
import beepool from '../../assets/images/pool/beepool@3x.png';
import renpool from '../../assets/images/pool/pool.ren@3x.png';
import zhizhupool from '../../assets/images/pool/zhizhu@3x.png';
import antpool from '../../assets/images/pool/antpool@3x.png';
import matpool from '../../assets/images/pool/matpool@3x.png';
import viabtc from '../../assets/images/pool/viabtc@3x.png';

export default ({pool, address}) => {
  const pools = {
    f2pool,
    btccpool,
    uupool,
    beepool,
    renpool,
    zhizhupool,
    antpool,
    matpool,
    viabtc,
  };
  return pools[pool] ? 
      <Link to={`/address/${address}`}><img style={{ marginRight: 8, width: 16, height: 16, verticalAlign: -3 }} src={pools[pool]} alt={pool}/>{pool}</Link> 
    : 
      <Link to={`/address/${address}`}><p style={{ maxWidth: 150 }} className={style.home_list_hash}>{address}</p></Link>;
}