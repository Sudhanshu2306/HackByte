import React from "react";
import { motion } from "framer-motion";

const Objective = () => (
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
        <h3 style={{ fontSize: '1.5em', color: '#333' }}>Our Objective</h3>
        <p style={{ fontSize: '1em', fontWeight: 'normal', color: '#555' }}>
            Empowering families with a secure and connected environment through advanced real-time tracking
            and smart safety features. Our objective is to enhance awareness, prevent risks, and ensure
            the well-being of your loved ones with cutting-edge technology and seamless user experience.
        </p>
    </motion.div>
);

export default Objective;