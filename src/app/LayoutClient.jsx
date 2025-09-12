'use client'

import { usePathname } from 'next/navigation'
import Header from "../components/ui/Header/Header"; 



const hiddenPaths = ['/loging', '/register'];


export default function LayoutClient({ children }) {

   
    const pathName = usePathname();

    const hidden = hiddenPaths.includes(pathName);

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>

            {!hidden && <Header />}

            <main style={{ flex: 1 }}>
                {children}
            </main>

        </div>
    )
}