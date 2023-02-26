import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Gallery from './PiApp/Gallery/Gallery'
import ImageDetails from './PiApp/Gallery/GalleryComponent/ImageDetails'
import { Inbox } from './PiApp/Home/components/Inbox'
import Home from './PiApp/Home/Home'
import Shop from './Shop'
function App() {
  return (
    
         <Router>          
            {/* <Route path="/imageDetails"  component={ImageDetails} exact/> */}
            <Route path="/"  component={Home} exact/>
            <Route path="/shop"  component={Shop} exact/>
            <Route path="/imageDetails"  component={ImageDetails} />
            
        </Router>
    
  )
}

export default App