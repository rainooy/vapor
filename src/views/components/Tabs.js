import PropTypes from 'prop-types';
import { Tabs as AntdTabs } from 'antd';
import classnames from 'classnames/bind';
import style from '../../assets/common.scss';

const cs = classnames.bind(style);

class Tabs extends Component {
  render() {
    const { data = [], children, forceRender = false } = this.props;
    const renderTabBar = (props, DefaultTabBar) => (
      <div className={style.tabs_hd}>
        <div className={style.wrap}><DefaultTabBar {...props} /></div>
      </div>
    );
    return (
      <div className={style.tabs}>
        <AntdTabs
            renderTabBar={renderTabBar}
          >
            {
              data.map((item, index) => (
                <AntdTabs.TabPane tab={item} forceRender={forceRender} key={index}>
                  <div className={style.wrap}>{children[index] || children}</div>
                </AntdTabs.TabPane>
              ))
            }
          </AntdTabs>
      </div>
    );
  }
}

Tabs.propTypes = {

};

export default Tabs;