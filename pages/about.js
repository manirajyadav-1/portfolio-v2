import React, { useState, useEffect } from 'react'
import Aos from 'aos'
import { Container, DomHead, Footer, NavBar, Section, Stack, Experience, Education } from "../components"
import { ResponsiveNavbar } from '../components/Navbar'
import { PageHead } from './projects'
import userInfo from "../data/usersInfo.json"
import socialsData from "../data/socials.json"
const { socials } = socialsData

export default function About() {
    const [isMobile, setIsMobile] = useState(false)
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        Aos.init({ duration: 700, once: true, offset: 60 })
        const onResize = () => setIsMobile(window.innerWidth <= 700)
        onResize()
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    useEffect(() => {
        try { setAvatar(JSON.parse(localStorage.getItem("github_avatar")) || "") }
        catch { /* no cached avatar yet */ }
    }, [])

    return (
        <div className="w-full min-h-screen">
            <DomHead pageName="About" />
            <Container><NavBar /></Container>

            <PageHead title="About" sub="Who I am and how I work." />

            <Container>
                <Section index={1} label="Profile">
                    <div className="w-full flex flex-row items-start justify-between gap-[36px] flex-wrap">
                        <div data-aos="fade-right" className="w-full md:w-[36%]">
                            <div
                                className="w-full h-[380px] bg-cover bg-center bg-no-repeat rounded-[11px] border border-line-100 bg-dark-100"
                                style={avatar ? { backgroundImage: `url(${avatar})` } : undefined}
                            />
                        </div>

                        <div className="w-full md:w-[58%]">
                            <h2 data-aos="fade-up" className="text-[clamp(24px,4vmin,34px)] font-bold tracking-tight mb-[20px]">
                                {userInfo.greeting_type} I&apos;m {userInfo.full_name}
                            </h2>

                            <p data-aos="fade-up" className="text-[14px] leading-[1.7] text-white-200 pl-[16px] border-l-2 border-green-200 mb-[22px]">
                                {userInfo.intro_tagline}
                            </p>

                            {userInfo.bio_desc.map((bio, i) => (
                                <p key={i} data-aos="fade-up" className="text-[14px] leading-[1.8] text-white-200 mb-[16px]">
                                    {bio}
                                </p>
                            ))}

                            {socials.email && (
                                <a href={`mailto:${socials.email}`} data-aos="fade-up" className="btn btn-ghost mt-[10px]">
                                    get in touch
                                </a>
                            )}
                        </div>
                    </div>
                </Section>

                <Stack index={2} />
                <Experience index={3} />
                <Education index={4} />
            </Container>

            <Footer />
            {isMobile && <ResponsiveNavbar pageName="about" />}
        </div>
    )
}
