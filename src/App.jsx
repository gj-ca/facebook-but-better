import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react/cjs/react.development'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NewPostPage from './pages/NewPostPage'



function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [friends, setFriends] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/friends")
      .then(response => response.json())
      .then(data => setFriends(data))
      fetch("http://localhost:5000/posts")
      .then(response => response.json())
      .then(data => setPosts(data))
  },[])

  const addToFriends = (friend) => {
    friend.id = friends.length + 1
    fetch("http://localhost:5000/friends", {
      method: "POST",
      body: JSON.stringify(friend),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(savedFriend => setFriends([...friends, savedFriend]))
  }

  const addToPosts = (post) => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(savedPost => setPosts([...posts, savedPost]) )
  }



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
            <HomePage friends={friends} addToFriends={addToFriends} />
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
              <NewPostPage friends={friends} posts={posts} addToPosts={addToPosts}/> 
            </PrivateRoute>
          }/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

const PrivateRoute = props => {
  // if (props.userLoggedIn == true) {
  //   return ({...props.children})
  // } else {
  //   return (props.userLoggedIn == true ? ({...props.children}) : <h2>You cannot access</h2>)
  // }
  return (
    props.userLoggedIn == true ? 
      ({...props.children}) 
        :
      <h2>You cannot access</h2>
    )
}

export default App
