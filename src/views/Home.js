import { Card, Table } from 'antd';

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
    const { type = 'bytom', location } = this.props;
    return (
      <>
        <div className={style.home_hd}>
          <div className={style.wrap}>
            <h1 className={style.home_title}>{localStorage.getItem('curEnv') || 'Bytom'}</h1>
            <p className={style.home_sub_title}><Msg id="home_title" /></p>
            <Search {...this.props} />
          </div>     
        </div>
        <Tabs 
          data={[
            <><Svg width="14px" style={{ verticalAlign: 'middle', marginRight: 5 }} className={style.svg} svg={icon_blocks} /><Msg id="home_tabs_blocks" /></>, 
          ]}
        >
          <Blocks type={type}  />
        </Tabs>
        <Footer />
      </>
    )
  }
}

export default Home;