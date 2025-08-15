import {useAuth} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function RootPage() {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        } else  {
            navigate('/login');
        }
    }, [user, navigate]);

    return null
}

export default RootPage;