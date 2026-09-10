// Shared section shell: monospace "01 / LABEL" eyebrow + optional title & action.
export default function Section({ index, label, title, desc, action, id, children, className = "" }) {
    return (
        <section id={id} className={`w-full h-auto py-[70px] md:py-[90px] ${className}`}>
            <div data-aos="fade-up" className="eyebrow mb-[18px]">
                <span className="idx">{String(index).padStart(2, "0")}</span>
                <span>/</span>
                <span>{label}</span>
            </div>

            {(title || action) && (
                <div className="w-full flex flex-row items-end justify-between gap-5 flex-wrap mb-[10px]">
                    {title && (
                        <h2 data-aos="fade-up" className="text-[clamp(26px,4vmin,36px)] font-bold tracking-tight">
                            {title}
                        </h2>
                    )}
                    {action}
                </div>
            )}

            {desc && (
                <p data-aos="fade-up" className="text-[14px] leading-[1.75] text-white-200 max-w-[62ch] mb-[38px]">
                    {desc}
                </p>
            )}

            {children}
        </section>
    )
}
