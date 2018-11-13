import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/common.scss';

class TitleBar extends PureComponent {
  render() {
    return (
      <div className={style.titleBar}>
        {this.props.title}
        {this.props.extra}
      </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.element.isRequired,
};

export default TitleBar;