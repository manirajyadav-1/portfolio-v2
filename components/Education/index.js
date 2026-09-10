import Section from "../Section"
import Timeline, { TimelineItem, TimelineHead } from "../Timeline"
import educationData from "../../data/education.json"
const { education, certifications } = educationData

export default function Education({ index = 4 }) {
    return (
        <Section id="education" index={index} label="Education" title="Where I studied">
            <Timeline>
                {education.map((e, i) => (
                    <TimelineItem key={e.school} active={i === 0} pulse={false} delay={i * 80}>
                        <TimelineHead title={e.school} meta={`${e.start} — ${e.end}`} />

                        <p className="mono text-[12px] text-green-200 mb-[14px]">{e.degree}</p>

                        {e.grade && <span className="chip">{e.grade}</span>}
                    </TimelineItem>
                ))}
            </Timeline>

            {certifications && certifications.length > 0 && (
                <div className="w-full mt-[26px] sm:pl-[38px]">
                    <p className="mono text-[11px] uppercase tracking-[.16em] text-white-300 mb-[12px]">
                        Certifications
                    </p>
                    <div className="flex flex-row flex-wrap gap-[10px]">
                        {certifications.map((c) => (
                            <div
                                key={c.name}
                                data-aos="fade-up"
                                className="pane px-[16px] py-[12px] flex items-center gap-[11px]"
                            >
                                <span className="mono text-green-200 text-[13px]">✓</span>
                                <span className="text-[13.5px] text-white-100">{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    )
}
