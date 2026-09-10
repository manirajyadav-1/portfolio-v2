import Link from "next/link"
import Section from "../Section"
import usersInfo from "../../data/usersInfo.json"

export default function Intro({ index = 1 }) {
    return (
        <Section id="about" index={index} label="Profile">
            <div className="w-full flex flex-row items-start justify-between gap-[36px] flex-wrap">

                {/* narrative */}
                <div className="w-full md:w-[54%]">
                    <h2 data-aos="fade-up" className="text-[clamp(26px,4vmin,36px)] font-bold tracking-tight mb-[20px]">
                        {usersInfo.greeting_type} I&apos;m {usersInfo.full_name.split(" ")[0]}.
                    </h2>

                    <p
                        data-aos="fade-up"
                        className="text-[14px] leading-[1.7] text-white-200 pl-[16px] border-l-2 border-green-200 mb-[22px]"
                    >
                        {usersInfo.intro_tagline}
                    </p>

                    {usersInfo.bio_desc.map((bio, i) => (
                        <p key={i} data-aos="fade-up" className="text-[14px] leading-[1.8] text-white-200 mb-[16px]">
                            {bio}
                        </p>
                    ))}

                    <Link href="/about">
                        <a data-aos="fade-up" className="mono text-[12px] text-green-200 hover:text-green-100">
                            read more &rarr;
                        </a>
                    </Link>
                </div>

                {/* focus areas, as a terminal pane */}
                <div data-aos="fade-left" className="w-full md:w-[40%]">
                    <div className="pane overflow-hidden">
                        <div className="flex items-center gap-3 px-[15px] py-[10px] border-b border-line-100 bg-dark-200">
                            <span className="dots"><i /><i /><i /></span>
                            <span className="mono text-[11.5px] text-white-300 ml-1">focus.json</span>
                        </div>
                        <pre className="mono text-[12px] leading-[1.85] p-[16px] overflow-x-auto text-white-200">
                            <span className="text-white-300">{"{"}</span>{"\n"}
                            {"  "}<span className="text-green-200">&quot;role&quot;</span>: <span className="text-white-100">&quot;{usersInfo.user_skill}&quot;</span>,{"\n"}
                            {"  "}<span className="text-green-200">&quot;focus&quot;</span>: [{"\n"}
                            {usersInfo.focus.map((f, i) => (
                                <span key={f}>
                                    {"    "}<span className="text-white-100">&quot;{f}&quot;</span>
                                    {i < usersInfo.focus.length - 1 ? "," : ""}{"\n"}
                                </span>
                            ))}
                            {"  "}],{"\n"}
                            {"  "}<span className="text-green-200">&quot;open_to&quot;</span>: <span className="text-white-100">&quot;{usersInfo.open_to}&quot;</span>{"\n"}
                            <span className="text-white-300">{"}"}</span>
                        </pre>
                    </div>
                </div>
            </div>
        </Section>
    )
}
