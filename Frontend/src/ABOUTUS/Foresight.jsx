import React from "react";
import { motion } from "framer-motion";

const Foresight = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.6)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1em',
            fontWeight: 'bold',
            textAlign: 'center',
            position: 'relative',
            width: '350px',
            margin: '20px auto'
        }}
    >
        <h3 style={{ fontSize: '1.5em', color: '#333' }}>Our Foresight</h3>
        <p style={{ fontSize: '1em', fontWeight: 'normal', color: '#555' }}>
            Safeguarding your loved ones with advanced real-time tracking, smart alerts, and seamless connectivity.
            Our app is designed to provide families with a proactive approach to security, ensuring peace of mind
            through cutting-edge technology and intuitive features that keep you informed and reassured at all times.
        </p>
    </motion.div>
);

export default Foresight;