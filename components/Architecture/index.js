import Section from "../Section"
import architectureData from "../../data/architecture.json"
const arch = architectureData.architecture

/* Fan-out / fan-in laid out on a fixed viewBox. The SVG scales to its
   container and the wrapper scrolls horizontally on narrow screens. */
const BOX = { w: 150, h: 62 }
const POS = {
    req:     { x: 6,   y: 139 },
    handler: { x: 196, y: 139 },
    svcA:    { x: 400, y: 30  },
    svcB:    { x: 400, y: 139 },
    svcC:    { x: 400, y: 248 },
    join:    { x: 604, y: 139 },
    res:     { x: 794, y: 139 },
}
const cx = (n) => n.x + BOX.w / 2
const cy = (n) => n.y + BOX.h / 2
const ACCENT = new Set(["handler", "join"])

export default function Architecture({ index = 6 }) {
    if (!arch) return null

    // elbow from the handler out to a fanned service (and back in to the join)
    const fanOut = (to) =>
        `M ${POS.handler.x + BOX.w} ${cy(POS.handler)} H 350 V ${cy(to)} H ${to.x - 7}`
    const fanIn = (from) =>
        `M ${from.x + BOX.w} ${cy(from)} H 570 V ${cy(POS.join)} H ${POS.join.x - 7}`

    return (
        <Section
            id="architecture"
            index={index}
            label="Architecture"
            title={arch.tagline}
            desc={arch.description}
        >
            <div data-aos="fade-up" className="pane overflow-hidden">
                <div className="flex items-center gap-3 px-[16px] py-[11px] border-b border-line-100 bg-dark-200">
                    <span className="dots"><i /><i /><i /></span>
                    <span className="mono text-[12px] text-white-300 ml-1">{arch.project}</span>
                </div>

                <div className="w-full overflow-x-auto p-[18px] md:p-[26px]">
                    <svg
                        viewBox="0 0 960 340"
                        role="img"
                        aria-label="A request enters a Gin handler, which fans out three concurrent goroutines to the inventory, pricing and rewards services. Their results are joined with an errgroup and returned as one aggregated response, so total latency equals the slowest call rather than the sum."
                        className="w-full min-w-[680px] h-auto block"
                    >
                        <defs>
                            <marker id="a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--line-hi)" />
                            </marker>
                            <marker id="a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gr2)" />
                            </marker>
                        </defs>

                        {/* request -> handler */}
                        <line x1={POS.req.x + BOX.w} y1={cy(POS.req)} x2={POS.handler.x - 7} y2={cy(POS.handler)}
                              stroke="var(--gr2)" strokeWidth="1.5" markerEnd="url(#a2)" />

                        {/* fan out, then fan back in */}
                        {[POS.svcA, POS.svcB, POS.svcC].map((n, i) => (
                            <g key={i}>
                                <path d={fanOut(n)} fill="none" stroke="var(--gr2)" strokeWidth="1.4"
                                      opacity=".75" markerEnd="url(#a2)" />
                                <path d={fanIn(n)} fill="none" stroke="var(--line-hi)" strokeWidth="1.4"
                                      markerEnd="url(#a1)" />
                            </g>
                        ))}

                        {/* join -> response */}
                        <line x1={POS.join.x + BOX.w} y1={cy(POS.join)} x2={POS.res.x - 7} y2={cy(POS.res)}
                              stroke="var(--gr2)" strokeWidth="1.5" markerEnd="url(#a2)" />

                        {/* the point of the whole diagram */}
                        <text x="475" y="330" textAnchor="middle" className="mono" fontSize="11.5" fill="var(--gr2)">
                            latency = max(calls), not sum(calls)
                        </text>
                        <text x="272" y="126" textAnchor="middle" className="mono" fontSize="10" fill="var(--white3)">
                            go ×3
                        </text>

                        {/* boxes */}
                        {arch.nodes.map((n) => {
                            const p = POS[n.id]
                            if (!p) return null
                            const accent = ACCENT.has(n.id)
                            return (
                                <g key={n.id}>
                                    <rect x={p.x} y={p.y} width={BOX.w} height={BOX.h} rx="9"
                                          fill={accent ? "var(--gr-wash)" : "var(--surface)"}
                                          stroke={accent ? "var(--gr-edge)" : "var(--line)"} strokeWidth="1" />
                                    <text x={cx(p)} y={p.y + 27} textAnchor="middle" fontSize="13.5"
                                          fontWeight="600" fill="var(--white1)">{n.label}</text>
                                    <text x={cx(p)} y={p.y + 45} textAnchor="middle" fontSize="10.5"
                                          className="mono" fill={accent ? "var(--gr2)" : "var(--white3)"}>{n.sub}</text>
                                </g>
                            )
                        })}
                    </svg>
                </div>

                <div className="border-t border-line-100 px-[18px] py-[16px] flex flex-col gap-[9px] md:px-[26px]">
                    {arch.notes.map((note, i) => (
                        <p key={i} className="flex gap-[11px] mono text-[12px] leading-[1.6] text-white-200">
                            <span className="text-green-200 shrink-0">//</span>
                            <span>{note}</span>
                        </p>
                    ))}
                </div>
            </div>
        </Section>
    )
}
