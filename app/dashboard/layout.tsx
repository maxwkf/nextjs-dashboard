import SideNav from '@/app/ui/dashboard/sidenav';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 hover:bg-green-100">
                {children}
                <div><Link href="https://nextjs.org/learn/dashboard-app" target="_blank">https://nextjs.org/learn/dashboard-app</Link></div>
            </div>
        </div>
    )
}