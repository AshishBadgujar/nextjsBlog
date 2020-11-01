import React, { useState } from 'react'
import Axios from 'axios'
import baseUrl from '../helpers/baseUrl'
import Link from 'next/link'
import Truncate from 'react-truncate'
import moment from 'moment'

function Search({ blogs, users }) {
    const [text, setText] = useState('')
    return (
        <div className="container">
            <div className="d-flex" style={{ marginBottom: '30px' }}>
                <input type="search" onChange={(e) => setText(e.target.value)} className="form-control" placeholder="Search..." />
                <button type="submit" className="btn btn-secondary" ><span className="icon-search"></span></button>
            </div>
            <h4>Blogs</h4><hr />
            {blogs.map((blog) => {
                if (blog.title.toLowerCase().includes(text.toLowerCase())) {
                    return (
                        <div className="post-entry-2 d-flex" key={blog._id}>
                            <img src={blog.mediaUrl} alt="" className="thumbnail order-md-2 mr-3" />
                            <div className="contents order-md-1 pl-0">
                                <h2><Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>{blog.title}</a></Link></h2>
                                <Truncate lines={4} ellipsis={<span>...<Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>Read more</a></Link></span>}>
                                    <p>{blog.content}</p>
                                </Truncate>
                                <div className="post-meta">
                                    <span className="d-block">-{blog.author.name}</span>
                                    <span className="date-read">{moment(blog.updatedAt).fromNow()}<span className="icon-star2"></span></span>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <h4>Writers</h4><hr />
            {users.map((user) => {
                if (user.name.toLowerCase().includes(text.toLowerCase())) {
                    return (

                        <div className="post-entry-2 d-flex" key={user._id}>
                            <img src={user.mediaUrl} alt="" style={{ height: '70px', width: '70px', borderRadius: '50%', marginRight: '20px', marginTop: '15px' }} />
                            <div className="contents order-md-1 pl-0">
                                <h2><Link href="/user/[id]" as={`/user/${user._id}`}><a className="text-left">{user.name}</a></Link></h2>
                                <p className="mb-3">{user.bio}</p>
                                <div className="post-meta">
                                    <span className="d-block"><a href="#">{user.email}</a></span>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const res1 = await Axios.get(`${baseUrl}/api/blogs`)
    const blogs = res1.data
    const res2 = await Axios.get(`${baseUrl}/api/signup`)
    const users = res2.data
    return {
        props: {
            blogs,
            users
        }
    }
}