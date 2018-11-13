import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import style from '../../assets/common.scss';

class Pager extends PureComponent {
  render() {
    const { page = 1, size = 10, total = 1, handleChange} = this.props;
    return (
      <div className={style.pager}>
        <Pagination
          current={page}
          hideOnSinglePage={true}
          onChange={handleChange}
          total={total}
          pageSize={size}
        ></Pagination>
      </div>
    );
  }
}

Pager.propTypes = {

};

export default Pager;