import React, { useRef } from 'react'
import { FiArrowRight } from "react-icons/fi"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

const HoverLinks = () => {
    return (
        <section className='min-h-screen overflow-x-hidden bg-neutral-950 p-4 md:p-8'>
            <div className='mx-auto max-w-5xl'>
                <Link heading="Fleabag" imgSrc="../imgs/fleabag.jpg" href="#" />
                <Link heading="Yachty" imgSrc="../imgs/start.jpeg" href="#" />
                <Link heading="Solaris" imgSrc="../imgs/solaris.jpg" href="#" />
                <Link heading="Inglorius" imgSrc="../imgs/inglorius.jpg" href="#" />
                <Link heading="Runaway" imgSrc="../imgs/runaway.jpg" href="#" />
            </div>
        </section>
    )
}

const Link = ({ heading, imgSrc, href }) => {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const xSpring= useSpring(x)
    const ySpring= useSpring(y)


    const top = useTransform(ySpring, [0.5, -0.5], ["40%", "60%"])
    const left = useTransform(xSpring, [0.5, -0.5], ["60%", "70%"])

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
    
        x.set(xPct)
        y.set(yPct)
    }

    return (
        <motion.a
            ref={ref}
            initial="initial"
            onMouseMove={handleMouseMove}
            whileHover="whileHover"
            href={href}
            className='group relative overflow-x-hidden flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-24'>
             <div>
                <motion.span
                    variants={{
                        initial: {
                            x: 0
                        },
                        whileHover: {
                            x: -16
                        }
                    }}
                    transition={{
                        type: "spring",
                        delayChildren: 0.25,
                        staggerChildren: 0.05
                    }}
                    className='relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 md:text-6xl group-hover:text-neutral-50'>
                    {heading.split("").map((l, i) => {
                        return (
                            <motion.span
                                variants={{
                                    initial: {
                                        x: 0
                                    },
                                    whileHover: {
                                        x: 16
                                    }
                                }}
                                transition={{
                                    type: "spring",
                                }}
                                className='inline-block' key={i}>
                                {l}
                            </motion.span>)
                    })}
                </motion.span>
            </div>

            <motion.img
                variants={{
                    initial: {
                        scale: 0,
                        rotate: '-12.5deg'
                    },
                    whileHover: {
                        scale: 1,
                        rotate: "12.5deg"
                    }
                }}
                style={{
                    top,
                    left,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                transition={{
                    type: "spring"
                }}
                src={imgSrc}
                className='absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64'
            />

            <motion.div
                variants={{
                    initial: {
                        x: "25%",
                        opacity: 0
                    },
                    whileHover: {
                        x: "0%",
                        opacity: 1
                    }
                }}

                transition={{
                    type: "spring"
                }}
                className='relative z-10 p-4'>
                <FiArrowRight className='text-5xl text-neutral-50' />
            </motion.div>
        </motion.a>
    )
}

export default HoverLinks