import { Table,  } from 'antd';
import Pager from './Pager';
import MinePool from './MinePool';
import { actions } from '../../redux/blocks';

import style from '../../assets/common.scss';

const mapStateToProps = (state) => ({
  config: state.config,
  blocks: state.blocks,
})
@connect(mapStateToProps, { ...actions })
class Blocks extends Component {

  componentDidMount() {
    this.props.getBlockList();
  }
  

  // handle page change.
  handleChange = (page, size) => {
    const { getBlockList } = this.props;
    getBlockList(page);
  }

  render() {
    const { blocks, } = this.props;
    const columns = [
      {
        title: <Msg id="home_list_height" />, 
        dataIndex: 'height',
        render: (text, item) => <Link to={`/block/${item.height}`}>{item.height}</Link> 
      },
      {
        title: <Msg id="home_list_time" />, 
        width: 200,
        dataIndex: 'time', render: (text, item) => _util.date.distanceInWordsToNow(new Date(item.timestamp * 1000), { addSuffix: true })
      },
      {
        title: <Msg id="home_list_txs_count" />, 
        width: 100,
        dataIndex: 'transaction_count'
      },
      {
        title: <Msg id="home_list_block_size" />, 
        dataIndex: 'size',
        render: (text, item) => <>{`${(item.size / 1024).toFixed(3)}`} <span style={{ color: '#b3b3b3' }}>KB</span></>
      },
      {
        title: <Msg id="home_list_block_hash" />, 
        dataIndex: 'hash',
        width: 400,
        render: (text, item) => <Link to={`/block/${item.hash}`}><p className={style.home_list_hash}>{item.hash}</p></Link>
      },
      {
        title: <Msg id="home_list_block_mined_by" />,
        width: 150,
        dataIndex: 'miner_name', 
        render: (text, item) => <MinePool pool={item.miner_name} address={item.miner_address} />
      },
    ];
    return (
      <div>
        <Table
          className={style.home_table}
          rowClassName={(record, index) => `${style.tableRow}`}
          columns={columns}
          rowKey={item => item.hash}
          dataSource={blocks.data}
          loading={blocks.isloading}
          pagination={false}
        ></Table>
        <Pager
          handleChange={this.handleChange}
          page={(blocks.pagination && blocks.pagination.current) || 1} 
          total={(blocks.pagination && blocks.pagination.total) || 0}
          size={16}
        ></Pager>
      </div>
    )
  }
}

export default Blocks;