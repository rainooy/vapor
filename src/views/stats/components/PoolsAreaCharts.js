import css from '../style.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import Loading from '../../components/Loading';
import { format, subMonths } from 'date-fns';
import { Radio, Spin } from 'antd';

const cs = classnames.bind(css);

class PoolsAreaCharts extends Component {

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { lang } = this.props;
    this.getList();
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    const { lang } = this.props;
  }
  

  getList = async () => {
    this.setState({ loading: true });
    const from = '1524412800';
    const to = format(format(new Date(), 'YYYY-MM-DD 23:59:59'), 'X');
    const data = await _ajax.get(`${_conf.get_path('minerDaily')}`, { params: {from, to} });
    const list = data.map(item => {
      return _util.poolsFilter(item);
    });
    this.setState({
      list,
      loading: false,
    });
  }

  getPoolList = (data) => {
    let pools = {
      matpool: {},
      f2pool: {},
      uupool: {},
      antpool: {},
      btccpool: {},
      beepool: {},
      renpool: {},
      zhizhupool: {},
      viabtc: {},
    };
    data.forEach(item => {
      item.forEach(sitem => {
        pools[sitem.name] = {
          name: sitem.name,
          type: 'line',
          stack: 'area',
          areaStyle: {
              normal: {}
          },
          data: new Array(data.length).fill(0),
        }
      });
    });
    Object.keys(pools).forEach(item => {
      !pools[item].name && (delete pools[item]);
    });
    return pools;
  }

  getPoolDate = (data) => {
    const list = data.map(item => _util.date.format(item[0].timestamp * 1000, 'M-D'));
    return list;
  }

  getEchatOptions = (data) => {
    if (!data || !data.length) {
      return {
        isLoading: true
      }
    }
    const pools = this.getPoolList(data);
    data.forEach((item, index) => {
      item.forEach(sitem => {
        pools[sitem.name].data[index] = (+sitem.percent).toFixed(2)
      });
    });
    const areaData = Object.values(pools);
    return {
      backgroundColor: "#fff",
      color: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#ddd"],
      tooltip: {
          trigger: 'axis',
      },
      legend: {
          data: Object.keys(pools),
          orient: 'vertical',
          align: 'left',
          right: 0,
          top: 10,
          itemGap: 15,
          textStyle: {
            color: 'rgba(36, 36, 36, 1)',
            fontSize: '14'
          }
      },
      grid: {
        left: '3.6%',
        right: '15%',
        top: '2%',
        bottom: '5%',
      },
      xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.getPoolDate(data)
      }],
      yAxis: [{
          type: 'value',
          max: 100,
      }],
      series: areaData
    };
  }

  render() {
    const { list, loading } = this.state;
    return (
      <div className={cs('wrap_pool', 'wrap')}>
        <div className={css.title}>
          <Msg id="stat_pool_chart_title" />
          <Radio.Group value={'2018'} onChange={this.handleBtnChange}>
            <Radio.Button disabled>2017</Radio.Button>
            <Radio.Button value="2018">2018</Radio.Button>
          </Radio.Group>
        </div>
        <div className={css.charts}>
          {
            !loading ? 
              <ReactEchartsCore
                echarts={echarts}
                className={css.echarts}
                style={{height: 500}}
                option={this.getEchatOptions(list)}
              ></ReactEchartsCore>
            : <Loading style={{ height: 500, lineHeight: '500px' }} />
          }
        </div>
      </div>
    );
  }
};

export default PoolsAreaCharts;