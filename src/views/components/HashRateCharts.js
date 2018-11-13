
import classnames from 'classnames/bind';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import { format, subMonths } from 'date-fns';

import style from '../../assets/common.scss';
import icon_up from '../../assets/images/icon/up-2.svg';

const cs = classnames.bind(style);

class HashRateCharts extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      hashrate: []
    };
  }

  componentDidMount = () => {

    this.getHashrateInfo(format(subMonths(new Date(), 6), 'X'));
  }

  getHashrateInfo = async (from, to) => {
    const data = await _ajax.get(_conf.get_path('hashrate'), { params: {from, to}});
    this.setState({
      hashrate: data,
    });
  }

  getEchatOptions = (data) => {
    if (!data.length) {
      return {
        isLoading: true
      }
    }
    let sum = 0;
    let count = 0;
    const list = data.reduce((pre, item, index) => {
      // if(!(index % 24)){
      //   pre.push(item);
      // }
      // count += +item[1]; 
      // sum++;

      // if(!(index % 24)){
      //   pre.push([item[0], count / 24]);
      //   count = 0;
      //   sum = 0;
      // }
      pre.push(item);
      return pre;
    }, [])
    const xs = [];
    const ys = [];
    list.forEach((item, index) => {
      xs.push(format(item[0] * 1000, 'M-D'));
      ys.push((item[1] / Math.pow(10, 6)) | 0);
    })
    return {
      grid: {
        left: '10%',
        right: '5%',
        top: '18%',
        bottom: '18%',
      },
      xAxis: {
        show: true,
        boundaryGap: false,
        type: 'category',
        data: xs,
        axisLabel: {
          color: '#fff',
          interval: 35
        },
        axisLine: {
          lineStyle: {
              color: '#3EC140'
          }
        },
      },
      yAxis: {
          show: true,
          type: 'value',
          splitLine:{show: false},
          max: Math.ceil(Math.max(...ys) / 50) * 50,
          min: 0,
          splitNumber: 2,
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
                color: '#3EC140'
            }
          },
      },
      series: [{
          data: ys,
          type: 'line',
          showSymbol: false,
          itemStyle: {
            normal: {
              color: 'rgba(255, 255, 255, .3)',
              lineStyle: {
                color: '#fff'
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,255,255,.6)'
              }, {
                  offset: 0.5,
                  color: 'rgba(255,255,255,.3)'
              }, {
                offset: 1,
                color: 'rgba(255,255,255,0)'
            }]),
          }},
          
      }]
    };
  }
  

  render () {
    const { hashrate } = this.state;
    const { block = {} } = this.props;

    return (
      <div className={style.hashrate_charts_wrap}>
        <div className={style.hashrate_charts}>
          <ReactEchartsCore
            echarts={echarts}
            className={style.echarts}
            style={{height: 200}}
            option={this.getEchatOptions(hashrate)}
          ></ReactEchartsCore>
        </div>
        <ul className={style.hashrate_info}>
          <li>
            <p>
              <Svg width="16px" style={{ verticalAlign: -2, marginRight: 8 }} svg={icon_up} />
              {hashrate.length && (hashrate[hashrate.length - 1][1] / Math.pow(10, 6)).toFixed(2)} MH/s
            </p>
            <p><Msg id="home_info_hashrate" /></p>
          </li>
          <li>
            <p>
              {block.difficulty && (block.difficulty / Math.pow(10, 3)) | 0} K
            </p>
            <p><Msg id="home_info_difficulty" /></p>
          </li>
        </ul>
      </div>
    )
  }
}


export default HashRateCharts;