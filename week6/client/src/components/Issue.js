import React from 'react'
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class Issue extends React.Component {
    constructor(props) {
    super(props)
    this.state = {comments: []}
    }
    getIssueComments(issueId) {
        userAxios.get("/api/comment/issue/" + issueId)
        .then(res => {
                console.log(res.data)
                this.setState({comments: res.data})
            })
            .catch(err => err ? console.log(err.response.data.errMsg): 0)
    }

    addComment(issueId) {
        userAxios.post("/api/comment/" + issueId, {title: this.state.title, imgUrl: this.state.imageUrl})
        .then(res => {
                console.log(res.data)
                this.setState({comments: [...this.state.comments, res.data]})
            })
            .catch(err => err ? console.log(err.response.data.errMsg): 0)
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    upvote(e, _id) {
        userAxios.put("/api/issue/" + _id + "/upvote").then(
            res => console.log(res.data)
        )
    }

    downvote(e, _id) {
        userAxios.put("/api/issue/" + _id + "/downvote").then(
            res => console.log(res.data))
    }

    deleteIssue(e, _id) {
        userAxios.delete("/api/issue/" + _id).then(
            res => console.log(res.data)
        )
    }

    componentDidMount() {
        console.log(this.props._id)
        // let comments = this.props.comments(this.props._id)
        !this.state.comments.length ? this.getIssueComments(this.props._id) : console.log(this.state.comments)
    }
    render() {
    const {title, description, imgUrl, _id, upvotes, downvotes} = this.props 
    return (
        <div className="issue">
            <h1>{title}</h1>
            <h2>{description}</h2>
            <img src={imgUrl} alt={imgUrl} width={300}/>
            <span>{upvotes}</span>
            <button onClick={(e) => this.upvote(e, _id)}>Upvote</button>
            <button onClick={(e) => this.downvote(e, _id)}>Downvote</button>
            <span>{downvotes}</span>
            <form>
                <input
                type="text"
                onChange={e => this.handleChange(e)}
                placeholder="Title"
                value={this.state.title}
                name="title"
                />
                <input
                type="text"
                onChange={e => this.handleChange(e)}
                placeholder="Image Url"
                value={this.state.imageUrl}
                name="imageUrl"
                />
                <button onClick={(e) => {e.preventDefault()
                    this.addComment(_id)
                }}>Submit Comment</button>                
            </form>
            {/* <button onClick={() => comments(_id)}>List All Comments</button> */}
            <ul>
                {this.state.comments.map((comment, index) => (<li>{comment.title + " " + comment.imgUrl}</li>))}
            </ul>
            <button onClick={(e) => this.deleteIssue(e, _id)}>Delete Issue</button>
        </div>
    )
}
}