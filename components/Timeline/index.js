// Shared vertical timeline: one spine, a node per entry, card to the right.
// Used by both Experience and Education so the two stay visually identical.
export default function Timeline({ children }) {
    return (
        <div className="w-full relative">
            <span className="absolute left-[7px] top-[10px] bottom-[10px] w-[1px] bg-line-100 hidden sm:block" />
            {children}
        </div>
    )
}

// active = the highlighted (most recent) entry.
// pulse  = that entry is still ongoing; defaults to active, pass false for
//          something finished, so a completed degree does not read as current.
export function TimelineItem({ active = false, pulse = active, delay = 0, children }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay}
            className="relative w-full mb-[18px] sm:pl-[38px]"
        >
            <span
                className={`tl-dot absolute left-0 top-[26px] w-[15px] h-[15px] rounded-full border-2 hidden sm:block ${
                    active ? (pulse ? "is-current" : "is-current no-pulse") : "is-past"
                }`}
            />
            <div className="pane p-[22px]">{children}</div>
        </div>
    )
}

// Title row shared by both: heading on the left, date range on the right.
export function TimelineHead({ title, meta }) {
    return (
        <div className="flex flex-row items-start justify-between gap-4 flex-wrap mb-[6px]">
            <h3 className="text-[18px] font-bold">{title}</h3>
            <span className="mono text-[11px] text-white-300 whitespace-nowrap">{meta}</span>
        </div>
    )
}
