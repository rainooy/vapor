/**
* Blocks 
* @author Rainoy <email:rainoy.me@gmail.com>
* @version 0.0.1
*/
import classnames from 'classnames/bind';
import style from '../assets/common.scss';

import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';
import Table from './components/Table';
import Pager from './components/Pager';
import Txs from './components/Txs';
import Tabs from './components/Tabs';
import Footer from './components/Footer';
import Holders from './components/Holders';
import { actions } from '../redux/asset'
import { format } from 'date-fns';

import icon_holder from '../assets/images/icon/Holder.svg';
import icon_txs from '../assets/images/icon/transactions.svg';
import icon_null from '../assets/images/asset/asset-unknown.svg';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  asset: state.asset,
})
@connect(mapStateToProps, { ...actions })
class Asset extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    const { match: { params }, asset, getAssetDetail, } = this.props;
    if(!asset.data[params.id]){
      getAssetDetail(params.id);
    }
    this.getBtmInfo();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { match: { params }, asset, getAssetDetail, } = this.props;
    const { match: { params: preParams } } = prevProps;
    if(!asset.data[params.id] && preParams.id !== params.id){
      getAssetDetail(params.id);
    }
  }

  handleChange = (page, size) => {
    const { getAssetDetail, match: { params } } = this.props;
    getAssetDetail(params.id, page);
  }

  getBtmInfo = async (from, to) => {
    const data = await _ajax.get(_conf.get_path('info'));
    console.log(data);
    this.setState({
      info: data,
    });
  }

  render () {
    const { info } = this.state;
    const { match: { params }, asset: { isloading, data }, } = this.props;
    const detail = data[params.id];
    let dataSource = [];
    detail && (dataSource = [
      [
        {key: 'asset_id', title: <Msg id="assets_hd_id" />, value: <p style={{ width: 450, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{detail.asset_id}</p>},
        {key: 'price', title: <Msg id="assets_hd_price" />, value: _conf.config.token[detail.asset_id] && _conf.config.token[detail.asset_id].price || '---'},
        {key: 'owner', title: <Msg id="assets_hd_owner" />, value: detail.address_count || '---'},
        {key: 'txs', title: <Msg id="assets_hd_txs" />, value: detail.pagination.total || '---'},
      ],
      [
        {key: 'date', title: <Msg id="assets_hd_create_date" />, value: format(detail.issue_timestamp * 1000, 'YYYY-MM-DD HH:mm:ss')},
        {key: 'amount', title: <Msg id="assets_hd_amount" />, value: _util.digits(Math.ceil(_util.normalizeNeu(detail.total_amount)))},
        {key: 'tx_amout', title: <Msg id="assets_hd_decimals" />, value:  detail.decimals},
        {key: 'site', title: <Msg id="assets_hd_homepage" />, value: _conf.config.token[detail.asset_id] && <a target="_blank" href={_conf.config.token[detail.asset_id].site}>{_conf.config.token[detail.asset_id].site}</a> || '---'},
      ]
    ]);
    return (
      <>
        <div className={style.wrap}>
          <Navbar data={[ <Link to="/assets"><Msg id="assets_page_nav" /></Link>, <Msg id="asset_page_nav" /> ]} />
          <TitleBar title={detail ? <span>{_conf.config.token[detail.asset_id] && _conf.config.token[detail.asset_id].logo || <Svg width="32" svg={icon_null} />} {detail.name || ''} {detail.description.length && `(${detail.description})`}</span> : <span></span>} />
          <div className={style.hd}>
            <div style={{ width: 576 }} className={style.hd_block}>
              <Table dataSource={dataSource[0]} isLoading={isloading}></Table>
            </div>
            <div style={{ width: 576 }}>
              <Table dataSource={dataSource[1]} isLoading={isloading}></Table>
            </div>
          </div>
        </div>
        <Tabs
          data={[
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_txs} /><Msg id="assets_tabs_txs" /></>,
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_holder} /><Msg id="assets_tabs_owner" /></>,
          ]}
          forceRender
        >
          <>
            {detail && <Txs symbol={detail.symbol || detail.symobol || detail.name || ''} data={detail.transactions}></Txs>}
            <Pager
              handleChange={this.handleChange}
              page={(detail && detail.pagination.current) || 1} 
              total={(detail && detail.pagination.total) || 0}
              size={16}
            ></Pager>
          </>
          <Holders asset_id={params.id} />
        </Tabs>
       < Footer isLight />
      </>
    )
  }
}


export default Asset;