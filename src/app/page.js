import { useState } from "react";

const CITIES = ["Islamabad","Karachi","Lahore","Rawalpindi","Faisalabad","Multan","Peshawar",
"Quetta","Sialkot","Gujranwala","Gujrat","Sargodha","Bahawalpur","Sukkur","Hyderabad",
"Abbottabad","Mardan","Swat","Dera Ghazi Khan","Rahim Yar Khan","Sahiwal","Kasur","Sheikhupura",
"Hafizabad","Narowal","Mandi Bahauddin","Attock","Chakwal","Jhelum","Khushab","Bhakkar",
"Layyah","Muzaffargarh","Lodhran","Vehari","Khanewal","Okara","Pakpattan","Chiniot",
"Toba Tek Singh","Jhang","Nankana Sahib","Mianwali","Karak","Bannu","Lakki Marwat",
"Kohat","Nowshera","Charsadda","Malakand","Mansehra","Haripur","Mirpur AJK","Muzaffarabad",
"Bagh","Rawalakot","Other"];

const BANKS = ["EasyPaisa","Sadapay","JazzCash","Meezan Bank","HBL - Habib Bank Limited",
"UBL - United Bank Limited","MCB Bank","Allied Bank","Bank Alfalah","Bank Al-Habib",
"NBP - National Bank of Pakistan","The Bank of Punjab","Askari Bank","Faysal Bank",
"JS Bank","Standard Chartered","Dubai Islamic Bank","BankIslami Pakistan","Soneri Bank",
"Silk Bank","Summit Bank","Telenor Bank","Mobilink Microfinance Bank"];

const PRODUCT_TYPES = ["Overnight","Overland"];
const ACCOUNT_TYPES = ["COD","NON COD","Corporate"];

function genTracking() {
  return "KZX" + Date.now().toString().slice(-8) + Math.floor(Math.random()*100);
}

// ─── EXACT LOGO COLORS ────────────────────────────────────────────────────────
const C = {
  primary:  "#e8001d",      // red — same as Z in logo
  primaryD: "#b0001a",      // darker red for hover
  black:    "#0a0a0a",      // pure black background
  black2:   "#111111",      // slightly lighter black (cards)
  black3:   "#1a1a1a",      // borders / subtle bg
  black4:   "#222222",      // input fields
  white:    "#ffffff",      // pure white text
  whiteD:   "#cccccc",      // dimmed white
  gray:     "#888888",      // muted text
  grayL:    "#aaaaaa",
  green:    "#22c55e",
  yellow:   "#f59e0b",
  blue:     "#3b82f6",
  redDim:   "#ef4444",
};

// ─── LOGO COMPONENT — exact replica of uploaded logo ─────────────────────────
function Logo({ size = "md" }) {
  const sizes = { sm: { text: 15, z: 18, dot: 11 }, md: { text: 20, z: 24, dot: 14 }, lg: { text: 28, z: 34, dot: 18 } };
  const s = sizes[size];
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        fontWeight: 900, fontStyle: "italic",
        fontSize: s.text, color: C.white, letterSpacing: -1,
      }}>Khan</span>
      <span style={{
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        fontWeight: 900, fontStyle: "italic",
        fontSize: s.z, color: C.primary, letterSpacing: -1,
        textShadow: `0 0 8px rgba(232,0,29,0.4)`,
        display: "inline-block",
        borderBottom: `2.5px solid ${C.primary}`,
        paddingBottom: 0,
      }}>Z</span>
      <span style={{
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        fontWeight: 900, fontStyle: "italic",
        fontSize: s.text, color: C.white, letterSpacing: -1,
      }}>xpress</span>
      <span style={{
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        fontWeight: 900, fontStyle: "italic",
        fontSize: s.dot, color: C.white, letterSpacing: -1, marginLeft: 2,
      }}>.pk</span>
    </div>
  );
}

// ─── SPEED LINE DECORATION ────────────────────────────────────────────────────
function SpeedLines() {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", marginTop: 2 }}>
      <div style={{ width: 28, height: 2, background: C.primary, borderRadius: 2 }} />
      <div style={{ width: 16, height: 2, background: C.primary, opacity: 0.6, borderRadius: 2 }} />
      <div style={{ width: 8, height: 2, background: C.primary, opacity: 0.3, borderRadius: 2 }} />
    </div>
  );
}

// ─── INPUT & SELECT HELPERS ───────────────────────────────────────────────────
const inp = (label, value, onChange, placeholder = "", type = "text", required = false) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5, letterSpacing: .5 }}>
      {label}{required && <span style={{ color: C.primary }}> *</span>}
    </label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
      style={{
        width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8,
        padding: "10px 14px", color: C.white, fontSize: 14, outline: "none",
        boxSizing: "border-box", fontFamily: "inherit",
      }}
      onFocus={e => e.target.style.borderColor = C.primary}
      onBlur={e => e.target.style.borderColor = C.black3}
    />
  </div>
);

const sel = (label, value, onChange, options, required = false) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5, letterSpacing: .5 }}>
      {label}{required && <span style={{ color: C.primary }}> *</span>}
    </label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8,
        padding: "10px 14px", color: value ? C.white : C.gray, fontSize: 14, outline: "none",
        boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer",
      }}
      onFocus={e => e.target.style.borderColor = C.primary}
      onBlur={e => e.target.style.borderColor = C.black3}>
      <option value="">-- Select --</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ─── AUTH LAYOUT ──────────────────────────────────────────────────────────────
function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh", background: C.black,
      display: "flex", flexDirection: "column",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: C.black2, borderBottom: `1px solid ${C.black3}`,
        padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <Logo size="md" />
          <SpeedLines />
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
          <span>📧 info@khanzxpress.pk</span>
          <span>📞 +92-300-0000000</span>
          <span>📍 Lahore, Pakistan</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{
          width: "100%", maxWidth: 520, background: C.black2, borderRadius: 16,
          border: `1px solid ${C.black3}`, overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(232,0,29,0.06)",
        }}>
          {/* Card header */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryD} 100%)`,
            padding: "28px 32px", textAlign: "center",
            borderBottom: `3px solid ${C.primary}`,
          }}>
            <Logo size="lg" />
            <SpeedLines />
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 8, letterSpacing: 2 }}>
              MERCHANT PORTAL
            </div>
          </div>
          <div style={{ padding: "32px" }}>
            {children}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "14px", color: C.gray, fontSize: 11, borderTop: `1px solid ${C.black3}` }}>
        © 2026 KhanZxpress.pk · All Rights Reserved · Lahore, Pakistan
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <AuthLayout>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 4, textAlign: "center" }}>Sign In</h2>
      <p style={{ color: C.gray, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Sign in with your KhanZxpress Merchant Account</p>
      {inp("Email / Phone", email, setEmail, "your@email.com", "email")}
      {inp("Password", pass, setPass, "••••••••", "password")}
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <a href="#" style={{ color: C.primary, fontSize: 13, textDecoration: "none" }}>Forgot Password?</a>
      </div>
      <button onClick={() => onLogin({ name: "Muhammad Faizan", email, city: "Lahore", company: "KhanZxpress.pk" })}
        style={{
          width: "100%", background: C.primary, color: C.white, border: "none",
          padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer",
          letterSpacing: .5, fontFamily: "inherit",
          boxShadow: `0 4px 20px rgba(232,0,29,0.35)`,
          transition: "all 0.2s",
        }}
        onMouseOver={e => e.currentTarget.style.background = C.primaryD}
        onMouseOut={e => e.currentTarget.style.background = C.primary}>
        Sign In Now →
      </button>
      <p style={{ textAlign: "center", marginTop: 20, color: C.gray, fontSize: 13 }}>
        Don't have an account?{" "}
        <span onClick={onGoRegister} style={{ color: C.primary, cursor: "pointer", fontWeight: 600 }}>Sign up here</span>
      </p>
    </AuthLayout>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
function RegisterPage({ onRegister, onGoLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: "", contact: "", phone: "", email: "", address: "", cnic: "", refKey: "",
    bankName: "", accountTitle: "", accountNo: "", branchName: "", branchCode: "", swiftCode: "", iban: "",
    website: "", city: "", accountType: "", productType: "", expectedShipments: "",
    password: "", confirmPassword: "", agree: false,
  });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const steps = [
    { n: 1, label: "Personal Info" },
    { n: 2, label: "Bank Info" },
    { n: 3, label: "Shipping Info" },
    { n: 4, label: "Password" },
  ];

  return (
    <AuthLayout>
      <h2 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Create Account</h2>

      {/* Step indicator */}
      <div style={{ display: "flex", marginBottom: 28, position: "relative" }}>
        <div style={{ position: "absolute", top: 15, left: "8%", right: "8%", height: 2, background: C.black3, zIndex: 0 }} />
        {steps.map(s => (
          <div key={s.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 13,
              background: step >= s.n ? C.primary : C.black3,
              color: step >= s.n ? C.white : C.gray,
              border: `2px solid ${step >= s.n ? C.primary : C.black3}`,
              marginBottom: 5,
              boxShadow: step >= s.n ? `0 0 12px rgba(232,0,29,0.4)` : "none",
            }}>
              {step > s.n ? "✓" : s.n}
            </div>
            <div style={{ fontSize: 9, color: step >= s.n ? C.white : C.gray, textAlign: "center", letterSpacing: .3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {step === 1 && <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div>{inp("Company / Brand Name", form.company, v => f("company", v), "Brand Name", "text", true)}</div>
          <div>{inp("Contact Person", form.contact, v => f("contact", v), "Full Name", "text", true)}</div>
          <div>{inp("Phone No", form.phone, v => f("phone", v), "03XX-XXXXXXX", "text", true)}</div>
          <div>{inp("Email", form.email, v => f("email", v), "you@email.com", "email", true)}</div>
        </div>
        {inp("Pickup Address", form.address, v => f("address", v), "Full Address", "text", true)}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div>{inp("CNIC", form.cnic, v => f("cnic", v), "XXXXX-XXXXXXX-X", "text", true)}</div>
          <div>{inp("Reference Key", form.refKey, v => f("refKey", v), "Optional")}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {["📎 Upload CNIC Copy", "🖼️ Upload Logo"].map(t => (
            <div key={t} style={{
              background: C.black4, border: `1px dashed ${C.black3}`, borderRadius: 8,
              padding: "12px", textAlign: "center", cursor: "pointer",
            }}>
              <div style={{ color: C.gray, fontSize: 12 }}>{t}</div>
              <div style={{ color: C.primary, fontSize: 11, marginTop: 4 }}>Click to browse</div>
            </div>
          ))}
        </div>
        <Btn onClick={() => setStep(2)}>Next →</Btn>
      </>}

      {step === 2 && <>
        {sel("Bank Name", form.bankName, v => f("bankName", v), BANKS, true)}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div>{inp("Account Title", form.accountTitle, v => f("accountTitle", v), "", "text", true)}</div>
          <div>{inp("Account Number", form.accountNo, v => f("accountNo", v), "", "text", true)}</div>
          <div>{inp("Branch Name", form.branchName, v => f("branchName", v))}</div>
          <div>{inp("Branch Code", form.branchCode, v => f("branchCode", v))}</div>
          <div>{inp("Swift Code", form.swiftCode, v => f("swiftCode", v))}</div>
          <div>{inp("IBAN", form.iban, v => f("iban", v))}</div>
        </div>
        <Note color="yellow">⚠️ Bank details are used for COD settlement. Double-check before proceeding.</Note>
        <TwoBtn onBack={() => setStep(1)} onNext={() => setStep(3)} />
      </>}

      {step === 3 && <>
        {inp("Website URL (Optional)", form.website, v => f("website", v), "https://yourstore.pk")}
        {sel("Select City", form.city, v => f("city", v), CITIES, true)}
        {sel("Account Type", form.accountType, v => f("accountType", v), ACCOUNT_TYPES, true)}
        {sel("Product Type", form.productType, v => f("productType", v), PRODUCT_TYPES, true)}
        {inp("Expected Shipments / Month", form.expectedShipments, v => f("expectedShipments", v), "e.g. 500", "number", true)}
        <TwoBtn onBack={() => setStep(2)} onNext={() => setStep(4)} />
      </>}

      {step === 4 && <>
        {inp("Password", form.password, v => f("password", v), "Min 8 characters", "password", true)}
        {inp("Confirm Password", form.confirmPassword, v => f("confirmPassword", v), "Re-enter password", "password", true)}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
          <input type="checkbox" checked={form.agree} onChange={e => f("agree", e.target.checked)}
            style={{ marginTop: 3, accentColor: C.primary, cursor: "pointer", width: 16, height: 16 }} />
          <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.5 }}>
            I agree to the <span style={{ color: C.primary, cursor: "pointer" }}>Terms and Conditions</span> of KhanZxpress.pk
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setStep(3)} style={{
            flex: 1, background: "transparent", color: C.grayL, border: `1px solid ${C.black3}`,
            padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>← Back</button>
          <button onClick={() => form.agree && onRegister(form)}
            style={{
              flex: 2, background: form.agree ? C.primary : "#333", color: C.white, border: "none",
              padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15,
              cursor: form.agree ? "pointer" : "not-allowed", fontFamily: "inherit",
              boxShadow: form.agree ? `0 4px 16px rgba(232,0,29,0.3)` : "none",
            }}>
            ✅ Submit Registration
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

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
function Btn({ children, onClick, outline = false }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", background: outline ? "transparent" : C.primary,
      color: outline ? C.grayL : C.white,
      border: outline ? `1px solid ${C.black3}` : "none",
      padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15,
      cursor: "pointer", fontFamily: "inherit",
      boxShadow: outline ? "none" : `0 4px 16px rgba(232,0,29,0.3)`,
    }}>{children}</button>
  );
}
function TwoBtn({ onBack, onNext }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
      <button onClick={onBack} style={{
        flex: 1, background: "transparent", color: C.grayL, border: `1px solid ${C.black3}`,
        padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
      }}>← Previous</button>
      <button onClick={onNext} style={{
        flex: 2, background: C.primary, color: C.white, border: "none",
        padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
        fontFamily: "inherit", boxShadow: `0 4px 16px rgba(232,0,29,0.3)`,
      }}>Next →</button>
    </div>
  );
}
function Note({ children, color = "red" }) {
  const colors = { red: ["rgba(232,0,29,0.08)", "rgba(232,0,29,0.2)", "#ffaaaa"], yellow: ["rgba(245,158,11,0.08)", "rgba(245,158,11,0.2)", "#fcd34d"] };
  const [bg, border, text] = colors[color];
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: text, lineHeight: 1.5 }}>
      {children}
    </div>
  );
}

// ─── SIDEBAR LOGO BADGE ───────────────────────────────────────────────────────
function SidebarLogo() {
  return (
    <div style={{ padding: "18px 16px", borderBottom: `1px solid ${C.black3}` }}>
      <Logo size="sm" />
      <SpeedLines />
      <div style={{ fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: 1 }}>MERCHANT PORTAL</div>
    </div>
  );
}

// ─── PORTAL LAYOUT ────────────────────────────────────────────────────────────
function PortalLayout({ user, page, setPage, onLogout, children }) {
  const nav = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "newbooking", icon: "➕", label: "New Booking" },
    { id: "parcels", icon: "📦", label: "My Parcels" },
    { id: "tracking", icon: "🔍", label: "Track Parcel" },
    { id: "rates", icon: "💰", label: "Rate Card" },
    { id: "profile", icon: "👤", label: "My Profile" },
    { id: "bank", icon: "🏦", label: "Bank Details" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.black, fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{
        width: 215, background: C.black2,
        borderRight: `1px solid ${C.black3}`,
        position: "fixed", top: 0, left: 0, bottom: 0,
        display: "flex", flexDirection: "column", zIndex: 50,
      }}>
        <SidebarLogo />

        {/* User card */}
        <div style={{ padding: "14px 12px", borderBottom: `1px solid ${C.black3}` }}>
          <div style={{
            background: "rgba(232,0,29,0.08)", border: "1px solid rgba(232,0,29,0.15)",
            borderRadius: 10, padding: "12px", textAlign: "center",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: `linear-gradient(135deg,${C.primary},${C.primaryD})`,
              color: C.white, fontWeight: 700, fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: `0 0 16px rgba(232,0,29,0.4)`,
            }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ color: C.white, fontWeight: 600, fontSize: 13 }}>{user.name}</div>
            <div style={{ color: C.gray, fontSize: 11, marginTop: 2 }}>{user.city}</div>
            <div style={{
              display: "inline-block", background: "rgba(34,197,94,0.12)", color: C.green,
              fontSize: 10, padding: "2px 8px", borderRadius: 10, marginTop: 6, fontWeight: 600,
            }}>● ACTIVE</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                marginBottom: 2, textAlign: "left",
                background: page === n.id ? "rgba(232,0,29,0.12)" : "transparent",
                color: page === n.id ? C.white : C.gray,
                borderLeft: `3px solid ${page === n.id ? C.primary : "transparent"}`,
                fontSize: 13, fontWeight: page === n.id ? 600 : 400, fontFamily: "inherit",
                transition: "all 0.15s",
              }}
              onMouseOver={e => { if (page !== n.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseOut={e => { if (page !== n.id) e.currentTarget.style.background = "transparent"; }}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.black3}` }}>
          <button onClick={onLogout} style={{
            width: "100%", background: "rgba(232,0,29,0.08)",
            color: C.primary, border: `1px solid rgba(232,0,29,0.2)`,
            padding: "10px", borderRadius: 8, cursor: "pointer",
            fontWeight: 600, fontSize: 13, fontFamily: "inherit",
          }}>🚪 Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 215, flex: 1 }}>
        {/* Topbar */}
        <div style={{
          background: C.black2, borderBottom: `1px solid ${C.black3}`,
          padding: "0 28px", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 40,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 3, height: 20, background: C.primary, borderRadius: 2 }} />
            <div style={{ color: C.white, fontWeight: 700, fontSize: 17 }}>
              {nav.find(n => n.id === page)?.icon} {nav.find(n => n.id === page)?.label}
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.gray }}>
            <span>📞 +92-300-0000000</span>
            <span>📧 info@khanzxpress.pk</span>
            <span style={{ color: C.grayL }}>{new Date().toLocaleDateString("en-PK", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── CARD WRAPPER ─────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.black2, borderRadius: 12,
      border: `1px solid ${C.black3}`, ...style
    }}>{children}</div>
  );
}
function CardHead({ children, action }) {
  return (
    <div style={{
      padding: "16px 20px", borderBottom: `1px solid ${C.black3}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{children}</div>
      {action}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ bookings, setPage }) {
  const total = bookings.length;
  const delivered = bookings.filter(b => b.status === "Delivered").length;
  const transit = bookings.filter(b => ["Booked", "In Transit", "Out for Delivery"].includes(b.status)).length;
  const returned = bookings.filter(b => b.status === "Returned").length;
  const revenue = bookings.filter(b => b.status === "Delivered").reduce((s, b) => s + (b.sameCity ? 300 : 250), 0);
  const codPending = bookings.filter(b => !["Delivered", "Returned"].includes(b.status)).reduce((s, b) => s + Number(b.parcelValue), 0);

  const stats = [
    { label: "Total Parcels", value: total, icon: "📦", color: C.blue },
    { label: "Delivered", value: delivered, icon: "✅", color: C.green },
    { label: "In Transit", value: transit, icon: "🚚", color: C.yellow },
    { label: "Returns", value: returned, icon: "↩️", color: C.redDim },
    { label: "Revenue Earned", value: "Rs." + revenue.toLocaleString(), icon: "💰", color: C.primary },
    { label: "COD Pending", value: "Rs." + codPending.toLocaleString(), icon: "⏳", color: C.blue },
  ];

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: C.gray, letterSpacing: .5, marginBottom: 6 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card style={{ marginBottom: 22 }}>
        <CardHead>⚡ Quick Actions</CardHead>
        <div style={{ padding: "16px 20px", display: "flex", gap: 12 }}>
          {[
            { label: "New Booking", icon: "➕", pg: "newbooking", color: C.primary },
            { label: "Track Parcel", icon: "🔍", pg: "tracking", color: C.blue },
            { label: "All Parcels", icon: "📦", pg: "parcels", color: C.yellow },
            { label: "Rate Card", icon: "💰", pg: "rates", color: C.green },
          ].map(a => (
            <button key={a.label} onClick={() => setPage(a.pg)}
              style={{
                flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.black3}`,
                borderRadius: 10, padding: "14px 8px", cursor: "pointer", textAlign: "center",
                color: a.color, fontFamily: "inherit", transition: "all 0.2s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(232,0,29,0.08)"; e.currentTarget.style.borderColor = "rgba(232,0,29,0.3)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = C.black3; }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent parcels */}
      <Card>
        <CardHead>📋 Recent Parcels</CardHead>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0d0d0d" }}>
              {["Tracking", "Receiver", "City", "COD", "Status", "Date"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, letterSpacing: .5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map((b, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.black3}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.primary, fontWeight: 600 }}>{b.trackingNo}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: C.white }}>{b.receiverName}</td>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.grayL }}>{b.destCity}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.parcelValue).toLocaleString()}</td>
                <td style={{ padding: "10px 16px" }}>
                  <StatusBadge status={b.status} />
                </td>
                <td style={{ padding: "10px 16px", fontSize: 12, color: C.gray }}>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Delivered": [C.green, "rgba(34,197,94,0.12)"],
    "Returned": [C.redDim, "rgba(239,68,68,0.12)"],
    "In Transit": [C.yellow, "rgba(245,158,11,0.12)"],
    "Out for Delivery": [C.blue, "rgba(59,130,246,0.12)"],
    "Booked": ["#a78bfa", "rgba(167,139,250,0.12)"],
  };
  const [color, bg] = map[status] || [C.gray, "rgba(136,136,136,0.12)"];
  return (
    <span style={{ background: bg, color, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
      {status}
    </span>
  );
}

// ─── NEW BOOKING ──────────────────────────────────────────────────────────────
function NewBooking({ onBook }) {
  const [form, setForm] = useState({
    senderName: "Muhammad Faizan", senderPhone: "", senderAddress: "", senderCity: "Lahore",
    receiverName: "", receiverPhone: "", receiverAddress: "", destCity: "",
    parcelDesc: "", weight: "", pieces: "1", parcelValue: "", specialInstructions: "",
  });
  const [charges, setCharges] = useState(null);
  const [booked, setBooked] = useState(null);
  const f = (k, v) => { setForm(p => ({ ...p, [k]: v })); setCharges(null); };

  const calc = () => {
    if (!form.destCity || !form.parcelValue) return alert("Fill Destination City and COD Amount");
    const same = form.destCity.toLowerCase() === form.senderCity.toLowerCase();
    const delivery = same ? 300 : 250;
    const income = Math.round(Number(form.parcelValue) * 0.02);
    const sales = Math.round(Number(form.parcelValue) * 0.02);
    setCharges({ delivery, income, sales, total: delivery + income + sales, sameCity: same });
  };

  const handleBook = () => {
    if (!charges) { calc(); return; }
    const b = {
      ...form, ...charges, trackingNo: genTracking(),
      date: new Date().toLocaleDateString("en-PK"), status: "Booked",
    };
    onBook(b);
    setBooked(b);
    setForm(p => ({ ...p, receiverName: "", receiverPhone: "", receiverAddress: "", destCity: "", parcelDesc: "", weight: "", pieces: "1", parcelValue: "", specialInstructions: "" }));
    setCharges(null);
  };

  return (
    <div>
      {booked && (
        <div style={{
          background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: 12, padding: "16px 20px", marginBottom: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: C.green, fontWeight: 700 }}>✅ Parcel Booked Successfully!</div>
            <div style={{ color: C.grayL, fontSize: 13, marginTop: 4 }}>
              Tracking: <strong style={{ color: C.primary }}>{booked.trackingNo}</strong>
            </div>
          </div>
          <button onClick={() => setBooked(null)} style={{
            background: "transparent", border: `1px solid ${C.black3}`, color: C.gray,
            padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
          }}>Dismiss</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <Card>
          <CardHead>📤 Sender Information</CardHead>
          <div style={{ padding: "20px" }}>
            {inp("Sender Name", form.senderName, v => f("senderName", v), "", "text", true)}
            {inp("Phone", form.senderPhone, v => f("senderPhone", v), "03XX-XXXXXXX", "text", true)}
            {sel("Sender City", form.senderCity, v => f("senderCity", v), CITIES, true)}
            {inp("Pickup Address", form.senderAddress, v => f("senderAddress", v), "Street, Area, City", "text", true)}
          </div>
        </Card>
        <Card>
          <CardHead>📥 Receiver Information</CardHead>
          <div style={{ padding: "20px" }}>
            {inp("Receiver Name", form.receiverName, v => f("receiverName", v), "Customer name", "text", true)}
            {inp("Phone", form.receiverPhone, v => f("receiverPhone", v), "03XX-XXXXXXX", "text", true)}
            {sel("Destination City", form.destCity, v => f("destCity", v), CITIES, true)}
            {inp("Delivery Address", form.receiverAddress, v => f("receiverAddress", v), "Full address", "text", true)}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <CardHead>📦 Parcel Details</CardHead>
          <div style={{ padding: "20px" }}>
            {inp("Description / Contents", form.parcelDesc, v => f("parcelDesc", v), "e.g. Clothes, Mobile")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
              <div>{inp("Weight (kg)", form.weight, v => f("weight", v), "1", "number")}</div>
              <div>{inp("Pieces", form.pieces, v => f("pieces", v), "1", "number")}</div>
            </div>
            {inp("COD Amount (Rs.) *", form.parcelValue, v => f("parcelValue", v), "Parcel value", "number", true)}
            {inp("Special Instructions", form.specialInstructions, v => f("specialInstructions", v), "Handle with care...")}
          </div>
        </Card>

        <Card>
          <CardHead>💰 Charges Preview</CardHead>
          <div style={{ padding: "20px" }}>
            {charges ? (
              <>
                <div style={{
                  background: "rgba(232,0,29,0.06)", border: "1px solid rgba(232,0,29,0.2)",
                  borderRadius: 8, padding: "14px", marginBottom: 16,
                }}>
                  <div style={{ fontSize: 11, color: C.primary, marginBottom: 10, fontWeight: 700, letterSpacing: .5 }}>
                    {charges.sameCity ? "✅ SAME CITY RATE" : "🚚 INTERCITY RATE"}
                  </div>
                  {[["Delivery Charge", charges.delivery], ["Income Tax (2%)", charges.income], ["Sales Tax (2%)", charges.sales]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13, color: C.grayL }}>
                      <span>{l}</span><span>Rs.{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 16, fontWeight: 700, color: C.white }}>
                    <span>TOTAL CHARGES</span><span>Rs.{charges.total}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.gray, marginBottom: 16, lineHeight: 1.6, background: C.black4, borderRadius: 8, padding: "10px 12px" }}>
                  COD Amount: <strong style={{ color: C.white }}>Rs.{Number(form.parcelValue).toLocaleString()}</strong><br />
                  Collect from receiver: <strong style={{ color: C.green }}>Rs.{(Number(form.parcelValue) + charges.total).toLocaleString()}</strong>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0 20px", color: C.gray, fontSize: 13 }}>
                Fill destination city & COD amount,<br />then click Calculate
              </div>
            )}
            <button onClick={calc} style={{
              width: "100%", background: "transparent", border: `1px solid ${C.primary}`,
              color: C.primary, padding: "10px", borderRadius: 8, fontWeight: 700,
              cursor: "pointer", marginBottom: 10, fontFamily: "inherit",
            }}>🧮 Calculate Charges</button>
            <button onClick={handleBook} style={{
              width: "100%", background: C.primary, color: C.white, border: "none",
              padding: "13px", borderRadius: 8, fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: `0 4px 18px rgba(232,0,29,0.35)`,
            }}>🚀 Book & Generate Airway Bill</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── PARCELS ──────────────────────────────────────────────────────────────────
function Parcels({ bookings, onStatusChange }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const statuses = ["All", "Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"];
  const filtered = bookings.filter(b => {
    const ms = filter === "All" || b.status === filter;
    const mq = !search || [b.trackingNo, b.receiverName, b.destCity].some(v => v.toLowerCase().includes(search.toLowerCase()));
    return ms && mq;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search tracking no, receiver name, city..."
          style={{
            flex: 1, minWidth: 220, background: C.black2, border: `1px solid ${C.black3}`,
            borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14,
            outline: "none", fontFamily: "inherit",
          }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              background: filter === s ? C.primary : "transparent",
              color: filter === s ? C.white : C.gray,
              border: `1px solid ${filter === s ? C.primary : C.black3}`,
              padding: "8px 14px", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontFamily: "inherit", fontWeight: filter === s ? 600 : 400,
            }}>{s}</button>
          ))}
        </div>
      </div>

      <Card>
        <CardHead>📦 Parcels ({filtered.length})</CardHead>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0d0d0d" }}>
              {["Tracking No", "Receiver", "City", "COD Amount", "Charges", "Status", "Date"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, letterSpacing: .5, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No parcels found</td></tr>
            ) : filtered.map((b, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.black3}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "10px 14px", fontSize: 12, color: C.primary, fontWeight: 600 }}>{b.trackingNo}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ fontSize: 13, color: C.white }}>{b.receiverName}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>{b.receiverPhone}</div>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.destCity}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.parcelValue).toLocaleString()}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: C.yellow }}>Rs.{b.total || "—"}</td>
                <td style={{ padding: "10px 14px" }}>
                  <select value={b.status} onChange={e => onStatusChange(i, e.target.value)}
                    style={{
                      background: C.black, color: C.white, border: `1px solid ${C.black3}`,
                      borderRadius: 6, padding: "4px 8px", fontSize: 12,
                      cursor: "pointer", outline: "none", fontFamily: "inherit",
                    }}>
                    {["Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── TRACKING ─────────────────────────────────────────────────────────────────
function TrackParcel({ bookings }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const track = () => {
    setSearched(true);
    setResult(bookings.find(b => b.trackingNo.toLowerCase() === q.toLowerCase().trim()) || null);
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
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && track()}
              placeholder="Enter Tracking Number e.g. KZX20260114..."
              style={{
                flex: 1, background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8,
                padding: "12px 16px", color: C.white, fontSize: 14, outline: "none", fontFamily: "inherit",
              }} />
            <button onClick={track} style={{
              background: C.primary, color: C.white, border: "none",
              padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer",
              fontSize: 15, fontFamily: "inherit", boxShadow: `0 4px 14px rgba(232,0,29,0.3)`,
            }}>Track</button>
          </div>
        </div>
      </Card>

      {searched && !result && (
        <Card>
          <div style={{ padding: "50px", textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
            <div style={{ color: C.white, fontSize: 16, fontWeight: 600 }}>Tracking number not found</div>
            <div style={{ color: C.gray, fontSize: 13, marginTop: 8 }}>Check the number and try again</div>
          </div>
        </Card>
      )}

      {result && (
        <Card>
          <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryD})`, padding: "16px 24px" }}>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>{result.trackingNo}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>
              {result.senderCity} → {result.destCity}
            </div>
          </div>
          <div style={{ padding: "24px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: s.done ? C.green : C.black3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.done ? C.white : C.gray, fontSize: 12, fontWeight: 700, flexShrink: 0,
                    boxShadow: s.done ? `0 0 10px rgba(34,197,94,0.4)` : "none",
                  }}>{s.done ? "✓" : i + 1}</div>
                  {i < steps.length - 1 && <div style={{ width: 2, height: 28, background: s.done ? C.green : C.black3, margin: "2px 0" }} />}
                </div>
                <div style={{ paddingTop: 4, paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
                  <div style={{ color: s.done ? C.white : C.gray, fontWeight: s.done ? 600 : 400, fontSize: 14 }}>{s.label}</div>
                  {s.done && <div style={{ color: C.gray, fontSize: 11, marginTop: 2 }}>{result.date}</div>}
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
              {[["SENDER", result.senderName, result.senderAddress, result.senderCity],
                ["RECEIVER", result.receiverName, result.receiverAddress, result.destCity]].map(([t, name, addr, city]) => (
                <div key={t} style={{ background: C.black4, borderRadius: 8, padding: "14px" }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 8, letterSpacing: .5 }}>{t}</div>
                  <div style={{ color: C.white, fontWeight: 600 }}>{name}</div>
                  <div style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{addr}</div>
                  <div style={{ color: C.gray, fontSize: 12 }}>{city}</div>
                </div>
              ))}
            </div>
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
          <Logo size="md" />
          <SpeedLines />
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 8, letterSpacing: 1 }}>OFFICIAL RATE CARD 2026</div>
        </div>
        <div style={{ padding: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0d0d0d" }}>
                {["Service", "Delivery", "Income Tax", "Sales Tax", "Total"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, letterSpacing: .5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Same City (COD)", "Rs.300", "2% of COD", "2% of COD", "Rs.300 + 4% of COD"],
                ["Intercity (COD)", "Rs.250", "2% of COD", "2% of COD", "Rs.250 + 4% of COD"],
                ["Same City (Non-COD)", "Rs.200", "—", "—", "Rs.200 flat"],
                ["Intercity (Non-COD)", "Rs.180", "—", "—", "Rs.180 flat"],
              ].map(([l, d, it, st, t], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.black3}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  <td style={{ padding: "12px 14px", color: C.white, fontWeight: 600, fontSize: 13 }}>{l}</td>
                  <td style={{ padding: "12px 14px", color: C.green, fontWeight: 700 }}>{d}</td>
                  <td style={{ padding: "12px 14px", color: C.grayL, fontSize: 13 }}>{it}</td>
                  <td style={{ padding: "12px 14px", color: C.grayL, fontSize: 13 }}>{st}</td>
                  <td style={{ padding: "12px 14px", color: C.yellow, fontWeight: 600, fontSize: 13 }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background: "rgba(232,0,29,0.06)", border: `1px solid rgba(232,0,29,0.2)`, borderRadius: 8, padding: "14px 18px", marginTop: 20 }}>
            <div style={{ color: C.primary, fontWeight: 700, marginBottom: 8 }}>📝 Example — Intercity COD: Rs.5,000</div>
            <div style={{ color: C.grayL, fontSize: 13, lineHeight: 1.8 }}>
              Delivery: Rs.250 &nbsp;|&nbsp; Income Tax: Rs.100 &nbsp;|&nbsp; Sales Tax: Rs.100<br />
              <strong style={{ color: C.white }}>Total charges: Rs.450</strong> &nbsp;|&nbsp;
              <strong style={{ color: C.green }}>Collect from customer: Rs.5,450</strong>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <CardHead>ℹ️ Important Notes</CardHead>
        <div style={{ padding: "16px 20px" }}>
          {[
            "COD settlements within 3 working days of delivery",
            "Weight above 5kg may attract additional weight charges",
            "First return per parcel is free of charge",
            "Fragile items must be properly packed — KhanZxpress is not liable for damage due to improper packaging",
            "Corporate accounts can negotiate custom rates with management",
          ].map((note, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: C.gray, lineHeight: 1.5 }}>
              <span style={{ color: C.primary, flexShrink: 0 }}>›</span>{note}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ user }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <Card>
        <div style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.black3}` }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: `linear-gradient(135deg,${C.primary},${C.primaryD})`,
              color: C.white, fontWeight: 700, fontSize: 28,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 24px rgba(232,0,29,0.4)`,
            }}>{user.name.charAt(0)}</div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, fontSize: 20 }}>{user.name}</div>
              <div style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>{user.company || "KhanZxpress.pk"}</div>
              <div style={{ display: "inline-block", background: "rgba(34,197,94,0.12)", color: C.green, fontSize: 11, padding: "3px 10px", borderRadius: 10, marginTop: 6, fontWeight: 600 }}>● ACTIVE MERCHANT</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Full Name", user.name], ["Company", user.company || "KhanZxpress.pk"], ["City", user.city || "Lahore"], ["Account Type", "COD"], ["Product Type", "Overnight"], ["Member Since", "January 2026"]].map(([l, v]) => (
              <div key={l} style={{ background: C.black4, borderRadius: 8, padding: "14px" }}>
                <div style={{ color: C.gray, fontSize: 11, marginBottom: 4, letterSpacing: .5 }}>{l.toUpperCase()}</div>
                <div style={{ color: C.white, fontWeight: 600, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── BANK DETAILS ─────────────────────────────────────────────────────────────
function BankDetails() {
  const [editing, setEditing] = useState(false);
  const [bank, setBank] = useState({
    bankName: "Meezan Bank", accountTitle: "Muhammad Faizan",
    accountNo: "02780105234567", branchName: "Main Branch Lahore",
    branchCode: "0278", swiftCode: "MEZNPKKA", iban: "PK36 MEZN 0000 0278 0105 2345",
  });
  const f = (k, v) => setBank(p => ({ ...p, [k]: v }));

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <Card>
        <CardHead action={
          <button onClick={() => setEditing(!editing)} style={{
            background: editing ? "rgba(34,197,94,0.12)" : "rgba(232,0,29,0.1)",
            color: editing ? C.green : C.primary,
            border: `1px solid ${editing ? "rgba(34,197,94,0.3)" : "rgba(232,0,29,0.3)"}`,
            padding: "7px 16px", borderRadius: 8, cursor: "pointer",
            fontWeight: 600, fontSize: 13, fontFamily: "inherit",
          }}>{editing ? "✅ Save" : "✏️ Edit"}</button>
        }>🏦 Bank Account Details</CardHead>
        <div style={{ padding: "24px" }}>
          <Note color="yellow">⚠️ Used for COD settlements. Contact <strong>info@khanzxpress.pk</strong> for disputes.</Note>
          {editing ? (
            <>
              {sel("Bank Name", bank.bankName, v => f("bankName", v), BANKS)}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div>{inp("Account Title", bank.accountTitle, v => f("accountTitle", v))}</div>
                <div>{inp("Account Number", bank.accountNo, v => f("accountNo", v))}</div>
                <div>{inp("Branch Name", bank.branchName, v => f("branchName", v))}</div>
                <div>{inp("Branch Code", bank.branchCode, v => f("branchCode", v))}</div>
                <div>{inp("Swift Code", bank.swiftCode, v => f("swiftCode", v))}</div>
                <div>{inp("IBAN", bank.iban, v => f("iban", v))}</div>
              </div>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {Object.entries({ "Bank Name": bank.bankName, "Account Title": bank.accountTitle, "Account Number": bank.accountNo, "Branch Name": bank.branchName, "Branch Code": bank.branchCode, "Swift Code": bank.swiftCode, "IBAN": bank.iban }).map(([k, v]) => (
                <div key={k} style={{ background: C.black4, borderRadius: 8, padding: "13px", gridColumn: k === "IBAN" ? "1 / -1" : "auto" }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 4, letterSpacing: .5 }}>{k.toUpperCase()}</div>
                  <div style={{ color: C.white, fontWeight: 600, fontSize: 13, wordBreak: "break-all" }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.black3}` }}>
            <div style={{ color: C.white, fontWeight: 600, marginBottom: 12 }}>💳 Settlement Schedule</div>
            {[["Frequency", "Every 3 working days"], ["Minimum Payout", "Rs. 500"], ["Method", "Bank Transfer / EasyPaisa / JazzCash"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{l}</span>
                <span style={{ color: C.white, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [bookings, setBookings] = useState([
    { senderName: "Muhammad Faizan", senderPhone: "0300-0000000", senderAddress: "Johar Town", senderCity: "Lahore", receiverName: "Ali Hassan", receiverPhone: "0321-1234567", receiverAddress: "Block 5 Gulshan", destCity: "Karachi", parcelDesc: "Clothes", weight: "1", pieces: "1", parcelValue: "3000", sameCity: false, delivery: 250, income: 60, sales: 60, total: 370, trackingNo: "KZX20260114001", date: "14-Jan-2026", status: "Delivered" },
    { senderName: "Muhammad Faizan", senderPhone: "0300-0000000", senderAddress: "Johar Town", senderCity: "Lahore", receiverName: "Sara Khan", receiverPhone: "0333-9876543", receiverAddress: "DHA Phase 5", destCity: "Lahore", parcelDesc: "Mobile Phone", weight: "0.5", pieces: "1", parcelValue: "25000", sameCity: true, delivery: 300, income: 500, sales: 500, total: 1300, trackingNo: "KZX20260115002", date: "15-Jan-2026", status: "In Transit" },
    { senderName: "Muhammad Faizan", senderPhone: "0300-0000000", senderAddress: "Johar Town", senderCity: "Lahore", receiverName: "Ahmad Raza", receiverPhone: "0311-4455667", receiverAddress: "Satellite Town", destCity: "Rawalpindi", parcelDesc: "Books", weight: "2", pieces: "1", parcelValue: "1200", sameCity: false, delivery: 250, income: 24, sales: 24, total: 298, trackingNo: "KZX20260116003", date: "16-Jan-2026", status: "Returned" },
  ]);

  return screen === "login"
    ? <LoginPage onLogin={u => { setUser({ ...u, company: "KhanZxpress.pk" }); setScreen("portal"); }} onGoRegister={() => setScreen("register")} />
    : screen === "register"
      ? <RegisterPage onRegister={f => { setUser({ name: f.contact, email: f.email, city: f.city, company: f.company }); setScreen("portal"); }} onGoLogin={() => setScreen("login")} />
      : (
        <PortalLayout user={user} page={page} setPage={setPage} onLogout={() => { setUser(null); setScreen("login"); }}>
          {page === "dashboard" && <Dashboard bookings={bookings} setPage={setPage} />}
          {page === "newbooking" && <NewBooking onBook={b => setBookings(p => [b, ...p])} />}
          {page === "parcels" && <Parcels bookings={bookings} onStatusChange={(i, s) => setBookings(p => p.map((b, idx) => idx === i ? { ...b, status: s } : b))} />}
          {page === "tracking" && <TrackParcel bookings={bookings} />}
          {page === "rates" && <RateCard />}
          {page === "profile" && <Profile user={user} />}
          {page === "bank" && <BankDetails />}
        </PortalLayout>
      );
}
