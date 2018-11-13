import css from '../style.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import { subDays, subWeeks, subMonths } from 'date-fns';
import Loading from '../../components/Loading';
import { Radio } from 'antd';

const cs = classnames.bind(css);

class PoolsPieChart extends Component {

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      dateRange: '24h',
    };
  }

  componentDidMount() {
    const { lang } = this.props;
    this.getList();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { lang } = this.props;
  }

  handleBtnChange = (e) => {
    const date = e.target.value;
    this.setState({ dateRange: date});
    const cur = new Date();
    const range = {
      '24h': subDays(cur, 1),
      '3d': subDays(cur, 3),
      '1w': subWeeks(cur, 1),
      '1m': subMonths(cur, 1),
    };
    const from = _util.date.format(_util.date.format(range[date], 'YYYY-MM-DD 00:00:00'), 'X');
    const to = _util.date.format(_util.date.format(new Date(), 'YYYY-MM-DD 23:59:59'), 'X');
    this.getList(from, to);
    console.log(from, to)
  }
  

  getList = async (from, to) => {
    this.setState({ loading: true });
    const data = await _ajax.get(`${_conf.get_path('miner')}`, { params: {from, to} });
    const list = _util.poolsFilter(data);
    this.setState({
      list,
      loading: false,
    });
  }

  getEchatOptions = (data) => {
    if (!data || !data.length) {
      return {
        isLoading: true
      }
    }
    const list = data.map(item => ({
      value: item.percent,
      name: `${item.name} (${item.percent.toFixed(2)}%)`
    }));
    return {
      tooltip : {
          trigger: 'item',
          formatter: "{b} : ({d}%)"
      },
      color: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#ddd"],
      legend: {
          orient: 'vertical',
          align: 'left',
          left: 0,
          top: 10,
          itemGap: 15,
          textStyle: {
            color: 'rgba(36, 36, 36, 1)',
            fontSize: '14'
          }
      },
      calculable : true,
      series : [
          {
            name:'',
            type:'pie',
            radius : [80, 120],
            center : ['50%', '55%'],
            label: {
              normal: {
                formatter: '{b}'
              }
            },
            // roseType : 'area',
            data: list,
          }
      ]
    };
  }

  render() {
    const { list, dateRange, loading } = this.state;
    return (
      <div className={cs('wrap_pool', 'wrap')}>
        <div className={css.title}>
          <Msg id="stat_pool_chart_title" />
          <Radio.Group value={dateRange} onChange={this.handleBtnChange}>
            <Radio.Button value="1m"><Msg id="stat_pool_chat_mo" /></Radio.Button>
            <Radio.Button value="1w"><Msg id="stat_pool_chat_week" /></Radio.Button>
            <Radio.Button value="3d"><Msg id="stat_pool_chat_day" /></Radio.Button>
            <Radio.Button value="24h"><Msg id="stat_pool_chat_hours" /></Radio.Button>
          </Radio.Group>
        </div>
        <div className={css.charts}>
        {
          loading ? 
            <Loading style={{ height: 300, lineHeight: '300px', background: '#fff' }} />
          : 
            <ReactEchartsCore
              echarts={echarts}
              className={css.echarts}
              style={{height: 300}}
              option={this.getEchatOptions(list)}
            ></ReactEchartsCore>
        }
        </div>
      </div>
    );
  }
};

export default PoolsPieChart;