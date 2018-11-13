import { Table,  } from 'antd';
import Pager from './Pager';
import MinePool from './MinePool';
import Price from './Price';
import { actions } from '../../redux/pools';

import style from '../../assets/common.scss';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  pools: state.pools,
})
@connect(mapStateToProps, { ...actions })
class Pools extends Component {

  componentDidMount() {
    this.props.getPoolList();
  }
  
  render() {
    const { pools, } = this.props;
    const data = JSON.parse(JSON.stringify(pools));
    const list = _util.poolsFilter(data.data);
    const columns = [
      {
        title: <Msg id="pool_list_index" />, 
        dataIndex: 'index',
        render: (text, item, index) =>  index + 1
      },
      {
        title: <Msg id="pool_list_pool" />, 
        width: 150,
        render: (text, item) => <MinePool pool={item.name} address={item.address}  />
      },
      {
        title: <Msg id="pool_list_amount" />, 
        dataIndex: 'mined_block_count'
      },
      {
        title: <Msg id="pool_list_fee" />, 
        render: (text, item) => <Price value={_util.normalizeNeu(item.fee)} />
      },
      {
        title: <Msg id="pool_list_earn" />, 
        dataIndex: 'percent',
        render: (text, item) => <Price value={_util.normalizeNeu(item.profit)} />
      },
      {
        title: <Msg id="pool_list_hashrate" />, 
        dataIndex: 'hashrate',
        render: (text, item) => `${(item.hash_rate / Math.pow(10, 6)).toFixed(2)} MH/s`
      },
      {
        title: <Msg id="pool_list_hashrate_pst" />, 
        dataIndex: 'hashrate_pct',
        width: 200,
        render: (text, item) => (
          <div className={style.pstbar_wrap}>
            <span style={{ width: `${item.percent}%`}} className={style.pstbar}></span>
            <p>{`${(+item.percent).toFixed(2)}`}<span style={{ color: '#b3b3b3' }}> %</span></p>
          </div>
        )
      },
    ];
    return (
      <div>
        <Table
          className={cs('home_table', 'home_table_rank')}
          rowClassName={(record, index) => `${style.tableRow}`}
          columns={columns}
          rowKey={item => item.address}
          dataSource={list}
          loading={pools.isloading}
          pagination={false}
        ></Table>
        <p className={style.pool_tb_ft}><Msg id="pool_list_info" /></p>
      </div>
    )
  }
}

export default Pools;