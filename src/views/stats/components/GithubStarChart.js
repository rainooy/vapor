import css from '../style.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import Loading from '../../components/Loading';

class GithubStarChart extends Component {

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { dateRange } = this.props;
    this.getList(dateRange);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dateRange } = this.props;
    if (prevProps.dateRange.form === dateRange.form && prevProps.dateRange.to === dateRange.to) return;
    this.getList(dateRange);
  }
  

  getList = async (range) => {
    this.setState({ loading: true });
    const data = await _ajax.get(`${_conf.get_path('star')}`, { params: {...range} });
    this.setState({
      list: data,
      loading: false,
    });
  }

  getEchatOptions = (data) => {
    if (!data.length) {
      return {
        isLoading: true
      }
    }
    const list = data.map(item => +item[1]);
    const xts = data.map(item => _util.date.format(new Date(item[0]), 'M-D'));
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
          interval: 50
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
          min: value => Math.floor(value.min / 10) * 10,
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
    const { list, loading } = this.state;
    return (
      <div className={css.wrap}>
        <div className={css.title}>
          <Msg id="stat_chart_star_title" />
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

export default GithubStarChart;