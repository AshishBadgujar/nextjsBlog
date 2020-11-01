import React from 'react'
import Link from 'next/link'
import moment from 'moment'

function MinWidthCont({ blogs }) {
    return (
        <>
            <div className="section-title">
                <h2>Popular Blogs</h2>
            </div>
            {blogs.map(blog => {
                return (
                    <div className="trend-entry d-flex" key={blog._id}>
                        <div className="number align-self-start">0{blogs.indexOf(blog) + 1}</div>
                        <div className="trend-contents">
                            <h2><Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>{blog.title}</a></Link></h2>
                            <div className="post-meta">
                                <span className="d-block">-{blog.author.name}</span>
                                <span className="date-read">{moment(blog.updatedAt).fromNow()}<span className="icon-star2"></span></span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default MinWidthCont

