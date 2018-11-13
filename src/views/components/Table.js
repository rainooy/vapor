import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table as AntdTable } from 'antd';
import classnames from 'classnames/bind';

import style from '../../assets/common.scss';
import { Record } from 'immutable';

const cs = classnames.bind(style);

class Table extends PureComponent {
  render() {
    const { dataSource = [], isLoading } = this.props;
    const columns = [
      {
        title: 'title',
        dataIndex: 'title',
        colSpan: 0
      },
      {
        title: 'value',
        dataIndex: 'value',
        colSpan: 0
      }
    ];
    const data = [
      {
        key: '1',
        title: 'Block',
        value: '88888',
      },
      {
        key: '2',
        title: 'TimeStamp',
        value: '2018-09-08 11:22:33'
      },
      {
        key: '3',
        title: 'Size (KB)',
        value: '0.55 KB'
      },
      {
        key: '4',
        title: 'Version',
        value: 1
      }
    ];
    return (
      <div>
        <AntdTable
          className={style.table}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onHeaderRow={() => null}
          loading={isLoading}
          rowClassName={(record, index) => `${style.tableRow}`}
        ></AntdTable>
      </div>
    );
  }
}

Table.propTypes = {

};

export default Table;