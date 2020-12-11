import React, { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import Truncate from 'react-truncate';

export default function HalfWidthCont({ blogs }) {
    const [catColl, setCatColl] = useState(['Politics', 'Business', 'Health', 'Design', 'Sports', 'Technology'])
    return (
        <>
            <div className="container">
                <div className="row">
                    {catColl.map(cat => {
                        return (
                            <div className="col-lg-6">
                                <div className="section-title">
                                    <h2>{cat}</h2>
                                </div>
                                {blogs.map(blog => {
                                    if (blog.category == cat) {
                                        return (
                                            <div className="post-entry-2 d-flex">
                                                <img src={blog.mediaUrl} alt="" className="thumbnail" />
                                                <div className="contents">
                                                    <h2><Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>{blog.title}</a></Link></h2>
                                                    <Truncate lines={2} ellipsis={<span>...<Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>Read more</a></Link></span>}>
                                                        <span>{blog.content}</span>
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
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
