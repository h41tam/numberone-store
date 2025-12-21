import StoreMap from "../components/storeMap.jsx"

export default function Info() {
  return (
    <div className="pt-24 pb-16 bg-dark-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-semibold font-cinzel-decorative tracking-tight mb-4">
            A Propos De Nous
          </h1>
          <p className="text-lg text-foreground/80 mx-auto font-ghrathe font-light max-w-2xl">
            On fait partie du marche depuis 2016 et nos clients nous font confiance.
          </p>
        </div>

        {/* Visit us / Map placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-cinzel text-primary font-semibold mb-4">
            Visitez Nous
          </h2>
          <div className="w-full h-64 sm:h-72 lg:h-80 rounded-3xl bg-glass border border-glass overflow-hidden flex items-center justify-center text-center">
            <StoreMap />
          </div>
        </div>

        {/* About pillars */}
        <div className="mb-16">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-secondary/40 rounded-3xl p-6 text-center space-y-6">
              <div>
                <h3 className="text-primary font-boston-caps text-2xl font-semibold mb-2">
                  Qualite
                </h3>
                <p className="text-sm font-ghrathe text-foreground/70">
                  Chaque tissu est teste et chaque point de couture est inspecte afin
                  de garantir les normes les plus elevees.
                </p>
              </div>
              <div>
                <h3 className="text-primary font-boston-caps text-2xl font-semibold mb-2">
                  Sustainabilite
                </h3>
                <p className="text-sm font-ghrathe text-foreground/70">
                  Nous collaborons avec des fabricants ethiques et nous nous
                  approvisionnons en materiaux de maniere responsable.
                </p>
              </div>
              <div>
                <h3 className="text-primary font-boston-caps text-2xl font-semibold mb-2">
                  Service
                </h3>
                <p className="text-sm font-ghrathe text-foreground/70">
                  Notre priorite est la satisfaction de nos clients. Un service client
                  exceptionnel dans chaque interaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty program */}
        <div className="mb-4">
          <h2 className="text-3xl font-cinzel font-semibold mb-10 text-center">
            Systeme de Fidelite
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/40 rounded-2xl p-8 text-center hover:cursor-pointer group hover:bg-foreground/50 duration-700 transition-colors">
              <span className="text-4xl font-light text-primary font-ghrathe group-hover:text-background">
                01
              </span>
              <h3 className="mt-4 mb-2 text-xl font-ghrathe font-light group-hover:text-background">
                Achetez Des Produits
              </h3>
              <p className="text-foreground/70 text-sm font-ghrathe group-hover:text-background">
                Pour chaque{" "}
                <span className="text-primary group-hover:text-background font-ghrathe font-medium">
                  300 DH
                </span>{" "}
                depense en magasin ou en ligne, vous gagnez une recompense.
              </p>
            </div>

            <div className="bg-secondary/40 rounded-2xl p-8 text-center hover:cursor-pointer group hover:bg-foreground/50 duration-700 transition-colors">
              <span className="text-4xl font-light text-primary font-ghrathe group-hover:text-background">
                02
              </span>
              <h3 className="mt-4 mb-2 text-xl font-ghrathe font-light group-hover:text-background">
                Gagnez Des Coupons
              </h3>
              <p className="text-foreground/70 text-sm font-ghrathe group-hover:text-background">
                Recevez automatiquement un{" "}
                <span className="text-primary group-hover:text-background font-ghrathe font-medium">
                  50 DH coupon
                </span>{" "}
                sur votre compte.
              </p>
            </div>

            <div className="bg-secondary/40 rounded-2xl p-8 text-center hover:cursor-pointer group hover:bg-foreground/50 duration-700 transition-colors">
              <span className="text-4xl font-light text-primary font-ghrathe group-hover:text-background">
                03
              </span>
              <h3 className="mt-4 mb-2 text-xl font-ghrathe font-light group-hover:text-background">
                Utilisable Sur Commande Prochaine
              </h3>
              <p className="text-foreground/70 text-sm font-ghrathe group-hover:text-background">
                Utilisez votre coupon sur votre prochaine commande et profitez de
                savings exclusifs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
