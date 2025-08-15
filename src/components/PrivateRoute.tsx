import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}
