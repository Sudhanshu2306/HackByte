import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Backendurl } from "../../Private/backend";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const [user, setUser] = useState(null);
    const [userFamily, setUserFamily] = useState([]);
    const [loading, setLoading] = useState(true);

    const storeTokenInLS = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
    };

    let isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        setUserFamily([]);
        setToken("");
    };

    const fetchUserFamily = async (familyId) => {
        try {
            const response = await axios.get(`${Backendurl}/api/v1/users/getfamily/${familyId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            // console.log(response);
            if (response.status === 200) {
                // console.log("Fetched family members:", response.data.data.familyMembers);
                setUserFamily(response.data.data.familyMembers);
            }
        } catch (error) {
            console.error("Error fetching family members:", error);
            toast.error("Failed to fetch family members.");
        }
    };

    const userAuthentication = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Backendurl}/api/v1/users/current-user`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                const userData = response.data.data;
                setUser(userData);  
                toast.success("User Fetched Successfully!");

                // If the user is a family member or family head, fetch family members
                if (userData.role === "family member" || userData.role === "family head") {
                    await fetchUserFamily(userData.familyId);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error in user authentication:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, logout, user, userFamily, loading, token , setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
