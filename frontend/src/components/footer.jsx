import { Link } from "react-router-dom"
import {
    Mailbox, FacebookLogo, InstagramLogo,
    MapPinArea, CoatHanger, Phone, Info, HouseLine, ShoppingCart, 
    TiktokLogo } from "@phosphor-icons/react"

function FooterExternal({ href, icon, label }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="group relative block text-lg lg:text-sm text-muted-foreground text-center hover:text-primary transition-colors duration-500">
            <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform duration-500 -translate-x-2 group-hover:translate-x-0 group-hover:text-primary">
                {icon}
            </span>
            {label}
        </a>
    )
}

function FooterLink({ to, icon, label }) {
    return (
        <Link to={to} className="group relative block text-lg lg:text-sm text-muted-foreground text-center hover:text-primary transition-colors duration-500">
            <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform duration-500 -translate-x-2 group-hover:translate-x-0 group-hover:text-primary">
                {icon}
            </span>
            {label}
        </Link>
    )
}

export default function Footer() {
    return (
        <footer className="bg-glass border-t border-glass">
            <div className="max-w-7xl mx-auto px-20 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold font-rodfat tracking-wider text-foreground/90 mb-4 text-center">
                            <span className="font-ghrathe">| </span>Number One
                        </h3>
                        <p className="text-sm -mt-2 leading-10 font-boston-caps font-light text-muted-foreground text-center hover:text-primary transition-colors duration-400">
                            On Fait Partie Du Marche Depuis 2016 Et Nos Clients Nous Font Confiance
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xl font-bold font-rodfat text-foreground/90 mb-4 text-center">Navigation</h4>
                        <div className="space-y-3 font-ghrathe">
                            <FooterLink to="/" icon={<HouseLine size={18} />} label="Acceuil" />
                            <FooterLink to="/collection" icon={<CoatHanger size={18} />} label="Collection" />
                            <FooterLink to="/contact" icon={<Phone size={18} />} label="Contact" />
                            <FooterLink to="/info" icon={<Info size={18} />} label="Info" />
                            <FooterLink to="/cart" icon={<ShoppingCart size={18} />} label="Panier" />
                        </div>
                    </div>

                    {/* More */}
                    <div>
                        <h4 className="text-xl font-bold font-rodfat text-foreground/90 mb-4 text-center">Plus</h4>
                        <div className="space-y-3 font-ghrathe">
                            <FooterExternal href="mailto:numberone@store.com" icon={<Mailbox size={18} />} label="numberone@store.com" />
                            <FooterExternal href="https://maps.app.goo.gl/teux7MCNNQ7vofEK9" icon={<MapPinArea size={18} />} label="Visitez-Nous" />
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xl font-bold font-rodfat text-foreground/90 mb-4 text-center">Reseaux Sociaux</h4>
                        <div className="flex gap-4 justify-center">
                            <Link to="https://www.instagram.com/number_one_casablanca/" target="_blank" rel="noopener noreferrer">
                                <InstagramLogo size={30} className="text-muted-foreground hover:scale-105 hover:text-primary transition-colors duration-400" />
                            </Link>
                            <Link to="https://www.facebook.com/profile.php?id=61552228353888/" target="_blank" rel="noopener noreferrer">
                                <FacebookLogo size={30} className="text-muted-foreground hover:scale-105 hover:text-primary transition-colors duration-400" />
                            </Link>
                            <Link to="https://www.tiktok.com/@number1casablanca" target="_blank" rel="noopener noreferrer">
                                <TiktokLogo size={30} className="text-muted-foreground hover:scale-105 hover:text-primary transition-colors duration-400" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center border-t font-cinzel border-glass pt-5 text-center text-md text-muted-foreground">
                    © 2016-2025 Number One — All rights reserved.
                    <div className="bg-foreground w-[1px] ml-8 mr-2 inline-block"></div>
                    <Link to="/admin" rel="noopener noreferrer" className="mt-3 lg:mt-0 font-cinzel-decorative text-foreground hover:text-primary">
                        Admin Only
                    </Link>
                </div>
            </div>
        </footer>
    )
}



