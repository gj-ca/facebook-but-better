import { useEffect, useState } from "react"

const NewPostPage = props => {
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        props.addToPosts({body: body, author: author})
    }

    useEffect(() => {
        console.log("Friends have been received")
        if (props.friends.length > 0) {
            setAuthor(props.friends[0].name.first)
        }
    }, [props.friends])



    return (
        <>
            <h2>New Post Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Body:</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} />
                </div>
                <div>
                    <label>Author:</label>
                    <select defaultValue={author} onChange={e => setAuthor(e.target.value)}>
                        <option disabled>Please select</option>
                        {props.friends.map((friend, index) => (
                            <option key={index} value={friend.name.first}>{friend.name.first}</option>
                        ))}
                    </select> 
                </div>
                <button>Submit</button>
            </form>
            <h2>Posts</h2>
            {props.posts.map((post, index) =>(
                <div style={{backgroundColor: "gray", borderRadius: "20px", margin: "20px", padding: "10px"}} key={index}>
                    <p>{post.body}</p>
                    <p>by {post.author}</p>
                </div>
            ))}
        </>
    )
}

export default NewPostPage