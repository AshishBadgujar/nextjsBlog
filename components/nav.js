import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()
    const cookieUser = parseCookies()
    const navRef = useRef(null)
    const user = cookieUser.blogUser ? JSON.parse(cookieUser.blogUser) : ""
    useEffect(() => {
        M.Sidenav.init(navRef.current);
    }, [])
    return (
        <>
            <div className="container">
                <nav className="z-depth-0">
                    <div className="nav-wrapper #fafafa grey lighten-5">
                        <ul className="hide-on-med-and-down">
                            <li><Link href="/"><a className="text-left">Home</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Politics`}><a className="text-left">Politics</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Business`}><a className="text-left">Business</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Health`}><a className="text-left">Health</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Design`}><a className="text-left">Design</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Sport`}><a className="text-left">Sport</a></Link></li>
                            <li><Link href="/category/[cat]" as={`/category/Technology`}><a className="text-left">Technology</a></Link></li>
                        </ul>
                        <ul className="hide-on-med-and-down right">
                            {user ?
                                <>
                                    <li><Link href="/create"><a className="text-left">Write</a></Link></li>
                                    <li><Link href="/user/[id]" as={`/user/${user._id}`}><a className="text-left">{user.name}</a></Link></li>
                                    <li><a className="text-left" onClick={() => {
                                        cookie.remove('blogToken')
                                        cookie.remove('blogUser')
                                        router.push('/login')
                                    }}>logout</a></li>
                                </>
                                :
                                <>
                                    <li><Link href="/login"><a className="text-left">Login</a></Link></li>
                                    <li><Link href="/signup"><a className="text-left">Signup</a></Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
            <ul className="sidenav ml-4" id="mobile-demo" ref={navRef}>
                <li><Link href="/search"><a className="text-left right"> <button className="btn btn-secondary"><span className="icon-search"></span></button></a></Link></li>
                <li><Link href="/"><a className="text-left">Home</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Politics`}><a className="text-left">Politics</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Business`}><a className="text-left">Business</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Health`}><a className="text-left">Health</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Design`}><a className="text-left">Design</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Sport`}><a className="text-left">Sport</a></Link></li>
                <li><Link href="/category/[cat]" as={`/category/Technology`}><a className="text-left">Technology</a></Link></li>
                {user ?
                    <>
                        <hr />
                        <li><Link href="/create"><a className="text-left">Write</a></Link></li>
                        <li><Link href="/user/[id]" as={`/user/${user._id}`}><a className="nav-link text-left">{user.name}</a></Link></li>
                        <li><a className="nav-link text-left" onClick={() => {
                            cookie.remove('blogToken')
                            cookie.remove('blogUser')
                            router.push('/login')
                        }}>logout</a></li>
                    </>
                    :
                    <>
                        <hr />
                        <li><Link href="/signup"><a className="text-left">Signup</a></Link></li>
                        <li><Link href="/login"><a className="text-left bottom">Login</a></Link></li>
                    </>
                }
            </ul>
        </>
    )
}
