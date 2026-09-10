import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Aos from 'aos'
import { FaArrowLeft } from 'react-icons/fa'
import { Container, DomHead, Footer, NavBar, Section } from "../components"
import { ResponsiveNavbar } from '../components/Navbar'
import { ProjectCard, RepoGrid, loadRepos } from '../components/Projects'
import projectsData from "../data/projects.json"
const { projects } = projectsData

export default function ProjectsPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        Aos.init({ duration: 700, once: true, offset: 60 })
        const onResize = () => setIsMobile(window.innerWidth <= 700)
        onResize()
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    useEffect(() => {
        (async () => {
            try { setRepos(await loadRepos("")) }
            catch (err) { setError(err.message) }
            finally { setLoading(false) }
        })()
    }, [])

    return (
        <div className="w-full min-h-screen">
            <DomHead pageName="Projects" />
            <Container><NavBar /></Container>

            <PageHead
                title="Projects"
                sub="Everything I've shipped, plus what's live on GitHub."
            />

            <Container>
                <Section index={1} label="Personal Projects" title="Built end to end">
                    <div className="w-full grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p, i) => (
                            <ProjectCard key={p.title} project={p} delay={i * 50} />
                        ))}
                    </div>
                </Section>

                <Section index={2} label="Open Source" title="GitHub repositories">
                    <RepoGrid repos={repos} loading={loading} error={error} limit={12} />
                </Section>
            </Container>

            <Footer />
            {isMobile && <ResponsiveNavbar pageName="projects" />}
        </div>
    )
}

export function PageHead({ title, sub }) {
    return (
        <div className="w-full bg-dark-300 border-y border-line-100 gridbg">
            <Container>
                <div className="py-[54px] px-[18px] md:py-[70px]">
                    <Link href="/">
                        <a className="mono text-[12px] text-white-200 inline-flex items-center gap-2 mb-[22px] transition-colors hover:text-green-200">
                            <FaArrowLeft className="text-[11px]" /> back
                        </a>
                    </Link>
                    <h1 className="text-[clamp(30px,6vmin,50px)] font-bold tracking-tight mb-[10px]">{title}</h1>
                    <p className="mono text-[13px] text-white-300">{sub}</p>
                </div>
            </Container>
        </div>
    )
}
