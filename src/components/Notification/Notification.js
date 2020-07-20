import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = () => {
    const handleNotify = (type) => {
        const config = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };

        switch(type) {
            case "success":
                toast.success('Wow so easy!', config);
                break;
            case "info":
                toast.success('Wow so easy!', config);
                break;
            case "error":
                toast.success('Wow so easy!', config);
                break;
        }        
    };

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            {/* Same as */}
        <ToastContainer />
    );
};