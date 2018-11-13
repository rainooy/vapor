import { injectIntl } from 'react-intl';
import { Input, notification } from 'antd';
import { actions } from '../../redux/config';

import style from '../../assets/common.scss';
import icon_search from '../../assets/images/icon/search.svg';
import icon_logo from '../../assets/images/blockmeta-logo.svg';

const cs = classnames.bind(style);
const lang = {
  zh: {
    search_unknown_keyword_title: '输入格式错误，请重新输入',
    search_unknown_keyword_des: '支持区块高度、区块哈希、交易哈希搜索',
    search_error_keyword_title: '输入不能为空，请输入',
    search_error_keyword_des: '支持区块高度、区块哈希、交易哈希搜索',
    nav_nodes: '节点',
    nav_assets: '资产',
    nav_stats: '统计',
    nav_stats_pool: '矿池份额',
    nav_stats_history: '历史统计',
  },
  en: {
    search_unknown_keyword_title: 'Input format error',
    search_unknown_keyword_des: 'Support block height, block hash, transaction hash search',
    search_error_keyword_title: 'Input cannot be empty',
    search_error_keyword_des: 'Support block height, block hash, transaction hash search',
    nav_nodes: 'Nodes',
    nav_assets: 'Assets',
    nav_stats: 'Stats',
    nav_stats_pool: 'Mineral Pool',
    nav_stats_history: 'History',
  }
};

notification.config({
  top: 80,
});
const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, { ...actions })
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearch = async (text) => {
    const { config } = this.props;
    if (!text) {
      notification.error({
        message: lang[config.lang]['search_error_keyword_title'],
        description: lang[config.lang]['search_error_keyword_des'],
        duration: 2,
        top: 100,
      });
      return;
    }
    const data = await _ajax.get(`${_conf.get_path('search')}/${text}`);
    const routers = {
      'block': '/block',
      'address': '/address',
      'transaction': '/tx',
      'asset': '/asset',
    }
    if (data.type !== 'unknown') {
      console.log(data.type);
      this.props.history.push(`${routers[data.type]}/${text}`);
    } else {
      notification.error({
        message: lang[config.lang]['search_unknown_keyword_title'],
        description: lang[config.lang]['search_unknown_keyword_des'],
        duration: 2,
        top: 100,
      });
    }
  }

  render() {

    const Inputs = ({ intl }) => {
      const placeholder = intl.formatMessage({id: 'home_search_tips'});
      return(
         <span>
           <Input.Search
            onSearch={this.handleSearch}
            placeholder={placeholder} 
            enterButton={<Svg width="16px" svg={icon_search}></Svg>}
          />
           {/* <span className={style.searchBtn}></span> */}
         </span>
      );
    }
    const MyInput = injectIntl(Inputs);

    return (
      <div className={style.search_wrap}>
        <div id="notifWrapEle"></div>
        <div className={style.search}>
          {<MyInput />}
        </div>
      </div>
    );
  }
}


export default Search;