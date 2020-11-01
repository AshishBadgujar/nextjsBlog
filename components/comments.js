import React, { useState } from 'react'
import Axios from 'axios'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import baseUrl from '../helpers/baseUrl'
import moment from 'moment'

function Comments({ commentsArray, blogData }) {
    const router = useRouter()
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState(commentsArray)
    const cookieUser = parseCookies()
    const user = cookieUser.blogUser ? JSON.parse(cookieUser.blogUser) : ""

    console.log(commentsArray)

    const postComment = async () => {
        const res = await Axios.put(`${baseUrl}/api/comments/${blogData._id}`, {
            userId: user._id,
            comment,
        })
        const res2 = res.data
        console.log(res2)
        if (res2.message) {
            M.toast({ html: res2.message, classes: "green" })
            router.push(`/`)
            setComment('')
            setReviews(commentsArray)
        } else {
            M.toast({ html: res2.err, classes: "red" })
        }
    }

    const handleDelete = async (commentId) => {
        const res = await Axios.delete(`${baseUrl}/api/comments/${blogData._id}`, {
            data: {
                commentId
            }
        })
        const res2 = res.data
        console.log(res2)
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red" })
        }
        M.toast({ html: 'comment deleted !', classes: "green" })
        setReviews(res2)
    }

    return (
        <>
            <div className="pt-5" >
                <div className="section-title">
                    <h2>Comments</h2>
                </div>
                {user ?
                    <div className="col-md-8 mb-5 ml-5">
                        <div className="d-flex">
                            <input type="text"
                                placeholder="Leave your comment..."
                                value={comment}
                                className="form-control comment"
                                onChange={(e) => setComment(e.target.value)} />
                            <button className="btn btn-secondary mt-2" onClick={() => postComment()}><span className="icon-paper-plane"></span></button>
                        </div>
                    </div>
                    : null}

                <ul className="comment-list">
                    {reviews ?
                        reviews.reverse().map(comment => {
                            return (
                                <li className="comment" key={comment._id}>
                                    <div className="vcard bio">
                                        <img src={comment.commentedBy.mediaUrl} alt="Image placeholder" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>{comment.commentedBy.name}</h3>
                                        <div className="meta">{moment(comment.createdAt).fromNow()}</div>
                                        <p>{comment.text}</p>
                                        {(user.email == comment.commentedBy.email || user.email == blogData.authorEmail) ?
                                            <p><a className="reply" onClick={() => handleDelete(comment._id)}>Delete</a></p>
                                            : null}
                                    </div>
                                </li>
                            )
                        }) : null}
                </ul>
            </div>
        </>
    )
}

export default Comments



