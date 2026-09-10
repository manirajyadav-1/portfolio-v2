import Head from 'next/head'
import userInfo from '../../data/usersInfo.json'

const DESCRIPTION =
    "Maniraj Yadav — backend engineer building Java and Spring Boot services, APIs and data models that stay correct under load."

export default function DomHead({ pageName = "" }) {
    const title = pageName
        ? `${pageName} · ${userInfo.full_name}`
        : `${userInfo.full_name} — ${userInfo.user_skill}`

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={DESCRIPTION} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#0b0c0e" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={DESCRIPTION} />
            <meta name="twitter:card" content="summary_large_image" />

            {/* ionicons powers the mobile bottom nav */}
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </Head>
    )
}
