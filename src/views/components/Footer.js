import React from 'react'
import icon_logo from '../../assets/images/blockmeta-logo.svg';
import qrcode from '../../assets/images/QRcode@3x.png';

import style from '../../assets/common.scss';
const href_police = 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002073';
const img_police = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAFDklEQVQ4EQXBbWwbZwHA8f89dz6fz2/nxLFj4tI1jdamrG1GW2AjpFuH9oLaMIJUVoQQQ2VMoDGB2AfQ+DCND+NLJaZpgMqQ6NQPwJAm2qqsy4LY1ooOphbaqi9Zmqax0zSx49hn34vPdw+/nyKlBKcDQIRAyAhXr5CIDQLtQefmhcl/nP7393y3pz/06M6jfTt2vA3DFd+XxF0XhAIIAMikUaSUBE4TFIkIJaqeA95/ePb0mWfP/v3GpHRnjUXfRM1ZbMwbuDWzN/7I8InRA1N/kOE9J6XfRioKIFGzQwiAlmLTlutIMwe6Z8z85o2Zbz8zfbDtLRj3plQOG3d51ljkwQeK9D1Q1A4/8+7Xzrz6ygklocYdXcHjPwTaxwAIAFSBUDNool72L7z8zq+PNzl0eJjvlFtkf3eF+vWQ+lxIc/9v+Wp4ieePPcXRvwbI67//S8r0DGGkMJJxAARAyrdJxpujt0++ODex/9KENVLkh/lLzB9vITZYhHYX/AhlwOLcc2c5aF6g+MX7+fL+UwdWP3zjprNwccvV9/4GgACI+y6a907qxPW0/tHSbp7YbdO+2ELcbqJYceJrId7Zu8Q29WO0XWp/PM/UY11mPtnGmx+EpZTSSSDGABAAzdVaOfrXe0ciJQGaQ8ZeorUMsTCANQ9ls4m+y0Lc6aATUZt3GerzQVFotAXxAe3I1vGpTQACYOHau1/vVqvjuZQOvTiyVCI/Pkgbif1gP+GhMqmXxjCf34EYMCnsytNxuiAlpYIJlYsPry2e+y6AADBTudGWHTA84IHRz5nzJtq+DPUDGwmrNsr/Ojin7hLMr6O/ME7fj3fy1rEGkGRsu0ZnbgWvMlcGEADR2tKBVkPjvrJN+XM6r7+Z5J+vVBjbUyJrpnGuNIhWfLxLDdLVdS6/fINXj8UpjllsH2pSq/oEa9fGAQSA0DqW3RJkVm9w8LGQXpAiOLlM/58+RgzF6A6oRAWN/L4SpZmb1I5eptNVmZqMka7PYrc0tLSIAWgACfPT02LLrcmwOMTTn7c5MjTA69VRgsUr9NdnEdkE7pUG9kiBaq7En0UCMhZPf2GFXrqM9RkFM7fhFIAGAKIgW5KlOZv7Ruf55U938eILE5y0t0MrYNKp02cJ3jqVpo0J5PjJDwz2jMyyNAt4DlHP3gmgAWhWd3cvXSRYDqisXOVH43GmppPMnHa4Jnbw+LZPKCVq9E4M0W24bNhq8vPHb3H33C2cwMDI62iWvhVAkVLitz/6Zv38r467y138WgCVBTY/OUa8aEBYJ6xrtFdcspv6YGM/VGrMv30dN50nNZwiMWiSHTm0V8995X1FSglAr/Pfb61dPvJa6LnZ2gfLaEnJ4N5RwjWXwOkgTAOjL4mix6ifm6MXamR3bybwqGe3TDyVtDLTiv4oGkDgLuCuulVvOeEaxShb3DdC2OwQ2i0wdVTdQk9Ad71Np9LA2NiPUS7irzt4VVsmNrRRMxkSgACQ3ZuofPizwmfTg7FcCb8ZEYUaUajirdogI7r1Ju3ZVRQ1BoqCd6dGLCEofqmU1037+5ELAAJAVzPE+/c8aTvZ15xKpaOr62QKPWKKg64EqP460nVJb82TGckg9DZaVkfJDd7uaff/QjPv/YaqrwKgASADlJjmtOrJ59yrxZfc5uoTfrC491PbBrZFtpIyLNGnJdLYd7idGLAcrTBxcW1uZdpdaJwZ2luIFFVFhh4A/wcuIjcTHG3F4QAAAABJRU5ErkJggg==";

export default ({ isLight = false }) => (
  isLight ? (
    <div className={style.footer}>
      {/* <p>© Copyright BLOCKMETA.COM 2018. All Rights Reserved.</p> */}
      <span>浙ICP备14013035号-1</span>
      <img src={img_police} alt=""/>
      <a target="_blank" rel="" href={href_police}>浙公网安备 33010602002073号</a>
    </div>
  ) : (
    <div className={style.ft}>
      <div className={style.wrap}>
        <div className={style.subTitle}>
          <a href="/"><Svg svg={icon_logo} width="170px" height="26px" style={{width: 138}} /></a>
          <p className={style.subtitle}><Msg id="ft_sub_title" /></p>
          <p className={style.copy}>Copyright ©️ 杭州时戳信息科技有限公司 · All Rights Reserved</p>
          <div className={style.icp}>
            <span>浙ICP备14013035号-1</span>
            <img src={img_police} alt=""/>
            <a target="_blank" rel="" href={href_police}>浙公网安备33010602002073号</a>
          </div>
        </div>
        <ul className={style.links}>
          <li>
            <p><Msg id="ft_nav_link" /></p>
            <p><a target="_blank" href="https://www.8btc.com"><Msg id="ft_nav_item_8btc" /></a></p>
            <p><a target="_blank" href="https://bytom.io"><Msg id="ft_nav_item_bytom" /></a></p>
            <p><a target="_blank" href="https://matpool.io">MATPool</a></p>
          </li>
          <li>
            <p><Msg id="ft_nav_cp" /></p>
            <p><Msg id="ft_nav_about" /></p>
            <p>Linkedin</p>
          </li>
          <li>
            <p><Msg id="ft_nav_follow" /></p>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Telegram</p>
          </li>
          <li>
            <p><Msg id="ft_nav_dev" /></p>
            <p><a target="_blank" href="https://apidoc.blockmeta.com/#!//">API</a></p>
            <p><a target="_blank" href="http://test.blockmeta.com/faucet.php"><Msg id="ft_nav_faucet" /></a></p>
            <p><a target="_blank" href="http://test.blockmeta.com/faucet_gm.php"><Msg id="ft_nav_gm_faucet" /></a></p>
          </li>
        </ul>
        <div className={style.qrcode_mobile}>
          <img src={qrcode} alt=""/>
          <p><Msg id="ft_mobile" /></p>
        </div>
      </div>
      
    </div>
  )
)