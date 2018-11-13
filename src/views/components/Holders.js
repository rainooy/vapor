import { Table,  } from 'antd';
import Pager from './Pager';
import Price from './Price';
import { actions } from '../../redux/rank';

import style from '../../assets/common.scss';
import icon_status_in from '../../assets/images/icon/in.svg';
import icon_status_out from '../../assets/images/icon/out.svg';
const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  ranks: state.ranks,
})
@connect(mapStateToProps, { ...actions })
class Holders extends Component {

  componentDidMount() {
    const { asset_id } = this.props;
    this.props.getRankList(asset_id);
  }

  // handle page change.
  handleChange = (page, size) => {
    const { getRankList, asset_id } = this.props;
    getRankList(asset_id, page);
  }

  render() {
    const { ranks, } = this.props;
    const columns = [
      {
        title: <Msg id="rank_list_rank" />, 
        dataIndex: 'indexs',
        render: (text, item, index) => ((ranks.pagination.current - 1) * ranks.pagination.limit) + index + 1
      },
      {
        title: <Msg id="rank_list_address" />, 
        width: 430,
        dataIndex: 'address', 
        render: (text, item) => <Link to={`/address/${item.address}`}><p className={style.home_list_hash}>{item.address}</p></Link>
      },
      {
        title: <Msg id="rank_list_balance" />, 
        dataIndex: 'balance',
        width: 200,
        render: (text, item) => _util.digits(_util.normalizeNeu(item.balance))
      },
      {
        title: <Msg id="rank_list_pst" />, 
        dataIndex: 'pst',
        width: 200,
        render: (text, item) => (
          <div className={style.pstbar_wrap}>
            <span style={{ width: `${item.percent * 100}%`}} className={style.pstbar}></span>
            <p>{`${(item.percent * 100).toFixed(2)}`}<span style={{ color: '#b3b3b3' }}> %</span></p>
          </div>
        )
      },
      {
        title: <Msg id="rank_list_time" values={{ tips: <span style={{ color: '#b3b3b3' }}>(GMT+8)</span> }} />, 
        width: 200,
        render: (text, item) => _util.date.format(new Date(item.last_transaction_timestamp * 1000), 'YYYY-MM-DD HH:mm:ss')
      },
    ];
    return (
      <div>
        <Table
          className={cs('home_table', 'home_table_rank')}
          rowClassName={(record, index) => `${style.tableRow}`}
          columns={columns}
          rowKey={(item, index) => item.address + index}
          dataSource={ranks.data}
          loading={ranks.isloading}
          pagination={false}
        ></Table>
        <Pager
          handleChange={this.handleChange}
          page={(ranks.pagination && ranks.pagination.current) || 1} 
          total={(ranks.pagination && ranks.pagination.total) || 0}
          size={16}
        ></Pager>
      </div>
    )
  }
}

export default Holders;