import React from 'react';
import classnames from 'classnames/bind';
import { Dropdown, Menu } from 'antd';
import { actions } from '../../redux/config';

import style from '../../assets/common.scss';
import icon_logo from '../../assets/images/blockmeta-logo.svg';

const cs = classnames.bind(style);

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, { ...actions })
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { switchLang, config } = this.props;

    const langMenu = (
      <Menu>
        <Menu.Item><a onClick={() => switchLang('zh')}>中文</a></Menu.Item>
        <Menu.Item><a onClick={() => switchLang('en')}>English</a></Menu.Item>
      </Menu>
    );
    
    return (
      <div className={style.header}>
        <div id="notifWrapEle"></div>
        <div className={style.wrap}>
          <div className={style.logo}>
            <Link to="/"><Svg svg={icon_logo} width="138px" height="68px" style={{width: 138}} /></Link>
          </div>
          <ul>
            {/* <li><Link to="/assets">{lang[config.lang]['nav_assets']}</Link></li> */}
            {/* <li>
              <Dropdown overlay={statsMenu}>
                <a className="ant-dropdown-link" href="#">
                  {lang[config.lang]['nav_stats']}
                </a>
              </Dropdown>
            </li> */}
            <li>
              <Dropdown overlay={langMenu}>
                <a className="ant-dropdown-link" href="#">
                  {
                    config.lang === 'zh' ? 'English' : '中文'
                  }
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Header;