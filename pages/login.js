import React, { useState } from 'react'
import Axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await Axios.post(`${baseUrl}/api/login`, {
            email,
            password: pw
        })
        if (res.data.err) {
            M.toast({ html: res.data.err, classes: "red" });
        } else {
            cookie.set('blogToken', res.data.token)
            cookie.set('blogUser', res.data.user)
            M.toast({ html: `you are successfully logged in !`, classes: "#00e676 green accent-3 rounded" });
            router.push('/')
        }
    }
    return (
        <div className="site-section bg-light">
            <div className="container">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="section-title mt-4">
                        <h2>Login here !</h2>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="email_inline" type="email" onChange={(e) => setEmail(e.target.value)} className="validate" />
                        <label htmlFor="email_inline">Email</label>
                        <span className="helper-text" data-error="wrong" data-success="right">We will not share your email with anyone!</span>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="password" type="password" onChange={(e) => setPw(e.target.value)} className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-secondary mt-2" type="submit" >submit</button>
                </form>
            </div>
        </div>
    )
}
