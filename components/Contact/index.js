import React, { useContext, useState } from 'react'
import { Container } from '..'
import { AiFillMessage, AiOutlineClose } from 'react-icons/ai'
import DataContext from '../../context/DataContext'
import emailjs from '@emailjs/browser'
import { Notification, validateEmail } from '../../helpers'
import { EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from '../../config'
import socialsData from '../../data/socials.json'
const { socials } = socialsData

const notif = new Notification(3000)

function Contact({ index = 8 }) {
    const { contactActive, closeContactForm, openContactForm } = useContext(DataContext)

    return (
        <div className="w-full bg-dark-300 border-t border-line-100">
            <Container>
                <div className="w-full flex flex-col items-start justify-center py-[80px] px-[20px] md:py-[100px]">
                    <div data-aos="fade-up" className="eyebrow mb-[20px] w-full max-w-[520px]">
                        <span className="idx">{String(index).padStart(2, "0")}</span><span>/</span><span>Contact</span>
                    </div>

                    <h2 data-aos="fade-up" className="text-[clamp(28px,5vmin,44px)] font-bold tracking-tight leading-[1.15] mb-[18px]">
                        Let&apos;s build something
                        <span className="text-green-200"> that scales.</span>
                    </h2>

                    <a id="contact" />

                    <p data-aos="fade-up" className="text-[15px] leading-[1.75] text-white-200 max-w-[52ch] mb-[30px]">
                        I&apos;m open to backend and full-stack roles, and happy to talk through
                        an interesting systems problem either way.
                    </p>

                    <div data-aos="fade-up" className="flex flex-row items-center gap-3 flex-wrap">
                        <button className="btn btn-primary" onClick={openContactForm}>
                            say hi
                        </button>
                        {socials.email && (
                            <a href={`mailto:${socials.email}`} className="btn btn-ghost">
                                {socials.email}
                            </a>
                        )}
                    </div>
                </div>
            </Container>

            <ContactForm closeContactForm={closeContactForm} contactActive={contactActive} />

            <div className="fixed bottom-[90px] right-5 z-[100] md:bottom-8">
                <button
                    aria-label="Open contact form"
                    onClick={openContactForm}
                    className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-green-200 text-dark-400 shadow-lg transition-transform hover:scale-105"
                >
                    <AiFillMessage className="text-[21px]" />
                </button>
            </div>
        </div>
    )
}

export default Contact

function ContactForm({ contactActive, closeContactForm }) {
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInputs] = useState({ name: "", email: "", message: "" })

    function handleInput(e) {
        const { name, value } = e.target
        setUserInputs((prev) => ({ ...prev, [name]: value }))
    }

    function sendMessage() {
        if (userInput.name === "") return notif.error("username cant be blank.")
        if (userInput.email === "") return notif.error("email cant be blank.")
        if (userInput.message === "") return notif.error("message cant be blank.")
        if (validateEmail(userInput.email) === false) return notif.error("email is invalid.")

        const { name, email, message } = userInput
        const templateParams = { from_name: name, sender_email: email, message }

        if (EMAILJS_TEMPLATE_ID === "" || EMAILJS_SERVICE_ID === "" || EMAILJS_PUBLIC_KEY === "") {
            console.error("FAILED TO SEND MESSAGE: missing config in config/index.js")
            return notif.error("FAILED TO SEND MESSAGE: something went wrong.")
        }

        setLoading(true)
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setLoading(false)
                notif.success("MESSAGE SENT.")
                setUserInputs({ name: "", email: "", message: "" })
            }, (err) => {
                setLoading(false)
                notif.error("Something went wrong, could not send message.")
                console.error(err)
            })
    }

    const field = "w-full mono text-[13px] px-[13px] py-[11px] mb-[11px] rounded-[7px] bg-dark-400 border border-line-100 outline-none text-white-100 placeholder:text-white-300 transition-colors focus:border-green-500"

    return (
        <div
            id="form"
            className={`fixed bottom-[150px] right-3 z-[999] w-[calc(100vw-24px)] max-w-[350px] bg-dark-100 border border-line-100 rounded-[11px] shadow-2xl overflow-hidden transition-all md:bottom-[86px] md:right-8 ${
                contactActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
        >
            <div className="w-full flex items-center gap-3 px-[14px] py-[11px] border-b border-line-100 bg-dark-200">
                <span className="dots"><i /><i /><i /></span>
                <span className="mono text-[12px] text-white-300 ml-1">new-message</span>
                <AiOutlineClose
                    className="ml-auto text-[16px] text-white-200 cursor-pointer transition-colors hover:text-red-200"
                    onClick={closeContactForm}
                />
            </div>

            <div className="w-full flex flex-col p-[14px]">
                <input type="text" name="name" className={field} placeholder="name"
                       value={userInput.name} onChange={handleInput} />
                <input type="email" name="email" className={field} placeholder="email@domain.com"
                       value={userInput.email} onChange={handleInput} />
                <textarea rows="4" name="message" className={`${field} resize-none`} placeholder="message"
                          value={userInput.message} onChange={handleInput} />
                <button className="btn btn-primary w-full justify-center mt-[3px]" onClick={sendMessage} disabled={loading}>
                    {loading ? "sending…" : "send message"}
                </button>
            </div>
        </div>
    )
}
