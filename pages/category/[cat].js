import React from 'react'
import MinWidthCont from '../../components/minWidthCont'
import Link from 'next/link'
import moment from 'moment'
import Axios from 'axios'
import baseUrl from '../../helpers/baseUrl'
import Truncate from 'react-truncate';
import Image from 'next/image'

export default function Category({ category, blogs }) {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="section-title">
                            <h2>{category}</h2>
                        </div>
                        {blogs.map(blog => {
                            if (blog.category == category) {
                                return (
                                    <div className="post-entry-2 d-flex" key={blog._id}>
                                        <div className="contents pl-0 pb-0">
                                            <h2><Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>{blog.title}</a></Link></h2>
                                            <Truncate lines={3} ellipsis={<span>...<Link href="/blog/[id]" as={`/blog/${blog._id}`} ><a>Read more</a></Link></span>}>
                                                <p>{blog.content}</p>
                                            </Truncate>
                                            <div className="post-meta">
                                                <span className="d-block">-{blog.author.name}</span>
                                                <span className="date-read">{moment(blog.updatedAt).fromNow()}<span className="icon-star2"></span></span>
                                            </div>
                                        </div>
                                        <Image src={blog.mediaUrl} alt="thumbnail" width={250} height={250} className="thumbnail" />
                                    </div>
                                )
                            }
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

export async function getServerSideProps({ params: { cat } }) {
    const res = await Axios.get(`${baseUrl}/api/blogs`)
    const blogs = res.data
    return {
        props: {
            category: cat,
            blogs
        }
    }
}