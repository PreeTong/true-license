import React, { Component } from 'react'
import { Container, Header, Grid, Table } from 'semantic-ui-react/dist/commonjs'
import withNavbar from '../../hdc/withNavbar'


class Home extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    // this.setState({ data: sessionStorage.getItem('myData') })
    console.log(this.props.data)

    // setTimeout(() => {
    //   console.log(this.state.data)
    // }, 300)

  }

  render() {
    // let res = sessionStorage.getItem('myData')
    // console.log(res.token)
    return (
      <div>
        <Container style={{ marginTop: '5em' }}>
          <Header size="huge">VEHICLE EXPENSES FORM ( VH 3 )</Header>
        </Container>

        <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
          Hello
        </Container>
      </div>
    )
  }
}

export default withNavbar(Home)