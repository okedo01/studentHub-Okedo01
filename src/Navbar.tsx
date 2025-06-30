import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

const Navbar: React.FC = () => {
    return (
        <div className="flex justify-between items-center px-4">
            <header>
                <img src="/studentHub.png" alt="studentHub" className="w-24 h-24 rounded-full"/>
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
                            <NavigationMenuLink href="/course" className="text-2xl">Courses</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Navbar