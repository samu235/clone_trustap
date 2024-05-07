'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelect } from '../../store/user/selectors'
import { useRouter, usePathname } from 'next/navigation';

// Utilizamos este componente para obligar al usuario a logearse
const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const user = useSelector(getUserSelect)
    useEffect(() => {
        if (user?.userId?.length > 0) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [user])

    useEffect(() => {
        if (!isAuthenticated && pathname?.indexOf('/user') === -1) {
            router.push('/user/login');
        }
    }, [isAuthenticated, router]);

    return (isAuthenticated || pathname?.indexOf('/user') > -1) ? children : null;
}

export default PrivateRoute