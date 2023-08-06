import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return window.removeEventListener("scroll", handleScroll);
    }, []);
    
    const toggleMobileMenu = useCallback(() => setShowMobileMenu((prev) => !prev), []);
    const toggleAccountMenu = useCallback(() => setShowAccountMenu((prev) => !prev), []);

    return (
        <nav className="fixed z-40 w-full">
            <div className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${showBackground ? 'bg:zinc-900/90' : ''}`}>
                <Image src="/images/logo.png" alt="Logo" width={100} height={50}/>
                <div className="flex-row hidden ml-8 gap-7 lg:flex">
                    <NavbarItem label="Accueil" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="Nouveautés les plus regardées" />
                    <NavbarItem label="Ma liste" />
                    <NavbarItem label="Explorer par langue" />
                </div>
                <div 
                    onClick={toggleMobileMenu}
                    className="relative flex items-center flex-grow gap-2 ml-8 cursor-pointer lg:hidden"
                >
                    <p className="text-sm text-white">Parcourir</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row items-center ml-auto gap-7">
                    <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="relative flex flex-row items-center gap-2 cursor-pointer">
                        <div className="w-6 h-6 overflow-hidden rounded-md lg:w-10 lg:h-10">
                            <img src="/images/default-green.png" alt="Image de profil" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;