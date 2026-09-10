import { Container } from ".."
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa"
import { AiFillMail } from "react-icons/ai"
import socialsData from "../../data/socials.json"
const { socials } = socialsData

const LINKS = [
    { key: "github", icon: <FaGithub />, label: "GitHub" },
    { key: "linkedin", icon: <FaLinkedin />, label: "LinkedIn" },
    { key: "email", icon: <AiFillMail />, label: "Email" },
    { key: "facebook", icon: <FaFacebook />, label: "Facebook" },
]

export default function Footer() {
    return (
        <footer id="footer" className="w-full bg-dark-300 border-t border-line-100 pt-[40px] pb-[110px] px-3 md:pb-[40px]">
            <Container>
                <div className="w-full flex flex-row items-center justify-between gap-5 flex-wrap">
                    <div className="flex flex-col gap-[5px]">
                        <p className="mono text-[13px] text-white-100 font-bold">Maniraj Yadav</p>
                        <p className="mono text-[11px] text-white-300">
                            &copy; {new Date().getFullYear()} — built with Next.js
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-[9px]">
                        {LINKS.map(({ key, icon, label }) =>
                            socials[key] ? (
                                <a
                                    key={key}
                                    href={key === "email" ? `mailto:${socials[key]}` : socials[key]}
                                    target={key === "email" ? undefined : "_blank"}
                                    rel="noreferrer"
                                    aria-label={label}
                                    title={label}
                                    className="w-[36px] h-[36px] flex items-center justify-center rounded-[7px] border border-line-100 text-white-200 transition-all hover:text-green-200 hover:border-green-500 hover:bg-green-600"
                                >
                                    {icon}
                                </a>
                            ) : null
                        )}
                    </div>
                </div>
            </Container>
        </footer>
    )
}
