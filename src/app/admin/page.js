"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── LAHORE AREAS ──────────────────────────────────────────────────────────────
const LAHORE = [
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
  "Wahdat Road","Barkat Market","Sabzazar","Allama Iqbal Town",
  "Revenue Society","Khayaban Colony","Sui Gas Society","PCSIR",
  "Johar Town Phase 1","Johar Town Phase 2","Nawab Town","Nishtar Colony",
  "Garhi Shahu","Krishan Nagar","Sant Nagar","Dharampura","Badami Bagh",
  "Shahdara","Ravi Road","Bund Road","Sagian Road","Bilal Gunj",
  "Yakki Gate","Kashmiri Bazar","Urdu Bazar","Hafeez Centre Area",
  "Liberty Market Area","MM Alam Road","Packages Mall Area",
  "Emporium Mall Area","Fortress Stadium Area","LDA Avenue",
  "Chung","Kahna","Chungi Amar Sidhu","Kot Lakhpat",
  "Sundar Industrial Estate","Quaid e Azam Industrial Estate",
  "Gulshan e Ravi","Awan Town","Muslim Nagar","Shalimar Town",
  "Other Lahore Area"
];

const OTHER_CITIES = [
  "Islamabad","Rawalpindi","Karachi","Faisalabad","Multan","Peshawar",
  "Quetta","Sialkot","Gujranwala","Gujrat","Sargodha","Bahawalpur",
  "Sukkur","Hyderabad","Abbottabad","Mardan","Swat","Dera Ghazi Khan",
  "Rahim Yar Khan","Sahiwal","Kasur","Sheikhupura","Hafizabad",
  "Narowal","Mandi Bahauddin","Attock","Chakwal","Jhelum","Khushab",
  "Bhakkar","Layyah","Muzaffargarh","Lodhran","Vehari","Khanewal",
  "Okara","Pakpattan","Chiniot","Toba Tek Singh","Jhang",
  "Nankana Sahib","Mianwali","Karak","Bannu","Lakki Marwat",
  "Kohat","Nowshera","Charsadda","Malakand","Mansehra","Haripur",
  "Mirpur AJK","Muzaffarabad","Bagh","Rawalakot"
];

const BANKS = [
  "EasyPaisa","Sadapay","JazzCash","Meezan Bank","HBL - Habib Bank Limited",
  "UBL - United Bank Limited","MCB Bank","Allied Bank","Bank Alfalah",
  "Bank Al-Habib","NBP - National Bank of Pakistan","The Bank of Punjab",
  "Askari Bank","Faysal Bank","JS Bank","Standard Chartered",
  "Dubai Islamic Bank","BankIslami Pakistan","Soneri Bank","Silk Bank",
  "Summit Bank","Telenor Bank","Mobilink Microfinance Bank"
];

// ── COLORS ────────────────────────────────────────────────────────────────────
const R = "#e8001d", R2 = "#b0001a";
const B = "#0a0a0a", B2 = "#111", B3 = "#1a1a1a", B4 = "#222";
const W = "#fff", G = "#888", GL = "#aaa";
const GRN = "#22c55e", YLW = "#f59e0b", BLU = "#3b82f6";

function genTrk() {
  const d = new Date();
  return `KZX${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}${Math.floor(Math.random()*9000)+1000}`;
}

function isLahore(city) { return LAHORE.includes(city); }

function calcCharges(dest, src, cod, rates) {
  const same = isLahore(dest) && isLahore(src);
  const delivery = same ? (rates?.same_city||300) : (rates?.intercity||250);
  const fuel = Math.round(delivery * (rates?.fuel_charges||0) / 100);
  const gst = Math.round(Number(cod) * (rates?.gst||0) / 100);
  const income = Math.round(Number(cod) * (rates?.income_tax||2) / 100);
  const sales = Math.round(Number(cod) * (rates?.sales_tax||2) / 100);
  const total = delivery + fuel + gst + income + sales;
  return { delivery, fuel, gst, income, sales, total, sameCity: same };
}

// ── LOGO ──────────────────────────────────────────────────────────────────────
function Logo({ sz = "md" }) {
  const t = sz==="lg"?24:sz==="md"?18:13;
  const z = sz==="lg"?30:sz==="md"?22:16;
  return (
    <div style={{ display:"flex", alignItems:"baseline" }}>
      <span style={{ fontFamily:"Arial Black,sans-serif", fontWeight:900, fontStyle:"italic", fontSize:t, color:W, letterSpacing:-1 }}>Khan</span>
      <span style={{ fontFamily:"Arial Black,sans-serif", fontWeight:900, fontStyle:"italic", fontSize:z, color:R, letterSpacing:-1, borderBottom:"2px solid "+R }}>Z</span>
      <span style={{ fontFamily:"Arial Black,sans-serif", fontWeight:900, fontStyle:"italic", fontSize:t, color:W, letterSpacing:-1 }}>xpress</span>
      <span style={{ fontFamily:"Arial Black,sans-serif", fontWeight:900, fontStyle:"italic", fontSize:t-4, color:W, marginLeft:2 }}>.pk</span>
    </div>
  );
}

function Lines() {
  return (
    <div style={{ display:"flex", gap:3, marginTop:2 }}>
      <div style={{ width:24, height:2, background:R, borderRadius:2 }} />
      <div style={{ width:14, height:2, background:R, opacity:.6, borderRadius:2 }} />
      <div style={{ width:7, height:2, background:R, opacity:.3, borderRadius:2 }} />
    </div>
  );
}

function Card({ children, xtra }) {
  return <div style={{ background:B2, borderRadius:12, border:"1px solid "+B3, ...xtra }}>{children}</div>;
}
function CardTop({ title, right }) {
  return (
    <div style={{ padding:"14px 20px", borderBottom:"1px solid "+B3, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div style={{ color:W, fontWeight:700, fontSize:14 }}>{title}</div>
      {right}
    </div>
  );
}
function Inp({ lbl, val, chg, ph="", tp="text", req=false, ro=false }) {
  return (
    <div style={{ marginBottom:14 }}>
      {lbl && <label style={{ display:"block", fontSize:11, fontWeight:700, color:GL, marginBottom:5, letterSpacing:.5 }}>{lbl}{req&&<span style={{ color:R }}> *</span>}</label>}
      <input value={val} onChange={e=>chg&&chg(e.target.value)} placeholder={ph} type={tp} readOnly={ro}
        style={{ width:"100%", background:ro?B3:B4, border:"1px solid "+B3, borderRadius:8, padding:"10px 14px", color:W, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", cursor:ro?"not-allowed":"text" }}
        onFocus={e=>{ if(!ro) e.target.style.borderColor=R; }}
        onBlur={e=>e.target.style.borderColor=B3} />
    </div>
  );
}
function CitySelect({ lbl, val, chg, req=false }) {
  return (
    <div style={{ marginBottom:14 }}>
      {lbl && <label style={{ display:"block", fontSize:11, fontWeight:700, color:GL, marginBottom:5, letterSpacing:.5 }}>{lbl}{req&&<span style={{ color:R }}> *</span>}</label>}
      <select value={val} onChange={e=>chg(e.target.value)}
        style={{ width:"100%", background:B4, border:"1px solid "+B3, borderRadius:8, padding:"10px 14px", color:val?W:G, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
        onFocus={e=>e.target.style.borderColor=R}
        onBlur={e=>e.target.style.borderColor=B3}>
        <option value="">-- Select City --</option>
        <optgroup label="── Lahore Areas ──">{LAHORE.map(o=><option key={o} value={o}>{o}</option>)}</optgroup>
        <optgroup label="── Other Cities ──">{OTHER_CITIES.map(o=><option key={o} value={o}>{o}</option>)}</optgroup>
      </select>
    </div>
  );
}
function StatusBadge({ s }) {
  const m = { "Delivered":[GRN,"rgba(34,197,94,0.12)"], "Returned":[R,"rgba(232,0,29,0.12)"], "In Transit":[YLW,"rgba(245,158,11,0.12)"], "Out for Delivery":[BLU,"rgba(59,130,246,0.12)"], "Booked":["#a78bfa","rgba(167,139,250,0.12)"] };
  const [c,bg] = m[s]||[G,"rgba(136,136,136,0.12)"];
  return <span style={{ background:bg, color:c, padding:"3px 10px", borderRadius:10, fontSize:11, fontWeight:600 }}>{s}</span>;
}

// ── PRINT AIRWAY BILL ─────────────────────────────────────────────────────────
function printBill(b, rates) {
  const c = calcCharges(b.receiver_city, b.sender_city, b.cod_amount, rates);
  const w = window.open("","_blank");
  w.document.write(`<!DOCTYPE html><html><head><title>Airway Bill - ${b.tracking_no}</title>
  <style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:12px;}
  .bill{width:100mm;border:2px solid #000;}.header{background:#e8001d;color:white;padding:10px;text-align:center;}
  .logo{font-size:20px;font-weight:900;font-style:italic;}.logo span{color:#ffcc00;}
  .barcode{text-align:center;padding:8px;border-bottom:1px dashed #000;background:#f5f5f5;}
  .bars{display:flex;justify-content:center;gap:1px;align-items:center;}
  .tracking-text{font-size:10px;margin-top:4px;font-family:monospace;letter-spacing:2px;}
  .section{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #ddd;}
  .box{padding:8px;border-right:1px solid #ddd;}.box:last-child{border-right:none;}
  .box-label{font-size:9px;font-weight:700;color:#666;letter-spacing:1px;margin-bottom:4px;text-transform:uppercase;}
  .box-value{font-size:12px;font-weight:600;color:#000;}.box-sub{font-size:10px;color:#444;margin-top:2px;}
  .charges{padding:8px;border-bottom:1px solid #ddd;}
  .charge-row{display:flex;justify-content:space-between;padding:3px 0;font-size:11px;border-bottom:1px dotted #eee;}
  .total-row{display:flex;justify-content:space-between;padding:6px 0 0;font-size:14px;font-weight:700;}
  .collect{background:#e8001d;color:white;padding:8px;text-align:center;font-size:13px;font-weight:700;}
  .footer{padding:6px;text-align:center;font-size:9px;color:#666;}
  @media print{body{margin:0;}}</style></head><body>
  <div class="bill">
    <div class="header">
      <div class="logo">Khan<span>Z</span>xpress.pk</div>
      <div style="font-size:11px;margin-top:4px;letter-spacing:2px;">COD AIRWAY BILL</div>
    </div>
    <div class="barcode">
      <div class="bars">${Array.from({length:50}).map((_,i)=>`<div style="width:${i%3===0?3:1.5}px;height:35px;background:${i%7===0?"#000":i%5===0?"#333":"#666"}"></div>`).join("")}</div>
      <div class="tracking-text">${b.tracking_no}</div>
    </div>
    <div class="section">
      <div class="box">
        <div class="box-label">📤 Sender</div>
        <div class="box-value">${b.sender_name}</div>
        <div class="box-sub">${b.sender_address||""}</div>
        <div class="box-sub">${b.sender_city}</div>
        <div class="box-sub">📞 ${b.sender_phone}</div>
      </div>
      <div class="box" style="background:#fff8f8;border-left:2px solid #e8001d;">
        <div class="box-label" style="color:#e8001d;">📥 Receiver</div>
        <div class="box-value">${b.receiver_name}</div>
        <div class="box-sub">${b.receiver_address||""}</div>
        <div class="box-sub">${b.receiver_city}</div>
        <div class="box-sub">📞 ${b.receiver_phone}</div>
      </div>
    </div>
    <div class="section">
      <div class="box">
        <div class="box-label">📦 Parcel</div>
        <div class="box-value">${b.parcel_desc||"General"}</div>
        <div class="box-sub">Weight: ${b.weight||"N/A"} kg</div>
        <div class="box-sub">Date: ${b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):new Date().toLocaleDateString("en-PK")}</div>
      </div>
      <div class="box">
        <div class="box-label">💰 COD Amount</div>
        <div class="box-value" style="font-size:18px;color:#e8001d;">Rs. ${Number(b.cod_amount).toLocaleString()}</div>
        <div class="box-sub">${c.sameCity?"Same City":"Intercity"}</div>
      </div>
    </div>
    <div class="charges">
      <div class="charge-row"><span>Delivery Charge</span><span>Rs. ${c.delivery}</span></div>
      ${c.fuel>0?`<div class="charge-row"><span>Fuel Charges</span><span>Rs. ${c.fuel}</span></div>`:""}
      ${c.gst>0?`<div class="charge-row"><span>GST</span><span>Rs. ${c.gst}</span></div>`:""}
      <div class="charge-row"><span>Income Tax (2%)</span><span>Rs. ${c.income}</span></div>
      <div class="charge-row"><span>Sales Tax (2%)</span><span>Rs. ${c.sales}</span></div>
      <div class="total-row"><span>Total Charges</span><span style="color:#e8001d;">Rs. ${c.total}</span></div>
    </div>
    <div class="collect">💵 COLLECT FROM CUSTOMER: Rs. ${(Number(b.cod_amount)+c.total).toLocaleString()}</div>
    <div class="footer">KhanZxpress.pk | info@khanzxpress.pk | +92-325-6227136 | Lahore<br/><strong>Signature: ____________________</strong></div>
  </div>
  <script>window.onload=()=>window.print();</script></body></html>`);
  w.document.close();
}

// ── PRINT LOADSHEET ───────────────────────────────────────────────────────────
function printLoadsheet(bookings, user, rates) {
  const w = window.open("","_blank");
  const total = bookings.length;
  const totalCOD = bookings.reduce((s,b)=>s+Number(b.cod_amount||0),0);
  const totalChg = bookings.reduce((s,b)=>s+Number(b.total_charges||0),0);
  w.document.write(`<!DOCTYPE html><html><head><title>Loadsheet - ${new Date().toLocaleDateString("en-PK")}</title>
  <style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:11px;padding:20px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:3px solid #e8001d;}
  .logo{font-size:22px;font-weight:900;font-style:italic;color:#000;}.logo span{color:#e8001d;}
  h2{color:#e8001d;font-size:16px;margin-bottom:4px;}
  .info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;background:#f5f5f5;padding:12px;border-radius:8px;}
  .info-box{text-align:center;}.info-label{font-size:9px;color:#666;text-transform:uppercase;letter-spacing:1px;}
  .info-val{font-size:16px;font-weight:700;color:#e8001d;margin-top:2px;}
  table{width:100%;border-collapse:collapse;margin-bottom:20px;}
  th{background:#e8001d;color:white;padding:8px 6px;text-align:left;font-size:10px;letter-spacing:.5px;}
  td{padding:7px 6px;border-bottom:1px solid #eee;font-size:10px;}
  tr:nth-child(even){background:#f9f9f9;}
  .footer{display:flex;justify-content:space-between;margin-top:30px;padding-top:20px;border-top:2px solid #e8001d;}
  .sign-box{text-align:center;min-width:180px;}
  .sign-line{border-bottom:1px solid #000;margin-bottom:6px;height:40px;}
  @media print{body{padding:10px;}}</style></head><body>
  <div class="header">
    <div>
      <div class="logo">Khan<span>Z</span>xpress<span style="font-size:14px;">.pk</span></div>
      <div style="font-size:11px;color:#666;margin-top:4px;">Lahore, Pakistan | +92-325-6227136</div>
    </div>
    <div style="text-align:right;">
      <h2>LOADSHEET</h2>
      <div>Date: ${new Date().toLocaleDateString("en-PK",{year:"numeric",month:"long",day:"numeric"})}</div>
      <div>Merchant: <strong>${user.name}</strong> — ${user.company||"KhanZxpress.pk"}</div>
      <div>Total Parcels: <strong style="color:#e8001d;">${total}</strong></div>
    </div>
  </div>
  <div class="info-grid">
    <div class="info-box"><div class="info-label">Total Parcels</div><div class="info-val">${total}</div></div>
    <div class="info-box"><div class="info-label">Total COD</div><div class="info-val">Rs.${totalCOD.toLocaleString()}</div></div>
    <div class="info-box"><div class="info-label">Total Charges</div><div class="info-val">Rs.${totalChg.toLocaleString()}</div></div>
    <div class="info-box"><div class="info-label">Net Payable</div><div class="info-val">Rs.${(totalCOD-totalChg).toLocaleString()}</div></div>
  </div>
  <table>
    <thead><tr>
      <th>#</th><th>Tracking No</th><th>Receiver Name</th><th>Phone</th>
      <th>City</th><th>COD Amount</th><th>Charges</th><th>Status</th>
    </tr></thead>
    <tbody>
      ${bookings.map((b,i)=>`<tr>
        <td>${i+1}</td>
        <td><strong>${b.tracking_no}</strong></td>
        <td>${b.receiver_name}</td>
        <td>${b.receiver_phone}</td>
        <td>${b.receiver_city}</td>
        <td><strong>Rs.${Number(b.cod_amount||0).toLocaleString()}</strong></td>
        <td>Rs.${Number(b.total_charges||0).toLocaleString()}</td>
        <td>${b.status}</td>
      </tr>`).join("")}
    </tbody>
    <tfoot>
      <tr style="background:#e8001d;color:white;font-weight:700;">
        <td colspan="5" style="padding:8px 6px;text-align:right;">TOTALS:</td>
        <td style="padding:8px 6px;">Rs.${totalCOD.toLocaleString()}</td>
        <td style="padding:8px 6px;">Rs.${totalChg.toLocaleString()}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  <div class="footer">
    <div class="sign-box"><div class="sign-line"></div><div>Merchant Signature</div><div style="font-size:9px;color:#666;">${user.name}</div></div>
    <div class="sign-box"><div class="sign-line"></div><div>Rider Signature</div><div style="font-size:9px;color:#666;">Name: ______________</div></div>
    <div class="sign-box"><div class="sign-line"></div><div>Operations Stamp</div><div style="font-size:9px;color:#666;">KhanZxpress.pk</div></div>
  </div>
  <script>window.onload=()=>window.print();</script></body></html>`);
  w.document.close();
}

// ── AUTH LAYOUT ───────────────────────────────────────────────────────────────
function AuthWrap({ children }) {
  return (
    <div style={{ minHeight:"100vh", background:B, display:"flex", flexDirection:"column", fontFamily:"Segoe UI,sans-serif" }}>
      <div style={{ background:B2, borderBottom:"1px solid "+B3, padding:"12px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div><Logo sz="md" /><Lines /></div>
        <div style={{ display:"flex", gap:20, fontSize:12, color:G }}>
          <span>📧 info@khanzxpress.pk</span>
          <span>📞 +92-325-6227136</span>
          <span>📍 Lahore, Pakistan</span>
        </div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
        <div style={{ width:"100%", maxWidth:520, background:B2, borderRadius:16, border:"1px solid "+B3, overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.8)" }}>
          <div style={{ background:`linear-gradient(135deg,${R},${R2})`, padding:"28px 32px", textAlign:"center" }}>
            <Logo sz="lg" /><Lines />
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:12, marginTop:8, letterSpacing:2 }}>MERCHANT PORTAL</div>
          </div>
          <div style={{ padding:"32px" }}>{children}</div>
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"14px", color:G, fontSize:11, borderTop:"1px solid "+B3 }}>
        © 2026 KhanZxpress.pk · All Rights Reserved · Lahore, Pakistan
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onGoReg }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function tryLogin() {
    if (!email||!pass) { setErr("Please fill all fields"); return; }
    setBusy(true); setErr("");
    const { data } = await supa.from("merchants").select("*").eq("email",email).eq("password",pass).single();
    if (data) {
      try { localStorage.setItem("kzx_merchant", JSON.stringify(data)); } catch(e) {}
      onLogin(data);
    } else { setErr("Invalid email or password"); }
    setBusy(false);
  }

  return (
    <AuthWrap>
      <h2 style={{ color:W, fontSize:20, fontWeight:700, marginBottom:4, textAlign:"center" }}>Sign In</h2>
      <p style={{ color:G, fontSize:13, textAlign:"center", marginBottom:24 }}>Sign in to your KhanZxpress Merchant Account</p>
      {err && <div style={{ background:"rgba(232,0,29,0.1)", border:"1px solid rgba(232,0,29,0.3)", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#ffaaaa", fontSize:13 }}>❌ {err}</div>}
      <Inp lbl="Email" val={email} chg={setEmail} ph="your@email.com" tp="email" />
      <Inp lbl="Password" val={pass} chg={setPass} ph="••••••••" tp="password" />
      <button onClick={tryLogin} disabled={busy}
        style={{ width:"100%", background:R, color:W, border:"none", padding:"13px", borderRadius:10, fontWeight:700, fontSize:16, cursor:"pointer", boxShadow:"0 4px 20px rgba(232,0,29,0.35)", opacity:busy?.7:1, fontFamily:"inherit" }}>
        {busy ? "Signing in..." : "Sign In Now →"}
      </button>
      <p style={{ textAlign:"center", marginTop:20, color:G, fontSize:13 }}>
        Don't have an account?{" "}
        <span onClick={onGoReg} style={{ color:R, cursor:"pointer", fontWeight:600 }}>Sign up here</span>
      </p>
    </AuthWrap>
  );
}

// ── REGISTER ──────────────────────────────────────────────────────────────────
function RegisterPage({ onRegister, onGoLogin }) {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [f, setF] = useState({
    company:"", contact:"", phone:"", email:"", address:"", city:"Johar Town", cnic:"",
    bank_name:"", account_title:"", account_no:"", iban:"",
    account_type:"COD", expected_shipments:"",
    password:"", confirmPassword:"", agree:false,
  });
  const upd = (k,v) => setF(p=>({...p,[k]:v}));

  async function doRegister() {
    if (!f.agree) { setErr("Please agree to terms"); return; }
    if (f.password!==f.confirmPassword) { setErr("Passwords do not match"); return; }
    setBusy(true); setErr("");
    const { data, error } = await supa.from("merchants").insert([{
      name:f.contact, company:f.company, email:f.email, phone:f.phone,
      city:f.city, address:f.address, cnic:f.cnic,
      bank_name:f.bank_name, account_title:f.account_title,
      account_no:f.account_no, iban:f.iban,
      account_type:f.account_type, password:f.password,
      expected_shipments:f.expected_shipments, status:"active",
    }]).select().single();
    if (error) { setErr(error.message); setBusy(false); return; }
    try { localStorage.setItem("kzx_merchant", JSON.stringify(data)); } catch(e) {}
    onRegister(data);
    setBusy(false);
  }

  const steps = [{n:1,lbl:"Personal"},{n:2,lbl:"Bank"},{n:3,lbl:"Shipping"},{n:4,lbl:"Password"}];

  return (
    <AuthWrap>
      <h2 style={{ color:W, fontSize:20, fontWeight:700, marginBottom:20, textAlign:"center" }}>Create Account</h2>
      <div style={{ display:"flex", marginBottom:28, position:"relative" }}>
        <div style={{ position:"absolute", top:14, left:"8%", right:"8%", height:2, background:B3, zIndex:0 }} />
        {steps.map(s=>(
          <div key={s.n} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative", zIndex:1 }}>
            <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, background:step>=s.n?R:B3, color:step>=s.n?W:G, marginBottom:4, boxShadow:step>=s.n?"0 0 10px rgba(232,0,29,0.4)":"none" }}>
              {step>s.n?"✓":s.n}
            </div>
            <div style={{ fontSize:9, color:step>=s.n?W:G }}>{s.lbl}</div>
          </div>
        ))}
      </div>
      {err && <div style={{ background:"rgba(232,0,29,0.1)", border:"1px solid rgba(232,0,29,0.3)", borderRadius:8, padding:"10px 14px", marginBottom:16, color:"#ffaaaa", fontSize:13 }}>❌ {err}</div>}

      {step===1&&<>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
          <Inp lbl="Company Name" val={f.company} chg={v=>upd("company",v)} req />
          <Inp lbl="Contact Person" val={f.contact} chg={v=>upd("contact",v)} req />
          <Inp lbl="Phone" val={f.phone} chg={v=>upd("phone",v)} ph="03XX-XXXXXXX" req />
          <Inp lbl="Email" val={f.email} chg={v=>upd("email",v)} tp="email" req />
        </div>
        <Inp lbl="Pickup Address" val={f.address} chg={v=>upd("address",v)} req />
        <CitySelect lbl="City" val={f.city} chg={v=>upd("city",v)} req />
        <Inp lbl="CNIC" val={f.cnic} chg={v=>upd("cnic",v)} ph="XXXXX-XXXXXXX-X" req />
        <button onClick={()=>setStep(2)} style={{ width:"100%", background:R, color:W, border:"none", padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Next →</button>
      </>}
      {step===2&&<>
        <div style={{ marginBottom:14 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:GL, marginBottom:5 }}>Bank Name *</label>
          <select value={f.bank_name} onChange={e=>upd("bank_name",e.target.value)}
            style={{ width:"100%", background:B4, border:"1px solid "+B3, borderRadius:8, padding:"10px 14px", color:f.bank_name?W:G, fontSize:14, outline:"none", boxSizing:"border-box" }}>
            <option value="">-- Select Bank --</option>
            {BANKS.map(b=><option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
          <Inp lbl="Account Title" val={f.account_title} chg={v=>upd("account_title",v)} req />
          <Inp lbl="Account Number" val={f.account_no} chg={v=>upd("account_no",v)} req />
        </div>
        <Inp lbl="IBAN" val={f.iban} chg={v=>upd("iban",v)} />
        <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#fcd34d" }}>
          ⚠️ Bank details used for COD settlements.
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setStep(1)} style={{ flex:1, background:"transparent", color:GL, border:"1px solid "+B3, padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
          <button onClick={()=>setStep(3)} style={{ flex:2, background:R, color:W, border:"none", padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Next →</button>
        </div>
      </>}
      {step===3&&<>
        <div style={{ marginBottom:14 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:GL, marginBottom:5 }}>Account Type *</label>
          <select value={f.account_type} onChange={e=>upd("account_type",e.target.value)}
            style={{ width:"100%", background:B4, border:"1px solid "+B3, borderRadius:8, padding:"10px 14px", color:W, fontSize:14, outline:"none", boxSizing:"border-box" }}>
            {["COD","NON COD","Corporate"].map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <Inp lbl="Expected Shipments/Month" val={f.expected_shipments} chg={v=>upd("expected_shipments",v)} tp="number" req />
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setStep(2)} style={{ flex:1, background:"transparent", color:GL, border:"1px solid "+B3, padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
          <button onClick={()=>setStep(4)} style={{ flex:2, background:R, color:W, border:"none", padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Next →</button>
        </div>
      </>}
      {step===4&&<>
        <Inp lbl="Password" val={f.password} chg={v=>upd("password",v)} tp="password" req />
        <Inp lbl="Confirm Password" val={f.confirmPassword} chg={v=>upd("confirmPassword",v)} tp="password" req />
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:20 }}>
          <input type="checkbox" checked={f.agree} onChange={e=>upd("agree",e.target.checked)} style={{ marginTop:3, accentColor:R, cursor:"pointer" }} />
          <div style={{ fontSize:12, color:G, lineHeight:1.5 }}>I agree to the <span style={{ color:R }}>Terms and Conditions</span> of KhanZxpress.pk</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setStep(3)} style={{ flex:1, background:"transparent", color:GL, border:"1px solid "+B3, padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
          <button onClick={doRegister} disabled={busy||!f.agree}
            style={{ flex:2, background:f.agree?R:"#333", color:W, border:"none", padding:"12px", borderRadius:10, fontWeight:700, cursor:f.agree?"pointer":"not-allowed", fontFamily:"inherit", opacity:busy?.7:1 }}>
            {busy?"Registering...":"✅ Submit Registration"}
          </button>
        </div>
        <p style={{ textAlign:"center", marginTop:16, color:G, fontSize:13 }}>
          Already have an account?{" "}
          <span onClick={onGoLogin} style={{ color:R, cursor:"pointer", fontWeight:600 }}>Sign in here</span>
        </p>
      </>}
    </AuthWrap>
  );
}

// ── PORTAL LAYOUT ─────────────────────────────────────────────────────────────
function Portal({ user, pg, setPg, doLogout, children }) {
  const nav = [
    {id:"dashboard",ico:"📊",lbl:"Dashboard"},
    {id:"newbooking",ico:"➕",lbl:"New Booking"},
    {id:"parcels",ico:"📦",lbl:"My Parcels"},
    {id:"loadsheet",ico:"📋",lbl:"Loadsheet"},
    {id:"tracking",ico:"🔍",lbl:"Track Parcel"},
    {id:"payments",ico:"💳",lbl:"Payments"},
    {id:"rates",ico:"💰",lbl:"Rate Card"},
    {id:"api",ico:"🔗",lbl:"API / Shopify"},
    {id:"profile",ico:"👤",lbl:"My Profile"},
    {id:"bank",ico:"🏦",lbl:"Bank Details"},
  ];
  const cur = nav.find(n=>n.id===pg);
  return (
    <div style={{ minHeight:"100vh", background:B, fontFamily:"Segoe UI,sans-serif", display:"flex" }}>
      <div style={{ width:215, background:B2, borderRight:"1px solid "+B3, position:"fixed", top:0, left:0, bottom:0, display:"flex", flexDirection:"column", zIndex:50 }}>
        <div style={{ padding:"18px 16px", borderBottom:"1px solid "+B3 }}>
          <Logo sz="sm" /><Lines />
          <div style={{ fontSize:9, color:G, marginTop:4, letterSpacing:1 }}>MERCHANT PORTAL</div>
        </div>
        <div style={{ padding:"14px 12px", borderBottom:"1px solid "+B3 }}>
          <div style={{ background:"rgba(232,0,29,0.08)", border:"1px solid rgba(232,0,29,0.15)", borderRadius:10, padding:"12px", textAlign:"center" }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${R},${R2})`, color:W, fontWeight:700, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", boxShadow:"0 0 14px rgba(232,0,29,0.4)" }}>
              {user.name?.charAt(0)?.toUpperCase()||"M"}
            </div>
            <div style={{ color:W, fontWeight:600, fontSize:12 }}>{user.name}</div>
            <div style={{ color:G, fontSize:10, marginTop:1 }}>{user.company}</div>
            <div style={{ display:"inline-block", background:"rgba(34,197,94,0.12)", color:GRN, fontSize:9, padding:"2px 8px", borderRadius:10, marginTop:5, fontWeight:600 }}>● ACTIVE</div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"10px", overflowY:"auto" }}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setPg(n.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, border:"none", cursor:"pointer", marginBottom:2, textAlign:"left", background:pg===n.id?"rgba(232,0,29,0.12)":"transparent", color:pg===n.id?W:G, borderLeft:"3px solid "+(pg===n.id?R:"transparent"), fontSize:12, fontWeight:pg===n.id?600:400, fontFamily:"inherit" }}>
              {n.ico} {n.lbl}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px 10px", borderTop:"1px solid "+B3 }}>
          <button onClick={doLogout} style={{ width:"100%", background:"rgba(232,0,29,0.08)", color:R, border:"1px solid rgba(232,0,29,0.2)", padding:"10px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:12, fontFamily:"inherit" }}>🚪 Sign Out</button>
        </div>
      </div>
      <div style={{ marginLeft:215, flex:1 }}>
        <div style={{ background:B2, borderBottom:"1px solid "+B3, padding:"0 28px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:40 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:3, height:20, background:R, borderRadius:2 }} />
            <div style={{ color:W, fontWeight:700, fontSize:17 }}>{cur?.ico} {cur?.lbl}</div>
          </div>
          <div style={{ display:"flex", gap:20, fontSize:12, color:G }}>
            <span>📞 +92-325-6227136</span>
            <span>📧 info@khanzxpress.pk</span>
          </div>
        </div>
        <div style={{ padding:"24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, setPg }) {
  const [stats, setStats] = useState({ total:0, delivered:0, transit:0, returned:0, revenue:0, pending:0 });
  const [recent, setRecent] = useState([]);

  useEffect(()=>{
    async function go() {
      const { data } = await supa.from("bookings").select("*").eq("merchant_id",user.id).order("created_at",{ascending:false});
      const b = data||[];
      setStats({
        total:b.length,
        delivered:b.filter(x=>x.status==="Delivered").length,
        transit:b.filter(x=>["Booked","In Transit","Out for Delivery"].includes(x.status)).length,
        returned:b.filter(x=>x.status==="Returned").length,
        revenue:b.filter(x=>x.status==="Delivered").reduce((s,x)=>s+(x.delivery_charge||0),0),
        pending:b.filter(x=>!["Delivered","Returned"].includes(x.status)).reduce((s,x)=>s+Number(x.cod_amount||0),0),
      });
      setRecent(b.slice(0,5));
    }
    go();
  },[user.id]);

  const cards = [
    {lbl:"Total Parcels",val:stats.total,ico:"📦",clr:BLU},
    {lbl:"Delivered",val:stats.delivered,ico:"✅",clr:GRN},
    {lbl:"In Transit",val:stats.transit,ico:"🚚",clr:YLW},
    {lbl:"Returns",val:stats.returned,ico:"↩️",clr:R},
    {lbl:"Revenue",val:"Rs."+stats.revenue.toLocaleString(),ico:"💰",clr:R},
    {lbl:"COD Pending",val:"Rs."+stats.pending.toLocaleString(),ico:"⏳",clr:BLU},
  ];

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ color:W, fontSize:20, fontWeight:700 }}>Welcome back, {user.name}! 👋</div>
        <div style={{ color:G, fontSize:13, marginTop:4 }}>{user.company} — Lahore</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {cards.map(c=>(
          <Card key={c.lbl} xtra={{ borderLeft:"3px solid "+c.clr }}>
            <div style={{ padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontSize:11, color:G, letterSpacing:.5, marginBottom:6 }}>{c.lbl.toUpperCase()}</div>
                <div style={{ fontSize:24, fontWeight:700, color:c.clr }}>{c.val}</div>
              </div>
              <div style={{ fontSize:26 }}>{c.ico}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card xtra={{ marginBottom:20 }}>
        <CardTop title="⚡ Quick Actions" />
        <div style={{ padding:"16px 20px", display:"flex", gap:12 }}>
          {[{lbl:"New Booking",ico:"➕",pg:"newbooking",clr:R},{lbl:"Loadsheet",ico:"📋",pg:"loadsheet",clr:GRN},{lbl:"Track Parcel",ico:"🔍",pg:"tracking",clr:BLU},{lbl:"Payments",ico:"💳",pg:"payments",clr:YLW}].map(a=>(
            <button key={a.lbl} onClick={()=>setPg(a.pg)}
              style={{ flex:1, background:"rgba(255,255,255,0.03)", border:"1px solid "+B3, borderRadius:10, padding:"14px 8px", cursor:"pointer", textAlign:"center", color:a.clr, fontFamily:"inherit" }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{a.ico}</div>
              <div style={{ fontSize:12, fontWeight:600 }}>{a.lbl}</div>
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <CardTop title="📋 Recent Parcels" />
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr style={{ background:"#0d0d0d" }}>
            {["Tracking","Receiver","City","COD","Status","Date"].map(h=>(
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, color:G, fontWeight:700 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {recent.length===0?<tr><td colSpan={6} style={{ padding:"30px", textAlign:"center", color:G }}>No parcels yet</td></tr>
              :recent.map((b,i)=>(
              <tr key={i} style={{ borderBottom:"1px solid "+B3 }}>
                <td style={{ padding:"10px 16px", fontSize:12, color:R, fontWeight:600 }}>{b.tracking_no}</td>
                <td style={{ padding:"10px 16px", fontSize:13, color:W }}>{b.receiver_name}</td>
                <td style={{ padding:"10px 16px", fontSize:12, color:GL }}>{b.receiver_city}</td>
                <td style={{ padding:"10px 16px", fontSize:13, color:W, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                <td style={{ padding:"10px 16px" }}><StatusBadge s={b.status} /></td>
                <td style={{ padding:"10px 16px", fontSize:12, color:G }}>{b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):"-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── NEW BOOKING ───────────────────────────────────────────────────────────────
function NewBooking({ user }) {
  const [rates, setRates] = useState(null);
  const [frm, setFrm] = useState({
    sender_name:user.name||"", sender_phone:user.phone||"",
    sender_address:user.address||"", sender_city:user.city||"Johar Town",
    receiver_name:"", receiver_phone:"", receiver_address:"", receiver_city:"",
    parcel_desc:"", weight:"", pieces:"1", cod_amount:"",
  });
  const [charges, setCharges] = useState(null);
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState(null);
  const upd = (k,v) => { setFrm(p=>({...p,[k]:v})); setCharges(null); };

  useEffect(()=>{
    supa.from("rates").select("*").single().then(({data})=>{ if(data) setRates(data); });
  },[]);

  function doCalc() {
    if (!frm.receiver_city||!frm.cod_amount) { alert("Fill Destination City and COD Amount"); return; }
    setCharges(calcCharges(frm.receiver_city, frm.sender_city, frm.cod_amount, rates));
  }

  async function doBook() {
    if (!charges) { doCalc(); return; }
    if (!frm.receiver_name||!frm.receiver_phone||!frm.receiver_city) { alert("Fill all receiver details"); return; }
    setBusy(true);
    const trk = genTrk();
    const { data, error } = await supa.from("bookings").insert([{
      ...frm, tracking_no:trk, merchant_id:user.id,
      delivery_charge:charges.delivery, fuel_charge:charges.fuel,
      gst:charges.gst, income_tax:charges.income,
      sales_tax:charges.sales, total_charges:charges.total,
      status:"Booked",
    }]).select().single();
    if (error) { alert("Booking failed: "+error.message); setBusy(false); return; }
    setBooked(data);
    setFrm(p=>({...p, receiver_name:"", receiver_phone:"", receiver_address:"", receiver_city:"", parcel_desc:"", weight:"", pieces:"1", cod_amount:""}));
    setCharges(null);
    setBusy(false);
  }

  return (
    <div>
      {booked&&(
        <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:12, padding:"16px 20px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ color:GRN, fontWeight:700, fontSize:15 }}>✅ Parcel Booked!</div>
            <div style={{ color:GL, fontSize:13, marginTop:4 }}>Tracking: <strong style={{ color:R }}>{booked.tracking_no}</strong></div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>printBill(booked,rates)} style={{ background:R, color:W, border:"none", padding:"8px 16px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>🖨️ Print Airway Bill</button>
            <button onClick={()=>setBooked(null)} style={{ background:"transparent", border:"1px solid "+B3, color:G, padding:"8px 12px", borderRadius:8, cursor:"pointer", fontFamily:"inherit" }}>✕</button>
          </div>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
        <Card>
          <CardTop title="📤 Sender Info (Auto-filled)" />
          <div style={{ padding:"20px" }}>
            <Inp lbl="Sender Name" val={frm.sender_name} chg={v=>upd("sender_name",v)} req />
            <Inp lbl="Phone" val={frm.sender_phone} chg={v=>upd("sender_phone",v)} req />
            <CitySelect lbl="Sender City" val={frm.sender_city} chg={v=>upd("sender_city",v)} req />
            <Inp lbl="Pickup Address" val={frm.sender_address} chg={v=>upd("sender_address",v)} req />
          </div>
        </Card>
        <Card>
          <CardTop title="📥 Receiver Info" />
          <div style={{ padding:"20px" }}>
            <Inp lbl="Receiver Name" val={frm.receiver_name} chg={v=>upd("receiver_name",v)} req />
            <Inp lbl="Phone" val={frm.receiver_phone} chg={v=>upd("receiver_phone",v)} req />
            <CitySelect lbl="Destination City" val={frm.receiver_city} chg={v=>upd("receiver_city",v)} req />
            <Inp lbl="Delivery Address" val={frm.receiver_address} chg={v=>upd("receiver_address",v)} req />
          </div>
        </Card>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <Card>
          <CardTop title="📦 Parcel Details" />
          <div style={{ padding:"20px" }}>
            <Inp lbl="Description" val={frm.parcel_desc} chg={v=>upd("parcel_desc",v)} ph="e.g. Clothes, Mobile" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 12px" }}>
              <Inp lbl="Weight (kg)" val={frm.weight} chg={v=>upd("weight",v)} tp="number" />
              <Inp lbl="Pieces" val={frm.pieces} chg={v=>upd("pieces",v)} tp="number" />
            </div>
            <Inp lbl="COD Amount (Rs.) *" val={frm.cod_amount} chg={v=>upd("cod_amount",v)} tp="number" req />
          </div>
        </Card>
        <Card>
          <CardTop title="💰 Charges Preview" />
          <div style={{ padding:"20px" }}>
            {charges?(
              <>
                <div style={{ background:"rgba(232,0,29,0.06)", border:"1px solid rgba(232,0,29,0.2)", borderRadius:8, padding:"14px", marginBottom:16 }}>
                  <div style={{ fontSize:11, color:R, marginBottom:10, fontWeight:700 }}>{charges.sameCity?"✅ SAME CITY — LAHORE":"🚚 INTERCITY / OUTSTATION"}</div>
                  {[["Delivery Charge",charges.delivery],["Fuel Charges",charges.fuel],["GST",charges.gst],["Income Tax (2%)",charges.income],["Sales Tax (2%)",charges.sales]].filter(([,v])=>v>0).map(([l,v])=>(
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid "+B3, fontSize:13, color:GL }}>
                      <span>{l}</span><span>Rs.{v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", fontSize:16, fontWeight:700, color:W }}>
                    <span>TOTAL</span><span>Rs.{charges.total}</span>
                  </div>
                </div>
                <div style={{ fontSize:12, color:G, marginBottom:16, background:B4, borderRadius:8, padding:"10px 12px", lineHeight:1.6 }}>
                  Collect from customer: <strong style={{ color:GRN }}>Rs.{(Number(frm.cod_amount)+charges.total).toLocaleString()}</strong>
                </div>
              </>
            ):(
              <div style={{ textAlign:"center", padding:"30px 0 20px", color:G, fontSize:13 }}>Fill city & COD amount then click Calculate</div>
            )}
            <button onClick={doCalc} style={{ width:"100%", background:"transparent", border:"1px solid "+R, color:R, padding:"10px", borderRadius:8, fontWeight:700, cursor:"pointer", marginBottom:10, fontFamily:"inherit" }}>🧮 Calculate Charges</button>
            <button onClick={doBook} disabled={busy}
              style={{ width:"100%", background:R, color:W, border:"none", padding:"13px", borderRadius:8, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 4px 18px rgba(232,0,29,0.35)", opacity:busy?.7:1, fontFamily:"inherit" }}>
              {busy?"Booking...":"🚀 Book & Generate Airway Bill"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── LOADSHEET ─────────────────────────────────────────────────────────────────
function Loadsheet({ user }) {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("Booked");
  const [rates, setRates] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(()=>{
    async function go() {
      const [{ data:bks }, { data:rts }] = await Promise.all([
        supa.from("bookings").select("*").eq("merchant_id",user.id).order("created_at",{ascending:false}),
        supa.from("rates").select("*").single(),
      ]);
      setBookings(bks||[]);
      if(rts) setRates(rts);
      setBusy(false);
    }
    go();
  },[user.id]);

  const shown = bookings.filter(b=>filter==="All"||b.status===filter);

  function toggleSelect(id) {
    setSelected(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  }
  function selectAll() {
    setSelected(shown.map(b=>b.id));
  }
  function clearAll() { setSelected([]); }

  const selectedBookings = bookings.filter(b=>selected.includes(b.id));

  function doLoadsheet() {
    if (selectedBookings.length===0) { alert("Please select at least one parcel"); return; }
    printLoadsheet(selectedBookings, user, rates);
  }

  const statuses = ["All","Booked","In Transit","Delivered","Returned"];

  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ color:W, fontWeight:600, fontSize:14 }}>📋 Select parcels to include in loadsheet:</div>
        <div style={{ display:"flex", gap:6 }}>
          {statuses.map(s=>(
            <button key={s} onClick={()=>{ setFilter(s); setSelected([]); }}
              style={{ background:filter===s?R:"transparent", color:filter===s?W:G, border:"1px solid "+(filter===s?R:B3), padding:"6px 12px", borderRadius:8, cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:filter===s?600:400 }}>{s}</button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:10 }}>
          <button onClick={selectAll} style={{ background:"transparent", border:"1px solid "+GRN, color:GRN, padding:"8px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }}>✅ Select All ({shown.length})</button>
          <button onClick={clearAll} style={{ background:"transparent", border:"1px solid "+B3, color:G, padding:"8px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Clear</button>
          <button onClick={doLoadsheet} style={{ background:R, color:W, border:"none", padding:"8px 20px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"inherit", boxShadow:"0 4px 14px rgba(232,0,29,0.3)" }}>
            🖨️ Generate Loadsheet ({selected.length})
          </button>
        </div>
      </div>

      {selected.length>0&&(
        <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:10, padding:"12px 20px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ color:GRN, fontWeight:600 }}>✅ {selected.length} parcel(s) selected</div>
          <div style={{ color:GL, fontSize:13 }}>
            Total COD: <strong style={{ color:W }}>Rs.{selectedBookings.reduce((s,b)=>s+Number(b.cod_amount||0),0).toLocaleString()}</strong>
            &nbsp;|&nbsp; Total Charges: <strong style={{ color:YLW }}>Rs.{selectedBookings.reduce((s,b)=>s+Number(b.total_charges||0),0).toLocaleString()}</strong>
          </div>
        </div>
      )}

      <Card>
        <CardTop title={"📦 Parcels — " + shown.length + " total"} />
        {busy?<div style={{ padding:"40px", textAlign:"center", color:G }}>Loading...</div>:(
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                <th style={{ padding:"10px 14px", textAlign:"center", fontSize:11, color:G, fontWeight:700, width:40 }}>☑</th>
                {["Tracking","Receiver","Phone","City","COD","Charges","Status","Date"].map(h=>(
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:G, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
                ))}
                <th style={{ padding:"10px 14px", fontSize:11, color:G, fontWeight:700 }}>Bill</th>
              </tr></thead>
              <tbody>
                {shown.length===0?<tr><td colSpan={10} style={{ padding:"40px", textAlign:"center", color:G }}>No parcels found</td></tr>
                  :shown.map((b,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid "+B3, background:selected.includes(b.id)?"rgba(232,0,29,0.05)":"transparent" }}>
                    <td style={{ padding:"10px 14px", textAlign:"center" }}>
                      <input type="checkbox" checked={selected.includes(b.id)} onChange={()=>toggleSelect(b.id)}
                        style={{ accentColor:R, cursor:"pointer", width:16, height:16 }} />
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:R, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:13, color:W }}>{b.receiver_name}</div>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GL }}>{b.receiver_phone}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GL }}>{b.receiver_city}</td>
                    <td style={{ padding:"10px 14px", fontSize:13, color:W, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:YLW }}>Rs.{b.total_charges||"—"}</td>
                    <td style={{ padding:"10px 14px" }}><StatusBadge s={b.status} /></td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:G }}>{b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):"-"}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <button onClick={()=>printBill(b,rates)} style={{ background:R, color:W, border:"none", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"inherit" }}>🖨️</button>
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

// ── PARCELS ───────────────────────────────────────────────────────────────────
function Parcels({ user }) {
  const [items, setItems] = useState([]);
  const [flt, setFlt] = useState("All");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(true);
  const [rates, setRates] = useState(null);

  useEffect(()=>{
    async function go() {
      const [{ data:bks },{ data:rts }] = await Promise.all([
        supa.from("bookings").select("*").eq("merchant_id",user.id).order("created_at",{ascending:false}),
        supa.from("rates").select("*").single(),
      ]);
      setItems(bks||[]); if(rts) setRates(rts); setBusy(false);
    }
    go();
  },[user.id]);

  async function updSt(id, status) {
    await supa.from("bookings").update({status}).eq("id",id);
    setItems(prev=>prev.map(b=>b.id===id?{...b,status}:b));
  }

  const sts = ["All","Booked","In Transit","Out for Delivery","Delivered","Returned"];
  const shown = items.filter(b=>{
    const ms=flt==="All"||b.status===flt;
    const mq=!q||[b.tracking_no,b.receiver_name,b.receiver_city].some(v=>v&&v.toLowerCase().includes(q.toLowerCase()));
    return ms&&mq;
  });

  function exportCSV() {
    const hdr = ["Tracking,Receiver,Phone,City,COD,Delivery,Fuel,GST,Income Tax,Sales Tax,Total,Status,Date"];
    const rws = shown.map(b=>`${b.tracking_no},${b.receiver_name},${b.receiver_phone},${b.receiver_city},${b.cod_amount},${b.delivery_charge},${b.fuel_charge||0},${b.gst||0},${b.income_tax},${b.sales_tax},${b.total_charges},${b.status},${b.created_at?new Date(b.created_at).toLocaleDateString():""}`);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([[...hdr,...rws].join("\n")],{type:"text/csv"}));
    a.download = "parcels.csv"; a.click();
  }

  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Search tracking, receiver, city..."
          style={{ flex:1, minWidth:200, background:B2, border:"1px solid "+B3, borderRadius:8, padding:"10px 14px", color:W, fontSize:14, outline:"none" }} />
        <button onClick={exportCSV} style={{ background:GRN, color:W, border:"none", padding:"10px 16px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" }}>📥 Export CSV</button>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {sts.map(s=>(
          <button key={s} onClick={()=>setFlt(s)} style={{ background:flt===s?R:"transparent", color:flt===s?W:G, border:"1px solid "+(flt===s?R:B3), padding:"7px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:flt===s?600:400 }}>{s}</button>
        ))}
      </div>
      <Card>
        <CardTop title={"📦 Parcels (" + shown.length + ")"} />
        {busy?<div style={{ padding:"40px", textAlign:"center", color:G }}>Loading...</div>:(
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["Tracking","Receiver","City","COD","Charges","Status","Date","Bill"].map(h=>(
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:G, fontWeight:700, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {shown.length===0?<tr><td colSpan={8} style={{ padding:"40px", textAlign:"center", color:G }}>No parcels found</td></tr>
                  :shown.map((b,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid "+B3 }}>
                    <td style={{ padding:"10px 14px", fontSize:12, color:R, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ fontSize:13, color:W }}>{b.receiver_name}</div>
                      <div style={{ fontSize:11, color:G }}>{b.receiver_phone}</div>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:GL }}>{b.receiver_city}</td>
                    <td style={{ padding:"10px 14px", fontSize:13, color:W, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:YLW }}>Rs.{b.total_charges||"—"}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <select value={b.status} onChange={e=>updSt(b.id,e.target.value)}
                        style={{ background:B, color:W, border:"1px solid "+B3, borderRadius:6, padding:"4px 8px", fontSize:11, cursor:"pointer", outline:"none", fontFamily:"inherit" }}>
                        {["Booked","In Transit","Out for Delivery","Delivered","Returned"].map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding:"10px 14px", fontSize:12, color:G }}>{b.created_at?new Date(b.created_at).toLocaleDateString("en-PK"):"-"}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <button onClick={()=>printBill(b,rates)} style={{ background:R, color:W, border:"none", padding:"5px 10px", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"inherit" }}>🖨️</button>
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

// ── TRACKING ──────────────────────────────────────────────────────────────────
function TrackParcel({ user }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState(null);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);

  async function doTrack() {
    if (!q) return;
    setBusy(true); setSearched(true);
    const { data } = await supa.from("bookings").select("*").eq("tracking_no",q.trim().toUpperCase()).single();
    setRes(data||null); setBusy(false);
  }

  const steps = [
    {lbl:"Booked",done:!!res},
    {lbl:"In Transit",done:res&&["In Transit","Out for Delivery","Delivered"].includes(res.status)},
    {lbl:"Out for Delivery",done:res&&["Out for Delivery","Delivered"].includes(res.status)},
    {lbl:"Delivered",done:res?.status==="Delivered"},
  ];

  return (
    <div style={{ maxWidth:680, margin:"0 auto" }}>
      <Card xtra={{ marginBottom:20 }}>
        <div style={{ padding:"28px" }}>
          <div style={{ color:W, fontWeight:700, fontSize:16, marginBottom:20, textAlign:"center" }}>🔍 Track Your Parcel</div>
          <div style={{ display:"flex", gap:10 }}>
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="Enter Tracking Number..."
              style={{ flex:1, background:B4, border:"1px solid "+B3, borderRadius:8, padding:"12px 16px", color:W, fontSize:14, outline:"none" }} />
            <button onClick={doTrack} disabled={busy} style={{ background:R, color:W, border:"none", padding:"12px 24px", borderRadius:8, fontWeight:700, cursor:"pointer", fontSize:15, fontFamily:"inherit" }}>
              {busy?"...":"Track"}
            </button>
          </div>
        </div>
      </Card>
      {searched&&!res&&!busy&&(
        <Card><div style={{ padding:"50px", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
          <div style={{ color:W, fontSize:16, fontWeight:600 }}>Tracking number not found</div>
        </div></Card>
      )}
      {res&&(
        <Card>
          <div style={{ background:`linear-gradient(135deg,${R},${R2})`, padding:"16px 24px" }}>
            <div style={{ color:W, fontWeight:700, fontSize:16 }}>{res.tracking_no}</div>
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, marginTop:4 }}>{res.sender_city} → {res.receiver_city}</div>
          </div>
          <div style={{ padding:"24px" }}>
            {steps.map((s,i)=>(
              <div key={i} style={{ display:"flex", gap:16 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:s.done?GRN:B3, display:"flex", alignItems:"center", justifyContent:"center", color:s.done?W:G, fontSize:12, fontWeight:700, flexShrink:0 }}>{s.done?"✓":i+1}</div>
                  {i<steps.length-1&&<div style={{ width:2, height:28, background:s.done?GRN:B3, margin:"2px 0" }} />}
                </div>
                <div style={{ paddingTop:4, paddingBottom:i<steps.length-1?20:0 }}>
                  <div style={{ color:s.done?W:G, fontWeight:s.done?600:400, fontSize:14 }}>{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── PAYMENTS ──────────────────────────────────────────────────────────────────
function Payments({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    supa.from("bookings").select("*").eq("merchant_id",user.id).eq("status","Delivered").then(({data})=>{
      setBookings(data||[]);
      setLoading(false);
    });
  },[user.id]);

  const totalCOD = bookings.reduce((s,b)=>s+Number(b.cod_amount||0),0);
  const totalChg = bookings.reduce((s,b)=>s+Number(b.total_charges||0),0);
  const netPayable = totalCOD - totalChg;

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {[{lbl:"Delivered",val:bookings.length,clr:GRN},{lbl:"Total COD",val:"Rs."+totalCOD.toLocaleString(),clr:BLU},{lbl:"Total Charges",val:"Rs."+totalChg.toLocaleString(),clr:YLW},{lbl:"Net Payable",val:"Rs."+netPayable.toLocaleString(),clr:R}].map(c=>(
          <Card key={c.lbl} xtra={{ borderLeft:"3px solid "+c.clr }}>
            <div style={{ padding:"16px 18px" }}>
              <div style={{ fontSize:11, color:G, marginBottom:6 }}>{c.lbl.toUpperCase()}</div>
              <div style={{ fontSize:20, fontWeight:700, color:c.clr }}>{c.val}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <CardTop title="💳 Payment Details — Delivered Parcels" />
        {loading?<div style={{ padding:"40px", textAlign:"center", color:G }}>Loading...</div>:(
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"#0d0d0d" }}>
                {["#","Tracking","Receiver","City","COD","Delivery","Fuel","GST","Income Tax","Sales Tax","Net"].map(h=>(
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:10, color:G, fontWeight:700 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {bookings.length===0?<tr><td colSpan={11} style={{ padding:"40px", textAlign:"center", color:G }}>No delivered parcels yet</td></tr>
                  :bookings.map((b,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid "+B3 }}>
                    <td style={{ padding:"8px 12px", fontSize:11, color:G }}>{i+1}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:R, fontWeight:600 }}>{b.tracking_no}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:W }}>{b.receiver_name}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GL }}>{b.receiver_city}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:W, fontWeight:600 }}>Rs.{Number(b.cod_amount||0).toLocaleString()}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:YLW }}>Rs.{b.delivery_charge||0}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GL }}>Rs.{b.fuel_charge||0}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GL }}>Rs.{b.gst||0}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GL }}>Rs.{b.income_tax||0}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GL }}>Rs.{b.sales_tax||0}</td>
                    <td style={{ padding:"8px 12px", fontSize:11, color:GRN, fontWeight:600 }}>Rs.{(Number(b.cod_amount||0)-Number(b.total_charges||0)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              {bookings.length>0&&(
                <tfoot>
                  <tr style={{ background:"rgba(232,0,29,0.1)", fontWeight:700 }}>
                    <td colSpan={4} style={{ padding:"10px 12px", color:GL, fontSize:12 }}>TOTALS</td>
                    <td style={{ padding:"10px 12px", color:W, fontSize:13 }}>Rs.{totalCOD.toLocaleString()}</td>
                    <td colSpan={5} style={{ padding:"10px 12px", color:YLW, fontSize:13 }}>Rs.{totalChg.toLocaleString()}</td>
                    <td style={{ padding:"10px 12px", color:GRN, fontSize:14, fontWeight:700 }}>Rs.{netPayable.toLocaleString()}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

// ── RATE CARD ─────────────────────────────────────────────────────────────────
function RateCard() {
  const [rates, setRates] = useState({ same_city:300, intercity:250, fuel_charges:0, gst:0, income_tax:2, sales_tax:2 });

  useEffect(()=>{
    supa.from("rates").select("*").single().then(({data})=>{ if(data) setRates(data); });
  },[]);

  return (
    <div style={{ maxWidth:700, margin:"0 auto" }}>
      <Card xtra={{ marginBottom:18, overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(135deg,${R},${R2})`, padding:"22px 28px", textAlign:"center" }}>
          <Logo sz="md" /><Lines />
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:13, marginTop:8, letterSpacing:1 }}>OFFICIAL RATE CARD 2026</div>
        </div>
        <div style={{ padding:"24px" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr style={{ background:"#0d0d0d" }}>
              {["Service","Delivery","Fuel","GST","Income Tax","Sales Tax"].map(h=><th key={h} style={{ padding:"12px 14px", textAlign:"left", fontSize:11, color:G, fontWeight:700 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                ["Same City — Lahore to Lahore (COD)", rates.same_city],
                ["Intercity / Outstation (COD)", rates.intercity],
              ].map(([lbl,del],i)=>(
                <tr key={i} style={{ borderBottom:"1px solid "+B3 }}>
                  <td style={{ padding:"12px 14px", color:W, fontWeight:600, fontSize:13 }}>{lbl}</td>
                  <td style={{ padding:"12px 14px", color:GRN, fontWeight:700 }}>Rs.{del}</td>
                  <td style={{ padding:"12px 14px", color:GL, fontSize:13 }}>{rates.fuel_charges>0?rates.fuel_charges+"%":"—"}</td>
                  <td style={{ padding:"12px 14px", color:GL, fontSize:13 }}>{rates.gst>0?rates.gst+"%":"—"}</td>
                  <td style={{ padding:"12px 14px", color:GL, fontSize:13 }}>{rates.income_tax}%</td>
                  <td style={{ padding:"12px 14px", color:GL, fontSize:13 }}>{rates.sales_tax}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background:"rgba(232,0,29,0.06)", border:"1px solid rgba(232,0,29,0.2)", borderRadius:8, padding:"14px 18px", marginTop:20 }}>
            <div style={{ color:R, fontWeight:700, marginBottom:8 }}>📝 Example — Intercity COD: Rs.5,000</div>
            <div style={{ color:GL, fontSize:13, lineHeight:1.8 }}>
              Delivery: Rs.{rates.intercity} | Income Tax: Rs.{Math.round(5000*rates.income_tax/100)} | Sales Tax: Rs.{Math.round(5000*rates.sales_tax/100)}<br/>
              <strong style={{ color:W }}>Total charges: Rs.{rates.intercity+Math.round(5000*rates.income_tax/100)+Math.round(5000*rates.sales_tax/100)}</strong>&nbsp;|&nbsp;
              <strong style={{ color:GRN }}>Collect: Rs.{5000+rates.intercity+Math.round(5000*rates.income_tax/100)+Math.round(5000*rates.sales_tax/100)}</strong>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── API PAGE ──────────────────────────────────────────────────────────────────
function APIPage({ user }) {
  const apiKey = `kzx_${user.id?.slice(0,8)}_live`;
  const webhookUrl = `https://khanzxpress.vercel.app/api/webhook`;
  return (
    <div style={{ maxWidth:700, margin:"0 auto" }}>
      <Card>
        <CardTop title="🔗 API & Shopify Integration" />
        <div style={{ padding:"24px" }}>
          <div style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:8, padding:"14px 18px", marginBottom:20 }}>
            <div style={{ color:BLU, fontWeight:700, marginBottom:8 }}>ℹ️ Connect your Shopify store</div>
            <div style={{ color:GL, fontSize:13, lineHeight:1.7 }}>When customer places order, booking automatically created in KhanZxpress!</div>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ color:W, fontWeight:700, marginBottom:10 }}>🔑 Your API Key</div>
            <div style={{ background:B4, borderRadius:8, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <code style={{ color:R, fontSize:13 }}>{apiKey}</code>
              <button onClick={()=>navigator.clipboard.writeText(apiKey)} style={{ background:R, color:W, border:"none", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Copy</button>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ color:W, fontWeight:700, marginBottom:10 }}>🔗 Webhook URL</div>
            <div style={{ background:B4, borderRadius:8, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <code style={{ color:GRN, fontSize:12 }}>{webhookUrl}</code>
              <button onClick={()=>navigator.clipboard.writeText(webhookUrl)} style={{ background:R, color:W, border:"none", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Copy</button>
            </div>
          </div>
          <div style={{ color:W, fontWeight:700, marginBottom:12 }}>📋 Shopify Steps</div>
          {["Go to Shopify Admin → Settings → Notifications","Click 'Create webhook'","Event: 'Order payment'","Format: JSON","Paste Webhook URL above","Add API Key in header: X-API-Key","Save — orders will auto-book!"].map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"flex-start" }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:R, color:W, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
              <div style={{ color:GL, fontSize:13, lineHeight:1.5, marginTop:2 }}>{s}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── PROFILE ───────────────────────────────────────────────────────────────────
function Profile({ user }) {
  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <Card>
        <div style={{ padding:"28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:24, paddingBottom:20, borderBottom:"1px solid "+B3 }}>
            <div style={{ width:70, height:70, borderRadius:"50%", background:`linear-gradient(135deg,${R},${R2})`, color:W, fontWeight:700, fontSize:28, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 24px rgba(232,0,29,0.4)" }}>{user.name?.charAt(0)?.toUpperCase()||"M"}</div>
            <div>
              <div style={{ color:W, fontWeight:700, fontSize:20 }}>{user.name}</div>
              <div style={{ color:G, fontSize:13, marginTop:2 }}>{user.company}</div>
              <div style={{ display:"inline-block", background:"rgba(34,197,94,0.12)", color:GRN, fontSize:11, padding:"3px 10px", borderRadius:10, marginTop:6, fontWeight:600 }}>● ACTIVE</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[["Full Name",user.name],["Company",user.company],["Email",user.email],["Phone",user.phone],["City",user.city],["Address",user.address],["Account Type",user.account_type||"COD"],["CNIC",user.cnic]].map(([l,v])=>(
              <div key={l} style={{ background:B4, borderRadius:8, padding:"14px" }}>
                <div style={{ color:G, fontSize:11, marginBottom:4, letterSpacing:.5 }}>{l.toUpperCase()}</div>
                <div style={{ color:W, fontWeight:600, fontSize:13, wordBreak:"break-all" }}>{v||"—"}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── BANK DETAILS ──────────────────────────────────────────────────────────────
function BankDetails({ user }) {
  return (
    <div style={{ maxWidth:560, margin:"0 auto" }}>
      <Card>
        <CardTop title="🏦 Bank Account Details" />
        <div style={{ padding:"24px" }}>
          <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#fcd34d" }}>
            ⚠️ COD settlements are made to this account within 3 working days.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["Bank Name",user.bank_name],["Account Title",user.account_title],["Account Number",user.account_no],["IBAN",user.iban]].map(([k,v])=>(
              <div key={k} style={{ background:B4, borderRadius:8, padding:"13px", gridColumn:k==="IBAN"?"1 / -1":"auto" }}>
                <div style={{ color:G, fontSize:11, marginBottom:4 }}>{k.toUpperCase()}</div>
                <div style={{ color:W, fontWeight:600, fontSize:13, wordBreak:"break-all" }}>{v||"—"}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid "+B3 }}>
            <div style={{ color:W, fontWeight:600, marginBottom:12 }}>💳 Settlement Schedule</div>
            {[["Frequency","Every 3 working days"],["Minimum Payout","Rs. 500"],["Method","Bank Transfer / EasyPaisa / JazzCash"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid "+B3, fontSize:13 }}>
                <span style={{ color:G }}>{l}</span><span style={{ color:W, fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function MerchantApp() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [pg, setPg] = useState("dashboard");
  const [chk, setChk] = useState(true);

  useEffect(()=>{
    try {
      const saved = localStorage.getItem("kzx_merchant");
      if (saved) setUser(JSON.parse(saved));
    } catch(e) {}
    setChk(false);
  },[]);

  function doLogin(u) {
    try { localStorage.setItem("kzx_merchant", JSON.stringify(u)); } catch(e) {}
    setUser(u); setScreen("portal");
  }

  function doLogout() {
    try { localStorage.removeItem("kzx_merchant"); } catch(e) {}
    setUser(null); setScreen("login");
  }

  if (chk) return (
    <div style={{ minHeight:"100vh", background:B, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:R, fontSize:18, fontWeight:700 }}>Loading KhanZxpress...</div>
    </div>
  );

  if (screen==="login") return <LoginPage onLogin={doLogin} onGoReg={()=>setScreen("register")} />;
  if (screen==="register") return <RegisterPage onRegister={doLogin} onGoLogin={()=>setScreen("login")} />;

  return (
    <Portal user={user} pg={pg} setPg={setPg} doLogout={doLogout}>
      {pg==="dashboard"&&<Dashboard user={user} setPg={setPg} />}
      {pg==="newbooking"&&<NewBooking user={user} />}
      {pg==="parcels"&&<Parcels user={user} />}
      {pg==="loadsheet"&&<Loadsheet user={user} />}
      {pg==="tracking"&&<TrackParcel user={user} />}
      {pg==="payments"&&<Payments user={user} />}
      {pg==="rates"&&<RateCard />}
      {pg==="api"&&<APIPage user={user} />}
      {pg==="profile"&&<Profile user={user} />}
      {pg==="bank"&&<BankDetails user={user} />}
    </Portal>
  );
}
