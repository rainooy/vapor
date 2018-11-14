/**
* Blocks 
* @author Rainoy <email:rainoy.me@gmail.com>
* @version 0.0.1
*/
import React from 'react';
import classnames from 'classnames/bind';
import style from '../assets/common.scss';

import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Txs from './components/Txs';
import Footer from './components/Footer';
import Pager from './components/Pager';
import { FormattedMessage } from 'react-intl';
import { actions } from '../redux/block'
import { format } from 'date-fns';

import icon_trans from '../assets/images/icon/transactions.svg';
import icon_comments from '../assets/images/icon/comments.svg';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  block: state.block,
})
@connect(mapStateToProps, { ...actions })
class Block extends React.Component {

  constructor (props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match: { params }, block, getBlockDetail, } = this.props;
    // if(!block.data[params.id]){
    //   getBlockDetail(params.id);
    // }
    getBlockDetail(params.id);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { match: { params }, block, getBlockDetail, } = this.props;
    const { match: { params: preParams } } = prevProps;
    if(!block.data[params.id] && preParams.id !== params.id){
      getBlockDetail(params.id);
    }
  }

  render () {
    const { match: { params }, block: { isLoading, data }, } = this.props;
    const detail = data[params.id];
    let dataSource = [];
    detail && (dataSource = [
      [
        {key: 'timeStamp', title: <Msg id="block_hd_time" />, value: format(detail.timestamp * 1000, 'YYYY-MM-DD HH:mm:ss')},
        {key: 'transactions', title: <Msg id="block_hd_txs_count" />, value: detail.transaction_count},
        {key: 'size', title: <Msg id="block_hd_block_size" />, value: _util.normalizeSize(detail.size)},
        // {key: 'random', title: <Msg id="block_hd_nonce" />, value: detail.nonce},
        // {key: 'difficulty', title: <Msg id="block_hd_difficulty" />, value: detail.difficulty},
        {key: 'version', title: <Msg id="block_hd_version" />, value: detail.version},
      ],
      [
        {key: 'hash', title: <Msg id="block_hd_block_hash" />, value: detail.hash},
        {key: 'pre', title: <Msg id="block_hd_pre_block" />, value: <Link to={`/block/${detail.previous_block_hash}`}>{detail.previous_block_hash}</Link>},
        {key: 'merkle', title: <Msg id="block_hd_tx_merkle_root" />, value: detail.transaction_merkle_root},
        {key: 'status', title: <Msg id="block_hd_tx_status_hash" />, value: detail.transaction_status_hash},
        // {key: 'bits', title: <Msg id="block_hd_bits" />, value: _util.digits(detail.bits)},
      ]
    ]);
    return (
      <>
        <div>
          <div className={style.wrap}>
            <Navbar data={[ <Msg id="nav_block" /> ]} />
            <TitleBar title={<FormattedMessage id="block_hd_title" values={{id: detail && detail.height}} />} />
            <div className={style.hd}>
              <div style={{ width: 376 }} className={style.hd_block}>
                <Table dataSource={dataSource[0]} isLoading={isLoading}></Table>
              </div>
              <div style={{ width: 776 }}>
                <Table dataSource={dataSource[1]} isLoading={isLoading}></Table>
              </div>
            </div>
          </div>
        </div>
        <Tabs 
          data={[
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_trans} /><Msg id="block_tabs_txs" /></>,
            // <><Svg width="14px" className={style.svg} svg={icon_comments} /><Msg id="block_tabs_comments" /></>
          ]}>
            <Txs data={detail && detail.transactions}></Txs>
        </Tabs>
        <Pager></Pager>
        <Footer isLight />
      </>
    )
  }
}


export default Block;