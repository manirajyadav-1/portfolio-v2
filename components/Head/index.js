import Head from 'next/head'

export default function DomHead({ pageName = "Home Page" }) {

    return (
        <Head>
            <title>Maniraj Yadav -{pageName} </title>
            {/* meta tags end
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> */}
        </Head>
    )
}

