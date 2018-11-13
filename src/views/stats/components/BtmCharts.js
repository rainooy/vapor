import css from '../style.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import Loading from '../../components/Loading';

class BtmCharts extends Component {

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
    };
  }

  getEchatOptions = (data) => {
    if (!data || !data.length) {
      return {
        isLoading: true
      }
    }
    const list = data.map(item => Math.ceil(_util.normalizeNeu(item.mined_btm_amount)));
    const xts = data.map(item => _util.date.format(new Date(item.date), 'M-D'));
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
        left: '10%',
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
            color: '#242424'
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
          itemStyle: {
            normal: {
              color: '#239A3B',
              lineStyle: {
                color: '#239A3B'
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(232, 255, 237, 1)'
              }, {
                  offset: 0.5,
                  color: 'rgba(232, 255, 237, .5)'
              }, {
                offset: 1,
                color: 'rgba(232, 255, 237, .2)'
            }]),
          }},
      }]
    };
  }

  render() {
    const { list, loading } = this.props;
    return (
      <div className={css.wrap}>
        <div className={css.title}>
          <Msg id="stat_chart_btm_title" />
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
              option={this.getEchatOptions(list)}
            ></ReactEchartsCore>
        }
        </div>
      </div>
    );
  }
};

export default BtmCharts;