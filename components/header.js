import React from 'react'
import Navbar from './nav'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <>
            <div className="header-top">
                <div className="container">
                    <div className="row align-items-center m-0">
                        <div className="col-12 col-lg-6 d-flex">
                            <Link href="/"><Image src="http://res.cloudinary.com/ashish124/image/upload/v1604224435/dtnuyfrxpnlg1ksmwycw.png" alt="brand-logo" width={290} height={100} /></Link>
                            <a data-target="mobile-demo" className="sidenav-trigger ml-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black right"><span
                                className="icon-menu h3"></span></a>
                        </div>
                        <div className="col-12 col-lg-6 ml-auto d-flex">
                            <div className="ml-md-auto top-social d-flex align-items-center">
                                <a href="#" className="d-inline-block p-3"><span className="icon-facebook"></span></a>
                                <a href="#" className="d-inline-block p-3"><span className="icon-twitter"></span></a>
                                <a href="#" className="d-inline-block p-3"><span className="icon-instagram"></span></a>
                                <Link href="/search"><a className="text-left right"> <button className="btn btn-secondary"><span className="icon-search"></span></button></a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="m-0" />
                <Navbar />
            </div>
        </>
    )
}
