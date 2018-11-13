import { Card, Table } from 'antd';

import HashRateCharts from './components/HashRateCharts';
import Search from './components/Search';
import Tabs from './components/Tabs';
import Blocks from './components/Blocks';
import Footer from './components/Footer';

import style from '../assets/common.scss';
import icon_blocks from '../assets/images/icon/blocks.svg';
const cs = classnames.bind(style);

const { Meta } = Card;
const mapStateToProps = (state) => ({
  config: state.config,
  blocks: state.blocks,
})
@connect(mapStateToProps, {})
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }

  componentDidMount() {
    this.getBtmInfo();
  }

  getBtmInfo = async (from, to) => {
    const data = await _ajax.get(_conf.get_path('info'));
    console.log(data);
    this.setState({
      info: data,
    });
  }

  render() {
    
    const { info } = this.state;
    const { blocks = [], config } = this.props;
    return (
      <>
        <div className={style.home_hd}>
          <div className={style.wrap}>
            <h1 className={style.home_title}>
              <Msg id="home_title" />
              <span></span>
            </h1>
            <Search />
          </div>     
        </div>
        <Tabs 
          data={[
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_blocks} /><Msg id="home_tabs_blocks" /></>, 
          ]}
        >
          <Blocks />
        </Tabs>
        <Footer />
      </>
    )
  }
}

export default Home;