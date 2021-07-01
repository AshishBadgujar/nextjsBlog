import React, { useRef, useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import baseUrl from '../../helpers/baseUrl'
import { parseCookies } from 'nookies'
import QuadWidthCont from '../../components/quadWidthCont';
import Image from 'next/image'

function user({ userData, blogs }) {
    const [name, setName] = useState(userData.name)
    const [bio, setBio] = useState(userData.bio)
    const [media, setMedia] = useState(userData.mediaUrl)
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
                    <h4>{userData.name}</h4>
                    <h5>Are you sure want to delete your account ?</h5>
                </div>
                <div className="modal-footer">
                    <h5 className="modal-close mt-2 mr-4">Cancel</h5>
                    <button className="btn btn-secondary mt-2" onClick={() => deleteUser()}><span className="material-icons">delete</span></button>
                </div>
            </div>
        )
    }

    const deleteUser = async () => {
        await Axios.delete(`${baseUrl}/api/user/${userData._id}`)
            .then(res => {
                M.toast({ html: res.data.message, classes: "#00e676 green accent-3 rounded" })
                cookieUser.remove('blogToken')
                cookieUser.remove('blogUser')
                router.push('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateUser = () => {
        return (
            <div id="modal2" className="modal" ref={modal2Ref}>
                <div className="modal-content">
                    <h4>Edit your Profile !</h4>
                    <form action="" encType="multipart/form-data" onSubmit={(e) => saveUser(e)}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image src={userData.mediaUrl} alt="Image" className="z-depth-3 rounded-circle" width={120} height={120} />
                        </div>
                        <div className="file-field input-field">
                            <div className="btn-floating halfway-fab waves-effect waves-light #9e9e9e grey">
                                <span className="material-icons mt-2 ml-2">edit</span>
                                <input type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setMedia(e.target.files[0])
                                    }} />
                            </div>
                        </div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)} />
                        <div className="modal-footer">
                            <h5 className="modal-close mt-2 mr-4" onClick={() => cancel()}>Cancel</h5>
                            <button className="btn btn-secondary mt-2" type="submit"><span className="icon-paper-plane"></span></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const cancel = () => {
        setName(userData.name)
        setBio(userData.bio)
    }

    const saveUser = async (e) => {
        e.preventDefault()
        console.log(media)
        const mediaUrl = await imageUpload()
        console.log(mediaUrl)
        const res = await Axios.post(`${baseUrl}/api/user/${userData._id}`, {
            id: userData._id,
            name,
            bio,
            mediaUrl
        })
        const res2 = res.data
        console.log(res2)
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red rounded" })
        } else {
            M.toast({ html: 'your Profile successfully updated !', classes: "#00e676 green accent-3 rounded" })
            router.push(`/user/${userData._id}`)
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
    console.log(userData)
    return (
        <>
            <div className="site-section">
                <div className="row">
                    <div className="container">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <Image src={userData.mediaUrl} alt="Image" className="z-depth-3rounded-circle mb-2" width={150} height={150} />
                            <h2>{userData.name}</h2>
                        </div>

                        <div className="col-lg-9 m-auto">
                            {user.email == userData.email &&
                                <div className="right">
                                    <button data-target="modal2" className="btn btn-secondary modal-trigger mr-2"><span className="material-icons">edit</span></button>
                                    <button data-target="modal1" className="btn btn-secondary modal-trigger ml-2"><span className="material-icons">delete</span></button>
                                </div>
                            }
                            <h4>Email:{userData.email}</h4>
                            <h4>Bio:{userData.bio}</h4>
                            <br />
                            <hr />
                            <br />
                            <div className="section-title">
                                <h2>My blogs ...</h2>
                            </div>
                            <QuadWidthCont blogs={blogs} />
                        </div>
                    </div>
                </div>
                {getmodal()}
                {updateUser()}
            </div>

        </>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await Axios.get(`${baseUrl}/api/user/${id}`)
    const userData = res.data
    const res2 = await Axios.get(`${baseUrl}/api/blogs`)
    const blogs = res2.data
    return {
        props: {
            userData,
            blogs
        }
    }
}

export default user

