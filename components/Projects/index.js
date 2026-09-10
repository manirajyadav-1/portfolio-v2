import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStar, FaCodeBranch, FaArrowRight } from "react-icons/fa"

import Section from "../Section"
import projectsData from "../../data/projects.json"
const { projects } = projectsData
import userInfo from "../../data/usersInfo.json"

const REPO_CACHE_KEY = "user_repos"

// Shared fetch: cache under ONE key so we stop burning the 60/hr anon limit.
export async function loadRepos(sort = "?sort=created&direction=desc") {
    const cached = localStorage.getItem(REPO_CACHE_KEY)
    if (cached) return JSON.parse(cached)

    const res = await fetch(`https://api.github.com/users/${userInfo.github_username}/repos${sort}`)
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error("Unexpected response from GitHub")

    localStorage.setItem(REPO_CACHE_KEY, JSON.stringify(data))
    return data
}

function Projects({ index = 5 }) {
    return (
            <Section
                id="projects"
                index={index}
                label="Selected Work"
                title="Things I've built"
                desc="Mostly Spring Boot services with a React surface on top. Each one solved a problem I actually had."
                action={
                    <Link href="/projects">
                        <a data-aos="fade-up" className="mono text-[12px] text-green-200 flex items-center gap-2 hover:text-green-100">
                            all projects <FaArrowRight className="text-[10px]" />
                        </a>
                    </Link>
                }
            >
                <div className="w-full grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
                    {projects.slice(0, 6).map((p, i) => (
                        <ProjectCard key={p.title} project={p} delay={i * 60} />
                    ))}
                </div>
            </Section>

    )
}

export default Projects

export function ProjectCard({ project, delay = 0 }) {
    const { title, description, imageUrl, project_url, tags } = project

    return (
        <a
            href={project_url || "#"}
            target="_blank"
            rel="noreferrer"
            data-aos="fade-up"
            data-aos-delay={delay}
            className="pane group flex flex-col overflow-hidden hover:-translate-y-[3px]"
        >
            {/* thumbnail */}
            <div className="w-full h-[168px] bg-dark-200 border-b border-line-100 overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover object-top opacity-[.78] transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center mono text-[12px] text-white-300">
                        no preview
                    </div>
                )}
            </div>

            <div className="p-[18px] flex flex-col flex-1">
                <h3 className="text-[16px] font-bold mb-[9px] transition-colors group-hover:text-green-200">
                    {title || "Untitled project"}
                </h3>

                <p className="text-[13px] leading-[1.65] text-white-200 mb-[16px] flex-1">
                    {description}
                </p>

                <div className="flex flex-row flex-wrap gap-[6px]">
                    {(tags || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                    ))}
                </div>
            </div>
        </a>
    )
}

export function RepoGrid({ repos, loading, error, limit = 6 }) {
    if (loading) {
        return (
            <div className="w-full grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="pane p-[20px] h-[150px] animate-pulse">
                        <div className="w-1/2 h-[13px] bg-line-100 rounded mb-[14px]" />
                        <div className="w-full h-[10px] bg-line-100 rounded mb-[8px]" />
                        <div className="w-3/4 h-[10px] bg-line-100 rounded" />
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <p className="mono text-[13px] text-white-200 border border-line-100 rounded-[9px] p-[18px] bg-dark-100">
                <span className="text-red-200">!</span> Couldn&apos;t reach GitHub — {error}
            </p>
        )
    }

    if (!repos || repos.length === 0) {
        return <p className="mono text-[13px] text-white-300">No public repositories found.</p>
    }

    return (
        <div className="w-full grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, limit).map((repo, i) => (
                <a
                    key={repo.id || repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                    className="pane group p-[20px] flex flex-col hover:-translate-y-[3px]"
                >
                    <div className="flex items-start justify-between gap-3 mb-[10px]">
                        <h3 className="mono text-[14px] text-white-100 break-all transition-colors group-hover:text-green-200">
                            {repo.name}
                        </h3>
                        <FaArrowRight className="text-[11px] text-white-300 shrink-0 mt-[4px] transition-all group-hover:text-green-200 group-hover:-rotate-45" />
                    </div>

                    <p className="text-[13px] leading-[1.6] text-white-200 flex-1 mb-[16px]">
                        {repo.description || <span className="text-white-300 italic">No description.</span>}
                    </p>

                    <div className="flex flex-row items-center gap-[16px] mono text-[11px] text-white-300">
                        {repo.language && (
                            <span className="flex items-center gap-[6px]">
                                <i className="w-[8px] h-[8px] rounded-full bg-green-200 inline-block" />
                                {repo.language}
                            </span>
                        )}
                        <span className="flex items-center gap-[5px]">
                            <FaStar className="text-[10px]" /> {repo.stargazers_count ?? 0}
                        </span>
                        <span className="flex items-center gap-[5px]">
                            <FaCodeBranch className="text-[10px]" /> {repo.forks ?? 0}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    )
}
