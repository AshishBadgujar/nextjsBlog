import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import baseUrl from '../helpers/baseUrl'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, email, password, bio)
        await Axios.post(`${baseUrl}/api/signup`, {
            name,
            email,
            password,
            bio
        }).then(res => {
            console.log(res.data)
            if (res.data.message) {
                M.toast({ html: res.data.message, classes: '#00e676 green accent-3 rounded' })
                router.push('/login')
            }
            if (res.data.err) {
                M.toast({ html: res.data.err, classes: 'red rounded' })
            }
        })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="site-section bg-light">
            <div className="container">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="section-title mt-4">
                        <h2>Signup here !</h2>
                    </div>
                    <div className="input-field">
                        <input id="first_name" type="text" onChange={(e) => setName(e.target.value)} className="validate" />
                        <label htmlFor="first_name">Name</label>
                    </div>
                    <div className="input-field">
                        <input id="email_inline" type="email" onChange={(e) => setEmail(e.target.value)} className="validate" />
                        <label htmlFor="email_inline">Email</label>
                        <span className="helper-text" data-error="wrong" data-success="right">We will not share your email with anyone!</span>
                    </div>
                    <div className="input-field">
                        <textarea id="textarea" value={bio} onChange={(e) => setBio(e.target.value)} className="materialize-textarea"></textarea>
                        <label htmlFor="textarea">Bio</label>
                    </div>
                    <div className="input-field">
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-secondary mt-2" type="submit" >submit</button>
                </form>
            </div>
        </div>
    )
}
