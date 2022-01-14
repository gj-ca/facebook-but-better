import { useState, useEffect } from "react"

const HomePage = props => {
    const [userData, setUserData] = useState()
    const getNewUser = () => {
        fetch("https://randomuser.me/api/")
            .then(response => response.json())
            .then(data => setUserData(data.results[0]))
    }



    return (
        <>
            <h2>This is the homepage</h2>
            <div>
                {userData && <>
                    <p><b>Name:</b>{userData.name?.first} </p>
                    <p><b>Email:</b>{userData.email}</p>
                    <img src={userData.picture?.large} alt="user avatar" />
                    <button onClick={() => props.addToFriends(userData)}>Add To My Friends</button>
                </>}
                <button onClick={getNewUser}>Get me a friend</button>
            </div>
            <h2>List of friends</h2>
            {props.friends.map((friend, index) => (
                <div key={index}>
                    <p>{friend.name?.first}</p>
                </div>
            ))}
        </>
    )
}

export default HomePage