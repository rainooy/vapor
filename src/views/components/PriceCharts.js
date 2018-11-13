
import classnames from 'classnames/bind';
import { Tooltip } from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import { format, subHours } from 'date-fns';
import { Spin, Icon } from 'antd';

import style from '../../assets/common.scss';
import icon_up from '../../assets/images/icon/up-1.svg';
import icon_down from '../../assets/images/icon/down-1.svg';

const cs = classnames.bind(style);

class PriceCharts extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      prices: [],
      curUnit: 0,
      loading: false,
    };
    this.units = ['btm_usd', 'btm_btc', 'btm_eth', 'btm_cny'];
  }

  componentDidMount() {
    const { lang } = this.props;
    this.getPrices(lang === 'en' ? this.units[0] : this.units[3], lang === 'en' ? 0 : 3);
  }
  

  componentDidUpdate = (prevProps, prevState) => {
    const { lang } = this.props;
    if (prevProps.lang === lang) return;
    this.getPrices(lang === 'en' ? this.units[0] : this.units[3], lang === 'en' ? 0 : 3);
  }
  

  getPrices = async (type = 'btm_usd', curUnit = 0) => {
    this.setState({ loading: true });
    const data = await _ajax.get(`${_conf.get_path('kline')}/${type}`);
    this.setState({
      prices: data,
      curUnit,
      loading: false,
    });
  }

  getPriceRate = (data) => {
    const { prices } = this.state;
    if (!prices.length) {
      return {
        type: 0,
        value: 0.00,
      };
    }
    const cur = prices[prices.length - 1];
    const past = prices[23];
    // const min = Math.min(...([...prices].splice(-24)));
    // const max = Math.max(...([...prices].splice(-24)));
    return {
      type: cur - past > 0 ? 1 : cur - past < 0 ? -1 : 0,
      value: ((cur - past) / past * 100).toFixed(2),
    }
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
    const list = data.map(item => (+item).toFixed(8));
    const xts = new Array(24).fill(1).map((item, index) => format(subHours(new Date(), index), 'HH:mm')).reverse();
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
    };
  }

  render () {
    const { prices, curUnit, loading } = this.state;
    const { info = {}, block = {} } = this.props;
    return (
      <div className={style.price_charts_wrap}>
        <div className={style.price_hd}>
          <Msg id="home_charts_title" />  
          <Msg id="home_charts_source" />
        </div>
        <div className={style.clearfix}>
          <div className={style.price_info}>
            <p>{(prices[prices.length - 1] || 0).toFixed(6)}</p>
            <div>
              {
                loading ? 
                  <label><Spin size="small" indicator={<Icon type="loading" style={{ fontSize: 10 }} spin />} /></label> 
                : 
                  <label onClick={this.handlePriceUnit}>
                    {
                      ['USDT', 'BTC', 'ETH', 'CNY'][curUnit]
                    }
                  </label>
                
              }
              
              {
                this.getPriceRate().type === 1 && 
                  <span className={style.rise}>
                    <Svg style={{ marginRight: 8 }} width="14px" svg={icon_up} />
                    {this.getPriceRate().value}%
                  </span>
              }
              {
                this.getPriceRate().type === -1 && 
                  <span className={style.fail}>
                    <Svg style={{ marginRight: 8 }} width="14px" svg={icon_down} />
                    {this.getPriceRate().value}%
                  </span>
              }
              {
                this.getPriceRate().type === 0 && 
                  <span className={style.normal}>
                    {'0.00'}%
                  </span>
              }
            </div>
            <p><Msg id="home_info_market_ranking" tagName="i" /> <span> #{info.market_capitalization || ''}</span></p>
          </div>
          <div className={style.price_charts}>
            <ReactEchartsCore
              echarts={echarts}
              className={style.echarts}
              style={{height: 100}}
              option={this.getEchatOptions(prices)}
            ></ReactEchartsCore>
          </div>       
        </div>
        <div className={style.price_ft}>
          <ul>
            <li>
              <p><Msg id="home_info_block" /></p>
              <p><Link to={`/block/${(info.confirmed_block_count - 1 || '')}`}>{(info.confirmed_block_count - 1) || ''}</Link></p>
            </li>
            <li>
              <p><Msg id="home_info_trans" /></p>
              <p>{info.transaction_count || ''}</p>
            </li>
            <li>
              <p><Msg id="home_info_nodes" /></p>
              <p>{info.node_count || ''}</p>
            </li>
            <li>
              <p>
                <Msg id="home_info_curculatior" />
                <Tooltip placement="topRight" title={`${_util.digits(0 | _util.normalizeNeu(info.circulating_supply || ''))} / 2,100,000,000`}>
                  <span className={style.pst}>
                    {(_util.normalizeNeu(info.circulating_supply || 0) / 2100000000).toFixed(2) * 100}%
                  </span>
                </Tooltip>
              </p>
              <p>{_util.digits(0 | _util.normalizeNeu(info.circulating_supply || 0))}</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


export default PriceCharts;