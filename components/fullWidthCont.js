import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import Truncate from 'react-truncate';

export default function FullWidthCont({ blogs }) {
    return (
        <>
            <div className="py-0">
                <div className="container">
                    <div className="section-title">
                        <h2>Latest</h2>
                    </div>
                    {blogs.slice(0, 1).map(blog => {
                        return (
                            <div className="half-post-entry d-block d-lg-flex bg-light">
                                <img src={blog.mediaUrl} alt="" className="img-bg" />
                                <div className="contents">
                                    <span className="caption">Latest Blog</span>
                                    <h2><Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>{blog.title}</a></Link></h2>
                                    <Truncate lines={4} ellipsis={<span>...<Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>Read more</a></Link></span>}>
                                        {blog.content}
                                    </Truncate>
                                    <div className="post-meta">
                                        <span className="d-block"><a href="#">-{blog.author.name}</a></span>
                                        <span className="date-read">{moment(blog.updatedAt).fromNow()}<span className="icon-star2"></span></span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
