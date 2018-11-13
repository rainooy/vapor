import css from '../style.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import Loading from '../../components/Loading';

class PriceChart extends Component {

  constructor (props) {
    super(props);
    this.state = {
      prices: [],
      curUnit: 0,
      loading: false,
    };
    this.units = ['btm_usd', 'btm_btc', 'btm_eth', 'btm_cny'];
  }

  componentDidMount() {
    const { lang, dateRange } = this.props;
    const type = lang === 'en' ? this.units[0] : this.units[3];
    const curUnit = lang === 'en' ? 0 : 3;
    this.getPrices(type, curUnit, dateRange);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { lang, dateRange } = this.props;
    if (prevProps.dateRange.from === dateRange.from && prevProps.dateRange.to === dateRange.to) return;
    const type = lang === 'en' ? this.units[0] : this.units[3];
    const curUnit = lang === 'en' ? 0 : 3;
    this.getPrices(type, curUnit, dateRange);
  }
  

  getPrices = async (type = 'btm_usd', curUnit = 0, range) => {
    this.setState({ loading: true });
    const data = await _ajax.get(`${_conf.get_path('klineDaily')}/${type}`, { params: {...range} });
    this.setState({
      prices: data,
      curUnit,
      loading: false,
    });
  }

  handlePriceUnit = () => {
    const units = ['btm_usd', 'btm_btc', 'btm_eth', 'btm_cny'];
    let { curUnit } = this.state;
    if (curUnit < 3) {
      curUnit += 1;
    } else {
      curUnit = 0;
    }
    this.getPrices(units[curUnit], curUnit);
  }

  getEchatOptions = (data) => {
    if (!data.length) {
      return {
        isLoading: true
      }
    }
    const list = data.map(item => +item[0]);
    const xts = data.map(item => _util.date.format(item[1] * 1000, 'M-D'));
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            },
        }
      },
      grid: {
        left: '8%',
        right: '8%',
        top: '5%',
        bottom: '10%',
      },
      xAxis: {
        show: true,
        boundaryGap: false,
        type: 'category',
        data: xts,
        axisLabel: {
          color: '#242424',
        },
        axisLine: {
          lineStyle: {
              color: '#ddd'
          }
        },
      },
      yAxis: {
          show: true,
          type: 'value',
          max: 'dataMax',
          min: 'dataMin',
          splitLine:{show: false},
          // splitNumber: 2,
          axisLabel: {
            color: '#242424',
            formatter: (value, index) => value.toFixed(2)
          },
          axisLine: {
            lineStyle: {
                color: '#ddd'
            }
          },
      },
      series: [{
          data: list,
          type: 'line',
          showSymbol: false,
          markLine: {
            data: [{
              coord: ['2018-11-06', '1.333695'], 
              name: '主网上线'
            }]
          },
          itemStyle: {
            normal: {
              color: '#2869FA',
              lineStyle: {
                color: '#2869FA'
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(40, 105, 250, .66)'
              }, {
                  offset: 0.5,
                  color: 'rgba(40, 105, 250, .2)'
              }, {
                offset: 1,
                color: 'rgba(40, 105, 250, 0)'
            }]),
          }},
      }]
    };
  }

  render() {
    const { prices, curUnit, loading } = this.state;
    return (
      <div className={css.wrap}>
        <div className={css.title}>
          <Msg id="stat_chart_price_title" />
        </div>
        <div className={css.charts}>
        {
          loading ?
            <Loading style={{ height: 300, lineHeight: '300px' }} />
          : 
            <ReactEchartsCore
              echarts={echarts}
              className={css.echarts}
              style={{height: 300}}
              option={this.getEchatOptions(prices)}
            ></ReactEchartsCore>
        }
        </div>
      </div>
    );
  }
};

export default PriceChart;