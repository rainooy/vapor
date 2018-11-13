import style from '../../assets/common.scss';

export default function Price({ value, symbol = 'BTM',  isFixed = true }) {
  let ret = null

  if (value !== null && value !== undefined && value !== '') {
    const curValue = isFixed ? value.toFixed(8) : value;
    // const curValue = value;
    const matched = `${curValue}`.match(/((?:\+|\-)?\d*\.\d{4})(\d+)/)
    if (matched) {
      ret = (
        <span className={style.price_wrap}>
          {matched.slice(1).map((value, index) => (
            <span className={RegExp.$2 === value ? style.price_info : style.price_default} key={index}>
              {value}
            </span>
          ))}
          <span className={style.price_btm}> {symbol}</span>
        </span>
      )
    } else {
      ret = <span className={`${style.price_wrap} ${/\-/.test(curValue) ? style.price_danger : ''}`}>{curValue} <span className={style.price_btm}>{symbol}</span></span>
    }
  }

  return ret
}
