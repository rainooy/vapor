import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TitleBar from '../components/TitleBar';
import Table from '../components/Table';
import { DatePicker, message } from 'antd';
import { subMonths } from 'date-fns';

import style from '../../assets/common.scss';
import css from './style.scss';
import Price from '../components/Price';
import PriceChart from './components/PriceChart';
import GithubStarChart from './components/GithubStarChart';
import BtmCharts from './components/BtmCharts';
import TxsCharts from './components/TxsCharts';
import moment from 'moment';
const cs = classnames.bind(css);

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, {})
class Stats extends Component {

  constructor(props) {
    super(props);
    const from = _util.date.format(_util.date.format(subMonths(new Date(), 3), 'YYYY-MM-DD 00:00:00'), 'X');
    const to = _util.date.format(_util.date.format(new Date(), 'YYYY-MM-DD 23:59:59'), 'X');
    this.state = {
      loading: false,
      info: {
        isloading: false,
        detail: {},
        infoDaliy: [],
      },
      dateRange: {
        from,
        to
      }
    }
  }

  componentDidMount() {
    const { dateRange: {from, to}  } = this.state;
    this.getBaseInfo(from, to);
    this.getDailyList();
  }

  getBaseInfo = async (from, to) => {
    this.setState({ info: { isloading: true } });
    const data = await _ajax.get(_conf.get_path('info'), { params: {from, to} });
    this.setState({
      info: {
        isloading: false,
        detail: data,
      }
    })
  }

  getDailyList = async (from, to) => {
    const { dateRange } = this.state;
    this.setState({ loading: true });
    const params = from ? { from, to } : { ...dateRange };
    const data = await _ajax.get(`${_conf.get_path('infoDaily')}`, { params });
    this.setState({
      infoDaliy: (data || []).reverse(),
      loading: false,
    });
  }

  handleDateRangeChange = (data) => {
    console.log(data)
    const from = _util.date.format(new Date(data[0].format('YYYY-MM-DD 00:00:00')), 'X');
    const to = _util.date.format(new Date(data[1].format('YYYY-MM-DD 23:59:59')), 'X');
    const days = moment.duration(Math.abs(to - from), 'seconds').asDays();
    if (days <= 7) {
      message.info('请至少选择7天间隔');
      return;
    } 
    this.getDailyList(from, to);
    this.getBaseInfo(from, to);
    this.setState({
      dateRange: {
        from,
        to
      }
    })
  }

  render() {
    const { match: { params }, } = this.props;
    const { info: { isloading, detail }, dateRange, infoDaliy, loading } = this.state;
    let dataSource = [];
    infoDaliy && infoDaliy.pop();
    detail && (dataSource = [
      [
        {key: 'asset_id', title: <Msg id="stat_history_hd_out" />, value: <Price isFixed={false} value={_util.normalizeNeu(detail.mined_btm_amount)} />},
        {key: 'price', title: <Msg id="stat_history_hd_txs" />, value: detail.transaction_count},
        {key: 'owner', title: <Msg id="stat_history_hd_addr" />, value: detail.new_address_count},
        {key: 'txs', title: <Msg id="stat_history_hd_asset" />, value: detail.new_asset_count},
      ],
      [
        {key: 'date', title: <Msg id="stat_history_hd_hasgrate" />, value: detail.retire_count},
        {key: 'amount', title: <Msg id="stat_history_hd_dift" />, value: detail.issue_count},
        {key: 'tx_amout', title: <Msg id="stat_history_hd_capacity" />, value: detail.confirmed_block_count},
        {key: 'site', title: <Msg id="stat_history_hd_fee" />, value: <Price isFixed={false} value={_util.normalizeNeu(detail.transaction_fee)} />},
      ]
    ]);

    return (
      <> 
        <div className={style.wrap}>
          <Navbar data={[<Msg id="stat_nav_history" />]} />
          <TitleBar
            title={<Msg id="stat_history_hd_title" />} 
            extra={<DatePicker.RangePicker
              onChange={this.handleDateRangeChange}
              disabledDate={(current) => {return current > moment().endOf('day') || current < moment('2017-08-09')}}
            />}
          />
          <div className={style.hd}>
            <div style={{ width: 576 }} className={style.hd_block}>
              <Table dataSource={dataSource[0]} isLoading={isloading}></Table>
            </div>
            <div style={{ width: 576 }}>
              <Table dataSource={dataSource[1]} isLoading={isloading}></Table>
            </div>
          </div>
          <PriceChart dateRange={dateRange} />
          <GithubStarChart dateRange={dateRange} />
          <TxsCharts loading={loading} list={infoDaliy} />
          <BtmCharts loading={loading} list={infoDaliy} />
        </div>
        <Footer />
      </>
    )
  }
}

export default Stats;