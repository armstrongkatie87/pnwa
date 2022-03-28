import React from 'react'
import { hot } from 'react-hot-loader'

const HelloWorld = () => {
    return (
        <div>
          <h1>Hello World!</h1>
        </div>
      )
}

export default hot(module)(HelloWorld)

//contains basic HelloWorld React component, which is hot-exported to enable hot reloading w/react-hot-loader dur dev