import { PropsWithChildren, useEffect, useState } from 'react';
import App from '../../../App';
import { Outlet, useNavigate } from 'react-router';
import axiosInstanceApi from '../../../axiosInstanceApi';

const BlankLayout = ({ children }: PropsWithChildren) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axiosInstanceApi.get('user')
        // .then(() => {
        //     navigate('dashboard');
        // })
        // .catch(() => {
        //     setLoading(false);
        // });
    }, []);

    // if (loading) return <></>;

    return (
        <App>
            <div className="text-black dark:text-white-dark min-h-screen">
                <Outlet />
            </div>
        </App>
    );
};

export default BlankLayout;
