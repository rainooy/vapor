import { Spin } from 'antd';

export default ({style}) => (
  <div style={{ 
    width: '100%', 
    height: 100, 
    lineHeight: '100px', 
    textAlign: 'center',
    background: 'rgba(180,180,180,.1)',
    ...style, 
  }}><Spin /></div>
)