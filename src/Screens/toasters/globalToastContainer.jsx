// ToastContainerGlobal.js
import React, { useRef, useState, useEffect } from 'react';
import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react';
import { setShowToast } from './toastService';

const GlobalToastContainer = () => {
    const [toast, addToast] = useState();
    const toaster = useRef(null);

    useEffect(() => {

        setShowToast((message) => {
            const newToast = (
                <CToast autohide={true} visible={true}>
                    <CToastHeader closeButton>
                        <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect width="100%" height="100%" fill="#dc3545"></rect>
                        </svg>
                        <div className="fw-bold me-auto">Error</div>
                        <small>Just now</small>
                    </CToastHeader>
                    <CToastBody>{message}</CToastBody>
                </CToast>
            );
            addToast(newToast);
        });
    }, []);

    return (
        <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
    );
};

export default GlobalToastContainer;
