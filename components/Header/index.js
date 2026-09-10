import { useState, useEffect } from "react"
import { Container } from ".."
import usersInfo from "../../data/usersInfo.json"
import languages from "../../data/languages.json"
import stackData from "../../data/stack.json"
const { stack } = stackData
import experienceData from "../../data/experience.json"
const { experience } = experienceData

// Years in industry, derived from the earliest real role rather than a
// hardcoded year -- so it stays honest without anyone editing it.
function yearsBuilding() {
    const starts = experience.map((e) => e.startDate).filter(Boolean).sort()
    if (starts.length === 0) return null
    const [y, m] = starts[0].split("-").map(Number)
    const months = (new Date().getFullYear() - y) * 12 + (new Date().getMonth() + 1 - m)
    return Math.max(1, Math.floor(months / 12))
}

const FALLBACK_LOGO = "https://www.vectorlogo.zone/logos/java/java-icon.svg"

const logoAt = (i) => languages.languages[i] || FALLBACK_LOGO

// Space however many logos there are evenly around the rim, starting at the
// top-right. Adding or removing one in languages.json just re-balances.
function rimPositions(n) {
    const start = 45 // degrees, top-right
    return Array.from({ length: n }, (_, i) => {
        const rad = ((start - (360 / n) * i) * Math.PI) / 180
        return {
            left: +(50 + 50 * Math.cos(rad)).toFixed(3),
            top: +(50 - 50 * Math.sin(rad)).toFixed(3),
        }
    })
}
const rim = rimPositions(languages.languages.length)

// Types `text` out, holds, deletes it, and repeats -- forever.
// Renders the full string statically when the viewer prefers reduced motion.
function useTypewriter(text, {
    typeSpeed = 75,
    deleteSpeed = 38,
    holdFull = 1900,   // pause with the whole word showing
    holdEmpty = 550,   // pause before typing it again
    startDelay = 400,
} = {}) {
    const [out, setOut] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setOut(text)
            return
        }

        let i = 0
        let deleting = false
        let timer

        const tick = () => {
            if (deleting) {
                i -= 1
                setOut(text.slice(0, i))
                if (i <= 0) {
                    deleting = false
                    timer = setTimeout(tick, holdEmpty)
                    return
                }
            } else {
                i += 1
                setOut(text.slice(0, i))
                if (i >= text.length) {
                    deleting = true
                    timer = setTimeout(tick, holdFull)
                    return
                }
            }
            timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed)
        }

        timer = setTimeout(tick, startDelay)
        return () => clearTimeout(timer)
    }, [text, typeSpeed, deleteSpeed, holdFull, holdEmpty, startDelay])

    return out
}

export default function Header({ children }) {

    const [resumeActive, setResumeActive] = useState(false)
    const [reposcount, setReposCount] = useState(null)
    const [avatar, setAvatar] = useState("")

    const userName = usersInfo.github_username
    const years = yearsBuilding()
    const typedRole = useTypewriter(usersInfo.user_skill)

    function openResume() {
        setResumeActive(!resumeActive)
    }

    async function getReposCount() {
        try {
            if (localStorage.getItem("repo_counts") === null) {
                const res = await fetch(`https://api.github.com/users/${userName}`)
                const data = await res.json()
                if (data && data.public_repos !== undefined) {
                    localStorage.setItem("repo_counts", JSON.stringify(data.public_repos))
                    localStorage.setItem("github_avatar", JSON.stringify(data.avatar_url))
                }
            }
            setReposCount(JSON.parse(localStorage.getItem("repo_counts")))
            setAvatar(JSON.parse(localStorage.getItem("github_avatar")))
        } catch (err) {
            console.error("github profile fetch failed:", err.message)
        }
    }

    useEffect(() => { getReposCount() }, [])

    return (
        <header className="header gridbg w-full h-auto relative bg-dark-400 border-b border-line-100">
            <Container>
                {children}

                <div className="w-full flex flex-row items-center justify-center flex-wrap gap-10 pt-[40px] pb-[90px] px-[20px] md:pt-[60px] md:pb-[120px]">

                    {/* ---------------- left: identity ---------------- */}
                    <div className="w-full relative md:w-[52%]">

                        {/* role, typed out, sitting above the name */}
                        <p data-aos="fade-up" className="mono text-[14px] text-green-200 mb-[14px] min-h-[1.5em] flex items-center">
                            <span className="sr-only">{usersInfo.user_skill}</span>
                            <span aria-hidden="true">{typedRole}</span>
                            <span className="caret ml-[3px]" />
                        </p>

                        <h1 data-aos="fade-right" className="text-[clamp(38px,7vmin,68px)] leading-[1.05] font-bold tracking-tight mb-[14px]">
                            {usersInfo.full_name}
                        </h1>

                        <div data-aos="fade-right" className="flex items-center gap-3 mb-[26px] flex-wrap">
                            <span className="mono text-[13px] px-[10px] py-[5px] rounded-[5px] bg-green-400 text-green-200 border border-green-500">
                                {usersInfo.role}
                            </span>
                            <span className="mono text-[13px] text-white-200">
                                {usersInfo.focus_line}
                            </span>
                        </div>

                        <p data-aos="fade-up" className="text-[15px] leading-[1.75] text-white-200 max-w-[54ch] mb-[32px]">
                            {usersInfo.hero_desc}
                        </p>

                        {/* metrics strip */}
                        <div data-aos="fade-up" className="grid grid-cols-3 mb-[34px] border border-line-100 rounded-[9px] overflow-hidden bg-dark-100 w-full max-w-[440px]">
                            <Metric value={`${years}+`} label="years building" />
                            <Metric value={reposcount === null ? "--" : `${reposcount}`} label="public repos" divider />
                            <Metric value={`${stack.reduce((n, g) => n + g.items.length, 0)}`} label="technologies" divider />
                        </div>

                        <div data-aos="fade-up" className="flex flex-row items-center gap-3 flex-wrap">
                            <button className="btn btn-primary" onClick={openResume}>
                                <span>view resume</span>
                            </button>
                            <a href="#projects" className="btn btn-ghost">
                                <span>./projects</span>
                            </a>
                        </div>

                        {resumeActive && <ResumeViewer openResume={openResume} />}
                    </div>

                    {/* ---------------- right: avatar ---------------- */}
                    <div data-aos="fade-left" className="main avatarCol w-full h-auto hidden md:block md:w-[40%] relative">
                        <div
                            className="img-cont relative rounded-[50%]"
                            style={{ "--avatar": avatar ? `url("${avatar}")` : "none" }}
                        >
                            {rim.map((pos, i) => (
                                <div
                                    key={i}
                                    data-aos={["fade-up", "fade-left", "fade-down", "fade-right"][i % 4]}
                                    data-aos-delay={i * 90}
                                    className="orbit"
                                >
                                    <img
                                        src={logoAt(i)}
                                        alt=""
                                        className="langImg"
                                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

function Metric({ value, label, divider }) {
    return (
        <div className={`px-[12px] py-[15px] md:px-[18px] ${divider ? "border-l border-line-100" : ""}`}>
            <p className="mono text-[22px] leading-none text-green-200 mb-[7px] md:text-[24px]">{value}</p>
            <p className="mono text-[9.5px] uppercase tracking-[.1em] leading-[1.4] text-white-300 md:text-[10px]">{label}</p>
        </div>
    )
}

function ResumeViewer({ openResume }) {

    // While the viewer is open, freeze the page behind it -- otherwise
    // scrolling scrolls the hero underneath and the sections bleed through.
    useEffect(() => {
        const html = document.documentElement
        const { body } = document
        // <html> is the scrolling element here, so locking <body> alone does
        // nothing -- the page kept scrolling behind the modal.
        const prev = {
            htmlOverflow: html.style.overflow,
            bodyOverflow: body.style.overflow,
            bodyPad: body.style.paddingRight,
        }
        // compensate for the vanishing scrollbar so nothing shifts sideways
        const gap = window.innerWidth - html.clientWidth
        html.style.overflow = "hidden"
        body.style.overflow = "hidden"
        if (gap > 0) body.style.paddingRight = `${gap}px`

        const onKey = (e) => { if (e.key === "Escape") openResume() }
        window.addEventListener("keydown", onKey)

        return () => {
            html.style.overflow = prev.htmlOverflow
            body.style.overflow = prev.bodyOverflow
            body.style.paddingRight = prev.bodyPad
            window.removeEventListener("keydown", onKey)
        }
    }, [openResume])

    function downloadCv() {
        let link = document.createElement("a")
        link.href = "/CV/resume.pdf"
        link.download = "resume.pdf"
        link.click()
    }

    return (
        <div
            className="fixed inset-0 w-screen h-screen bg-dark-500 backdrop-blur-sm z-[10000] flex items-center justify-center p-3"
            onClick={openResume}
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
        >
            <div
                className="w-full h-[94%] mx-auto bg-dark-300 overflow-hidden rounded-[10px] border border-line-100 flex flex-col md:w-[72%]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full p-3 bg-dark-100 border-b border-line-100 flex items-center gap-3">
                    <span className="dots"><i /><i /><i /></span>
                    <h2 className="mono text-[13px] text-white-200 ml-1">resume.pdf</h2>
                    <div className="ml-auto flex gap-2">
                        <button className="btn btn-primary !py-[7px] !px-[13px] !text-[12px]" onClick={downloadCv}>download</button>
                        <button className="btn btn-ghost !py-[7px] !px-[13px] !text-[12px]" onClick={openResume}>close</button>
                    </div>
                </div>
                <iframe src="/CV/resume.pdf" title="Resume" className="w-full flex-1 bg-white-100" />
            </div>
        </div>
    )
}
