import Head from "next/head"
import Header from "./header";
import Footer from "./footer";
import { parseCookies } from "nookies";

export default function Layout(props) {
    const cookieUser = parseCookies()
    const user = cookieUser.blogUser ? JSON.parse(cookieUser.blogUser) : ""
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=B612+Mono|Cabin:400,700&display=swap" rel="stylesheet" />
            </Head>

            <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
                <div className="site-wrap">
                    <Header />
                    {props.children}
                    {user ?
                        <Footer />
                        : null}
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}
