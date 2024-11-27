import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    roles?: string[];
}

const ProtectedRoute = ({ children, roles }: Props) => {

    const isAuthenticated = localStorage.getItem('accessToken')

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;