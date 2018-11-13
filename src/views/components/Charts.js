import PropTypes from 'prop-types';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import { format, subHours } from 'date-fns';

import style from '../../assets/common.scss';

class Charts extends Component {
  render() {
    const { data, options, style, isTooltip = true, } = this.props;
    
    const tooltip = {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          },
      }
    };
    const defaultOptions = {
      grid: {
        left: '0%',
        right: '0%',
        top: '3%',
        bottom: '0%',
      },
      xAxis: {
        show: false,
        boundaryGap: false,
        type: 'category',
        data: xts
      },
      yAxis: {
          show: false,
          type: 'value',
          max: 'dataMax',
          min: 'dataMin'
      },
      series: [{
          data: list.splice(-24),
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
    }

    isTooltip && (defaultOptions.tooltip = tooltip);

    const option = Object.assign(defaultOptions, options);
    return (
      <ReactEchartsCore
        echarts={echarts}
        className={style.echarts}
        style={{ ...style }}
        option={option}
      />
    );
  }
}

Charts.propTypes = {

};

export default Charts;