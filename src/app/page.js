"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── LAHORE AREAS ─────────────────────────────────────────────────────────────
const LAHORE_AREAS = [
  "Johar Town","DHA Phase 1","DHA Phase 2","DHA Phase 3","DHA Phase 4",
  "DHA Phase 5","DHA Phase 6","DHA Phase 7","DHA Phase 8","DHA Phase 9",
  "Gulberg I","Gulberg II","Gulberg III","Gulberg IV","Gulberg V",
  "Model Town","Garden Town","Faisal Town","Iqbal Town","Muslim Town",
  "Bahria Town","Bahria Orchard","Lake City","Paragon City","Valencia Town",
  "Wapda Town","Township","Shadman","Cantonment","Cavalry Ground",
  "Askari 1","Askari 2","Askari 3","Askari 4","Askari 5","Askari 6",
  "Askari 7","Askari 8","Askari 9","Askari 10","Askari 11",
  "Raiwind Road","Ferozepur Road","Multan Road","GT Road","Bedian Road",
  "Thokar Niaz Baig","Manga Mandi","Hanjarwal","Sundar","Kamahan",
  "Shalamar","Samanabad","Gulshan Ravi","Harbanspura","Shadbagh",
  "Ichhra","Mozang","Anarkali","Data Darbar Area","Lohari Gate",
  "Bhati Gate","Akbari Gate","Sheranwala Gate","Shah Alam Market",
  "Brandreth Road","McLeod Road","Circular Road","Abbot Road",
  "Lawrence Road","Mall Road","GOR 1","GOR 2","Jail Road",
  "Wahdat Road","Barkat Market","Garden Town","Sabzazar",
  "Allama Iqbal Town","Revenue Society","Khayaban Colony",
  "Sui Gas Society","PCSIR","Johar Town Phase 1","Johar Town Phase 2",
  "Nawab Town","Nishtar Colony","Garhi Shahu","Krishan Nagar",
  "Sant Nagar","Dharampura","Badami Bagh","Shahdara","Ravi Road",
  "Bund Road","Sagian Road","Bilal Gunj","Yakki Gate","Kashmiri Bazar",
  "Urdu Bazar","Hafeez Centre Area","Liberty Market Area",
  "MM Alam Road","Packages Mall Area","Emporium Mall Area",
  "Fortress Stadium Area","LDA Avenue","Chung","Kahna","Chungi Amar Sidhu",
  "Kot Lakhpat","Sundar Industrial Estate","Quaid e Azam Industrial Estate",
  "Gulshan e Ravi","Awan Town","Muslim Nagar","Shalimar Town",
  "Other Lahore Area"
];

const OTHER_CITIES = [
  "Islamabad","Rawalpindi","Karachi","Faisalabad","Multan","Peshawar",
  "Quetta","Sialkot","Gujranwala","Gujrat","Sargodha","Bahawalpur",
  "Sukkur","Hyderabad","Abbottabad","Mardan","Swat","Dera Ghazi Khan",
  "Rahim Yar Khan","Sahiwal","Kasur","Sheikhupura","Hafizabad",
  "Narowal","Mandi Bahauddin","Attock","Chakwal","Jhelum",
  "Khushab","Bhakkar","Layyah","Muzaffargarh","Lodhran","Vehari",
  "Khanewal","Okara","Pakpattan","Chiniot","Toba Tek Singh",
  "Jhang","Nankana Sahib","Mianwali","Karak","Bannu",
  "Lakki Marwat","Kohat","Nowshera","Charsadda","Malakand",
  "Mansehra","Haripur","Mirpur AJK","Muzaffarabad","Bagh","Rawalakot"
];

const ALL_CITIES = [...LAHORE_AREAS, ...OTHER_CITIES];

const BANKS = [
  "EasyPaisa","Sadapay","JazzCash","Meezan Bank","HBL - Habib Bank Limited",
  "UBL - United Bank Limited","MCB Bank","Allied Bank","Bank Alfalah",
  "Bank Al-Habib","NBP - National Bank of Pakistan","The Bank of Punjab",
  "Askari Bank","Faysal Bank","JS Bank","Standard Chartered",
  "Dubai Islamic Bank","BankIslami Pakistan","Soneri Bank",
  "Silk Bank","Summit Bank","Telenor Bank","Mobilink Microfinance Bank"
];

const C = {
  primary:"#e8001d", primaryD:"#b0001a",
  black:"#0a0a0a", black2:"#111111", black3:"#1a1a1a", black4:"#222222",
  white:"#ffffff", gray:"#888888", grayL:"#aaaaaa",
  green:"#22c55e", yellow:"#f59e0b", blue:"#3b82f6", red:"#ef4444",
};

function genTracking() {
  const d = new Date();
  const ds = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
  return `KZX${ds}${Math.floor(Math.random()*9000)+1000}`;
}

function isLahore(city) {
  return LAHORE_AREAS.includes(city);
}

function calcCharges(destCity, senderCity, codAmount) {
  const same = isLahore(destCity) && isLahore(senderCity);
  const delivery = same ? 300 : 250;
  const income = Math.round(Number(codAmount) * 0.02);
  const sales = Math.round(Number(codAmount) * 0.02);
  return { delivery, income, sales, total: delivery + income + sales, sameCity: same };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Logo({ size = "md" }) {
  const s = { sm: { t: 14, z: 17 }, md: { t: 19, z: 23 }, lg: { t: 26, z: 32 } }[size];
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 1 }}>
      <span style={{ fontFamily: "Arial Black,Impact,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t, color: C.white, letterSpacing: -1 }}>Khan</span>
      <span style={{ fontFamily: "Arial Black,Impact,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.z, color: C.primary, letterSpacing: -1, borderBottom: `2px solid ${C.primary}` }}>Z</span>
      <span style={{ fontFamily: "Arial Black,Impact,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t, color: C.white, letterSpacing: -1 }}>xpress</span>
      <span style={{ fontFamily: "Arial Black,Impact,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t - 5, color: C.white, letterSpacing: -1, marginLeft: 2 }}>.pk</span>
    </div>
  );
}

function SpeedLines() {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", marginTop: 2 }}>
      <div style={{ width: 28, height: 2, background: C.primary, borderRadius: 2 }} />
      <div style={{ width: 16, height: 2, background: C.primary, opacity: .6, borderRadius: 2 }} />
      <div style={{ width: 8, height: 2, background: C.primary, opacity: .3, borderRadius: 2 }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: C.black2, borderRadius: 12, border: `1px solid ${C.black3}`, ...style }}>{children}</div>;
}

function CardHead({ children, action }) {
  return (
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.black3}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{children}</div>
      {action}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Delivered": [C.green, "rgba(34,197,94,0.12)"],
    "Returned": [C.red, "rgba(239,68,68,0.12)"],
    "In Transit": [C.yellow, "rgba(245,158,11,0.12)"],
    "Out for Delivery": [C.blue, "rgba(59,130,246,0.12)"],
    "Booked": ["#a78bfa", "rgba(167,139,250,0.12)"],
  };
  const [color, bg] = map[status] || [C.gray, "rgba(136,136,136,0.12)"];
  return <span style={{ background: bg, color, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

const Inp = ({ label, value, onChange, placeholder = "", type = "text", required = false, readOnly = false }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5, letterSpacing: .5 }}>
      {label}{required && <span style={{ color: C.primary }}> *</span>}
    </label>
    <input value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} type={type} readOnly={readOnly}
      style={{ width: "100%", background: readOnly ? C.black3 : C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", cursor: readOnly ? "not-allowed" : "text" }} />
  </div>
);

const Sel = ({ label, value, onChange, options, required = false }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5, letterSpacing: .5 }}>
      {label}{required && <span style={{ color: C.primary }}> *</span>}
    </label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: value ? C.white : C.gray, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
      <option value="">-- Select --</option>
      <optgroup label="── Lahore Areas ──">
        {LAHORE_AREAS.map(o => <option key={o} value={o}>{o}</option>)}
      </optgroup>
      <optgroup label="── Other Cities ──">
        {OTHER_CITIES.map(o => <option key={o} value={o}>{o}</option>)}
      </optgroup>
    </select>
  </div>
);

// ─── AIRWAY BILL PRINT ────────────────────────────────────────────────────────
function printAirwayBill(booking) {
  const charges = calcCharges(booking.receiver_city, booking.sender_city, booking.cod_amount);
  const w = window.open("", "_blank");
  w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Airway Bill - ${booking.tracking_no}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .bill { width: 100mm; border: 2px solid #000; padding: 0; }
        .header { background: #e8001d; color: white; padding: 10px; text-align: center; }
        .logo { font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: -1px; }
        .logo span { color: #ffcc00; }
        .tracking { font-size: 11px; margin-top: 4px; letter-spacing: 2px; }
        .barcode { text-align: center; padding: 8px; border-bottom: 1px dashed #000; background: #f5f5f5; }
        .bars { display: flex; justify-content: center; gap: 1px; align-items: center; }
        .bar { height: 35px; display: inline-block; }
        .tracking-text { font-size: 10px; margin-top: 4px; font-family: monospace; letter-spacing: 2px; }
        .section { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #ddd; }
        .box { padding: 8px; border-right: 1px solid #ddd; }
        .box:last-child { border-right: none; }
        .box-label { font-size: 9px; font-weight: 700; color: #666; letter-spacing: 1px; margin-bottom: 4px; text-transform: uppercase; }
        .box-value { font-size: 12px; font-weight: 600; color: #000; }
        .box-sub { font-size: 10px; color: #444; margin-top: 2px; }
        .charges { padding: 8px; border-bottom: 1px solid #ddd; }
        .charge-row { display: flex; justify-content: space-between; padding: 3px 0; font-size: 11px; border-bottom: 1px dotted #eee; }
        .total-row { display: flex; justify-content: space-between; padding: 6px 0 0; font-size: 14px; font-weight: 700; }
        .collect { background: #e8001d; color: white; padding: 8px; text-align: center; font-size: 13px; font-weight: 700; }
        .footer { padding: 6px; text-align: center; font-size: 9px; color: #666; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="bill">
        <div class="header">
          <div class="logo">Khan<span>Z</span>xpress.pk</div>
          <div class="tracking">COD AIRWAY BILL</div>
        </div>
        <div class="barcode">
          <div class="bars">
            ${Array.from({length:50}).map((_,i)=>`<div class="bar" style="width:${i%3===0?3:1.5}px;background:${i%7===0?'#000':i%5===0?'#333':'#666'}"></div>`).join('')}
          </div>
          <div class="tracking-text">${booking.tracking_no}</div>
        </div>
        <div class="section">
          <div class="box">
            <div class="box-label">📤 Sender</div>
            <div class="box-value">${booking.sender_name}</div>
            <div class="box-sub">${booking.sender_address || ''}</div>
            <div class="box-sub">${booking.sender_city}</div>
            <div class="box-sub">📞 ${booking.sender_phone}</div>
          </div>
          <div class="box" style="background:#fff8f8;border-left:2px solid #e8001d;">
            <div class="box-label" style="color:#e8001d;">📥 Receiver</div>
            <div class="box-value">${booking.receiver_name}</div>
            <div class="box-sub">${booking.receiver_address || ''}</div>
            <div class="box-sub">${booking.receiver_city}</div>
            <div class="box-sub">📞 ${booking.receiver_phone}</div>
          </div>
        </div>
        <div class="section">
          <div class="box">
            <div class="box-label">📦 Parcel</div>
            <div class="box-value">${booking.parcel_desc || 'General'}</div>
            <div class="box-sub">Weight: ${booking.weight || 'N/A'} kg</div>
            <div class="box-sub">Date: ${booking.created_at ? new Date(booking.created_at).toLocaleDateString('en-PK') : new Date().toLocaleDateString('en-PK')}</div>
          </div>
          <div class="box">
            <div class="box-label">💰 COD Amount</div>
            <div class="box-value" style="font-size:18px;color:#e8001d;">Rs. ${Number(booking.cod_amount).toLocaleString()}</div>
            <div class="box-sub">${charges.sameCity ? 'Same City' : 'Intercity'}</div>
          </div>
        </div>
        <div class="charges">
          <div class="charge-row"><span>Delivery Charge</span><span>Rs. ${charges.delivery}</span></div>
          <div class="charge-row"><span>Income Tax (2%)</span><span>Rs. ${charges.income}</span></div>
          <div class="charge-row"><span>Sales Tax (2%)</span><span>Rs. ${charges.sales}</span></div>
          <div class="total-row"><span>Total Charges</span><span style="color:#e8001d;">Rs. ${charges.total}</span></div>
        </div>
        <div class="collect">
          💵 COLLECT FROM CUSTOMER: Rs. ${(Number(booking.cod_amount) + charges.total).toLocaleString()}
        </div>
        <div class="footer">
          KhanZxpress.pk | info@khanzxpress.pk | +92-325-6227136 | Lahore, Pakistan<br/>
          <strong>Signature: ____________________</strong>
        </div>
      </div>
      <script>window.onload = () => window.print();</script>
    </body>
    </html>
  `);
  w.document.close();
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: C.black, display: "flex", flexDirection: "column", fontFamily: "Segoe UI,system-ui,sans-serif" }}>
      <div style={{ background: C.black2, borderBottom: `1px solid ${C.black3}`, padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><Logo size="md" /><SpeedLines /></div>
        <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
          <span>📧 info@khanzxpress.pk</span>
          <span>📞 +92-325-6227136</span>
          <span>📍 Lahore, Pakistan</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: 520, background: C.black2, borderRadius: 16, border: `1px solid ${C.black3}`, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}>
          <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, padding: "28px 32px", textAlign: "center" }}>
            <Logo size="lg" /><SpeedLines />
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 8, letterSpacing: 2 }}>MERCHANT PORTAL</div>
          </div>
          <div style={{ padding: "32px" }}>{children}</div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "14px", color: C.gray, fontSize: 11, borderTop: `1px solid ${C.black3}` }}>
        © 2026 KhanZxpress.pk · All Rights Reserved · Lahore, Pakistan
      </div>
    </div>
  );
}

function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !pass) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    try {
      const { data, error: err } = await supabase
        .from("merchants").select("*").eq("email", email).eq("password", pass).single();
      if (err || !data) { setError("Invalid email or password"); setLoading(false); return; }
      onLogin(data);
    } catch (e) { setError("Login failed. Try again."); }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>Sign In</h2>
      <p style={{ color: C.gray, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Sign in to your KhanZxpress Merchant Account</p>
      {error && <div style={{ background: "rgba(232,0,29,0.1)", border: `1px solid rgba(232,0,29,0.3)`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#ffaaaa", fontSize: 13 }}>❌ {error}</div>}
      <Inp label="Email" value={email} onChange={setEmail} placeholder="your@email.com" type="email" />
      <Inp label="Password" value={pass} onChange={setPass} placeholder="••••••••" type="password" />
      <button onClick={handleLogin} disabled={loading}
        style={{ width: "100%", background: C.primary, color: C.white, border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: `0 4px 20px rgba(232,0,29,0.35)`, opacity: loading ? .7 : 1 }}>
        {loading ? "Signing in..." : "Sign In Now →"}
      </button>
      <p style={{ textAlign: "center", marginTop: 20, color: C.gray, fontSize: 13 }}>
        Don't have an account?{" "}
        <span onClick={onGoRegister} style={{ color: C.primary, cursor: "pointer", fontWeight: 600 }}>Sign up here</span>
      </p>
    </AuthLayout>
  );
}

function RegisterPage({ onRegister, onGoLogin }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    company: "", contact: "", phone: "", email: "", address: "", city: "Johar Town", cnic: "",
    bank_name: "", account_title: "", account_no: "", iban: "",
    account_type: "COD", expected_shipments: "",
    password: "", confirmPassword: "", agree: false,
  });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const steps = [{ n: 1, label: "Personal" }, { n: 2, label: "Bank" }, { n: 3, label: "Shipping" }, { n: 4, label: "Password" }];

  const handleSubmit = async () => {
    if (!form.agree) { setError("Please agree to terms"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true); setError("");
    try {
      const { data, error: err } = await supabase.from("merchants").insert([{
        name: form.contact, company: form.company, email: form.email,
        phone: form.phone, city: form.city, address: form.address, cnic: form.cnic,
        bank_name: form.bank_name, account_title: form.account_title,
        account_no: form.account_no, iban: form.iban,
        account_type: form.account_type, password: form.password,
        expected_shipments: form.expected_shipments, status: "active",
      }]).select().single();
      if (err) { setError(err.message); setLoading(false); return; }
      onRegister(data);
    } catch (e) { setError("Registration failed"); }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Create Account</h2>
      <div style={{ display: "flex", marginBottom: 28, position: "relative" }}>
        <div style={{ position: "absolute", top: 14, left: "8%", right: "8%", height: 2, background: C.black3, zIndex: 0 }} />
        {steps.map(s => (
          <div key={s.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, background: step >= s.n ? C.primary : C.black3, color: step >= s.n ? C.white : C.gray, marginBottom: 4, boxShadow: step >= s.n ? `0 0 10px rgba(232,0,29,0.4)` : "none" }}>
              {step > s.n ? "✓" : s.n}
            </div>
            <div style={{ fontSize: 9, color: step >= s.n ? C.white : C.gray }}>{s.label}</div>
          </div>
        ))}
      </div>
      {error && <div style={{ background: "rgba(232,0,29,0.1)", border: `1px solid rgba(232,0,29,0.3)`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#ffaaaa", fontSize: 13 }}>❌ {error}</div>}

      {step === 1 && <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Inp label="Company Name" value={form.company} onChange={v => f("company", v)} required />
          <Inp label="Contact Person" value={form.contact} onChange={v => f("contact", v)} required />
          <Inp label="Phone" value={form.phone} onChange={v => f("phone", v)} placeholder="03XX-XXXXXXX" required />
          <Inp label="Email" value={form.email} onChange={v => f("email", v)} type="email" required />
        </div>
        <Inp label="Pickup Address" value={form.address} onChange={v => f("address", v)} required />
        <Sel label="City" value={form.city} onChange={v => f("city", v)} options={ALL_CITIES} required />
        <Inp label="CNIC" value={form.cnic} onChange={v => f("cnic", v)} placeholder="XXXXX-XXXXXXX-X" required />
        <button onClick={() => setStep(2)} style={{ width: "100%", background: C.primary, color: C.white, border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px rgba(232,0,29,0.3)` }}>Next →</button>
      </>}

      {step === 2 && <>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5 }}>Bank Name *</label>
          <select value={form.bank_name} onChange={e => f("bank_name", e.target.value)}
            style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: form.bank_name ? C.white : C.gray, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
            <option value="">-- Select Bank --</option>
            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Inp label="Account Title" value={form.account_title} onChange={v => f("account_title", v)} required />
          <Inp label="Account Number" value={form.account_no} onChange={v => f("account_no", v)} required />
        </div>
        <Inp label="IBAN" value={form.iban} onChange={v => f("iban", v)} />
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#fcd34d" }}>
          ⚠️ Bank details used for COD settlements. Double-check before proceeding.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", color: C.grayL, border: `1px solid ${C.black3}`, padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setStep(3)} style={{ flex: 2, background: C.primary, color: C.white, border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Next →</button>
        </div>
      </>}

      {step === 3 && <>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5 }}>Account Type *</label>
          <select value={form.account_type} onChange={e => f("account_type", e.target.value)}
            style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
            {["COD", "NON COD", "Corporate"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <Inp label="Expected Shipments/Month" value={form.expected_shipments} onChange={v => f("expected_shipments", v)} type="number" required />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", color: C.grayL, border: `1px solid ${C.black3}`, padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>← Back</button>
          <button onClick={() => setStep(4)} style={{ flex: 2, background: C.primary, color: C.white, border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Next →</button>
        </div>
      </>}

      {step === 4 && <>
        <Inp label="Password" value={form.password} onChange={v => f("password", v)} type="password" required />
        <Inp label="Confirm Password" value={form.confirmPassword} onChange={v => f("confirmPassword", v)} type="password" required />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
          <input type="checkbox" checked={form.agree} onChange={e => f("agree", e.target.checked)} style={{ marginTop: 3, accentColor: C.primary, cursor: "pointer" }} />
          <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.5 }}>
            I agree to the <span style={{ color: C.primary }}>Terms and Conditions</span> of KhanZxpress.pk
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(3)} style={{ flex: 1, background: "transparent", color: C.grayL, border: `1px solid ${C.black3}`, padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>← Back</button>
          <button onClick={handleSubmit} disabled={loading}
            style={{ flex: 2, background: form.agree ? C.primary : "#333", color: C.white, border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, cursor: form.agree ? "pointer" : "not-allowed", opacity: loading ? .7 : 1 }}>
            {loading ? "Registering..." : "✅ Submit Registration"}
          </button>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, color: C.gray, fontSize: 13 }}>
          Already have an account?{" "}
          <span onClick={onGoLogin} style={{ color: C.primary, cursor: "pointer", fontWeight: 600 }}>Sign in here</span>
        </p>
      </>}
    </AuthLayout>
  );
}

// ─── PORTAL LAYOUT ────────────────────────────────────────────────────────────
function PortalLayout({ user, page, setPage, onLogout, children }) {
  const nav = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "newbooking", icon: "➕", label: "New Booking" },
    { id: "parcels", icon: "📦", label: "My Parcels" },
    { id: "tracking", icon: "🔍", label: "Track Parcel" },
    { id: "payments", icon: "💳", label: "Payments" },
    { id: "rates", icon: "💰", label: "Rate Card" },
    { id: "api", icon: "🔗", label: "API / Shopify" },
    { id: "profile", icon: "👤", label: "My Profile" },
    { id: "bank", icon: "🏦", label: "Bank Details" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.black, fontFamily: "Segoe UI,system-ui,sans-serif", display: "flex" }}>
      <div style={{ width: 210, background: C.black2, borderRight: `1px solid ${C.black3}`, position: "fixed", top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 50 }}>
        <div style={{ padding: "18px 16px", borderBottom: `1px solid ${C.black3}` }}>
          <Logo size="sm" /><SpeedLines />
          <div style={{ fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: 1 }}>MERCHANT PORTAL</div>
        </div>
        <div style={{ padding: "14px 12px", borderBottom: `1px solid ${C.black3}` }}>
          <div style={{ background: "rgba(232,0,29,0.08)", border: "1px solid rgba(232,0,29,0.15)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, color: C.white, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", boxShadow: `0 0 14px rgba(232,0,29,0.4)` }}>
              {user.name ? user.name.charAt(0).toUpperCase() : "M"}
            </div>
            <div style={{ color: C.white, fontWeight: 600, fontSize: 12 }}>{user.name}</div>
            <div style={{ color: C.gray, fontSize: 10, marginTop: 1 }}>{user.company}</div>
            <div style={{ display: "inline-block", background: "rgba(34,197,94,0.12)", color: C.green, fontSize: 9, padding: "2px 8px", borderRadius: 10, marginTop: 5, fontWeight: 600 }}>● ACTIVE</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left", background: page === n.id ? "rgba(232,0,29,0.12)" : "transparent", color: page === n.id ? C.white : C.gray, borderLeft: `3px solid ${page === n.id ? C.primary : "transparent"}`, fontSize: 12, fontWeight: page === n.id ? 600 : 400 }}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.black3}` }}>
          <button onClick={onLogout} style={{ width: "100%", background: "rgba(232,0,29,0.08)", color: C.primary, border: `1px solid rgba(232,0,29,0.2)`, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
            🚪 Sign Out
          </button>
        </div>
      </div>
      <div style={{ marginLeft: 210, flex: 1 }}>
        <div style={{ background: C.black2, borderBottom: `1px solid ${C.black3}`, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 3, height: 20, background: C.primary, borderRadius: 2 }} />
            <div style={{ color: C.white, fontWeight: 700, fontSize: 17 }}>{nav.find(n => n.id === page)?.icon} {nav.find(n => n.id === page)?.label}</div>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
            <span>📞 +92-325-6227136</span>
            <span>📧 info@khanzxpress.pk</span>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, setPage }) {
  const [stats, setStats] = useState({ total: 0, delivered: 0, transit: 0, returned: 0, revenue: 0, pending: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: bookings } = await supabase.from("bookings").select("*").eq("merchant_id", user.id);
      if (!bookings) return;
      const total = bookings.length;
      const delivered = bookings.filter(b => b.status === "Delivered").length;
      const transit = bookings.filter(b => ["Booked", "In Transit", "Out for Delivery"].includes(b.status)).length;
      const returned = bookings.filter(b => b.status === "Returned").length;
      const revenue = bookings.filter(b => b.status === "Delivered").reduce((s, b) => s + (b.delivery_charge || 0), 0);
      const pending = bookings.filter(b => !["Delivered", "Returned"].includes(b.status)).reduce((s, b) => s + Number(b.cod_amount || 0), 0);
      setStats({ total, delivered, transit, returned, revenue, pending });
      setRecent(bookings.slice(0, 5));
    };
    load();
  }, [user.id]);

  const statCards = [
    { label: "Total Parcels", value: stats.total, icon: "📦", color: C.blue },
    { label: "Delivered", value: stats.delivered, icon: "✅", color: C.green },
    { label: "In Transit", value: stats.transit, icon: "🚚", color: C.yellow },
    { label: "Returns", value: stats.returned, icon: "↩️", color: C.red },
    { label: "Revenue Earned", value: `Rs.${stats.revenue.toLocaleString()}`, icon: "💰", color: C.primary },
    { label: "COD Pending", value: `Rs.${stats.pending.toLocaleString()}`, icon: "⏳", color: C.blue },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: C.white, fontSize: 20, fontWeight: 700 }}>Welcome back, {user.name}! 👋</div>
        <div style={{ color: C.gray, fontSize: 13, marginTop: 4 }}>{user.company} — Lahore</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {statCards.map(s => (
          <Card key={s.label} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: C.gray, letterSpacing: .5, marginBottom: 6 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
              <div style={{ fontSize: 26 }}>{s.icon}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 20 }}>
        <CardHead>⚡ Quick Actions</CardHead>
        <div style={{ padding: "16px 20px", display: "flex", gap: 12 }}>
          {[{ label: "New Booking", icon: "➕", pg: "newbooking", color: C.primary }, { label: "Track Parcel", icon: "🔍", pg: "tracking", color: C.blue }, { label: "Payments", icon: "💳", pg: "payments", color: C.green }, { label: "Rate Card", icon: "💰", pg: "rates", color: C.yellow }].map(a => (
            <button key={a.label} onClick={() => setPage(a.pg)}
              style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.black3}`, borderRadius: 10, padding: "14px 8px", cursor: "pointer", textAlign: "center", color: a.color }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</div>
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead>📋 Recent Parcels</CardHead>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#0d0d0d" }}>
            {["Tracking", "Receiver", "City", "COD", "Status", "Date"].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {recent.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "30px", textAlign: "center", color: C.gray }}>No parcels yet. Create your first booking!</td></tr>
            ) : recent.map((b, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.primary, fontWeight: 600 }}>{b.tracking_no}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: C.white }}>{b.receiver_name}</td>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.grayL }}>{b.receiver_city}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount).toLocaleString()}</td>
                <td style={{ padding: "10px 16px" }}><StatusBadge status={b.status} /></td>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.gray }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── NEW BOOKING ──────────────────────────────────────────────────────────────
function NewBooking({ user }) {
  const [form, setForm] = useState({
    sender_name: user.name || "", sender_phone: user.phone || "",
    sender_address: user.address || "", sender_city: user.city || "Johar Town",
    receiver_name: "", receiver_phone: "", receiver_address: "", receiver_city: "",
    parcel_desc: "", weight: "", pieces: "1", cod_amount: "",
  });
  const [charges, setCharges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(null);
  const f = (k, v) => { setForm(p => ({ ...p, [k]: v })); setCharges(null); };

  const calc = () => {
    if (!form.receiver_city || !form.cod_amount) { alert("Fill Destination City and COD Amount"); return; }
    setCharges(calcCharges(form.receiver_city, form.sender_city, form.cod_amount));
  };

  const handleBook = async () => {
    if (!charges) { calc(); return; }
    if (!form.receiver_name || !form.receiver_phone || !form.receiver_city) { alert("Fill all receiver details"); return; }
    setLoading(true);
    const tracking_no = genTracking();
    const booking = {
      ...form, tracking_no, merchant_id: user.id,
      delivery_charge: charges.delivery, income_tax: charges.income,
      sales_tax: charges.sales, total_charges: charges.total,
      status: "Booked",
    };
    const { data, error } = await supabase.from("bookings").insert([booking]).select().single();
    if (error) { alert("Booking failed: " + error.message); setLoading(false); return; }
    setBooked(data);
    setForm(p => ({ ...p, receiver_name: "", receiver_phone: "", receiver_address: "", receiver_city: "", parcel_desc: "", weight: "", pieces: "1", cod_amount: "" }));
    setCharges(null);
    setLoading(false);
  };

  return (
    <div>
      {booked && (
        <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 15 }}>✅ Parcel Booked Successfully!</div>
            <div style={{ color: C.grayL, fontSize: 13, marginTop: 4 }}>Tracking: <strong style={{ color: C.primary }}>{booked.tracking_no}</strong></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => printAirwayBill(booked)} style={{ background: C.primary, color: C.white, border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>🖨️ Print Airway Bill</button>
            <button onClick={() => setBooked(null)} style={{ background: "transparent", border: `1px solid ${C.black3}`, color: C.gray, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Card>
          <CardHead>📤 Sender Information (Auto-filled)</CardHead>
          <div style={{ padding: "20px" }}>
            <Inp label="Sender Name" value={form.sender_name} onChange={v => f("sender_name", v)} required />
            <Inp label="Phone" value={form.sender_phone} onChange={v => f("sender_phone", v)} required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5 }}>Sender City *</label>
              <select value={form.sender_city} onChange={e => f("sender_city", e.target.value)}
                style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
                <optgroup label="── Lahore Areas ──">
                  {LAHORE_AREAS.map(o => <option key={o} value={o}>{o}</option>)}
                </optgroup>
                <optgroup label="── Other Cities ──">
                  {OTHER_CITIES.map(o => <option key={o} value={o}>{o}</option>)}
                </optgroup>
              </select>
            </div>
            <Inp label="Pickup Address" value={form.sender_address} onChange={v => f("sender_address", v)} required />
          </div>
        </Card>
        <Card>
          <CardHead>📥 Receiver Information</CardHead>
          <div style={{ padding: "20px" }}>
            <Inp label="Receiver Name" value={form.receiver_name} onChange={v => f("receiver_name", v)} required />
            <Inp label="Phone" value={form.receiver_phone} onChange={v => f("receiver_phone", v)} required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5 }}>Destination City *</label>
              <select value={form.receiver_city} onChange={e => f("receiver_city", e.target.value)}
                style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: form.receiver_city ? C.white : C.gray, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
                <option value="">-- Select City --</option>
                <optgroup label="── Lahore Areas ──">
                  {LAHORE_AREAS.map(o => <option key={o} value={o}>{o}</option>)}
                </optgroup>
                <optgroup label="── Other Cities ──">
                  {OTHER_CITIES.map(o => <option key={o} value={o}>{o}</option>)}
                </optgroup>
              </select>
            </div>
            <Inp label="Delivery Address" value={form.receiver_address} onChange={v => f("receiver_address", v)} required />
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <CardHead>📦 Parcel Details</CardHead>
          <div style={{ padding: "20px" }}>
            <Inp label="Description" value={form.parcel_desc} onChange={v => f("parcel_desc", v)} placeholder="e.g. Clothes, Mobile" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <Inp label="Weight (kg)" value={form.weight} onChange={v => f("weight", v)} type="number" />
              <Inp label="Pieces" value={form.pieces} onChange={v => f("pieces", v)} type="number" />
            </div>
            <Inp label="COD Amount (Rs.) *" value={form.cod_amount} onChange={v => f("cod_amount", v)} type="number" required />
          </div>
        </Card>
        <Card>
          <CardHead>💰 Charges Preview</CardHead>
          <div style={{ padding: "20px" }}>
            {charges ? (
              <>
                <div style={{ background: "rgba(232,0,29,0.06)", border: "1px solid rgba(232,0,29,0.2)", borderRadius: 8, padding: "14px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: C.primary, marginBottom: 10, fontWeight: 700 }}>{charges.sameCity ? "✅ SAME CITY (LAHORE)" : "🚚 INTERCITY / OUTSTATION"}</div>
                  {[["Delivery Charge", charges.delivery], ["Income Tax (2%)", charges.income], ["Sales Tax (2%)", charges.sales]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13, color: C.grayL }}>
                      <span>{l}</span><span>Rs.{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 16, fontWeight: 700, color: C.white }}>
                    <span>TOTAL CHARGES</span><span>Rs.{charges.total}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 16, background: C.black4, borderRadius: 8, padding: "10px 12px", lineHeight: 1.6 }}>
                  COD: <strong style={{ color: C.white }}>Rs.{Number(form.cod_amount).toLocaleString()}</strong><br />
                  Collect from customer: <strong style={{ color: C.green }}>Rs.{(Number(form.cod_amount) + charges.total).toLocaleString()}</strong>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0 20px", color: C.gray, fontSize: 13 }}>Fill destination city & COD amount then click Calculate</div>
            )}
            <button onClick={calc} style={{ width: "100%", background: "transparent", border: `1px solid ${C.primary}`, color: C.primary, padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>🧮 Calculate Charges</button>
            <button onClick={handleBook} disabled={loading}
              style={{ width: "100%", background: C.primary, color: C.white, border: "none", padding: "13px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 18px rgba(232,0,29,0.35)`, opacity: loading ? .7 : 1 }}>
              {loading ? "Booking..." : "🚀 Book & Generate Airway Bill"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── PARCELS ──────────────────────────────────────────────────────────────────
function Parcels({ user }) {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("bookings").select("*").eq("merchant_id", user.id).order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    };
    load();
  }, [user.id]);

  const updateStatus = async (id, status) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const statuses = ["All", "Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"];
  const filtered = bookings.filter(b => {
    const ms = filter === "All" || b.status === filter;
    const mq = !search || [b.tracking_no, b.receiver_name, b.receiver_city].some(v => v && v.toLowerCase().includes(search.toLowerCase()));
    return ms && mq;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search tracking, receiver, city..."
          style={{ flex: 1, minWidth: 200, background: C.black2, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none" }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? C.primary : "transparent", color: filter === s ? C.white : C.gray, border: `1px solid ${filter === s ? C.primary : C.black3}`, padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: filter === s ? 600 : 400 }}>{s}</button>
          ))}
        </div>
      </div>
      <Card>
        <CardHead>📦 Parcels ({filtered.length})</CardHead>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading parcels...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Tracking", "Receiver", "City", "COD", "Charges", "Status", "Date", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No parcels found</td></tr>
                  : filtered.map((b, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.primary, fontWeight: 600 }}>{b.tracking_no}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 13, color: C.white }}>{b.receiver_name}</div>
                        <div style={{ fontSize: 11, color: C.gray }}>{b.receiver_phone}</div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_city}</td>
                      <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount).toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.yellow }}>Rs.{b.total_charges || "—"}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                          style={{ background: C.black, color: C.white, border: `1px solid ${C.black3}`, borderRadius: 6, padding: "4px 8px", fontSize: 12, cursor: "pointer", outline: "none" }}>
                          {["Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => printAirwayBill(b)} style={{ background: C.primary, color: C.white, border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>🖨️ Bill</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
function Payments({ user }) {
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookingsForPayment, setBookingsForPayment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: bookings } = await supabase.from("bookings").select("*").eq("merchant_id", user.id);
      if (!bookings) { setLoading(false); return; }

      const delivered = bookings.filter(b => b.status === "Delivered");
      const totalCOD = delivered.reduce((s, b) => s + Number(b.cod_amount || 0), 0);
      const totalCharges = delivered.reduce((s, b) => s + Number(b.total_charges || 0), 0);
      const totalSalesTax = delivered.reduce((s, b) => s + Number(b.sales_tax || 0), 0);
      const totalIncomeTax = delivered.reduce((s, b) => s + Number(b.income_tax || 0), 0);
      const netAmount = totalCOD - totalCharges;

      const summaryPayment = {
        id: "PAY001",
        invoice_no: "SI-0001",
        invoice_date: new Date().toLocaleDateString("en-PK"),
        total_shipments: bookings.length,
        total_deliveries: delivered.length,
        total_cod: totalCOD,
        delivery_charges: delivered.reduce((s, b) => s + Number(b.delivery_charge || 0), 0),
        gst: totalSalesTax,
        income_tax: totalIncomeTax,
        net_amount: netAmount,
        total_payable: netAmount,
        payment: 0,
        balance: netAmount,
        bookings: delivered,
      };
      setPayments([summaryPayment]);
      setLoading(false);
    };
    load();
  }, [user.id]);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "transparent", border: `1px solid ${C.black3}`, color: C.grayL, padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontWeight: 600 }}>← Back to Payments</button>
        <Card>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.black3}` }}>
              <div>
                <Logo size="md" /><SpeedLines />
                <div style={{ color: C.gray, fontSize: 12, marginTop: 8 }}>Lahore, Pakistan</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>Payment Details</div>
                <div style={{ color: C.gray, fontSize: 13, marginTop: 4 }}>Invoice: {selected.invoice_no}</div>
                <div style={{ color: C.gray, fontSize: 13 }}>Date: {selected.invoice_date}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[["Client", user.company], ["Account Title", user.name], ["Bank", user.bank_name], ["IBAN", user.iban || "—"]].map(([l, v]) => (
                <div key={l} style={{ background: C.black4, borderRadius: 8, padding: "12px" }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 3 }}>{l}</div>
                  <div style={{ color: C.white, fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>📦 Order Information</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#0d0d0d" }}>
                  {["#", "Tracking", "Receiver", "Phone", "City", "COD", "Delivery", "Sales Tax", "Net"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, color: C.gray, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {selected.bookings.map((b, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.gray }}>{i + 1}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.primary, fontWeight: 600 }}>{b.tracking_no}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.white }}>{b.receiver_name}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>{b.receiver_phone}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>{b.receiver_city}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount).toLocaleString()}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.yellow }}>Rs.{b.delivery_charge || 0}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>Rs.{b.sales_tax || 0}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.green, fontWeight: 600 }}>Rs.{(Number(b.cod_amount) - Number(b.total_charges || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div />
              <div style={{ background: C.black4, borderRadius: 12, padding: "20px" }}>
                <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>💰 Payment Summary</div>
                {[
                  ["Total COD", `Rs.${selected.total_cod.toLocaleString()}`],
                  ["Delivery Charges", `Rs.${selected.delivery_charges.toLocaleString()}`],
                  ["Sales Tax", `Rs.${selected.gst.toLocaleString()}`],
                  ["Income Tax", `Rs.${selected.income_tax.toLocaleString()}`],
                  ["Net Amount", `Rs.${selected.net_amount.toLocaleString()}`],
                  ["Total Payable", `Rs.${selected.total_payable.toLocaleString()}`],
                  ["Payment Received", `Rs.${selected.payment.toLocaleString()}`],
                  ["Balance", `Rs.${selected.balance.toLocaleString()}`],
                ].map(([l, v], i) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13, fontWeight: i >= 6 ? 700 : 400 }}>
                    <span style={{ color: i >= 6 ? C.white : C.gray }}>{l}</span>
                    <span style={{ color: i === 7 ? C.primary : i >= 5 ? C.green : C.white }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={() => window.print()} style={{ background: C.primary, color: C.white, border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>🖨️ Print</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHead>💳 Payment Clearance (COD Account)</CardHead>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading payments...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Sr.", "Invoice No", "Date", "Shipments", "Deliveries", "Total COD", "Charges", "GST", "Total Payable", "Payment", "Balance", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr><td colSpan={12} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No payment records yet. Deliver parcels to see payments.</td></tr>
                ) : payments.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.gray }}>{i + 1}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.primary, fontWeight: 600 }}>{p.invoice_no}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.grayL }}>{p.invoice_date}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.white }}>{p.total_shipments}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.white }}>{p.total_deliveries}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{p.total_cod.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.yellow }}>Rs.{p.delivery_charges.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.grayL }}>Rs.{p.gst.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: C.green, fontWeight: 700 }}>Rs.{p.total_payable.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: C.grayL }}>Rs.{p.payment.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: C.primary, fontWeight: 700 }}>Rs.{p.balance.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <button onClick={() => setSelected(p)} style={{ background: C.primary, color: C.white, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── TRACKING ─────────────────────────────────────────────────────────────────
function TrackParcel({ user }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const track = async () => {
    if (!q) return;
    setLoading(true); setSearched(true);
    const { data } = await supabase.from("bookings").select("*").eq("tracking_no", q.trim().toUpperCase()).single();
    setResult(data || null);
    setLoading(false);
  };

  const steps = [
    { label: "Booked", done: !!result },
    { label: "In Transit", done: result && ["In Transit", "Out for Delivery", "Delivered"].includes(result.status) },
    { label: "Out for Delivery", done: result && ["Out for Delivery", "Delivered"].includes(result.status) },
    { label: "Delivered", done: result?.status === "Delivered" },
  ];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ padding: "28px" }}>
          <div style={{ color: C.white, fontWeight: 700, fontSize: 16, marginBottom: 20, textAlign: "center" }}>🔍 Track Your Parcel</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && track()} placeholder="Enter Tracking Number e.g. KZX20260425..."
              style={{ flex: 1, background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "12px 16px", color: C.white, fontSize: 14, outline: "none" }} />
            <button onClick={track} disabled={loading} style={{ background: C.primary, color: C.white, border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 15, boxShadow: `0 4px 14px rgba(232,0,29,0.3)` }}>
              {loading ? "..." : "Track"}
            </button>
          </div>
        </div>
      </Card>

      {searched && !result && !loading && (
        <Card><div style={{ padding: "50px", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
          <div style={{ color: C.white, fontSize: 16, fontWeight: 600 }}>Tracking number not found</div>
          <div style={{ color: C.gray, fontSize: 13, marginTop: 8 }}>Check the number and try again</div>
        </div></Card>
      )}

      {result && (
        <Card>
          <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, padding: "16px 24px" }}>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>{result.tracking_no}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>{result.sender_city} → {result.receiver_city}</div>
          </div>
          <div style={{ padding: "24px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: s.done ? C.green : C.black3, display: "flex", alignItems: "center", justifyContent: "center", color: s.done ? C.white : C.gray, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.done ? "✓" : i + 1}</div>
                  {i < steps.length - 1 && <div style={{ width: 2, height: 28, background: s.done ? C.green : C.black3, margin: "2px 0" }} />}
                </div>
                <div style={{ paddingTop: 4, paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
                  <div style={{ color: s.done ? C.white : C.gray, fontWeight: s.done ? 600 : 400, fontSize: 14 }}>{s.label}</div>
                  {s.done && <div style={{ color: C.gray, fontSize: 11, marginTop: 2 }}>{result.created_at ? new Date(result.created_at).toLocaleDateString("en-PK") : "-"}</div>}
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              {[["SENDER", result.sender_name, result.sender_address, result.sender_city, result.sender_phone],
                ["RECEIVER", result.receiver_name, result.receiver_address, result.receiver_city, result.receiver_phone]].map(([t, name, addr, city, phone]) => (
                <div key={t} style={{ background: C.black4, borderRadius: 8, padding: "14px" }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 8, letterSpacing: .5 }}>{t}</div>
                  <div style={{ color: C.white, fontWeight: 600 }}>{name}</div>
                  <div style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{addr}</div>
                  <div style={{ color: C.gray, fontSize: 12 }}>{city}</div>
                  <div style={{ color: C.gray, fontSize: 12 }}>📞 {phone}</div>
                </div>
              ))}
            </div>
            <button onClick={() => printAirwayBill(result)} style={{ marginTop: 16, background: C.primary, color: C.white, border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>🖨️ Print Airway Bill</button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── RATE CARD ────────────────────────────────────────────────────────────────
function RateCard() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card style={{ marginBottom: 18, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, padding: "22px 28px", textAlign: "center" }}>
          <Logo size="md" /><SpeedLines />
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 8, letterSpacing: 1 }}>OFFICIAL RATE CARD 2026</div>
        </div>
        <div style={{ padding: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#0d0d0d" }}>
              {["Service", "Delivery", "Income Tax", "Sales Tax", "Total"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                ["Same City / Lahore to Lahore (COD)", "Rs.300", "2% of COD", "2% of COD", "Rs.300 + 4%"],
                ["Intercity / Outstation (COD)", "Rs.250", "2% of COD", "2% of COD", "Rs.250 + 4%"],
                ["Same City (Non-COD)", "Rs.200", "—", "—", "Rs.200 flat"],
                ["Intercity (Non-COD)", "Rs.180", "—", "—", "Rs.180 flat"],
              ].map(([l, d, it, st, t], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.black3}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  <td style={{ padding: "12px 14px", color: C.white, fontWeight: 600, fontSize: 13 }}>{l}</td>
                  <td style={{ padding: "12px 14px", color: C.green, fontWeight: 700 }}>{d}</td>
                  <td style={{ padding: "12px 14px", color: C.grayL, fontSize: 13 }}>{it}</td>
                  <td style={{ padding: "12px 14px", color: C.grayL, fontSize: 13 }}>{st}</td>
                  <td style={{ padding: "12px 14px", color: C.yellow, fontWeight: 600 }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── API / SHOPIFY ────────────────────────────────────────────────────────────
function APIPage({ user }) {
  const apiKey = `kzx_${user.id?.slice(0, 8)}_live`;
  const webhookUrl = `https://khanzxpress.vercel.app/api/webhook`;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card style={{ marginBottom: 20 }}>
        <CardHead>🔗 API & Shopify Integration</CardHead>
        <div style={{ padding: "24px" }}>
          <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: "14px 18px", marginBottom: 20 }}>
            <div style={{ color: C.blue, fontWeight: 700, marginBottom: 8 }}>ℹ️ How it works</div>
            <div style={{ color: C.grayL, fontSize: 13, lineHeight: 1.7 }}>
              Connect your Shopify store or any website to KhanZxpress. When a customer places an order, a booking is automatically created and an airway bill is generated!
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>🔑 Your API Key</div>
            <div style={{ background: C.black4, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <code style={{ color: C.primary, fontSize: 13 }}>{apiKey}</code>
              <button onClick={() => navigator.clipboard.writeText(apiKey)} style={{ background: C.primary, color: C.white, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Copy</button>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>🔗 Webhook URL (for Shopify)</div>
            <div style={{ background: C.black4, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <code style={{ color: C.green, fontSize: 12 }}>{webhookUrl}</code>
              <button onClick={() => navigator.clipboard.writeText(webhookUrl)} style={{ background: C.primary, color: C.white, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Copy</button>
            </div>
          </div>

          <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>📋 Shopify Setup Steps</div>
          {[
            "Go to Shopify Admin → Settings → Notifications",
            "Click 'Create webhook'",
            "Event: 'Order payment' or 'Order fulfillment'",
            "Format: JSON",
            "Paste the Webhook URL above",
            "Add your API Key in the header: X-API-Key",
            "Save webhook — orders will auto-book!",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.primary, color: C.white, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <div style={{ color: C.grayL, fontSize: 13, lineHeight: 1.5 }}>{step}</div>
            </div>
          ))}

          <div style={{ background: "rgba(232,0,29,0.08)", border: "1px solid rgba(232,0,29,0.2)", borderRadius: 8, padding: "14px 18px", marginTop: 20 }}>
            <div style={{ color: C.primary, fontWeight: 700, marginBottom: 8 }}>📞 Need Help?</div>
            <div style={{ color: C.grayL, fontSize: 13 }}>
              Contact us for custom API integration:<br />
              📧 info@khanzxpress.pk | 📞 +92-325-6227136
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ user }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card>
        <div style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.black3}` }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, color: C.white, fontWeight: 700, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px rgba(232,0,29,0.4)` }}>{user.name?.charAt(0)?.toUpperCase() || "M"}</div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, fontSize: 20 }}>{user.name}</div>
              <div style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>{user.company}</div>
              <div style={{ display: "inline-block", background: "rgba(34,197,94,0.12)", color: C.green, fontSize: 11, padding: "3px 10px", borderRadius: 10, marginTop: 6, fontWeight: 600 }}>● ACTIVE MERCHANT</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Full Name", user.name], ["Company", user.company], ["Email", user.email], ["Phone", user.phone], ["City", user.city], ["Address", user.address], ["Account Type", user.account_type || "COD"], ["CNIC", user.cnic]].map(([l, v]) => (
              <div key={l} style={{ background: C.black4, borderRadius: 8, padding: "14px" }}>
                <div style={{ color: C.gray, fontSize: 11, marginBottom: 4, letterSpacing: .5 }}>{l.toUpperCase()}</div>
                <div style={{ color: C.white, fontWeight: 600, fontSize: 13, wordBreak: "break-all" }}>{v || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── BANK DETAILS ─────────────────────────────────────────────────────────────
function BankDetails({ user }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <Card>
        <CardHead>🏦 Bank Account Details</CardHead>
        <div style={{ padding: "24px" }}>
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#fcd34d" }}>
            ⚠️ Used for COD settlements. Contact info@khanzxpress.pk for any disputes.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Bank Name", user.bank_name], ["Account Title", user.account_title], ["Account Number", user.account_no], ["IBAN", user.iban]].map(([k, v]) => (
              <div key={k} style={{ background: C.black4, borderRadius: 8, padding: "13px", gridColumn: k === "IBAN" ? "1 / -1" : "auto" }}>
                <div style={{ color: C.gray, fontSize: 11, marginBottom: 4 }}>{k.toUpperCase()}</div>
                <div style={{ color: C.white, fontWeight: 600, fontSize: 13, wordBreak: "break-all" }}>{v || "—"}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.black3}` }}>
            <div style={{ color: C.white, fontWeight: 600, marginBottom: 12 }}>💳 Settlement Schedule</div>
            {[["Frequency", "Every 3 working days"], ["Minimum Payout", "Rs. 500"], ["Method", "Bank Transfer / EasyPaisa / JazzCash"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{l}</span><span style={{ color: C.white, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  return screen === "login"
    ? <LoginPage onLogin={u => { setUser(u); setScreen("portal"); }} onGoRegister={() => setScreen("register")} />
    : screen === "register"
      ? <RegisterPage onRegister={u => { setUser(u); setScreen("portal"); }} onGoLogin={() => setScreen("login")} />
      : (
        <PortalLayout user={user} page={page} setPage={setPage} onLogout={() => { setUser(null); setScreen("login"); }}>
          {page === "dashboard" && <Dashboard user={user} setPage={setPage} />}
          {page === "newbooking" && <NewBooking user={user} />}
          {page === "parcels" && <Parcels user={user} />}
          {page === "tracking" && <TrackParcel user={user} />}
          {page === "payments" && <Payments user={user} />}
          {page === "rates" && <RateCard />}
          {page === "api" && <APIPage user={user} />}
          {page === "profile" && <Profile user={user} />}
          {page === "bank" && <BankDetails user={user} />}
        </PortalLayout>
      );
}
