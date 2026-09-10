import Section from "../Section"
import stackData from "../../data/stack.json"
const { stack } = stackData

export default function Stack({ index = 2 }) {
    return (
        <Section
            id="stack"
            index={index}
            label="Stack"
            title="What I build with"
            desc="Grouped by where it sits in the system rather than by how well I know it — the backend column is where I spend most of my time."
        >
            <div className="w-full grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
                {stack.map((group, i) => (
                    <div
                        key={group.group}
                        data-aos="fade-up"
                        data-aos-delay={i * 60}
                        className="pane p-[20px] flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-[16px]">
                            <h3 className="mono text-[13px] text-green-200">{group.group}</h3>
                            <span className="mono text-[11px] text-white-300">
                                {String(group.items.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="flex flex-row flex-wrap gap-[7px]">
                            {group.items.map((item) => (
                                <span key={item} className="chip">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
