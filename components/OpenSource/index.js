import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import Section from "../Section"
import { RepoGrid, loadRepos } from "../Projects"
import userInfo from "../../data/usersInfo.json"

export default function OpenSource({ index = 6, limit = 6 }) {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try { setRepos(await loadRepos()) }
            catch (err) { setError(err.message) }
            finally { setLoading(false) }
        })()
    }, [])

    return (
        <Section
            id="opensource"
            index={index}
            label="Open Source"
            title="Latest from GitHub"
            desc="Pulled live from the GitHub API, newest first."
            action={
                <a
                    href={`https://github.com/${userInfo.github_username}`}
                    target="_blank" rel="noreferrer"
                    data-aos="fade-up"
                    className="mono text-[12px] text-green-200 flex items-center gap-2 hover:text-green-100"
                >
                    @{userInfo.github_username} <FaArrowRight className="text-[10px]" />
                </a>
            }
        >
            <RepoGrid repos={repos} loading={loading} error={error} limit={limit} />
        </Section>
    )
}
