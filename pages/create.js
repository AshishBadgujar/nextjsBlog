import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import Image from 'next/image'

export default function Create() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dropRef = useRef(null)
    const cookieUser = parseCookies()
    const user = cookieUser.blogUser ? JSON.parse(cookieUser.blogUser) : ""
    const [media, setMedia] = useState("")
    const [category, setCategory] = useState('')

    useEffect(() => {
        M.FormSelect.init(dropRef.current);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const mediaUrl = await imageUpload()
        const res = await Axios.post(`${baseUrl}/api/blogs`, {
            userId: user._id,
            title,
            content,
            mediaUrl,
            category
        })
        const res2 = res.data
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red rounded" })
        } else {
            M.toast({ html: `Your Blog is submitted !`, classes: "#00e676 green accent-3 rounded" })
            router.push('/')
        }
    }

    const imageUpload = async () => {
        const data = new FormData()
        data.append('file', media)
        data.append('upload_preset', 'nextjsBlog')
        data.append('cloud_name', "ashish124")
        const res = await fetch(`https://api.cloudinary.com/v1_1/ashish124/image/upload`, {
            method: "POST",
            body: data
        })
        const res2 = await res.json()
        return res2.url
    }

    return (
        <div className="site-section bg-light">
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
                    <div className="section-title mt-5">
                        <h2>Write your Blog !</h2>
                    </div>
                    <div className="input-field">
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="validate" />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field dropdown">
                        <select ref={dropRef} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled selected>Category</option>
                            <option value="Politics">Politics</option>
                            <option value="Business">Business</option>
                            <option value="Health">Health</option>
                            <option value="Design">Design</option>
                            <option value="Sports">Sports</option>
                            <option value="Technology">Technology</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn btn-secondary py-0">
                            <span className="mb-5">Browse</span>
                            <input type="file"
                                accept="image/*"
                                onChange={(e) => setMedia(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper input-field">
                            <input className="file-path validate" placeholder="File" type="text" id="file" />
                        </div>
                    </div>
                    <Image src={media ? URL.createObjectURL(media) : ""} className="responsive-img" alt="img" width={600} height={400} />
                    <div className="input-field">
                        <i className="material-icons prefix">create</i>
                        <textarea id="textarea" value={content} onChange={(e) => setContent(e.target.value)} className="materialize-textarea"></textarea>
                        <label htmlFor="textarea">Content</label>
                    </div>
                    <button className="btn btn-secondary mt-2" type="submit" >Post</button>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { blogUser } = parseCookies(ctx)
    if (!blogUser) {
        const { res } = ctx
        res.writeHead(302, { Location: '/login' })
        res.end()
    }
    return {
        props: {}
    }
}