import React from 'react'
import MinWidthCont from './minWidthCont'
import Link from 'next/link'
import moment from 'moment'
import Truncate from 'react-truncate';

export default function QuadWidthCont({ blogs }) {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        {blogs.slice(0, 4).map(blog => {
                            return (
                                <div className="post-entry-2 d-flex" key={blog._id}>
                                    <img src={blog.mediaUrl} alt="" className="thumbnail order-md-2 mr-3" />
                                    <div className="contents order-md-1 pl-0">
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
                        })}
                    </div>
                    <div className="col-lg-3">
                        <MinWidthCont blogs={blogs} />
                    </div>
                </div>
            </div>
        </>
    )
}

