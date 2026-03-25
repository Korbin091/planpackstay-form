import React, { useState, useRef, useEffect } from "react";

const A = "#4993B1";
const D = "#1a1a2e";
const G = "#c9a96e";

const STYLES = [
  { id: "solo", label: "Solo Traveler", icon: "🙋🏽‍♂️", desc: "Safe travel & solo experiences" },
  { id: "group", label: "Group Activities", icon: "👥", desc: "Group activities & daytime events" },
  { id: "outdoors", label: "Outdoors", icon: "🏔️", desc: "Hiking, nature, gardens" },
  { id: "luxury", label: "Luxury", icon: "✨", desc: "Upscale, premium, spas" },
  { id: "foodie", label: "Foodie", icon: "🍽️", desc: "Best rated restaurants" },
  { id: "budget", label: "Budget", icon: "💰", desc: "Affordable, efficient" },
  { id: "party", label: "Party", icon: "🎉", desc: "Nightlife, social, high energy" },
  { id: "romantic", label: "Romantic", icon: "💕", desc: "Intimate, scenic, date nights" },
  { id: "lgbtq", label: "LGBTQ+", icon: "🏳️‍🌈", desc: "Inclusive & queer-friendly" },
  { id: "creator", label: "Content Creator", icon: "📸", desc: "Aesthetic & photogenic spots" },
  { id: "onthego", label: "On-the-Go", icon: "🏃🏽‍♀️", desc: "Public transport, fast-paced" },
  { id: "slow", label: "Take my Time", icon: "🚶🏻", desc: "Slower travel, fewer spots/day" },
  { id: "senior", label: "Senior/ADA Travelers", icon: "👵🏼", desc: "Accessible, sit-down dining" },
  { id: "tours", label: "Tours", icon: "🚌", desc: "Walking or bus tours, all ages" },
  { id: "museum", label: "Museum Junky", icon: "🏛️", desc: "Popular arts & history museums" },
];

const CUISINES = [
  "Italian", "Mexican", "Japanese", "Chinese", "Thai", "Indian", "Mediterranean",
  "French", "Korean", "Vietnamese", "Greek", "Spanish", "Middle Eastern", "Caribbean",
  "American", "Brazilian", "Ethiopian", "Peruvian", "Turkish", "Moroccan",
  "Seafood", "BBQ", "Street Food", "Fine Dining", "Pastries & Bakeries", "Traditional",
];

const DIETARY = ["None", "Vegan", "Vegetarian", "Gluten-Free", "Halal", "Kosher", "Dairy-Free", "Nut-Free"];
const CAFE = ["None", "☕ Coffee", "🍵 Tea", "🧋 Boba / Bubble Tea", "🥤 Juice & Smoothies"];
const DESSERTS = ["None", "🍦 Ice Cream / Gelato", "🧁 Cupcakes & Cakes", "🍫 Chocolate", "🥐 Croissants & Pastries", "🍩 Donuts", "🍡 Local Sweets"];

const CITIES = [
  "Philadelphia, PA, USA","New York, NY, USA","Los Angeles, CA, USA","Chicago, IL, USA","Miami, FL, USA","San Francisco, CA, USA","Boston, MA, USA","Washington, DC, USA","Seattle, WA, USA","Denver, CO, USA","Austin, TX, USA","Nashville, TN, USA","Atlanta, GA, USA","Portland, OR, USA","San Diego, CA, USA","Houston, TX, USA","Dallas, TX, USA","Minneapolis, MN, USA","Detroit, MI, USA","Charlotte, NC, USA","Las Vegas, NV, USA","New Orleans, LA, USA","Phoenix, AZ, USA","Honolulu, HI, USA","Orlando, FL, USA","Salt Lake City, UT, USA","Pittsburgh, PA, USA","San Antonio, TX, USA",
  "Toronto, Canada","Vancouver, Canada","Montréal, Canada","Calgary, Canada","Ottawa, Canada","Québec City, Canada","Victoria, Canada",
  "Cancún, Mexico","Mexico City, Mexico","Guadalajara, Mexico","Oaxaca, Mexico","Puerto Vallarta, Mexico","Tulum, Mexico",
  "São Paulo, Brazil","Rio de Janeiro, Brazil","Buenos Aires, Argentina","Medellín, Colombia","Lima, Peru","Bogotá, Colombia","Cartagena, Colombia","Santiago, Chile","Cusco, Peru","Quito, Ecuador","Montevideo, Uruguay",
  "San Juan, Puerto Rico","Havana, Cuba","Nassau, Bahamas","Punta Cana, Dominican Republic","Aruba","St. Lucia",
  "London, United Kingdom","Paris, France","Rome, Italy","Barcelona, Spain","Lisbon, Portugal","Amsterdam, Netherlands","Berlin, Germany","Prague, Czech Republic","Vienna, Austria","Dublin, Ireland","Athens, Greece","Budapest, Hungary","Copenhagen, Denmark","Stockholm, Sweden","Zurich, Switzerland","Edinburgh, Scotland","Porto, Portugal","Seville, Spain","Nice, France","Munich, Germany","Florence, Italy","Milan, Italy","Venice, Italy","Bruges, Belgium","Oslo, Norway","Helsinki, Finland","Dubrovnik, Croatia","Santorini, Greece","Amalfi Coast, Italy","Cinque Terre, Italy","Reykjavik, Iceland","Brussels, Belgium","Lyon, France","Madrid, Spain","Valencia, Spain","Granada, Spain","Naples, Italy","Salzburg, Austria","Hamburg, Germany","Geneva, Switzerland","Tallinn, Estonia","Riga, Latvia","Vilnius, Lithuania","Malta","Split, Croatia","Zagreb, Croatia","Ljubljana, Slovenia","Bratislava, Slovakia","Mykonos, Greece","Crete, Greece","Sicily, Italy","Monaco",
  "Moscow, Russia","St. Petersburg, Russia","Kazan, Russia","Sochi, Russia","Vladivostok, Russia","Kyiv, Ukraine","Lviv, Ukraine","Warsaw, Poland","Kraków, Poland","Gdańsk, Poland","Bucharest, Romania","Sofia, Bulgaria","Belgrade, Serbia","Sarajevo, Bosnia","Tirana, Albania","Kotor, Montenegro","Tbilisi, Georgia","Batumi, Georgia","Yerevan, Armenia","Baku, Azerbaijan","Minsk, Belarus","Tashkent, Uzbekistan","Samarkand, Uzbekistan","Almaty, Kazakhstan","Astana, Kazakhstan",
  "Istanbul, Turkey","Antalya, Turkey","Cappadocia, Turkey","Dubai, UAE","Abu Dhabi, UAE","Doha, Qatar","Amman, Jordan","Petra, Jordan","Beirut, Lebanon","Tel Aviv, Israel","Jerusalem, Israel","Riyadh, Saudi Arabia",
  "Tokyo, Japan","Seoul, South Korea","Bangkok, Thailand","Bali, Indonesia","Singapore","Hong Kong","Taipei, Taiwan","Kyoto, Japan","Osaka, Japan","Hanoi, Vietnam","Ho Chi Minh City, Vietnam","Kuala Lumpur, Malaysia","Manila, Philippines","Siem Reap, Cambodia","Chiang Mai, Thailand","Phuket, Thailand","Jakarta, Indonesia","Colombo, Sri Lanka","Kathmandu, Nepal","Beijing, China","Shanghai, China","Shenzhen, China","Macau","New Delhi, India","Mumbai, India","Jaipur, India","Goa, India",
  "Cape Town, South Africa","Johannesburg, South Africa","Nairobi, Kenya","Marrakech, Morocco","Cairo, Egypt","Casablanca, Morocco","Fez, Morocco","Accra, Ghana","Lagos, Nigeria","Addis Ababa, Ethiopia","Zanzibar, Tanzania","Kigali, Rwanda","Dakar, Senegal",
  "Sydney, Australia","Melbourne, Australia","Brisbane, Australia","Perth, Australia","Auckland, New Zealand","Queenstown, New Zealand","Wellington, New Zealand","Fiji","Tahiti, French Polynesia",
];

const getCurrency = (city) => {
  if (!city) return { symbol: "$", code: "USD" };
  const c = city.toLowerCase();
  if (c.includes("usa") || c.match(/, (pa|ny|ca|tx|fl|il|wa|ma|co|ga|or|tn|nc|mn|mi|oh|nv|la|az|hi|ak|ut|mo|in|md|va|ct|nj|sc|al|ky|wi|ia|ms|ar|ne|ks|nm|ok|wv|id|nh|me|mt|ri|de|sd|nd|vt|wy|dc), /i) || c.match(/, (pa|ny|ca|tx|fl|il|wa|ma|co|ga|or|tn|nc|mn|mi|oh|nv|la|az|hi|ak|ut|mo|in|md|va|ct|nj|sc|al|ky|wi|ia|ms|ar|ne|ks|nm|ok|wv|id|nh|me|mt|ri|de|sd|nd|vt|wy|dc)$/i)) return { symbol: "$", code: "USD" };
  if (c.includes("united kingdom") || c.includes("scotland") || c.includes("london") || c.includes("edinburgh")) return { symbol: "£", code: "GBP" };
  if (c.includes("japan") || c.includes("tokyo") || c.includes("kyoto")) return { symbol: "¥", code: "JPY" };
  if (c.includes("korea") || c.includes("seoul")) return { symbol: "₩", code: "KRW" };
  if (c.includes("australia") || c.includes("sydney") || c.includes("melbourne")) return { symbol: "A$", code: "AUD" };
  if (c.includes("canada") || c.includes("toronto") || c.includes("vancouver") || c.includes("montréal")) return { symbol: "C$", code: "CAD" };
  if (c.includes("mexico") || c.includes("cancún")) return { symbol: "MX$", code: "MXN" };
  if (c.includes("brazil") || c.includes("são paulo") || c.includes("rio")) return { symbol: "R$", code: "BRL" };
  if (c.includes("russia") || c.includes("moscow") || c.includes("st. petersburg") || c.includes("kazan") || c.includes("sochi") || c.includes("vladivostok")) return { symbol: "₽", code: "RUB" };
  if (c.includes("turkey") || c.includes("istanbul") || c.includes("antalya") || c.includes("cappadocia")) return { symbol: "₺", code: "TRY" };
  if (c.includes("poland") || c.includes("warsaw") || c.includes("kraków") || c.includes("gdańsk") || c.includes("wrocław")) return { symbol: "zł", code: "PLN" };
  if (c.includes("georgia") || c.includes("tbilisi") || c.includes("batumi")) return { symbol: "₾", code: "GEL" };
  if (c.includes("armenia") || c.includes("yerevan")) return { symbol: "֏", code: "AMD" };
  if (c.includes("azerbaijan") || c.includes("baku")) return { symbol: "₼", code: "AZN" };
  if (c.includes("ukraine") || c.includes("kyiv") || c.includes("lviv") || c.includes("odessa")) return { symbol: "₴", code: "UAH" };
  if (c.includes("romania") || c.includes("bucharest") || c.includes("cluj")) return { symbol: "lei", code: "RON" };
  if (c.includes("bulgaria") || c.includes("sofia")) return { symbol: "лв", code: "BGN" };
  if (c.includes("serbia") || c.includes("belgrade")) return { symbol: "din", code: "RSD" };
  if (c.includes("czech") || c.includes("prague")) return { symbol: "Kč", code: "CZK" };
  if (c.includes("kazakhstan") || c.includes("almaty") || c.includes("astana")) return { symbol: "₸", code: "KZT" };
  if (c.includes("uzbekistan") || c.includes("tashkent") || c.includes("samarkand")) return { symbol: "сўм", code: "UZS" };
  if (c.includes("qatar") || c.includes("doha")) return { symbol: "QR", code: "QAR" };
  if (c.includes("jordan") || c.includes("amman") || c.includes("petra")) return { symbol: "JD", code: "JOD" };
  if (c.includes("israel") || c.includes("tel aviv") || c.includes("jerusalem")) return { symbol: "₪", code: "ILS" };
  if (c.includes("saudi") || c.includes("riyadh") || c.includes("jeddah")) return { symbol: "SAR", code: "SAR" };
  if (c.includes("lebanon") || c.includes("beirut")) return { symbol: "L£", code: "LBP" };
  if (c.includes("chile") || c.includes("santiago")) return { symbol: "CLP$", code: "CLP" };
  if (c.includes("cuba") || c.includes("havana")) return { symbol: "CUP$", code: "CUP" };
  if (c.includes("puerto rico") || c.includes("san juan")) return { symbol: "$", code: "USD" };
  if (c.includes("china") || c.includes("beijing") || c.includes("shanghai") || c.includes("shenzhen") || c.includes("chengdu") || c.includes("guangzhou")) return { symbol: "¥", code: "CNY" };
  if (c.includes("nepal") || c.includes("kathmandu")) return { symbol: "Rs", code: "NPR" };
  if (c.includes("sri lanka") || c.includes("colombo")) return { symbol: "Rs", code: "LKR" };
  if (c.includes("cambodia") || c.includes("siem reap") || c.includes("phnom penh")) return { symbol: "៛", code: "KHR" };
  if (c.includes("vietnam") || c.includes("hanoi") || c.includes("ho chi minh")) return { symbol: "₫", code: "VND" };
  if (c.includes("ghana") || c.includes("accra")) return { symbol: "₵", code: "GHS" };
  if (c.includes("nigeria") || c.includes("lagos")) return { symbol: "₦", code: "NGN" };
  if (c.includes("ethiopia") || c.includes("addis")) return { symbol: "Br", code: "ETB" };
  if (c.includes("tanzania") || c.includes("zanzibar") || c.includes("dar es salaam")) return { symbol: "TSh", code: "TZS" };
  if (c.includes("rwanda") || c.includes("kigali")) return { symbol: "RF", code: "RWF" };
  if (c.includes("senegal") || c.includes("dakar")) return { symbol: "CFA", code: "XOF" };
  if (c.includes(", india") || c.includes("new delhi") || c.includes("mumbai") || c.includes("jaipur") || c.includes("goa,") || c.includes("bangalore") || c.includes("kolkata")) return { symbol: "₹", code: "INR" };
  if (c.includes("uae") || c.includes("dubai")) return { symbol: "د.إ", code: "AED" };
  if (c.includes("thailand") || c.includes("bangkok")) return { symbol: "฿", code: "THB" };
  if (c.includes("indonesia") || c.includes("bali")) return { symbol: "Rp", code: "IDR" };
  if (c.includes("philippines") || c.includes("manila")) return { symbol: "₱", code: "PHP" };
  if (c.includes("malaysia") || c.includes("kuala")) return { symbol: "RM", code: "MYR" };
  if (c.includes("taiwan") || c.includes("taipei")) return { symbol: "NT$", code: "TWD" };
  if (c.includes("south africa") || c.includes("cape town")) return { symbol: "R", code: "ZAR" };
  if (c.includes("kenya") || c.includes("nairobi")) return { symbol: "KSh", code: "KES" };
  if (c.includes("morocco") || c.includes("marrakech")) return { symbol: "MAD", code: "MAD" };
  if (c.includes("egypt") || c.includes("cairo")) return { symbol: "E£", code: "EGP" };
  if (c.includes("colombia") || c.includes("medellín") || c.includes("bogotá") || c.includes("cartagena")) return { symbol: "COP$", code: "COP" };
  if (c.includes("peru") || c.includes("lima")) return { symbol: "S/", code: "PEN" };
  if (c.includes("argentina") || c.includes("buenos aires")) return { symbol: "AR$", code: "ARS" };
  if (c.includes("new zealand") || c.includes("auckland") || c.includes("queenstown")) return { symbol: "NZ$", code: "NZD" };
  if (c.includes("singapore") || c.includes("hong kong")) return { symbol: c.includes("hong") ? "HK$" : "S$", code: c.includes("hong") ? "HKD" : "SGD" };
  if (c.includes("iceland") || c.includes("reykjavik")) return { symbol: "kr", code: "ISK" };
  if (c.includes("denmark") || c.includes("copenhagen")) return { symbol: "kr", code: "DKK" };
  if (c.includes("sweden") || c.includes("stockholm")) return { symbol: "kr", code: "SEK" };
  if (c.includes("norway") || c.includes("oslo")) return { symbol: "kr", code: "NOK" };
  if (c.includes("switzerland") || c.includes("zurich")) return { symbol: "CHF", code: "CHF" };
  // Default to EUR for European cities
  if (c.includes("france") || c.includes("paris") || c.includes("nice") || c.includes("italy") || c.includes("rome") || c.includes("florence") || c.includes("milan") || c.includes("venice") || c.includes("amalfi") || c.includes("cinque") || c.includes("spain") || c.includes("barcelona") || c.includes("seville") || c.includes("portugal") || c.includes("lisbon") || c.includes("porto") || c.includes("netherlands") || c.includes("amsterdam") || c.includes("germany") || c.includes("berlin") || c.includes("munich") || c.includes("czech") || c.includes("prague") || c.includes("austria") || c.includes("vienna") || c.includes("ireland") || c.includes("dublin") || c.includes("greece") || c.includes("athens") || c.includes("santorini") || c.includes("hungary") || c.includes("budapest") || c.includes("croatia") || c.includes("dubrovnik") || c.includes("belgium") || c.includes("bruges") || c.includes("finland") || c.includes("helsinki")) return { symbol: "€", code: "EUR" };
  return { symbol: "$", code: "USD" };
};

function Logo({ size = 44 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: D, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ textAlign: "center", lineHeight: 1.05 }}>
        <div style={{ color: "#999", fontSize: size * 0.17, fontWeight: 900, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>PLAN</div>
        <div style={{ color: "#ccc", fontSize: size * 0.17, fontWeight: 900, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>PACK</div>
        <div style={{ color: A, fontSize: size * 0.19, fontWeight: 900, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>STAY</div>
      </div>
    </div>
  );
}

function Autocomplete({ value, onChange, placeholder, style: sx }) {
  const [sug, setSug] = useState([]);
  const [show, setShow] = useState(false);
  const wr = useRef(null);
  useEffect(() => {
    const h = (e) => { if (wr.current && !wr.current.contains(e.target)) setShow(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const handle = (v) => {
    onChange(v);
    if (v.length >= 2) {
      const l = v.toLowerCase();
      const m = CITIES.filter(c => c.toLowerCase().includes(l)).slice(0, 6);
      setSug(m); setShow(m.length > 0);
    } else setShow(false);
  };
  return (
    <div ref={wr} style={{ position: "relative" }}>
      <input type="text" value={value} placeholder={placeholder} onChange={e => handle(e.target.value)}
        onFocus={() => { if (sug.length) setShow(true); }} style={sx} />
      {show && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: "0 0 12px 12px", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: 220, overflowY: "auto" }}>
          {sug.map(s => (
            <div key={s} onClick={() => { onChange(s); setShow(false); }}
              style={{ padding: "13px 20px", cursor: "pointer", fontSize: 14, color: D, borderBottom: "1px solid #f5f5f5", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0f7fa"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <span style={{ color: A, marginRight: 8 }}>📍</span>{s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const STEPS = [
  { label: "You", icon: "🗿" },
  { label: "Trip", icon: "✈️" },
  { label: "Food", icon: "🍽️" },
  { label: "Style", icon: "🏝️" },
  { label: "Details", icon: "🗺️" },
];

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [foodTab, setFoodTab] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", departing: "", destination: "",
    dateStart: "", dateEnd: "", travelers: 2, budget: "",
    food: [], dietary: [], cafe: [], desserts: [],
    interests: "", styles: [],
  });

  const today = new Date().toISOString().split("T")[0];
  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const tog = (k, v) => setForm(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const cur = getCurrency(form.departing);

  const ok = () => {
    if (step === 0) return form.firstName.trim().length > 0;
    if (step === 1) return form.departing.trim().length > 0 && form.destination.trim().length > 0 && form.dateStart && form.dateEnd && form.budget;
    if (step === 2) return form.food.length > 0 || form.cafe.length > 0;
    if (step === 3) return form.styles.length > 0;
    return true;
  };

  const submit = () => {
    const out = { ...form, food: [...form.food, ...form.dietary, ...form.cafe, ...form.desserts], currency: cur };
    console.log("Form submitted:", JSON.stringify(out, null, 2));
    setDone(true);
  };
 const submit = () => {
    const out = { ...form, food: [...form.food, ...form.dietary, ...form.cafe, ...form.desserts], currency: cur };

    // Send to Make.com — replace YOUR_WEBHOOK_URL_HERE with your actual webhook URL
    fetch("https://hook.us1.make.com/https://hook.us2.make.com/xrz94v8yy3zio73crz1hlfjkhfe5qrvt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(out)
    }).catch(err => console.error("Webhook error:", err));

    setDone(true);
  };
  const inp = {
    width: "100%", padding: "14px 18px", borderRadius: 12, border: "2px solid #e8e8e8",
    fontSize: 16, fontFamily: "'Source Sans 3',sans-serif", color: D, background: "#fff",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const inpFocus = (e) => { e.target.style.borderColor = A; e.target.style.boxShadow = `0 0 0 3px ${A}22`; };
  const inpBlur = (e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; };
  const lbl = { fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, display: "block" };

  const Pill = ({ label, on, click }) => (
    <button onClick={click} style={{
      padding: "10px 18px", borderRadius: 24, border: on ? `2px solid ${A}` : "2px solid #e8e8e8",
      background: on ? `${A}15` : "#fff", color: on ? A : "#777",
      fontSize: 14, fontWeight: on ? 700 : 500, cursor: "pointer", transition: "all 0.2s",
      fontFamily: "'Source Sans 3',sans-serif",
    }}>{label}</button>
  );


  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(170deg, ${D} 0%, #1e3448 40%, ${A} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40, fontFamily: "'Source Sans 3',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700;800;900&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <div style={{ fontSize: 72, marginBottom: 12, animation: "pop .5s ease" }}>🛫</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.7)", margin: "0 0 8px", letterSpacing: 1 }}>And we're off!</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,40px)", color: "#fff", fontWeight: 800, margin: "0 0 12px" }}>Your Guide is Being Built!</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(13px,2.2vw,17px)", maxWidth: 620, lineHeight: 1.7, margin: "0 0 36px" }}>
          Hey {form.firstName}, wait a moment while we craft your personalized Complete Travel Guide to {form.destination}.
        </p>
        <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "28px 32px", maxWidth: 420, width: "100%", textAlign: "left" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 14 }}>Trip Summary</div>
          {[{ l: "Destination", v: form.destination },{ l: "Dates", v: `${form.dateStart} → ${form.dateEnd}` },{ l: "Travelers", v: form.travelers },{ l: "Budget", v: `${cur.symbol}${form.budget} ${cur.code}` },{ l: "Styles", v: form.styles.join(", ") }].map(x => (
            <div key={x.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{x.l}</span>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{x.v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Logo size={40} />
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#fff", fontSize: 16, letterSpacing: 2 }}>PLANPACKSTAY</span>
        </div>
        <style>{`@keyframes pop{0%{transform:scale(0) rotate(-20deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFE", fontFamily: "'Source Sans 3',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700;800;900&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style>{`input[type="date"]::-webkit-calendar-picker-indicator{cursor:pointer;} input[type="date"]::-webkit-datetime-edit{padding:0;} ::-webkit-datetime-edit-fields-wrapper{border-radius:15px;}`}</style>

      {/* Header */}
      <div style={{ background: D, padding: "28px 28px 24px", position: "relative" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4.5vw,34px)", fontWeight: 800, color: "#fff", margin: 0, textAlign: "center", lineHeight: 1.25, width: "auto" }}>
            Let's Build Your Travel Guide
          </h1>
          <div style={{ width: "100%", maxWidth: 460, textAlign: "right", marginTop: 4 }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontStyle: "italic", fontFamily: "'Source Sans 3',sans-serif" }}>powered by Sasquatch 2.0</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div style={{ position: "absolute", top: 22, left: 28, right: 28, height: 2, background: "#e8e8e8", borderRadius: 2, zIndex: 0 }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${A}, ${G})`, borderRadius: 2, width: `${(step / (STEPS.length - 1)) * 100}%`, transition: "width 0.5s cubic-bezier(.4,0,.2,1)" }} />
          </div>
          {STEPS.map((st, i) => (
            <div key={st.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, zIndex: 1, cursor: i < step ? "pointer" : "default" }} onClick={() => { if (i < step) setStep(i); }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: i < step ? A : i === step ? "#fff" : "#f5f5f5",
                border: i === step ? `3px solid ${A}` : i < step ? `2px solid ${A}` : "2px solid #ddd",
                color: i < step ? "#fff" : i === step ? A : "#bbb",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 19, transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
                boxShadow: i === step ? `0 0 0 6px ${A}18` : "none",
              }}>{st.icon}</div>
              <span style={{ fontSize: 10, fontWeight: i <= step ? 700 : 500, color: i <= step ? A : "#bbb", textTransform: "uppercase", letterSpacing: 1.5 }}>{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 20px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 2px 4px rgba(0,0,0,0.02), 0 12px 48px rgba(73,147,177,0.08)", border: "1px solid #eef3f6" }}>

          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: D, margin: "0 0 6px" }}>About You</h2>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 32px" }}>We'll personalize your guide with your name.</p>
              <label style={lbl}>First Name *</label>
              <input type="text" placeholder="e.g. Sarah" value={form.firstName}
                onChange={e => s("firstName", e.target.value)} style={inp} onFocus={inpFocus} onBlur={inpBlur} />
              <div style={{ marginTop: 28, padding: "18px 20px", borderRadius: 14, background: "#f8fafb", border: "1px solid #e8eff3" }}>
                <p style={{ color: "#aaa", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                  Free members get an online-only preview guide.<br />
                  <a href="https://planpackstay.com/membership" target="_blank" rel="noopener noreferrer" style={{ color: A, fontWeight: 600, textDecoration: "none" }}>Upgrade to Passport Pro ($9.99/mo)</a> for downloadable PDFs,<br />
                  Notion guides, and unlimited requests.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: D, margin: "0 0 6px" }}>Your Trip</h2>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 32px" }}>Where are you headed and when?</p>
              <label style={lbl}>Departing From *</label>
              <Autocomplete value={form.departing} onChange={v => s("departing", v)} placeholder="e.g. Philadelphia, PA, USA" style={{ ...inp, marginBottom: 20 }} />
              <label style={lbl}>Destination *</label>
              <Autocomplete value={form.destination} onChange={v => s("destination", v)} placeholder="e.g. Lisbon, Portugal" style={{ ...inp, marginBottom: 20 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div><label style={lbl}>Depart Date *</label><input type="date" value={form.dateStart} min={today} onChange={e => s("dateStart", e.target.value)} style={inp} /></div>
                <div><label style={lbl}>Return Date *</label><input type="date" value={form.dateEnd} min={form.dateStart || today} onChange={e => s("dateEnd", e.target.value)} style={inp} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={lbl}>Travelers</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <button onClick={() => s("travelers", Math.max(1, form.travelers - 1))} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${A}`, background: "#fff", color: A, fontSize: 22, fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = `${A}10`} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>−</button>
                    <span style={{ fontSize: 26, fontWeight: 800, color: D, minWidth: 30, textAlign: "center", fontFamily: "'Playfair Display',serif" }}>{form.travelers}</span>
                    <button onClick={() => s("travelers", form.travelers + 1)} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${A}`, background: "#fff", color: A, fontSize: 22, fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = `${A}10`} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>+</button>
                  </div>
                </div>
                <div>
                  <label style={lbl}>Total Budget ({cur.code}) *</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 16, top: 14, fontSize: 16, color: "#999", fontWeight: 700 }}>{cur.symbol}</span>
                    <input type="number" placeholder="3500" value={form.budget}
                      onChange={e => s("budget", e.target.value)}
                      style={{ ...inp, paddingLeft: cur.symbol.length > 1 ? 48 : 32 }} onFocus={inpFocus} onBlur={inpBlur} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: D, margin: "0 0 6px" }}>Food & Drink</h2>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 16px" }}>What cuisines and preferences should we plan for?</p>
              <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
                {["Cuisines", "Dietary Preferences"].map((t, i) => (
                  <button key={t} onClick={() => setFoodTab(i)} style={{
                    flex: 1, padding: "13px 8px", border: "none",
                    borderBottom: foodTab === i ? `3px solid ${A}` : "3px solid #e8e8e8",
                    background: foodTab === i ? "#fff" : "#f8f8f8",
                    color: foodTab === i ? A : "#aaa", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", borderRadius: i === 0 ? "12px 0 0 0" : "0 12px 0 0", transition: "all 0.2s"
                  }}>{t}</button>
                ))}
              </div>
              {foodTab === 0 && (
                <div>
                  <p style={{ color: A, fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>Select cuisines · {form.food.length} selected</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {CUISINES.map(f => <Pill key={f} label={f} on={form.food.includes(f)} click={() => tog("food", f)} />)}
                  </div>
                </div>
              )}
              {foodTab === 1 && (
                <div>
                  <p style={{ color: "#888", fontSize: 13, fontWeight: 700, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Dietary Restrictions</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {DIETARY.map(d => <Pill key={d} label={d} on={form.dietary.includes(d)} click={() => tog("dietary", d)} />)}
                  </div>
                  <p style={{ color: "#888", fontSize: 13, fontWeight: 700, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Café Preferences</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {CAFE.map(c => <Pill key={c} label={c} on={form.cafe.includes(c)} click={() => tog("cafe", c)} />)}
                  </div>
                  <p style={{ color: "#888", fontSize: 13, fontWeight: 700, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Desserts</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {DESSERTS.map(d => <Pill key={d} label={d} on={form.desserts.includes(d)} click={() => tog("desserts", d)} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: D, margin: "0 0 6px" }}>Travel Style</h2>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 6px" }}>This is what really customizes your trip.</p>
              <p style={{ color: A, fontSize: 13, fontWeight: 600, margin: "0 0 20px" }}>{form.styles.length} selected</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                {STYLES.map(st => {
                  const on = form.styles.includes(st.label);
                  return (
                    <button key={st.id} onClick={() => tog("styles", st.label)} style={{
                      padding: "18px 14px", borderRadius: 16,
                      border: on ? `2px solid ${A}` : "2px solid #eee",
                      background: on ? `${A}10` : "#fff",
                      cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                      boxShadow: on ? `0 0 0 4px ${A}15` : "none",
                      transform: on ? "scale(1.02)" : "scale(1)",
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{st.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: on ? A : D, lineHeight: 1.2 }}>{st.label}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 4, lineHeight: 1.3 }}>{st.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: D, margin: "0 0 6px" }}>Final Details</h2>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 28px" }}>Anything specific you want to see, do, or experience?</p>
              <label style={lbl}>Interests & Must-Sees</label>
              <textarea placeholder="e.g. I want to see the best street art, visit a local cooking class, find the most Instagrammable spots..."
                value={form.interests} onChange={e => s("interests", e.target.value)} rows={5}
                style={{ ...inp, resize: "vertical", lineHeight: 1.6, marginBottom: 28 }} onFocus={inpFocus} onBlur={inpBlur} />
              <div style={{ borderRadius: 16, padding: "22px 24px", background: "#f8fafb", border: "1px solid #e8eff3" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Guide Preview</div>
                <div style={{ fontSize: 14, color: "#666", lineHeight: 2.1 }}>
                  <strong style={{ color: D }}>{form.firstName}</strong>'s trip to <strong style={{ color: D }}>{form.destination || "..."}</strong>
                  {form.dateStart && form.dateEnd && <span> · {form.dateStart} → {form.dateEnd}</span>}
                  <br />{form.travelers} traveler{form.travelers > 1 ? "s" : ""}{form.budget ? ` · ${cur.symbol}${Number(form.budget).toLocaleString()} ${cur.code}` : ""}
                  <br />Styles: {form.styles.length > 0 ? form.styles.join(", ") : "—"}
                  <br />Food: {form.food.length > 0 ? form.food.slice(0, 5).join(", ") + (form.food.length > 5 ? ` +${form.food.length - 5} more` : "") : "—"}
                  {form.dietary.length > 0 && <><br />Dietary: {form.dietary.join(", ")}</>}
                  {form.desserts.length > 0 && <><br />Desserts: {form.desserts.join(", ")}</>}
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} style={{
                padding: "13px 28px", borderRadius: 12, border: "2px solid #e8e8e8",
                background: "#fff", color: "#999", fontSize: 15, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s"
              }} onMouseEnter={e => e.currentTarget.style.borderColor = "#ccc"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>← Back</button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={() => ok() && setStep(step + 1)} style={{
                padding: "14px 40px", borderRadius: 12, border: "none",
                background: ok() ? `linear-gradient(135deg, ${A}, #3a7d96)` : "#ddd",
                color: "#fff", fontSize: 16, fontWeight: 700,
                cursor: ok() ? "pointer" : "not-allowed",
                boxShadow: ok() ? `0 6px 20px ${A}33` : "none",
                transition: "all 0.25s", letterSpacing: 0.3,
              }}>Next →</button>
            ) : (
              <button onClick={submit} style={{
                padding: "16px 44px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${A} 0%, #2d7a94 40%, ${G} 100%)`,
                color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer",
                boxShadow: `0 8px 28px ${A}40, 0 2px 8px rgba(0,0,0,0.08)`,
                letterSpacing: 0.5, transition: "all 0.25s", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${A}50, 0 4px 12px rgba(0,0,0,0.1)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 28px ${A}40, 0 2px 8px rgba(0,0,0,0.08)`; }}
              >Generate My Guide ✦</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
