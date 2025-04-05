import React from "react";
import { motion } from "framer-motion";

const Resolution = () => (
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
        <h3 style={{ fontSize: '1.5em', color: '#333' }}>Our Resolution</h3>
        <p style={{ fontSize: '1em', fontWeight: 'normal', color: '#555' }}>
            Committed to ensuring the utmost safety and well-being of families through continuous innovation
            and technological advancement. Our resolution is to provide a seamless, reliable, and intuitive
            experience that strengthens family connections and enhances security.
        </p>
    </motion.div>
);

export default Resolution;