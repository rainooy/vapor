import Navbar from './components/Navbar';
import { actions } from '../redux/assets';
import Pager from './components/Pager';
import Tabs from './components/Tabs';
import TitleBar from './components/TitleBar';
import Footer from './components/Footer';
import { Table,  } from 'antd';

import style from '../assets/common.scss';
import icon_assets from '../assets/images/icon/assets.svg';
import icon_null from '../assets/images/asset/asset-unknown.svg';

const cs = classnames.bind(style);


const mapStateToProps = (state) => ({
  config: state.config,
  assets: state.assets,
})
@connect(mapStateToProps, {...actions})
class Assets extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getAssetsList();
  }

  // handle page change.
  handleChange = (page, size) => {
    const { getAssetsList } = this.props;
    getAssetsList(page);
  }

  render() {
    const { assets, } = this.props;
    const columns = [
      {
        title: <Msg id="assets_list_index" />, 
        dataIndex: 'logo',
        width: 50,
        render: (text, item, index) => _conf.config.token[item.asset_id] ? _conf.config.token[item.asset_id].logo : <Svg width="32px" svg={icon_null} />
      },
      {
        title: <Msg id="assets_list_asset" />, 
        width: 200,
        render: (text, item) => (
            <>
              <div><Link to={`/asset/${item.asset_id}`}><p>{item.name}</p></Link></div>
              <p style={{ marginTop: 5 }}>{typeof item.description === 'string' ? item.description : ' '}</p>
            </>
          )
      },
      {
        title: <Msg id="assets_list_asset_id" />, 
        width: 200,
        render: (text, item) => <Link to={`/asset/${item.asset_id}`}><p className={style.home_list_hash}>{item.asset_id}</p></Link>
      },
      {
        title: <Msg id="assets_list_amount_circulation" />, 
        dataIndex: 'total_amount',
        width: 200,
        render: (text, item) => _util.digits((item.total_amount / Math.pow(10, item.decimals || 8)))
      },
      {
        title: <Msg id="assets_list_address_count" />, 
        width: 190,
        render: (text, item) => item.address_count || '-'
      },
      {
        title: <Msg id="assets_list_create_date" />,
        dataIndex: 'miner_name', 
        render: (text, item) => item.issue_timestamp && _util.date.format(new Date(item.issue_timestamp * 1000), 'YYYY-MM-DD')
      },
    ];

    return (
      <>
        <div className={style.wrap}>
          <Navbar data={[ <Msg id="assets_page_nav" /> ]} />
          <TitleBar title={<Msg id="assets_page_title" />} />
        </div>
        <Tabs
          data={[
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_assets} /><Msg id="assets_tabs_all" /></>, 
          ]}
        >
          <Table
            className={cs('home_table', 'home_table_rank')}
            rowClassName={(record, index) => `${style.tableRow}`}
            columns={columns}
            rowKey={item => item.asset_id}
            dataSource={assets.data}
            loading={assets.isloading}
            pagination={false}
          ></Table>
        </Tabs>
        <Pager
          handleChange={this.handleChange}
          page={(assets.pagination && assets.pagination.current) || 1} 
          total={(assets.pagination && assets.pagination.total) || 0}
          size={16}
        ></Pager>
        <Footer />
      </>
      
    )
  }
}

export default Assets;