import Section from "../Section"
import Timeline, { TimelineItem, TimelineHead } from "../Timeline"
import experienceData from "../../data/experience.json"
const { experience } = experienceData

export default function Experience({ index = 3 }) {
    if (!experience || experience.length === 0) return null

    return (
        <Section id="experience" index={index} label="Experience" title="Where I've worked">
            <Timeline>
                {experience.map((job, i) => (
                    <TimelineItem key={i} active={job.current} delay={i * 80}>
                        <TimelineHead title={job.role} meta={`${job.start} — ${job.end}`} />

                        <p className="mono text-[12px] text-green-200 mb-[14px]">
                            {job.company}
                            {job.location ? <span className="text-white-300"> · {job.location}</span> : null}
                        </p>

                        {job.summary && (
                            <p className="text-[14px] leading-[1.7] text-white-200 mb-[14px]">{job.summary}</p>
                        )}

                        {job.highlights && job.highlights.length > 0 && (
                            <ul className="mb-[16px] flex flex-col gap-[9px]">
                                {job.highlights.map((h, k) => (
                                    <li key={k} className="flex gap-[11px] text-[13.5px] leading-[1.65] text-white-200">
                                        <span className="mono text-green-200 shrink-0 mt-[1px]">▸</span>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {job.stack && job.stack.length > 0 && (
                            <div className="flex flex-row flex-wrap gap-[7px]">
                                {job.stack.map((s) => (
                                    <span key={s} className="chip">{s}</span>
                                ))}
                            </div>
                        )}
                    </TimelineItem>
                ))}
            </Timeline>
        </Section>
    )
}
