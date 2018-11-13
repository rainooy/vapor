import Header from './Header';

export default (Wrapped) => {
  return class extends Component {
    render() {
      return (
        <>
          <Header {...this.props} />
          <Wrapped {...this.props} />
        </>
      )
    }
  }
}