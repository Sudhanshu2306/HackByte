import React, { useState, useEffect } from 'react';
import LostCard from '../Components/LostCard';
import axios from 'axios';
import { Backendurl } from '../../Private/backend';
// const Backendurl = import.meta.env.BACKEND_URL;
function Missing() {
    const [members, Setmembers] = useState([]);

    useEffect(() => {
        const fetchLostMembers = async () => {
            try {
                console.log("Fetching lost members...");
                // Fetch lost members from the backend
                const response = await axios.get(`${Backendurl}/api/v1/users/get_lost`, {
                    withCredentials: true, 
                });
                // console.log(response.data.data);
                Setmembers(response.data.data); // Assuming data is inside `data` key
            } catch (error) {
                console.error("Error fetching lost members:", error);
            }
        };

        fetchLostMembers();
    }, []);

    return (
        <div className='flex'>
            {members.map((member, index) => (
                <LostCard key={index} members={member} />
            ))}
        </div>
    );
}

export default Missing;