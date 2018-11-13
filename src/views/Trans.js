/**
* Trans 
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
import Price from './components/Price';
import Pager from './components/Pager';
import Footer from './components/Footer';
import { actions } from '../redux/txs'

import icon_trans from '../assets/images/icon/transactions.svg';
import icon_confirm from '../assets/images/icon/success.svg';
import icon_fail from '../assets/images/icon/fail.svg';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  txs: state.txs,
})
@connect(mapStateToProps, { ...actions })
class Trans extends React.Component {

  constructor (props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match: { params }, txs, getDetail, } = this.props;
    if(!txs.data[params]){
      getDetail(params.id);
    }
  }
  

  render () {
    const { match: { params }, txs: { isLoading, data }, } = this.props;
    const detail = data[params.id];
    let dataSource = [];
    detail && (dataSource = [
      [
        {key: 'height', title: <Msg id="trans_hd_height" />, value: <Link to={`/block/${detail.height}`}>{detail.height}</Link>},
        {key: 'age', title: <Msg id="trans_hd_age" />, value: _util.date.distanceInWordsToNow(new Date(detail.timestamp * 1000), { addSuffix: true })},
        {key: 'time', title: <Msg id="trans_hd_time" />, value: _util.date.format(detail.timestamp * 1000, 'YYYY-MM-DD HH:mm:ss')},
        {key: 'size', title: <Msg id="trans_hd_size" />, value: `${(detail.size/1024).toFixed(2)}`},
      ],
      [
        {key: 'id', title: <Msg id="trans_hd_id" />, value: detail.id},
        {key: 'fee', title: <Msg id="trans_hd_fee" />, value: <Price value={_util.normalizeNeu(detail.fee)} />},
        {key: 'confirm', title: <Msg id="trans_hd_confirm" />, value: <span className={style.tdSvg}><Svg width="16px" svg={icon_confirm} /> {detail.confirmations}</span>},
        {
          key: 'status', 
          title: <Msg id="trans_hd_status" />, 
          value: detail.status_fail ? <span className={cs('tdSvg', 'tdSvgFail')}><Svg width="16px" svg={icon_fail} /> Fail</span> : <span className={cs('tdSvg', 'tdSvgSuccess')}><Svg width="16px" svg={icon_confirm} /> Success</span>
        },
      ]
    ]);
    return (
      <>
        <div className={style.wrap}>
          <Navbar data={[ <Msg id="nav_tx" /> ]} />
          <TitleBar title={<Msg id="trans_hd_title" />} />
          <div className={style.hd}>
            <div style={{ width: 376 }} className={style.hd_block}>
              <Table dataSource={dataSource[0]} isLoading={isLoading}></Table>
            </div>
            <div style={{ width: 776 }} className={style.hd_block}>
              <Table dataSource={dataSource[1]} isLoading={isLoading}></Table>
            </div>
          </div>
        </div>
        <Tabs data={[
          <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_trans} /><Msg id="tx_tabs_detail" /></>,
          ]}
        >
          <>{detail && <Txs isDetail data={[detail]}></Txs>}</>
          {/* <Pager></Pager> */}
        </Tabs>
        <Footer isLight />
      </>
    )
  }
}


export default Trans;