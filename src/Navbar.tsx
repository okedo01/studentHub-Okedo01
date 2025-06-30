import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className="flex justify-between items-center p-4 mb-8 nav">
            <header>
                <Link to="/">
                    <img src="/studentHub.png" alt="studentHub" className="w-24 h-24 rounded-full cursor-pointer"/>
                </Link>
            </header>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="text-2xl">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/about" className="text-2xl">About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/contact" className="text-2xl">Contact Us</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/courses" className="text-2xl">Courses</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Navbar