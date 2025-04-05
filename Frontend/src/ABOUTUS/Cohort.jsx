import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import uj from "../assets/images/uj.jpg";
import sh from "../assets/images/sh.jpg";
import su from "../assets/images/su.jpg";
import st from "../assets/images/st.jpg";

const teamMembers = [
    {
        name: "Shubham Patel",
        role: "Lead Developer",
        image: sh,
        linkedin: "https://www.linkedin.com/in/shub17/",
        github: "https://github.com/Sp-177"
    },
    {
        name: "Ujjwal Agrawal",
        role: "UI/UX Designer",
        image: uj,
        linkedin: "https://www.linkedin.com/in/ujjwal-agrawal-9267b1253/",
        github: "https://github.com/ujjwalagrawal-1"
    },
    {
        name: "Sudhanshu Raj",
        role: "Project Manager",
        image: su,
        linkedin: "https://www.linkedin.com/in/sudhanshu-raj2306/",
        github: "https://github.com/Sudhanshu2306"
    },
    {
        name: "Siddhant Tomar",
        role: "Marketing Strategist",
        image: st,
        linkedin: "https://www.linkedin.com/in/siddhant-tomar-9b3aab261/",
        github: "https://github.com/siddhanttomar2003"
    }
];

const Cohort = () => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                position: 'relative',
                maxWidth: '600px',
                margin: '20px auto',
                overflow: 'hidden'
            }}
        >
            <h3 style={{ fontSize: '2em', color: '#333', fontWeight: 'bold' }}>Our Cohort</h3>
            <p style={{ fontSize: '1em', fontWeight: 'normal', color: '#555' }}>
                Meet our passionate and dedicated team working together to build innovative and secure solutions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <button onClick={prevSlide} style={{ background: 'none', border: 'none', fontSize: '2em', cursor: 'pointer', color: '#007bff' }}>&#10094;</button>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{
                            backgroundColor: '#f9f9f9',
                            padding: '20px',
                            borderRadius: '15px',
                            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            width: '350px'
                        }}
                    >
                        <img
                            src={teamMembers[index].image}
                            alt={teamMembers[index].name}
                            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #007bff' }}
                        />
                        <h4 style={{ margin: '10px 0', fontSize: '1.4em', color: '#222', fontWeight: 'bold' }}>{teamMembers[index].name}</h4>
                        <p style={{ fontSize: '1em', color: '#666', fontWeight: 'normal' }}>{teamMembers[index].role}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                            <a
                                href={teamMembers[index].linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.5em', color: '#007bff' }}
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={teamMembers[index].github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.5em', color: '#222' }}
                            >
                                <FaGithub />
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <button onClick={nextSlide} style={{ background: 'none', border: 'none', fontSize: '2em', cursor: 'pointer', color: '#007bff' }}>&#10095;</button>
            </div>
        </motion.div>
    );
};

export default Cohort;
