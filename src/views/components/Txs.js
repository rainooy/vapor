import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from '../../assets/common.scss';
import Panel from './Panel';

const cs = classnames.bind(style);

class Txs extends Component {
  render() {
    const { data = [], isDetail = false, curAddress = '', isAddress = false, symbol } = this.props;
    return (
      <div className={style.txs_wrap}>
        <div className={style.wrap}>
          {
            !data.length && <p style={{ textAlign: 'center' }}>no data</p>
          }
          {
            data.map((item, index) => (
              <Panel isDetail={isDetail} key={item.id} curAddress={curAddress} isAddress={isAddress} {...item} symbol={symbol}></Panel>
            ))
          }
        </div>
      </div>
    );
  }
}

Txs.propTypes = {

};

export default Txs;