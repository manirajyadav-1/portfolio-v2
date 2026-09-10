import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import socialsData from "../../data/socials.json"
const { socials } = socialsData
import { Leetcode } from "../../public/images/content"

const NAV = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "#contact", label: "contact" },
]

function NavBar() {
    return (
        <nav className="navbar relative w-full flex items-center justify-between py-[22px] px-[10px]">
            <div className="flex items-center gap-[26px]">
                <Link href="/">
                    <a className="mono text-[15px] font-bold tracking-tight">
                        maniraj<span className="text-green-200">.</span>
                    </a>
                </Link>

                <ul className="hidden md:flex items-center gap-[22px]">
                    {NAV.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href}>
                                <a className="mono text-[12.5px] text-white-200 transition-colors hover:text-green-200">
                                    {item.label}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hidden md:flex items-center gap-[8px]">
                {socials.github && (
                    <IconLink href={socials.github} label="GitHub"><FaGithub /></IconLink>
                )}
                {socials.leetcode && (
                    <IconLink href={socials.leetcode} label="LeetCode"><Leetcode /></IconLink>
                )}
                {socials.linkedin && (
                    <IconLink href={socials.linkedin} label="LinkedIn"><FaLinkedin /></IconLink>
                )}
            </div>
        </nav>
    )
}

function IconLink({ href, label, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-[7px] border border-line-100 text-white-200 text-[15px] transition-all hover:text-green-200 hover:border-green-500 hover:bg-green-600"
        >
            {children}
        </a>
    )
}

export default NavBar

export function ResponsiveNavbar({ activePage, pageName = "" }) {
    const [active, setActive] = useState(activePage || "home")

    const items = [
        { name: "home", icon: "home-outline", href: "/" },
        { name: "projects", icon: "cube-outline", href: pageName === "" ? "#projects" : "/#projects" },
        { name: "about", icon: "person-outline", href: pageName === "" ? "#about" : "/#about" },
        { name: "contact", icon: "mail-outline", href: pageName === "" ? "#contact" : "/#contact" },
    ]

    return (
        <div className="mobileNav">
            <div className="main">
                {items.map((item) => (
                    <li
                        key={item.name}
                        className={active === item.name ? "active" : "li"}
                        onClick={() => setActive(item.name)}
                    >
                        <Link href={item.href}>
                            <ion-icon name={item.icon} class="icon" />
                        </Link>
                        <label className="label">{item.name}</label>
                    </li>
                ))}
            </div>
        </div>
    )
}
