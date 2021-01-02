import React from 'react'
import Link from 'next/link'

export default function Writers({ writers }) {
    return (
        <>
            <div className="site-section pt-2 pb-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="section-title">
                                <h2>Our Writers</h2>
                            </div>
                            {writers.slice(0, 6).map(writer => {
                                return (
                                    <div className="post-entry-2 d-flex" key={writer._id}>
                                        <img src={writer.mediaUrl} alt="" style={{ height: '70px', width: '70px', borderRadius: '50%', marginRight: '20px', marginTop: '15px' }} />
                                        <div className="contents order-md-1 pl-0">
                                            <h2><Link href="/user/[id]" as={`/user/${writer._id}`}><a className="text-left">{writer.name}</a></Link></h2>
                                            <p className="mb-3">{writer.bio}</p>
                                            <div className="post-meta">
                                                <span className="d-block"><a href="#">{writer.email}</a></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
