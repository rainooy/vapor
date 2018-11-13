import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TitleBar from '../components/TitleBar';

import PoolsPieChart from './components/PoolsPieChart';
import PoolsAreaCharts from './components/PoolsAreaCharts';

import style from '../../assets/common.scss';
const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, {})
class StatsPool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }

  componentDidMount() {
    
  }

  render() {
    
    const { } = this.state;
    const { config } = this.props;
    return (
      <> 
        <div className={style.wrap}>
          <Navbar data={[<Msg id="stat_nav_pool" />]} />
          <TitleBar title={<Msg id="stat_pool_subtitle" />} />
          <PoolsPieChart />
          <PoolsAreaCharts />
        </div>
        

        <Footer />
      </>
    )
  }
}

export default StatsPool;