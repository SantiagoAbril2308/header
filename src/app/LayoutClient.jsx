'use client';

import { usePathname } from 'next/navigation';
import Header from "../components/ui/Header/Header"; 
import Providers from '../components/Providers';
import ToastNotification from '../components/Notification';

const hiddenPaths = ['/loging', '/register'];

export default function LayoutClient({ children }) {
    const pathName = usePathname();
    const hidden = hiddenPaths.includes(pathName);

    return (
        <Providers>
            <div className="flex flex-col min-h-screen">
                {!hidden && <Header />}
                <main className="flex-1">
                    {children}
                </main>
                <ToastNotification />
            </div>
        </Providers>
    );
}