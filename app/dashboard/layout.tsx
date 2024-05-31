import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import AuthButton from "@/components/AuthButton"
interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='flex sm:flex-row  '>
            <Sidebar />
            <main className='w-full h-screen overflow-x-auto'>
                <div className="w-full flex justify-end p-6"><AuthButton /></div>
                {children}</main>
        </div>
    );
};

export default Layout;