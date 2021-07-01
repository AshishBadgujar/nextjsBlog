import React, { useRef, useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import baseUrl from '../../helpers/baseUrl'
import { parseCookies } from 'nookies'
import Comments from '../../components/comments'
import moment from 'moment'
import Image from 'next/image'

function Blog({ blogs, blogData, commentsArray, }) {
    const [title, setTitle] = useState(blogData.title)
    const [content, setContent] = useState(blogData.content)
    const router = useRouter()
    const modal1Ref = useRef(null)
    const modal2Ref = useRef(null)
    const cookieUser = parseCookies()
    const user = cookieUser.blogUser ? JSON.parse(cookieUser.blogUser) : ""

    useEffect(() => {
        M.Modal.init(modal1Ref.current)
        M.Modal.init(modal2Ref.current)
    }, [])

    if (router.isFallback) {
        return (
            <h3 className="container">Loading...</h3>
        )
    }
    const getmodal = () => {
        return (
            <div id="modal1" className="modal bottom-sheet" ref={modal1Ref}>
                <div className="modal-content">
                    <h4>{blogData.title}</h4>
                    <h5>Are you sure want to delete ?</h5>
                </div>
                <div className="modal-footer">
                    <h5 className="modal-close mt-2 mr-4">Cancel</h5>
                    <button className="btn btn-secondary mt-2" onClick={() => deleteBlog()}><span className="material-icons">delete</span></button>
                </div>
            </div>
        )
    }

    const deleteBlog = async () => {
        await Axios.delete(`${baseUrl}/api/blog/${blogData._id}`)
            .then(res => {
                M.toast({ html: res.data.message, classes: "#00e676 green accent-3 rounded" })
                router.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateBlog = () => {

        return (
            <div id="modal2" className="modal " ref={modal2Ref}>
                <div className="modal-content">
                    <h4>Edit your blog here !</h4>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <div className="input-field">
                        <i className="material-icons prefix">create</i>
                        <textarea id="textarea" value={content} onChange={(e) => setContent(e.target.value)} className="materialize-textarea"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <h5 className="modal-close mt-2 mr-4" onClick={() => cancel()}>Cancel</h5>
                    <button className="btn btn-secondary mt-2" onClick={() => saveBlog()}><span className="icon-paper-plane"></span></button>
                </div>
            </div>
        )
    }

    const cancel = () => {
        setTitle(blogData.title)
        setContent(blogData.content)
    }

    const saveBlog = async () => {
        await Axios.post(`${baseUrl}/api/blog/${blogData._id}`, {
            id: blogData._id,
            title,
            content,
        })
            .then(res => {
                M.toast({ html: 'your blog successfully updated !', classes: "#00e676 green accent-3 rounded" })
                router.push(`/`)
            }).catch(err => {
                M.toast({ html: 'something went wrong,try again !', classes: "red rounded" })
                console.log(err)
            })
    }

    return (
        <div className="site-section pt-5">
            <div className="container">
                <div className="row">
                    <div className="single-content">
                        <p className="mb-5">
                            <Image src={blogData.mediaUrl} alt="Image" width={960} height={500} />
                        </p>
                        {user.email == blogData.author.email &&
                            <div className="right">
                                <button data-target="modal1" className="btn btn-secondary modal-trigger mr-2"><span className="material-icons">delete</span></button>
                                <button data-target="modal2" className="btn btn-secondary modal-trigger ml-2"><span className="material-icons">edit</span></button>
                            </div>
                        }
                        <h1 className="mb-4">
                            {blogData.title}
                        </h1>
                        <div className="post-meta d-flex mb-4 align-items-center">
                            <Image src={blogData.author.mediaUrl} width={70} height={70} alt="Image" className="img-fluidid rounded-circle" />
                            <div className="vcard ml-3">
                                <span className="d-block">{blogData.author.name}</span>
                                <span className="date-read">{moment(blogData.updatedAt).fromNow()}<span className="icon-star2"></span></span>
                            </div>
                        </div>
                        {getmodal()}
                        {updateBlog()}
                        <p>{blogData.content}</p>
                    </div>
                    <Comments commentsArray={commentsArray} blogData={blogData} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await Axios.get(`${baseUrl}/api/blog/${id}`)
    const blogData = res.data
    const res2 = await Axios.get(`${baseUrl}/api/comments/${id}`)
    const commentsArray = res2.data
    const res3 = await Axios.get(`${baseUrl}/api/blogs`)
    const blogs = res3.data
    return {
        props: {
            blogs,
            blogData,
            commentsArray
        }
    }
}

export default Blog
