import React from 'react'
import Axios from 'axios'
import baseUrl from '../helpers/baseUrl'
import Corousel from '../components/corousel'
import FullWidthCont from '../components/fullWidthCont'
import HalfWidthCont from '../components/halfWidthCont'
import QuadWidthCont from '../components/quadWidthCont'
import Writers from '../components/writers'

export default function Home({ blogs, users }) {
    return (
        <>
            <Corousel />
            <div className="container">
                <div className="section-title">
                    <h2>Recent Blogs</h2>
                </div>
            </div>
            <QuadWidthCont blogs={blogs} />
            <FullWidthCont blogs={blogs} />
            <Writers writers={users} />
            <HalfWidthCont blogs={blogs} />
        </>
    )
}

export async function getStaticProps() {
    const res = await Axios.get(`${baseUrl}/api/blogs`)
    const blogs = res.data
    const res2 = await Axios.get(`${baseUrl}/api/users`)
    const users = res2.data
    return {
        props: {
            blogs,
            users
        }
    }
}