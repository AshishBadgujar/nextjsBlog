import '../public/styles.css'
import "../public/fonts/icomoon/style.css"
import "../public/css/bootstrap.min.css"
import "../public/css/jquery.fancybox.min.css"
import "../public/css/bootstrap-datepicker.css"
import "../public/fonts/flaticon/font/flaticon.css"
import "../public/css/aos.css"
import "../public/css/style.css"
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}