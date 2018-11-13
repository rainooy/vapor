import { combineReducers } from 'redux';
import rank from './rank';
import block from './block';
import blocks from './blocks';
import pools from './pools';
import address from './address';
import txs from './txs';
import config from './config';
import asset from './asset';
import assets from './assets';
import nodes from './nodes';




export default combineReducers({
  ...rank,
  ...block,
  ...blocks,
  ...address,
  ...txs,
  ...config,
  ...pools,
  ...asset,
  ...assets,
  ...nodes,
});
