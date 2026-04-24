'use client';

import { useEffect } from 'react';

export default function BootstrapProvider({ children }) {
    useEffect(() => {
        // Load Bootstrap JS hanya di client-side
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return <>{children}</>;
}