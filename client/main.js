import React from 'react'
import { hydrate } from 'react-dom'//updated use hydrate instead of render
import App from './App'

hydrate(<App/>, document.getElementById('root'))

//hydrate f(x) hydrates a container that already has html content rendered by ReactDOMServer; server-rendered markup is preserved & only event handlers are attached when React takes over in browser, allowing initial load performance to be better