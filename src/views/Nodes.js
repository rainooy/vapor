import style from '../assets/common.scss';
import { actions } from '../redux/nodes';
import Navbar from './components/Navbar';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
  nodes: state.nodes,
})
@connect(mapStateToProps, { ...actions })
class Nodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {},
    }
  }

  componentDidMount() {
    const { getNodeList } = this.props;
    getNodeList();
  }

  render() {
    
    const { } = this.state;
    const { config } = this.props;
    return (
      <div className={style.wrap}>
        <Navbar data={[ <Msg id="nodes_page_nav" /> ]} />
      </div>
    )
  }
}

export default Nodes;