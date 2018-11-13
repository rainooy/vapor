import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/common.scss';
import classnames from 'classnames/bind';

const cs = classnames.bind(style);


class Navbar extends PureComponent {
  render() {
    const data = this.props.data || [];
    return (
      <div className={cs('clearfix', 'navbar')}>
        <ul>
          <li><Link to="/"><Msg id="nav_home" /></Link></li>
          {
            data.map((item, index) => (
              <li key={index}>
                <span>/</span>{item}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Navbar;