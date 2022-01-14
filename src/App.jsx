import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import LoginPage from './pages/LoginPage'
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  return (
    <BrowserRouter>
    <div style={{display: "flex", justifyContent:"space-between"}}>
      <Link to="/posts/new">New Post</Link>
      <Link to="/posts">All Posts</Link>
      <Link to="/">Home</Link>
      {
        !userLoggedIn ? 
          <Link to="/login">login</Link>
            :
          <button onClick={() => setUserLoggedIn(false)}>Logout</button>
      }

    </div>
    <Routes path="/">
      <Route 
        index 
        element={
          <PrivateRoute userLoggedIn={userLoggedIn}>
            <h2>Home Page</h2>
          </PrivateRoute>}
        />
      <Route path="/login" element={<LoginPage setUserLoggedIn={setUserLoggedIn} />}/>
      <Route path="/posts">
        <Route 
          index 
          element={
            <PrivateRoute userLoggedIn={userLoggedIn}>
              <h2>all posts</h2>
            </PrivateRoute>
          }/>
        <Route 
          path="new" 
          element={
            <PrivateRoute userLoggedIn={userLoggedIn}>
              <h2>new</h2> 
            </PrivateRoute>
          }/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

const PrivateRoute = props => {
  if (props.userLoggedIn == true) {
    return ({...props.children})
  } else {
    return <h2>You cannot access</h2>
  }
}

export default App
