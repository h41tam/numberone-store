import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/cartContext"
import {
    Info,
    HouseLine,
    CoatHanger,
    Phone,
    ShoppingCart,
    List,
    X
} from "@phosphor-icons/react"

export default function Navbar() {
    const { pathname } = useLocation()
    const { cartCount } = useCart()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        {
            to: "/",
            label: "Acceuil",
            icon: (
                <HouseLine
                    size={21}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:left-0 group-hover:opacity-100"
                />
            ),
        },
        {
            to: "/collection",
            label: "Collection",
            icon: (
                <CoatHanger
                    size={21}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:left-0 group-hover:opacity-100"
                />
            ),
        },
        {
            to: "/contact",
            label: "Contact",
            icon: (
                <Phone
                    size={21}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:left-0 group-hover:opacity-100"
                />
            ),
        },
        {
            to: "/info",
            label: "Info",
            icon: (
                <Info
                    size={21}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:left-0 group-hover:opacity-100"
                />
            ),
        },
    ]

    const isActive = (path) => pathname === path

    return (
        <nav className="fixed top-0 w-full bg-glass border-b border-glass z-50 backdrop-blur-glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 mr-2">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center gap-2 transition-transform duration-500"
                    >
                        <img
                            src="/images/full-logo-2.png"
                            alt="logo"
                            className="h-16 w-auto object-contain absolute top-1/2 -translate-y-1/2"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`group relative text-xl font-boston-caps transition-colors duration-500 tracking-wide md:pl-8 ${isActive(to)
                                    ? "bg-clip-text text-transparent bg-gold-gradient"
                                    : "text-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                {label}
                                <span className="hidden md:inline-block mx-2 align-middle relative">
                                    {icon}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Cart + Mobile */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative group text-foreground hover:text-primary duration-500 transition-colors">
                            <ShoppingCart size={30} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-foreground group-hover:bg-primary font-rodfat text-background w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors duration-500 font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={30} /> : <List size={30} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="md:hidden pb-4 text-center border-t border-glass animate-slideDown">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setIsOpen(false)}
                                className={`block pt-5 py-2 font-boston-caps text-2xl bg-glass tracking-wide transition-colors ${isActive(to)
                                    ? "text-primary"
                                    : "text-foreground/50 hover:text-foreground"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
