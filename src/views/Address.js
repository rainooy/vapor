/**
* Address 
* @author Rainoy <email:rainoy.me@gmail.com>
* @version 0.0.1
*/
import React from 'react';
import QRcode from 'qrcode.react';
import classnames from 'classnames/bind';
import style from '../assets/common.scss';

import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Txs from './components/Txs';
import Price from './components/Price';
import Pager from './components/Pager';
import { FormattedMessage } from 'react-intl';
import { actions } from '../redux/address'

import icon_trans from '../assets/images/icon/transactions.svg';
import Footer from './components/Footer';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  address: state.address,
})
@connect(mapStateToProps, { ...actions })
class Address extends React.Component {

  constructor (props){
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const { match: { params }, address, getAddressDetail, } = this.props;
    getAddressDetail(params.address);
    // if(!address.data[params.address]){
    //   getAddressDetail(params.address);
    // }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { match: { params }, address, getAddressDetail, } = this.props;
    const { match: { params: preParams } } = prevProps;
    if(preParams.address !== params.address){
      getAddressDetail(params.address);
    }
  }
  

  handleChange = (page, size) => {
    console.log(page);
    const { match: { params }, getAddressDetail } = this.props;
    getAddressDetail(params.address, page);
  }

  render () {
    const { match: { params }, address: { isloading, data }, } = this.props;
    const detail = data[params.address];
    let dataSource = [];
    detail && (dataSource = [
      [
        {key: 'address', title: <Msg id="address_hd_address" />, value: detail.address},
        {key: 'banlce', title: <Msg id="address_hd_balance" />, value: <Price value={_util.normalizeNeu(detail.balance)} />},
        {key: 'received', title: <Msg id="address_hd_received" />, value: <Price value={_util.normalizeNeu(detail.receive)} />},
        {key: 'sent', title: <Msg id="address_hd_send" />, value: <Price value={_util.normalizeNeu(detail.sent)} />},
        {key: 'txs', title: <Msg id="address_hd_txs" />, value: detail.transaction_count},
      ]
    ]);
    return (
      <>
        <div className={style.wrap}>
          <Navbar data={[ <Msg id="nav_address" /> ]} />
          <TitleBar title={<FormattedMessage id="address_hd_title" />} />
          <div className={style.hd}>
            <div style={{ width: 976 }} className={style.hd_block}>
              <Table dataSource={dataSource[0]} isLoading={isloading}></Table>
            </div>
            <div style={{ width: 176, verticalAlign: 'top' }}>
              <div className={style.qrcode}>
                <QRcode size={146} value={params.address} />
                <Msg tagName="p" id="address_hd_qrcode"></Msg>
              </div>
            </div>
          </div>
        </div>
        <Tabs data={[<><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_trans} /><Msg id="address_tabs_txs" /></>,]}>
          <>
            <Txs isAddress data={detail && detail.transactions} curAddress={detail && detail.address}></Txs>
            { detail && 
              <Pager 
                handleChange={this.handleChange}
                page={detail.pagination.current} 
                total={detail.transaction_count}
              />
            }
          </>
        </Tabs>
        <Footer isLight />
      </>
    )
  }
}


export default Address;