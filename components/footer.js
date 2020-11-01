import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="site-section subscribe bg-light">
                <div className="container">
                    <form action="#" className="row align-items-center">
                        <div className="col-md-5 mr-auto">
                            <h2>About us</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis aspernatur ut at quae omnis pariatur obcaecati possimus nisi ea iste!</p>
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="d-flex">
                                <input type="email" className="form-control" placeholder="Enter your email" />
                                <button type="submit" className="btn btn-secondary" ><span className="icon-paper-plane"></span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="footer">
                <div className="container mb-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="copyright">
                                <p>
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a target="_blank" >Ashish</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
