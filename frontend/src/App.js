import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Gallery from './PiApp/Gallery/Gallery'
import Shop from './Shop'
function App() {
  return (
    <div>
     
    <Router>
            <Route path='/'  component={Shop} exact />
            <Route path='/gallery'  component={Gallery} exact />
     
    </Router>
    </div>
  )
}

export default App