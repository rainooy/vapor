import PropTypes from 'prop-types';

import style from '../../assets/common.scss';

export default class TxDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curToggleTxt: this.props.data || '',
      curTab: 'original',
    }
  }

  handleToggle = (e) => {
    const curTab = e.target.dataset.type;
    const { data, type, code = [] } = this.props;
    const decode = (data) => {
      try {
        const res = decodeURIComponent(data.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
        return res;
      } catch (error) {
        
      }
    };
    const convert = {
      default (original){
        if (code[0] === 'FAIL') {
          return decode(code[1].split(' ')[1]);
        }
        if (type === 'control' || type === 'spend') return code.join(' ');
        return decode(original);
      },
      original (original) {
        if (type === 'control' || type === 'spend') return data;
        return original;
      },
      utf8 (original) {
        return this.default(original);
      }
    };
    this.setState({
      curToggleTxt: convert[curTab](data),
      curTab,
    })
  }


  render() {
    const { type, isToggle } = this.props;
    const { curTab, curToggleTxt } = this.state;
    
    return (
      <div className={style.tx_card_wrap}>
        <div className={style.tx_card_hd}>
          <span>{type === 'coinbase' ? <Msg id="tx_detail_arbitrary" /> : <Msg id="tx_detail_control" />}</span>
          {
            isToggle && 
              <div className={style.tx_card_opts} onClick={this.handleToggle}>
                <a data-type={'default'} className={curTab === 'default' ? style.cur : ''}><Msg id="tx_detail_default" /></a>
                <a data-type={'original'} className={curTab === 'original' ? style.cur : ''}><Msg id="tx_detail_original" /></a>
                <a data-type={'utf8'} className={curTab === 'utf8' ? style.cur : ''}><span>UTF-8</span></a>
              </div>
          }
        </div>
        <div className={style.tx_card_bd}>
          {curToggleTxt}
        </div>
      </div>
    )
  }

}

TxDetail.propTypes = {
  type: PropTypes.string.isRequired,   // program / arbitrary
  isToggle: PropTypes.bool,
  data: PropTypes.string.isRequired,
}