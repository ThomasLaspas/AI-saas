import { ReactNode } from 'react';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster"
interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Toaster />
        </div>
    );
};

export default Layout;