import React from 'react'
import Navbar from './nav'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className="header-top mt-3">
                <div className="container pb-1">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6 d-flex">
                            <Link href="/"><img src="http://res.cloudinary.com/ashish124/image/upload/v1604224435/dtnuyfrxpnlg1ksmwycw.png" alt="" style={{ height: '100px' }} /></Link>
                            <a data-target="mobile-demo" className="sidenav-trigger ml-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black right"><span
                                className="icon-menu h3"></span></a>
                        </div>
                        <div className="col-12 col-lg-6 ml-auto d-flex">
                            <div className="ml-md-auto top-social d-none d-lg-inline-block">
                                <a href="#" className="d-inline-block p-3"><span className="icon-facebook"></span></a>
                                <a href="#" className="d-inline-block p-3"><span className="icon-twitter"></span></a>
                                <a href="#" className="d-inline-block p-3"><span className="icon-instagram"></span></a>
                                <Link href="/search"><a className="text-left right"> <button className="btn btn-secondary"><span className="icon-search"></span></button></a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    )
}
