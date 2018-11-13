import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Card, Tooltip } from 'antd';

import Price from './Price';
import TxDetail from './TxDetail';

import style from '../../assets/common.scss';
import icon_arrow from '../../assets/images/icon/arrow.svg';
import icon_confirm from '../../assets/images/icon/success.svg';
import icon_fail from '../../assets/images/icon/fail.svg';

const cs = classnames.bind(style);

class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpland: false,
    };
  }
  
  txFilter = (detail = []) => {
    const txs = {};
    detail.forEach(item => {
      !txs[item.type] && (txs[item.type] = []);
      // (item.asset_id === _conf.config.btm_asset_id || item.asset_id === _conf.config.coinbase_asset_id) && txs[item.type].push(item);
      txs[item.type].push(item);
    });
    return txs;
  }

  onHandleTrigger = () => {
    this.setState({
      isExpland: !this.state.isExpland,
    })
  }

  render() {
    const { id, status_fail, timestamp, fee, detail = [], isAddress = false, isDetail = false, curAddress = '', symbol } = this.props;
    const { isExpland } = this.state;

    const Item = ({
      isCoinbase = false, 
      isRetire = false, 
      isIssue = false, 
      type, 
      address, 
      amount, 
      arbitrary = '', 
      decode_program = '', 
      control_program = '',
      asset_id = '',
      asset_name = '',
    }) => {
      return (
        <>
          <div className={style.items}>
            <span className={style.address}>
              { isCoinbase && <i className={style.coinbase}>COINBASE</i>}
              { isRetire && <i className={style.retire}>RETIRE</i>}
              { isIssue && <i className={style.issue}>ISSUE</i>}
              {
                isIssue && <span>{asset_id}</span>
              }
              {
                isCoinbase && !isIssue ? 
                  <span className={style.coinbaseMsg}><Msg id="coinbase_tips" /></span>
                : curAddress === address ? <span>{address}</span> : <Link to={`/address/${address}`}>{address}</Link>
              }
            </span>
            {!isCoinbase && <span className={style.btm}><Price isFixed={false} symbol={asset_name} value={_util.normalizeNeu(amount)} /></span>}
          </div>
          {
            isDetail &&
              <TxDetail lang={'en'} isToggle type={type} code={decode_program} data={arbitrary || control_program} />
          }
        </>
      );
    }
    return (
      <div className={style.panel}>
        <Card
          title={isDetail ? <span>{id}</span> : <Link to={`/tx/${id}`}>{id}</Link>}
          extra={
            isAddress ? 
              <>
                <span className={style.panel_info_status}>{
                  status_fail ? <><Svg width="16px" svg={icon_fail} /><Msg id="tx_detail_sts_fail" /></> : <><Svg width="16px" svg={icon_confirm} /><Msg id="tx_detail_sts_success" /></>}</span>
                <span className={style.panel_info_time}>{_util.date.format(timestamp * 1000)}</span>   
              </>
            : <span className={style.panel_fee}><Msg id="fee" tagName="i" /><Price isFixed={false} value={_util.normalizeNeu(fee)} /></span>
          }
          headStyle={{ lineHeight: 1, backgroundColor: '#f0f0f0', padding: '0 20px'}}
          bodyStyle={{ padding: '10px 20px' }}
        >
          <div className={cs('itemWrap', {on: (isDetail || isExpland)})}>
            {
              (this.txFilter(detail)['coinbase'] || []).map((item, index) => (<Item isCoinbase key={index} {...item} />))
            }
            {
              (this.txFilter(detail)['issue'] || []).map((item, index) => (<Item isIssue key={index} {...item} />))
            }
            {
              (this.txFilter(detail)['spend'] || []).map((item, index) => (<Item key={index} {...item} />))
            }
          </div>
          <div className={style.delv}>
            <Svg style={{ fontSize: 26, width: 72, textAlign: 'center', verticalAlign: 'top', lineHeight: '16px' }} width="26px" svg={icon_arrow} />
          </div>
          <div className={cs('itemWrap', {on: (isDetail || isExpland)})}>
            {
              (this.txFilter(detail)['control'] || []).map((item, index) => (<Item key={index} {...item} />))
            }
            {
              (this.txFilter(detail)['retire'] || []).map((item, index) => (<Item isRetire key={index} {...item} />))
            }
          </div>
          <div className={style.trigger}>
            {
              !isDetail && ((this.txFilter(detail)['spend'] || []).length > 6 || (this.txFilter(detail)['control'] || []).length > 6) &&
              <Tooltip title={<Msg id="trans_panel_expland_tips" />}>
                <a onClick={this.onHandleTrigger}>
                  <Msg id={isExpland ? 'trans_panel_expland_btn_close' : 'trans_panel_expland_btn'} /> &gt;&gt;</a>
              </Tooltip>
            }
          </div>
        </Card>
      </div>
    );
  }
}

Panel.propTypes = {

};

export default Panel;