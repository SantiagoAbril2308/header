'use client'

import { usePathname } from 'next/navigation'

import {
    Header
} from '@/components/index'


// paginas que no quiero mostrar el header y footer
const hiddenPaths = ['/loging', '/register'];


export default function LayoutClient({ childern }) {

    // creamos una constante para manejar el path
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
                {childern}
            </main>


        </div>
    )
}