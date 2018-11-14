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
    const curEnv = localStorage.getItem('curEnv') || 'Bytom';
    this.state = {
      curEnv,
    };
  }

  handleChainSwitch = () => {
    let { curEnv } = this.state;
    const isBytom = curEnv === 'Bytom';
    curEnv = isBytom ? 'Vapor' : 'Bytom';
    window.env.curEnv = curEnv;
    let path = '';
    if (curEnv === 'Bytom') {
      window.env.api = `${window.env.apiHost}/api/v2`;
      path = '/';
    } else {
      window.env.api = `${window.env.apiHost}/api/vapor`;
      path = '/vapor';
    }
    localStorage.setItem('curEnv', curEnv);
    localStorage.setItem('apiHost', window.env.api);
    this.setState({ curEnv });
    this.props.history.push(path, { env: curEnv } );
  }

  render() {
    const { switchLang, config } = this.props;
    const { curEnv } = this.state;

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
            <li onClick={this.handleChainSwitch}><a>{curEnv === 'Bytom' ? 'Vapor' : 'Bytom'}</a></li>
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