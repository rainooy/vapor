import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from './conf/locales/zh-CN';
import en_US from './conf/locales/en-US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';

import Home from './views/Home';
import Block from './views/Block';
import Trans from './views/Trans';
import Nodes from './views/Nodes';
import Stats from './views/stats';
import Assets from './views/Assets';
import Asset from './views/Asset';
import Address from './views/Address';
import Header from './views/components/Header';

addLocaleData([...en, ...zh]);

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, { })
class App extends PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      lang: ''
    }
  }

  componentDidCatch(error, info) {
    console.log('***************', '*******************');
  }
  
  
  render() {
    const { config } = this.props;
    return (
      <IntlProvider
        locale={config.lang}
        messages={{zh: zh_CN, en: en_US}[config.lang]}
      >
        <LocaleProvider locale={config.lang === 'zh' ? zhCN : enUS}>
          <BrowserRouter>
            <>
              <Route path="/" render={(props) => <Header {...props} />}></Route>
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route path="/block/:id" render={(props) => <Block {...props} />} />
                <Route path="/address/:address" render={(props) => <Address {...props} />} />
                <Route path="/tx/:id" render={(props) => <Trans {...props} />} />
                <Route path="/nodes" render={(props) => <Nodes {...props} />} />
                <Route path="/stats" render={(props) => <Stats {...props} />} />
                <Route path="/assets" render={(props) => <Assets {...props} />} />
                <Route path="/asset/:id" render={(props) => <Asset {...props} />} />
                <Redirect to="/" />
              </Switch>
              {/* <Footer /> */}
            </>
          </BrowserRouter>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

export default hot(module)(App);
