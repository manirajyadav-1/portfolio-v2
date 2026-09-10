export default function Container({ children, className = "", ...rest }) {
    return (
        <div className={`w-full max-w-content mx-auto px-[18px] md:px-[32px] xl:px-[48px] ${className}`} {...rest}>
            {children}
        </div>
    )
}
