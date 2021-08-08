import "antd/dist/antd.css";
import LayoutComponent from "components/LayoutComponent";
import Head from "next/head";
import 'styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta> */}
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  );
}

export default MyApp;
