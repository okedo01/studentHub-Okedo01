import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

const Navbar: React.FC = () => {
    return (
        <div className="bg-blue-300 flex justify-between items-center px-4">
            <header>
                <img src="/studentHub.png" alt="studentHub" className="w-3xs rounded-full"/>
            </header>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="text-3xl">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/about" className="text-3xl">About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/contact" className="text-3xl">Contact Us</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink href="/course" className="text-3xl">Courses</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Navbar