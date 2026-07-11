import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Clock, Phone, Instagram, ArrowDown, Search, Coffee, Utensils, Check, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

const NAV_LINKS = ["Story", "Menu", "Experience", "Visit"];

const MENU_ITEMS = [
  {
    category: "Signature",
    name: "Soul Espresso",
    desc: "Double shot pulled slow — house blend with dark chocolate and dried cherry",
    price: "₹180",
    img: "https://images.unsplash.com/photo-1780064205164-8c5856952a4e?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Pour-Over",
    name: "Rooftop Bloom",
    desc: "Single-origin Ethiopian, hand-dripped — jasmine, peach, and a lingering warmth",
    price: "₹220",
    img: "https://images.unsplash.com/photo-1760163630058-aa71c91783bf?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Milk & More",
    name: "The Conversation",
    desc: "Oat milk cortado with house-made cardamom syrup — made for slow mornings",
    price: "₹200",
    img: "https://images.unsplash.com/photo-1680988469690-b0687fd61bcc?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Cold",
    name: "Gwalior Nights",
    desc: "Cold brew steeped 18 hours over coconut jaggery ice — a nod to local soul",
    price: "₹240",
    img: "https://images.unsplash.com/photo-1780064205176-098641bb1010?w=600&h=750&fit=crop&auto=format",
  },
];

const ALL_CATEGORIES = ["All", "Espresso & Black", "Pour-Over", "Milk & Sweet", "Cold Brew & Iced", "Bakes & Desserts", "Savory Plates"];

const DETAILED_MENU = [
  {
    category: "Espresso & Black",
    name: "Soul Espresso",
    desc: "Double shot pulled slow — house blend with dark chocolate and dried cherry",
    price: "₹180",
    tags: ["House Favorite", "Gluten Free"],
    img: "https://images.unsplash.com/photo-1780064205164-8c5856952a4e?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Espresso & Black",
    name: "Classic Americano",
    desc: "Espresso shots topped with hot water for a rich, clean finish with a persistent crema",
    price: "₹180",
    tags: ["Vegan", "Gluten Free"],
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Pour-Over",
    name: "Rooftop Bloom",
    desc: "Single-origin Ethiopian, hand-dripped — jasmine, peach, and a lingering warmth",
    price: "₹220",
    tags: ["Single Origin", "Vegan"],
    img: "https://images.unsplash.com/photo-1760163630058-aa71c91783bf?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Pour-Over",
    name: "Japanese Iced Drip",
    desc: "Hand-poured over clean rock ice for a bright, citrus-forward refreshing cup",
    price: "₹230",
    tags: ["Single Origin", "Vegan"],
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Milk & Sweet",
    name: "The Conversation",
    desc: "Oat milk cortado with house-made cardamom syrup — made for slow mornings",
    price: "₹200",
    tags: ["Oat Milk", "House Favorite"],
    img: "https://images.unsplash.com/photo-1680988469690-b0687fd61bcc?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Milk & Sweet",
    name: "Lavender Honey Latte",
    desc: "Rich espresso with lavender-steamed milk and organic local wildflower honey",
    price: "₹220",
    tags: ["Sweet", "Organic"],
    img: "/src/assets/lavender-honey-latte.svg",
  },
  {
    category: "Cold Brew & Iced",
    name: "Gwalior Nights",
    desc: "Cold brew steeped 18 hours over coconut jaggery ice — a nod to local soul",
    price: "₹240",
    tags: ["18hr Steep", "House Favorite", "Vegan"],
    img: "https://images.unsplash.com/photo-1780064205176-098641bb1010?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Cold Brew & Iced",
    name: "Espresso Tonic",
    desc: "Fever Tree tonic water with a shot of citrus-forward espresso, served on rock ice",
    price: "₹230",
    tags: ["Refreshing", "Vegan"],
    img: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Bakes & Desserts",
    name: "Almond Croissant",
    desc: "Double-baked with frangipane filling, toasted almond flakes, and powdered sugar",
    price: "₹190",
    tags: ["Freshly Baked", "Contains Nuts"],
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Bakes & Desserts",
    name: "Saffron Pistachio Sponge",
    desc: "Moist sponge cake infused with saffron milk, topped with freshly crushed pistachios",
    price: "₹220",
    tags: ["Eggless", "Contains Nuts"],
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Savory Plates",
    name: "Avocado Sourdough Toast",
    desc: "Whipped feta, sliced Hass avocado, chili flakes, and toasted pumpkin seeds on rustic sourdough",
    price: "₹260",
    tags: ["Best Seller", "Vegetarian"],
    img: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&h=750&fit=crop&auto=format",
  },
  {
    category: "Savory Plates",
    name: "Truffle Mushroom Crostini",
    desc: "Wild sautéed cremini mushrooms with cold-pressed white truffle oil on garlic-rubbed baguette",
    price: "₹240",
    tags: ["Chef Special", "Vegetarian"],
    img: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&h=750&fit=crop&auto=format",
  }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Digital Menu Modal state
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Reservation state
  const [resName, setResName] = useState("");
  const [resGuests, setResGuests] = useState("2");
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("7:30 PM");
  const [resNote, setResNote] = useState("");
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);

  // Cart state
  const [cart, setCart] = useState<{ name: string; price: string; quantity: number; img: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCustomerName, setCartCustomerName] = useState("");
  const [cartTableNumber, setCartTableNumber] = useState("Rooftop Table 1");

  const addToCart = (item: { name: string; price: string; img: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.name === item.name);
      if (existing) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { name: item.name, price: item.price, quantity: 1, img: item.img }];
    });
  };

  const handleAddToCart = (item: { name: string; price: string; img: string }) => {
    addToCart(item);
  };

  const updateCartQty = (name: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((i) => {
          if (i.name === name) {
            const nextQty = i.quantity + delta;
            return { ...i, quantity: nextQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0);
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((i) => i.name !== name));
  };

  const cartTotalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  };

  const cartTotalPrice = cart.reduce((acc, i) => acc + parsePrice(i.price) * i.quantity, 0);

  const getCheckoutWhatsAppUrl = () => {
    const orderLines = cart.map(
      (item) => `• *${item.name}* x ${item.quantity} — ₹${parsePrice(item.price) * item.quantity}`
    );

    const message = `☕ *NEW ORDER — CAFE BY SOUL* ☕
--------------------------------
👤 *Customer:* ${cartCustomerName}
📍 *Table / Location:* ${cartTableNumber}
--------------------------------
📋 *Items Ordered:*
${orderLines.join("\n")}

💰 *Total Amount:* ₹${cartTotalPrice}
--------------------------------
📱 _Order sent via digital menu_`;

    return `https://wa.me/918318647139?text=${encodeURIComponent(message)}`;
  };

  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cart.length === 0) {
      e.preventDefault();
      return;
    }
    if (!cartCustomerName.trim()) {
      e.preventDefault();
      alert("Please enter your name to send the order to WhatsApp.");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNavClick = (link: string) => {
    if (link.toLowerCase() === "menu") {
      setIsFullMenuOpen(true);
      setMenuOpen(false);
    } else {
      scrollTo(link.toLowerCase());
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resDate) {
      alert("Please provide a name and preferred date.");
      return;
    }
    setReservationData({
      name: resName,
      guests: resGuests,
      date: resDate,
      time: resTime,
      note: resNote,
    });
    setIsReservationSuccess(true);
    // Reset inputs
    setResName("");
    setResNote("");
  };

  // Filter detailed menu items
  const filteredMenuItems = DETAILED_MENU.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* ─── NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-lg tracking-[0.25em] uppercase text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cafe By Soul
          </button>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("visit")}
            className="hidden md:block text-[11px] tracking-[0.22em] uppercase border border-primary text-primary px-5 py-2 hover:bg-primary hover:text-background transition-all duration-300"
          >
            Reserve
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-8 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-sm tracking-[0.2em] uppercase text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("visit");
                setMenuOpen(false);
              }}
              className="text-sm tracking-[0.2em] uppercase border border-primary text-primary px-5 py-3 w-fit hover:bg-primary hover:text-background transition-all"
            >
              Reserve a Table
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex items-end justify-start overflow-hidden bg-background"
      >
        <img
          src="https://images.unsplash.com/photo-1563138216-8ff2e182ccbd?w=1920&h=1080&fit=crop&auto=format"
          alt="Cafe By Soul rooftop terrace with warm string lights at night"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
          <p className="text-primary text-[11px] tracking-[0.45em] uppercase mb-6">
            Gwalior, India — Est. 2022
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-[104px] leading-[0.88] text-foreground max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Where the
            <br />
            <em className="text-primary not-italic">city breathes</em>
            <br />
            up here.
          </h1>
          <p className="mt-8 text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed">
            Coffee, conversations, and rooftop views above Gwalior.
          </p>
          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <button
              onClick={() => setIsFullMenuOpen(true)}
              className="bg-primary text-background text-[11px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-primary/90 transition-colors"
            >
              See the Menu
            </button>
            <button
              onClick={() => scrollTo("story")}
              className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              Our Story <ArrowDown size={13} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-3">
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section id="story" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-card overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=800&h=1067&fit=crop&auto=format"
                  alt="Dimly lit café interior with warm amber ambient glow"
                  className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
                />
              </div>
              <div
                className="absolute -bottom-5 -right-5 w-44 h-44 border border-primary/25 pointer-events-none"
                style={{ zIndex: -1 }}
              />
              <div className="absolute top-8 -right-4 bg-primary text-background px-5 py-4 hidden lg:block">
                <p className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>3F</p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-1 leading-tight">
                  Above<br />the street
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px bg-primary" />
                <span className="text-primary text-[11px] tracking-[0.4em] uppercase">Our Story</span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-[54px] leading-[1.08] text-foreground mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Born from a love of stillness{" "}
                <em className="text-primary not-italic">above the noise.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
                Cafe By Soul started as a simple question: what if Gwalior had a place where you
                could slow down? Three floors up, the city humming below and coffee in hand — we
                built the answer.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-12 text-[15px]">
                Every cup is sourced with care, every corner lit with intention. We&apos;re not just
                a café — we&apos;re the pause in your day, the conversation you&apos;d been meaning to have.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-10">
                {[
                  { n: "40+", label: "Brews" },
                  { n: "3rd", label: "Floor rooftop" },
                  { n: "∞", label: "Conversations" },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p className="text-3xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
                      {n}
                    </p>
                    <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-1.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MENU ─── */}
      <section id="menu" className="py-28 md:py-40 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-primary" />
                <span className="text-primary text-[11px] tracking-[0.4em] uppercase">The Menu</span>
              </div>
              <h2
                className="text-4xl md:text-5xl text-foreground leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Signature pours,
                <br />
                <em className="not-italic text-primary">crafted with soul.</em>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Each drink is a small ritual. Served slow, meant to be savoured.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {MENU_ITEMS.map((item) => (
              <div key={item.name} className="bg-card group cursor-pointer overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between h-[calc(100%-75%)] min-h-[180px]">
                  <div>
                    <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-xl text-foreground mb-2 font-serif" style={{ fontFamily: "var(--font-display)" }}>
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/10">
                    <p className="text-lg text-primary font-serif" style={{ fontFamily: "var(--font-display)" }}>
                      {item.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="flex items-center gap-1.5 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm cursor-pointer font-bold"
                    >
                      <Plus size={11} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsFullMenuOpen(true)}
              className="border border-border text-muted-foreground text-[11px] tracking-[0.22em] uppercase px-10 py-4 hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-primary text-[11px] tracking-[0.4em] uppercase">The Experience</span>
            </div>
            <h2
              className="text-4xl md:text-5xl text-foreground max-w-xl leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The rooftop isn&apos;t just a view.{" "}
              <em className="not-italic text-primary">It&apos;s the feeling.</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="col-span-2 lg:col-span-1 bg-muted overflow-hidden min-h-[300px] lg:min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1638609313298-1a8f795d2894?w=700&h=950&fit=crop&auto=format"
                alt="Rooftop tables set under an open night sky"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
              />
            </div>
            <div className="bg-muted overflow-hidden min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1780064205176-098641bb1010?w=600&h=450&fit=crop&auto=format"
                alt="Monochromatic latte art in a white ceramic cup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center p-8 min-h-[220px] border border-primary/20">
              <div className="text-center">
                <p className="text-5xl md:text-6xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
                  7 pm
                </p>
                <p className="text-muted-foreground text-[11px] tracking-[0.3em] uppercase mt-3 leading-relaxed">
                  Golden hour<br />on the roof
                </p>
              </div>
            </div>
            <div className="bg-muted overflow-hidden min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1624583338957-4d155ca886dc?w=600&h=400&fit=crop&auto=format"
                alt="Warm wooden café interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
              />
            </div>
            <div className="bg-muted overflow-hidden min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1668723559445-c8a2441e99fc?w=600&h=400&fit=crop&auto=format"
                alt="Café exterior glowing at night"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
              />
            </div>
          </div>

          <div className="mt-16 border-t border-b border-border py-8 flex flex-wrap gap-x-10 gap-y-4 items-center justify-between">
            {["Specialty Coffee", "Rooftop Seating", "Live Evenings", "Book Nook", "Private Events"].map((tag) => (
              <span key={tag} className="text-muted-foreground text-[11px] tracking-[0.32em] uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VISIT ─── */}
      <section id="visit" className="py-28 md:py-40 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px bg-primary" />
                <span className="text-primary text-[11px] tracking-[0.4em] uppercase">Find Us</span>
              </div>
              <h2
                className="text-4xl md:text-5xl text-foreground mb-10 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Come up.<br />
                <em className="not-italic text-primary">We&apos;re waiting.</em>
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex gap-5 items-start">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium mb-1 tracking-wide">Location</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      3rd Floor, Landmark Building<br />
                      City Centre, Gwalior — 474001<br />
                      Madhya Pradesh, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium mb-2 tracking-wide">Hours</p>
                    <div className="text-muted-foreground text-sm space-y-1.5">
                      <div className="flex justify-between gap-12">
                        <span>Mon – Fri</span><span>9:00 am – 11:00 pm</span>
                      </div>
                      <div className="flex justify-between gap-12">
                        <span>Saturday</span><span>9:00 am – 12:00 am</span>
                      </div>
                      <div className="flex justify-between gap-12">
                        <span>Sunday</span><span>10:00 am – 11:00 pm</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-medium mb-1 tracking-wide">Call / WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+91 98000 00000</p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-12 bg-primary text-background text-[11px] tracking-[0.22em] uppercase px-10 py-4 hover:bg-primary/90 transition-colors"
              >
                Get Directions
              </a>
            </div>

            <div className="border border-border p-8 md:p-10 bg-background/40">
              <h3
                className="text-2xl text-foreground mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Reserve a Table
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                We&apos;ll hold a spot for you on the roof.
              </p>
              <form className="flex flex-col gap-5" onSubmit={handleReservationSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-muted-foreground block mb-2">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-muted-foreground block mb-2">
                      Guests
                    </label>
                    <select 
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] tracking-widest uppercase text-muted-foreground block mb-2">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-widest uppercase text-muted-foreground block mb-2">
                    Preferred Time
                  </label>
                  <select 
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-widest uppercase text-muted-foreground block mb-2">
                    Note (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests..."
                    value={resNote}
                    onChange={(e) => setResNote(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-background text-[11px] tracking-[0.22em] uppercase py-4 hover:bg-primary/90 transition-colors mt-2 cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap gap-6 justify-between items-center">
          <div>
            <p
              className="text-lg tracking-[0.25em] uppercase text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cafe By Soul
            </p>
            <p className="text-muted-foreground text-[11px] tracking-widest mt-1 uppercase">
              Coffee · Conversations · Rooftop Vibes
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <p className="text-muted-foreground text-[11px]">© 2025 Cafe By Soul</p>
          </div>
        </div>
      </footer>

      {/* ─── FULL INTERACTIVE DIGITAL MENU MODAL ─── */}
      {isFullMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col h-screen overflow-hidden animate-fade-in">
          {/* Modal Header */}
          <header className="border-b border-border py-4 px-6 md:px-12 flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFullMenuOpen(false)}
                className="flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-muted-foreground hover:text-primary transition-colors border border-border/40 hover:border-primary rounded-full px-3 py-2 bg-background"
                aria-label="Go back to main page"
              >
                <ArrowDown size={14} className="rotate-90" />
                Back
              </button>
              <div className="flex items-center gap-2">
                <Coffee className="text-primary w-5 h-5 animate-pulse" />
                <h2 className="text-xl md:text-2xl font-serif text-foreground tracking-wide">
                  The Digital Menu
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-muted-foreground hover:text-primary transition-colors border border-border/40 hover:border-primary rounded-full bg-background"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background font-sans font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </header>

          {/* Controls: Search and Categories */}
          <div className="p-6 md:px-12 bg-card/60 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search our brews, desserts, savories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors rounded-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase text-muted-foreground hover:text-primary"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Categories Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs tracking-wider uppercase rounded-full whitespace-nowrap transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-primary text-background border-primary"
                      : "bg-transparent text-muted-foreground border-border/40 hover:text-foreground hover:border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Menu Items Grid */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 bg-background/50">
            <div className="max-w-7xl mx-auto">
              {filteredMenuItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenuItems.map((item, index) => (
                    <div 
                      key={item.name + index} 
                      className="bg-card/70 border border-border/30 hover:border-primary/40 rounded-sm p-4 flex gap-4 transition-all duration-300 group hover:bg-card hover:-translate-y-0.5"
                    >
                      {/* Item Image */}
                      <div className="w-24 h-24 rounded-sm overflow-hidden bg-muted shrink-0 relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Item Info */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-lg text-foreground truncate group-hover:text-primary transition-colors">
                              {item.name}
                            </h4>
                            <span className="font-serif text-primary shrink-0 text-base">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed mt-1 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        {/* Tags and Add Button */}
                        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-border/10">
                          <div className="flex flex-wrap gap-1 max-w-[70%]">
                            <span className="text-[9px] uppercase tracking-widest text-primary/80 bg-primary/5 px-2 py-0.5 rounded-sm truncate">
                              {item.category.split(" ")[0]}
                            </span>
                            {item.tags.slice(0, 1).map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[9px] uppercase tracking-widest text-muted-foreground/70 bg-secondary/50 px-1.5 py-0.5 rounded-sm truncate"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className="flex items-center justify-center bg-primary text-background hover:bg-primary/90 transition-colors duration-300 p-2 rounded-sm cursor-pointer shrink-0"
                            aria-label={`Add ${item.name} to cart`}
                            title={`Add ${item.name} to cart`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 max-w-sm mx-auto">
                  <Utensils className="text-muted-foreground/30 w-12 h-12 mx-auto mb-4" />
                  <p className="text-foreground font-serif text-lg">No items found</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Try searching for something else or browse different categories.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="mt-6 text-xs tracking-widest uppercase border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-background transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Footnote */}
          <footer className="border-t border-border/40 py-4 px-6 text-center bg-card text-xs text-muted-foreground shrink-0">
            <p>Prices are exclusive of applicable taxes. Please inform our servers of any allergy requirements.</p>
          </footer>
        </div>
      )}

      {/* ─── RESERVATION CONFIRMATION MODAL ─── */}
      {isReservationSuccess && (
        <div className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border border-primary max-w-md w-full p-8 text-center rounded-sm relative shadow-2xl">
            <button 
              onClick={() => setIsReservationSuccess(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:scale-110 transition-transform"
            >
              <X size={18} />
            </button>
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="text-primary w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-2">Request Prepared</h3>
            <p className="text-muted-foreground text-xs mb-6 leading-relaxed">
              We have compiled your reservation request. Click below to submit and instantly confirm your rooftop table with our staff on WhatsApp.
            </p>
            
            {reservationData && (
              <>
                <div className="bg-background border border-border/40 p-4 mb-6 text-left rounded-sm space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-wider">Host</span>
                    <span className="text-foreground font-medium">{reservationData.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-wider">Guests</span>
                    <span className="text-foreground font-medium">{reservationData.guests} {reservationData.guests === "1" ? "Guest" : "Guests"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-wider">Date</span>
                    <span className="text-foreground font-medium">{reservationData.date}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-wider">Time</span>
                    <span className="text-foreground font-medium">{reservationData.time}</span>
                  </div>
                  {reservationData.note && (
                    <div className="pt-2 border-t border-border/10 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Note:</span> {reservationData.note}
                    </div>
                  )}
                </div>

                <a
                  href={`https://wa.me/918318647139?text=${encodeURIComponent(
                    `☕ *NEW RESERVATION — CAFE BY SOUL* ☕\n--------------------------------\n👤 *Name:* ${reservationData.name}\n👥 *Guests:* ${reservationData.guests}\n📅 *Date:* ${reservationData.date}\n⏰ *Time:* ${reservationData.time}\n💬 *Note:* ${reservationData.note || "None"}\n--------------------------------\n📱 _Rooftop reservation request sent via portal_`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsReservationSuccess(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black text-xs font-bold uppercase tracking-widest py-3.5 rounded-sm hover:bg-[#20ba59] transition-colors mb-4 cursor-pointer"
                >
                  Confirm on WhatsApp
                </a>
              </>
            )}

            <button
              onClick={() => setIsReservationSuccess(false)}
              className="text-muted-foreground hover:text-foreground text-[10px] tracking-[0.2em] uppercase cursor-pointer"
            >
              Cancel / Close
            </button>
          </div>
        </div>
      )}

      {/* ─── INTERACTIVE CART DRAWER ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] bg-background/80 backdrop-blur-sm flex justify-end">
          {/* Overlay click closes cart */}
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />
          
          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col shadow-2xl animate-slide-in-right z-10">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-background/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary w-5 h-5" />
                <h3 className="text-xl font-serif text-foreground tracking-wide">Your Order</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 border border-border/40 rounded-full hover:border-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.name} className="flex gap-4 bg-background/40 p-3 border border-border/20 rounded-sm">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-sm overflow-hidden bg-muted shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-sm font-serif text-foreground truncate">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.name)}
                            className="text-muted-foreground hover:text-destructive p-0.5"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-primary text-xs font-serif mt-0.5">{item.price}</p>
                      </div>
                      
                      {/* Qty counter */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border/60 rounded-sm overflow-hidden bg-background">
                          <button 
                            onClick={() => updateCartQty(item.name, -1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-3 py-1 text-xs text-foreground font-sans font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQty(item.name, 1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-xs text-muted-foreground font-sans">
                          Subtotal: ₹{parsePrice(item.price) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 text-muted-foreground">
                  <ShoppingBag size={40} className="stroke-1 text-muted-foreground/30 mb-3" />
                  <p className="text-sm">Your order list is empty.</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Add items from our Signature section or the digital menu!</p>
                </div>
              )}
            </div>

            {/* Checkout Form (only if items in cart) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-background/50 space-y-4 shrink-0">
                {/* Table Number */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5 font-bold">
                    Table / Seating Spot
                  </label>
                  <select 
                    value={cartTableNumber}
                    onChange={(e) => setCartTableNumber(e.target.value)}
                    className="w-full bg-card border border-border px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                  >
                    <option value="Rooftop Table 1">Rooftop Table 1</option>
                    <option value="Rooftop Table 2">Rooftop Table 2</option>
                    <option value="Rooftop Table 3">Rooftop Table 3</option>
                    <option value="Rooftop Table 4">Rooftop Table 4</option>
                    <option value="Rooftop Table 5">Rooftop Table 5</option>
                    <option value="Corner Cabin">Corner Cabin</option>
                    <option value="Balcony View Bar">Balcony View Bar</option>
                    <option value="Indoor Sofa Lounge">Indoor Sofa Lounge</option>
                    <option value="Takeaway / Ground Floor">Takeaway / Ground Floor</option>
                  </select>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5 font-bold">
                    Your Name
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={cartCustomerName}
                    onChange={(e) => setCartCustomerName(e.target.value)}
                    className="w-full bg-card border border-border px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors rounded-sm placeholder:text-muted-foreground/30"
                  />
                </div>

                {/* Pricing Summary */}
                <div className="pt-2 border-t border-border/40 space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Items Total</span>
                    <span>₹{cartTotalPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>CGST + SGST</span>
                    <span className="text-[10px] tracking-wider uppercase text-primary font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground font-serif pt-1.5 border-t border-border/20">
                    <span>Grand Total</span>
                    <span className="text-primary font-bold">₹{cartTotalPrice}</span>
                  </div>
                </div>

                {/* WhatsApp Order Action */}
                <a
                  href={getCheckoutWhatsAppUrl()}
                  onClick={handleCheckoutClick}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 text-center text-background text-[11px] tracking-[0.2em] uppercase py-3.5 transition-all font-bold rounded-sm ${
                    cartCustomerName.trim().length > 0 
                      ? "bg-primary hover:bg-primary/90 cursor-pointer shadow-lg" 
                      : "bg-primary/40 cursor-not-allowed text-background/60"
                  }`}
                >
                  Send Order via WhatsApp
                </a>
                <p className="text-[9px] text-center text-muted-foreground/70 leading-normal">
                  Order gets forwarded to +91 8318647139 with pricing calculations and seating details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


