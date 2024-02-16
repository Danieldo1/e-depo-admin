import React from 'react'
import Link from 'next/link'
import { LayoutDashboard,PackageOpen,CandlestickChart,UserCog,Layers3 } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
const pathname = usePathname()

const inactiveLink = " hover:bg-blue-500 hover:text-white rounded-md p-2 flex gap-2"
const activeLink = " bg-blue-500 text-white rounded-md p-2 flex gap-2"
  return (
    <aside className="flex flex-col p-5 text-white">
     <Link href="/" className='flex gap-2 mb-4'>LOGO</Link>   

     <nav className="flex gap-2 flex-col">
        <Link href="/" className={pathname === "/" ? activeLink : inactiveLink}> <LayoutDashboard />Dashboard</Link>
        <Link href="/products" className={ pathname.includes("/products") ? activeLink : inactiveLink}> <CandlestickChart />Products</Link>
        <Link href="/category" className={ pathname.includes("/category") ? activeLink : inactiveLink}> <Layers3 />Category</Link>
        <Link href="/orders" className={pathname.includes("/orders") ? activeLink : inactiveLink}> <PackageOpen />Orders</Link>
        <Link href="/settings" className={pathname.includes("/settings") ? activeLink : inactiveLink}> <UserCog />Settings</Link>
     </nav>
    </aside>
  )
}

export default Navbar