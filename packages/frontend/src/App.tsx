import React, { Fragment } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home'
import AddApiary from './AddApiary'

const App = () => {
    return (
    <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/add' element={<AddApiary/>} />
          </Routes>
        </Fragment>
    </BrowserRouter>)
}

export default App
