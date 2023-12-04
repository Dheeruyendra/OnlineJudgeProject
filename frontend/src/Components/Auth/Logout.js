import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
        };

        handleLogout();
    }, [navigate]); 

    return null; 
} 

export default Logout;