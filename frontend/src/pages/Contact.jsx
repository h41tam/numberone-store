import { useRef, useState } from "react"
import { PhoneCall, EnvelopeSimple, MapPinArea } from "@phosphor-icons/react"
import { usePageEnter, useStagger } from "@/lib/anim"

export default function Contact() {
  const ref = usePageEnter()
  const gridRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  useStagger(gridRef, ".reveal")

  return (
    <div ref={ref} className="pt-24 pb-12 bg-scnd-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-semibold font-cinzel-decorative tracking-tight mb-4">
            Contactez-Nous
          </h1>
          <p className="text-lg text-foreground/70 mx-auto font-ghrathe font-light max-w-2xl">
            Avez-vous quelque chose a dire? Des questions a poser? Voici comment.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="space-y-8 reveal">
            <div>
              <h2 className="text-2xl text-primary font-cinzel font-semibold mb-6">
                Nos Informations
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <EnvelopeSimple className="text-foreground flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-light text-foreground font-boston-caps mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:numberone-store@gmail.com"
                      className="text-foreground/70 font-ghrathe hover:text-primary duration-400 transition-colors"
                    >
                      numberone-store@gmail.com
                    </a>
                    <br />
                    <a
                      href="mailto:numberone-contact@gmail.com"
                      className="text-foreground/70 font-ghrathe hover:text-primary duration-400 transition-colors"
                    >
                      numberone-contact@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <PhoneCall className="text-foreground flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-light font-boston-caps mb-1">
                      Telephone
                    </h3>
                    <a
                      href="tel:+212693772445"
                      className="font-ghrathe text-foreground/70 hover:text-primary duration-400 transition-colors"
                    >
                      +212 500 300-300
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPinArea className="text-foreground flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-light font-boston-caps mb-1">
                      Addresse
                    </h3>
                    <a
                      href="https://maps.app.goo.gl/U81axV33EifsTBQ1A"
                      className="text-foreground/70 font-ghrathe hover:text-primary transition-colors duration-400"
                    >
                      Number One, Attacharouk Casablanca, Casa-Settat 20606
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-primary text-2xl font-cinzel mb-6">
                Heures De Travail
              </h3>
              <div className="space-y-2 font-ghrathe text-xl text-foreground/70">
                <p>
                  <span className="text-foreground">Lundi - Vendredi:</span> 9:00 - 22:00
                </p>
                <p>
                  <span className="text-foreground">Samedi:</span> 10:00 - 23:00
                </p>
                <p>
                  <span className="text-foreground">Dimanche:</span> Ferme
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/40 rounded-4xl p-8 max-w-auto reveal">
            <h2 className="text-2xl font-cinzel font-semibold mb-6">
              E-mailez Nous Directement
            </h2>

            {submitted && (
              <div className="mb-6 p-4 font-cinzel font-semibold text-center bg-scnd-gradient text-foreground rounded-xl animate-pulse">
                Merci pour votre message. Nous vous répondrons bientôt!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-md font-boston-caps font-medium -ml-2 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="font-ghrathe text-background placeholder:text-background/40 w-full bg-gold-gradient rounded-xl px-4 py-1 focus:outline-none"
                  placeholder="votre Nom"
                />
              </div>

              <div>
                <label className="block text-md font-boston-caps font-medium -ml-2 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="font-ghrathe text-background placeholder:text-background/40 w-full bg-gold-gradient rounded-xl px-4 py-1 focus:outline-none"
                  placeholder="votre addresse email"
                />
              </div>

              <div>
                <label className="block text-md font-boston-caps font-medium -ml-2 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="font-ghrathe text-background placeholder:text-background/40 w-full bg-gold-gradient rounded-xl px-4 py-1 focus:outline-none"
                  placeholder="sujet"
                />
              </div>

              <div>
                <label className="block text-md font-boston-caps font-medium -ml-2 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="font-ghrathe text-background placeholder:text-background/40 w-full h-30 bg-gold-gradient rounded-xl px-4 py-1 focus:outline-none resize-none"
                  placeholder="votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-background border border-foreground text-foreground py-2 rounded-xl hover:bg-primary hover:border-primary hover:text-background transition-colors duration-400 font-cinzel-decorative font-semibold"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
