import React from 'react'
import { View } from 'react-native'
import firebase from 'firebase'

import { Header, Button, CardSection, Spinner } from './components/common'
import LogInForm from './components/LogInForm'

class App extends React.Component {
  state = { loggedIn: null }

  // firebase initialisation with credentials
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'apikey',
      authDomain: 'xxx',
      databaseURL: 'xxx',
      projectId: 'xx',
      storageBucket: 'xxx',
      messagingSenderId: 'xxxx',
    })

    firebase.auth().onAuthStateChanged((user) => { // this 'user' will be an object about the user if they're signed in, or return null or undefined if signed out
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        )

      case false:
        return <LogInForm />

      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        )
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App
