'use client'

import { usePathname } from 'next/navigation'
import Header from "../components/ui/Header/Header"; 
import Providers from '../components/Providers';
import ToastNotification from '../components/Notification';

const hiddenPaths = ['/loging', '/register'];


export default function LayoutClient({ children }) {

   
    const pathName = usePathname();

    const hidden = hiddenPaths.includes(pathName);

    return (
        // SOLUCIÓN: Providers envuelve toda la estructura para dar acceso al contexto.
        <Providers> 
            <div style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>

                {/* Header (Ahora dentro de Providers y puede usar useCart) */}
                {!hidden && <Header />}

                <main style={{ flex: 1 }}>
                    {children}
                </main>
                
                {/* Toast (También dentro de Providers) */}
                <ToastNotification /> 
            </div>
        </Providers>
    )
}