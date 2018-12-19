import React from 'react'
//import { Connect, SignIn, SignOut } from '../config/firebase'

import 'semantic-ui-css/semantic.min.css'
import {
  Modal,
  Dimmer,
  Form,
  Menu,
  Button,
  Image,
  Segment,
  Loader
} from 'semantic-ui-react/dist/commonjs'

import logo from '../logo.svg'


//import HomeUnlogin from '../component/HomeUnlogin'

function withSubscription(Wrap, props) {
  return class extends React.Component {
    state = {
      loading: true,
      activeItem: 'home',
      users: null,
      open: false,
      user: {},
      message: ""
    }

    close = () => this.Submit();
    show = dimmer => () => this.setState({ dimmer, open: true })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })



    handleChange = this.handleChange.bind(this)

    handleChange(event) {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value
        }
      })
    }

    Submit() {
      fetch('http:///www.digime.space:8250/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user": "Seksan_Yim@truecorp.co.th",
          "pass": "01008876"
        })
        // })
      }).then((res) => {
        if (res.status === 200) {
          this.setState({ message: "SUCCESSS" })
          console.log("SUCCESSS")
          return res.json();
        }
        else if (res.status === 400) {
          console.log("Missing password")
        }
        else if (res.status === 522) {
          console.log("Server Not Found!!!!")
        }
      })
        .then(res => JSON.parse(res))
        .then(res => this.SetlocalStore(res));

      // this.setState({ users: '11' })
    }


    SetlocalStore = (res) => {

      res.map((e) => {
        // console.log(e)
        this.setState({ users: e })
        // sessionStorage.setItem('myData', e.token)
      })
    }



    render() {

      let { activeItem, users, open, dimmer } = this.state
      return (
        <div id="center">
          <Menu fixed="top" inverted>
            <Menu.Item as="a" header>
              <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
              Project VH3
            </Menu.Item>
            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="messages"
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              {/* <Menu.Item>
                {users ? (
                  <div>
                    <Image src={users.photoURL} avatar />
                    {users.displayName}
                  </div>
                ) : (
                  <div> </div>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {users ? (
                  <Button >SignOut</Button>
                ) : (

                    <Modal trigger={<Button onClick={this.show(true)}>SignIn</Button>} size='tiny' dimmer={dimmer} open={open} onClose={this.close}>
                      <Modal.Header >Log In</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form>
                            <Form.Group widths="equal">
                              <Form.Input
                                required
                                fluid
                                name="email"
                                label="E-Mail"
                                placeholder="E-Mail"
                                onChange={this.handleChange}
                              />
                            </Form.Group>
                            <Form.Group widths="equal">
                              <Form.Input
                                required
                                fluid
                                type="password"
                                name="email"
                                label="Password"
                                placeholder="Password"
                                onChange={this.handleChange}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="react"
                          labelPosition='right'
                          content="Submit"
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  )}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {users ? (
            <div>
              <Wrap data={users} />
            </div>
          ) : (
              <div>
                <Segment style={{ margin: '5em 0em 0em', padding: '25em 0em' }}>
                  <Dimmer active inverted>
                    <Loader inverted >Loading</Loader>
                  </Dimmer>
                </Segment> </div>
            )}
        </div>
      )
    }
  }
}

export default withSubscription