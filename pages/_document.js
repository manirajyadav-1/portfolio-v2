import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
    render() {
        return (
            // "no-js" is removed by _app once React mounts; CSS uses it to keep
            // scroll-reveal content visible when JS never runs.
            <Html lang="en" className="no-js">
                <Head>
                    <link rel="preconnect" href="https://api.github.com" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
