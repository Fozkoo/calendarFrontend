import React from 'react';
import Login from '..//components/Login';

const LoginPage: React.FC = () => {
    return (
        <>
            <div className="container-login-page flex justify-center items-center h-[100vh] bg-red-200">
                <Login/>
            </div>
        </>
    );
};

export default LoginPage;
