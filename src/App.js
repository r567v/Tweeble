import React from 'react'
import { AppContext } from './context/AppContext'
import Feed from './Feed'
import Header from './Header'
import NewTweet from './NewTweet'

const App = () => {
  const {loading} = React.useContext(AppContext) 

  if(loading) {
    return <h1>loading....</h1>
  }

  return (
    <>
      <Header />
      <div class="main-wrapper pt-80 mb-80">
        <div class="container">
          <div class="row">
            <NewTweet />
            <Feed />
          </div> 
        </div>
      </div>

    </>
  )
}

export default App
