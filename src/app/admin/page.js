"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function LoginPage({ onLogin }) {
  const ADMIN_EMAIL = "khanzexpress.pk1@gmail.com";
  const ADMIN_PASS = "admin123";
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [pass, setPass] = useState(ADMIN_PASS);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── COLORS ────────────────────────────────────────────────────────────────────
const C = {
  red: "#e8001d",
  redD: "#b0001a",
  black: "#0a0a0a",
  black2: "#111",
  black3: "#1a1a1a",
  black4: "#222",
  white: "#fff",
  gray: "#888",
  grayL: "#aaa",
  grayLL: "#ccc",
  green: "#22c55e",
  yellow: "#f59e0b",
  blue: "#3b82f6",
};

// ── LOGO ──────────────────────────────────────────────────────────────────────
function Logo({ size = "md" }) {
  const s = { sm: { t: 13, z: 16 }, md: { t: 18, z: 22 }, lg: { t: 24, z: 30 } }[size];
  return (
    <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t, color: C.white, letterSpacing: -1 }}>Khan</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.z, color: C.red, letterSpacing: -1, borderBottom: `2px solid ${C.red}` }}>Z</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t, color: C.white, letterSpacing: -1 }}>xpress</span>
      <span style={{ fontFamily: "Arial Black,sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: s.t - 4, color: C.white, marginLeft: 2 }}>.pk</span>
    </div>
  );
}

function SpeedLines() {
  return (
    <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
      <div style={{ width: 24, height: 2, background: C.red, borderRadius: 2 }} />
      <div style={{ width: 14, height: 2, background: C.red, opacity: .6, borderRadius: 2 }} />
      <div style={{ width: 7, height: 2, background: C.red, opacity: .3, borderRadius: 2 }} />
    </div>
  );
}

// ── UI HELPERS ────────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: C.black2, borderRadius: 12, border: `1px solid ${C.black3}`, ...style }}>{children}</div>;
}
function CardHead({ children, action }) {
  return (
    <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.black3}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{children}</div>
      {action}
    </div>
  );
}
function Btn({ children, onClick, color = C.red, outline = false, small = false, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ background: outline ? "transparent" : color, color: outline ? color : C.white, border: `1px solid ${color}`, padding: small ? "5px 12px" : "10px 20px", borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", fontSize: small ? 12 : 14, opacity: disabled ? .6 : 1, fontFamily: "inherit" }}>
      {children}
    </button>
  );
}
function Inp({ label, value, onChange, placeholder = "", type = "text", required = false }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5, letterSpacing: .5 }}>{label}{required && <span style={{ color: C.red }}> *</span>}</label>}
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
        style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={e => e.target.style.borderColor = C.red}
        onBlur={e => e.target.style.borderColor = C.black3} />
    </div>
  );
}
function Badge({ status }) {
  const map = { "active": [C.green, "rgba(34,197,94,0.12)"], "blocked": [C.red, "rgba(232,0,29,0.12)"], "pending": [C.yellow, "rgba(245,158,11,0.12)"], "Delivered": [C.green, "rgba(34,197,94,0.12)"], "Returned": [C.red, "rgba(232,0,29,0.12)"], "In Transit": [C.yellow, "rgba(245,158,11,0.12)"], "Booked": ["#a78bfa", "rgba(167,139,250,0.12)"], "Out for Delivery": [C.blue, "rgba(59,130,246,0.12)"] };
  const [color, bg] = map[status] || [C.gray, "rgba(136,136,136,0.12)"];
  return <span style={{ background: bg, color, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [pass, setPass] = useState(ADMIN_PASS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "khanzexpress.pk1@gmail.com";
  const ADMIN_PASS = "admin123";

  const handleLogin = async () => {
    if (!email || !pass) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      onLogin({ name: "Muhammad Faizan", email, role: "superadmin" });
    } else {
      const { data } = await supabase.from("admins").select("*").eq("email", email).eq("password", pass).single();
      if (data) { onLogin(data); }
      else { setError("Invalid email or password"); }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Segoe UI,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440, background: C.black2, borderRadius: 16, border: `1px solid ${C.black3}`, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}>
        <div style={{ background: `linear-gradient(135deg,${C.red},${C.redD})`, padding: "28px", textAlign: "center" }}>
          <Logo size="lg" /><SpeedLines />
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 8, letterSpacing: 3 }}>ADMIN PORTAL</div>
        </div>
        <div style={{ padding: "32px" }}>
          <h2 style={{ color: C.white, fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Admin Login</h2>
          {error && <div style={{ background: "rgba(232,0,29,0.1)", border: `1px solid rgba(232,0,29,0.3)`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#ffaaaa", fontSize: 13 }}>❌ {error}</div>}
          <Inp label="Email" value={email} onChange={setEmail} placeholder="admin@khanzxpress.pk" type="email" />
          <Inp label="Password" value={pass} onChange={setPass} placeholder="••••••••" type="password" />
          <button onClick={handleLogin} disabled={loading}
            style={{ width: "100%", background: C.red, color: C.white, border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 8, boxShadow: `0 4px 20px rgba(232,0,29,0.35)`, opacity: loading ? .7 : 1, fontFamily: "inherit" }}>
            {loading ? "Logging in..." : "🔐 Login to Admin Panel"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LAYOUT ────────────────────────────────────────────────────────────────────
function Layout({ admin, page, setPage, onLogout, children }) {
  const nav = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "customers", icon: "👥", label: "Customers" },
    { id: "bookings", icon: "📦", label: "All Bookings" },
    { id: "payments", icon: "💳", label: "Payments" },
    { id: "rates", icon: "⚙️", label: "Rate Settings" },
    { id: "reports", icon: "📈", label: "Reports" },
    { id: "admins", icon: "🔑", label: "Sub Admins" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.black, fontFamily: "Segoe UI,sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 215, background: C.black2, borderRight: `1px solid ${C.black3}`, position: "fixed", top: 0, left: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 50 }}>
        <div style={{ padding: "18px 16px", borderBottom: `1px solid ${C.black3}` }}>
          <Logo size="sm" /><SpeedLines />
          <div style={{ fontSize: 9, color: C.gray, marginTop: 4, letterSpacing: 1 }}>ADMIN CONTROL PANEL</div>
        </div>
        <div style={{ padding: "14px 12px", borderBottom: `1px solid ${C.black3}` }}>
          <div style={{ background: "rgba(232,0,29,0.08)", border: "1px solid rgba(232,0,29,0.15)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${C.red},${C.redD})`, color: C.white, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", boxShadow: `0 0 14px rgba(232,0,29,0.4)` }}>
              {admin.name?.charAt(0)?.toUpperCase()}
            </div>
            <div style={{ color: C.white, fontWeight: 600, fontSize: 12 }}>{admin.name}</div>
            <div style={{ color: C.red, fontSize: 10, marginTop: 2, fontWeight: 600 }}>
              {admin.role === "superadmin" ? "⭐ Super Admin" : "🔑 Admin"}
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left", background: page === n.id ? "rgba(232,0,29,0.12)" : "transparent", color: page === n.id ? C.white : C.gray, borderLeft: `3px solid ${page === n.id ? C.red : "transparent"}`, fontSize: 13, fontWeight: page === n.id ? 600 : 400, fontFamily: "inherit" }}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.black3}` }}>
          <button onClick={onLogout} style={{ width: "100%", background: "rgba(232,0,29,0.08)", color: C.red, border: `1px solid rgba(232,0,29,0.2)`, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12, fontFamily: "inherit" }}>
            🚪 Logout
          </button>
        </div>
      </div>
      {/* Main */}
      <div style={{ marginLeft: 215, flex: 1 }}>
        <div style={{ background: C.black2, borderBottom: `1px solid ${C.black3}`, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 3, height: 20, background: C.red, borderRadius: 2 }} />
            <div style={{ color: C.white, fontWeight: 700, fontSize: 17 }}>
              {nav.find(n => n.id === page)?.icon} {nav.find(n => n.id === page)?.label}
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.gray }}>
            {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ setPage }) {
  const [stats, setStats] = useState({ customers: 0, bookings: 0, delivered: 0, returned: 0, totalCOD: 0, pending: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [{ count: customers }, { data: bookings }] = await Promise.all([
        supabase.from("merchants").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      ]);
      const b = bookings || [];
      setStats({
        customers: customers || 0,
        bookings: b.length,
        delivered: b.filter(x => x.status === "Delivered").length,
        returned: b.filter(x => x.status === "Returned").length,
        totalCOD: b.filter(x => x.status === "Delivered").reduce((s, x) => s + Number(x.cod_amount || 0), 0),
        pending: b.filter(x => !["Delivered", "Returned"].includes(x.status)).reduce((s, x) => s + Number(x.cod_amount || 0), 0),
      });
      setRecentBookings(b.slice(0, 8));
    };
    load();
  }, []);

  const cards = [
    { label: "Total Customers", value: stats.customers, icon: "👥", color: C.blue },
    { label: "Total Bookings", value: stats.bookings, icon: "📦", color: C.yellow },
    { label: "Delivered", value: stats.delivered, icon: "✅", color: C.green },
    { label: "Returns", value: stats.returned, icon: "↩️", color: C.red },
    { label: "Total COD Collected", value: `Rs.${stats.totalCOD.toLocaleString()}`, icon: "💰", color: C.green },
    { label: "COD Pending", value: `Rs.${stats.pending.toLocaleString()}`, icon: "⏳", color: C.yellow },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: C.white, fontSize: 22, fontWeight: 700 }}>Welcome back, Admin! 👋</div>
        <div style={{ color: C.gray, fontSize: 13, marginTop: 4 }}>KhanZxpress.pk — Admin Control Panel</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {cards.map(c => (
          <Card key={c.label} style={{ borderLeft: `3px solid ${c.color}` }}>
            <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: C.gray, letterSpacing: .5, marginBottom: 6 }}>{c.label.toUpperCase()}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: c.color }}>{c.value}</div>
              </div>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[{ label: "Manage Customers", icon: "👥", pg: "customers", color: C.blue }, { label: "All Bookings", icon: "📦", pg: "bookings", color: C.yellow }, { label: "Payments", icon: "💳", pg: "payments", color: C.green }, { label: "Rate Settings", icon: "⚙️", pg: "rates", color: C.red }].map(a => (
          <button key={a.label} onClick={() => setPage(a.pg)}
            style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.black3}`, borderRadius: 10, padding: "14px 8px", cursor: "pointer", textAlign: "center", color: a.color, fontFamily: "inherit" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</div>
          </button>
        ))}
      </div>
      <Card>
        <CardHead>📋 Recent Bookings</CardHead>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#0d0d0d" }}>
              {["Tracking", "Customer", "Receiver", "City", "COD", "Status", "Date"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: "30px", textAlign: "center", color: C.gray }}>No bookings yet</td></tr>
              ) : recentBookings.map((b, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.red, fontWeight: 600 }}>{b.tracking_no}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.white }}>{b.sender_name}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_name}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_city}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount || 0).toLocaleString()}</td>
                  <td style={{ padding: "10px 14px" }}><Badge status={b.status} /></td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── CUSTOMERS ─────────────────────────────────────────────────────────────────
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("merchants").select("*").order("created_at", { ascending: false });
      setCustomers(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("merchants").update({ status }).eq("id", id);
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const filtered = customers.filter(c =>
    !search || [c.name, c.company, c.email, c.phone, c.city].some(v => v && v.toLowerCase().includes(search.toLowerCase()))
  );

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "transparent", border: `1px solid ${C.black3}`, color: C.grayL, padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontWeight: 600, fontFamily: "inherit" }}>← Back to Customers</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Card>
            <CardHead>👤 Personal Details</CardHead>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.black3}` }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${C.red},${C.redD})`, color: C.white, fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selected.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
                  <div style={{ color: C.gray, fontSize: 13 }}>{selected.company}</div>
                  <Badge status={selected.status} />
                </div>
              </div>
              {[["Email", selected.email], ["Phone", selected.phone], ["City", selected.city], ["Address", selected.address], ["CNIC", selected.cnic], ["Account Type", selected.account_type], ["Member Since", selected.created_at ? new Date(selected.created_at).toLocaleDateString("en-PK") : "-"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13 }}>
                  <span style={{ color: C.gray }}>{l}</span>
                  <span style={{ color: C.white, fontWeight: 600 }}>{v || "—"}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Btn onClick={() => updateStatus(selected.id, "active")} color={C.green} small>✅ Activate</Btn>
                <Btn onClick={() => updateStatus(selected.id, "blocked")} color={C.red} small>🚫 Block</Btn>
              </div>
            </div>
          </Card>
          <Card>
            <CardHead>🏦 Bank Details</CardHead>
            <div style={{ padding: "20px" }}>
              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#fcd34d" }}>
                💡 Use these details to transfer COD payment to customer
              </div>
              {[["Bank Name", selected.bank_name], ["Account Title", selected.account_title], ["Account Number", selected.account_no], ["IBAN", selected.iban]].map(([l, v]) => (
                <div key={l} style={{ background: C.black4, borderRadius: 8, padding: "12px", marginBottom: 10 }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 4 }}>{l.toUpperCase()}</div>
                  <div style={{ color: C.white, fontWeight: 600, fontSize: 13, wordBreak: "break-all" }}>{v || "—"}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "14px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8 }}>
                <div style={{ color: C.green, fontWeight: 700, marginBottom: 8 }}>💰 Payment Summary</div>
                <div style={{ fontSize: 13, color: C.grayL }}>Account ready for COD settlement</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search name, company, email, phone..."
          style={{ flex: 1, background: C.black2, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none" }} />
      </div>
      <Card>
        <CardHead>👥 All Customers ({filtered.length})</CardHead>
        {loading ? <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading...</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Name", "Company", "Phone", "City", "Bank", "Account Type", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No customers found</td></tr>
                  : filtered.map((c, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 13, color: C.white, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: C.gray }}>{c.email}</div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.company}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.phone}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.city}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.bank_name || "—"}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.account_type || "COD"}</td>
                      <td style={{ padding: "10px 14px" }}><Badge status={c.status || "active"} /></td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => setSelected(c)} style={{ background: C.red, color: C.white, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>View</button>
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

// ── ALL BOOKINGS ──────────────────────────────────────────────────────────────
function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const statuses = ["All", "Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"];
  const filtered = bookings.filter(b => {
    const ms = filter === "All" || b.status === filter;
    const mq = !search || [b.tracking_no, b.receiver_name, b.sender_name, b.receiver_city].some(v => v && v.toLowerCase().includes(search.toLowerCase()));
    return ms && mq;
  });

  const exportCSV = () => {
    const headers = ["Tracking No,Sender,Receiver,City,COD Amount,Charges,Status,Date"];
    const rows = filtered.map(b => `${b.tracking_no},${b.sender_name},${b.receiver_name},${b.receiver_city},${b.cod_amount},${b.total_charges},${b.status},${b.created_at ? new Date(b.created_at).toLocaleDateString() : ""}`);
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "bookings.csv"; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search tracking, sender, receiver, city..."
          style={{ flex: 1, minWidth: 200, background: C.black2, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none" }} />
        <Btn onClick={exportCSV} color={C.green} small>📥 Export CSV</Btn>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ background: filter === s ? C.red : "transparent", color: filter === s ? C.white : C.gray, border: `1px solid ${filter === s ? C.red : C.black3}`, padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: filter === s ? 600 : 400 }}>{s}</button>
        ))}
      </div>
      <Card>
        <CardHead>📦 All Bookings ({filtered.length})</CardHead>
        {loading ? <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading...</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Tracking", "Sender", "Receiver", "City", "COD", "Charges", "Status", "Date", "Update"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No bookings found</td></tr>
                  : filtered.map((b, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.red, fontWeight: 600 }}>{b.tracking_no}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.white }}>{b.sender_name}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 12, color: C.white }}>{b.receiver_name}</div>
                        <div style={{ fontSize: 11, color: C.gray }}>{b.receiver_phone}</div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_city}</td>
                      <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount || 0).toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.yellow }}>Rs.{b.total_charges || "—"}</td>
                      <td style={{ padding: "10px 14px" }}><Badge status={b.status} /></td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                          style={{ background: C.black, color: C.white, border: `1px solid ${C.black3}`, borderRadius: 6, padding: "4px 8px", fontSize: 11, cursor: "pointer", outline: "none", fontFamily: "inherit" }}>
                          {["Booked", "In Transit", "Out for Delivery", "Delivered", "Returned"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
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

// ── RATE SETTINGS ─────────────────────────────────────────────────────────────
function RateSettings() {
  const [rates, setRates] = useState({
    same_city: 300, intercity: 250, non_cod_same: 200, non_cod_inter: 180,
    fuel_charges: 35, gst: 16, income_tax: 2, sales_tax: 2,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("rates").select("*").single();
      if (data) setRates(data);
    };
    load();
  }, []);

  const save = async () => {
    setLoading(true);
    const { data: existing } = await supabase.from("rates").select("id").single();
    if (existing) {
      await supabase.from("rates").update(rates).eq("id", existing.id);
    } else {
      await supabase.from("rates").insert([rates]);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setLoading(false);
  };

  const RateInp = ({ label, field, suffix = "Rs." }) => (
    <div style={{ background: C.black4, borderRadius: 10, padding: "16px", marginBottom: 14 }}>
      <div style={{ color: C.gray, fontSize: 11, marginBottom: 8, letterSpacing: .5 }}>{label.toUpperCase()}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ color: C.grayL, fontSize: 13, minWidth: 30 }}>{suffix}</div>
        <input type="number" value={rates[field]} onChange={e => setRates(p => ({ ...p, [field]: Number(e.target.value) }))}
          style={{ flex: 1, background: C.black2, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 18, fontWeight: 700, outline: "none", fontFamily: "inherit" }}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.black3} />
      </div>
    </div>
  );

  return (
    <div>
      {saved && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 20px", marginBottom: 20, color: C.green, fontWeight: 600 }}>
          ✅ Rates saved successfully! All customer portals updated.
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <CardHead>💰 Delivery Charges</CardHead>
          <div style={{ padding: "20px" }}>
            <RateInp label="Same City (Lahore to Lahore) — COD" field="same_city" />
            <RateInp label="Intercity / Outstation — COD" field="intercity" />
            <RateInp label="Same City — Non COD" field="non_cod_same" />
            <RateInp label="Intercity — Non COD" field="non_cod_inter" />
          </div>
        </Card>
        <Card>
          <CardHead>📊 Tax & Surcharge Rates</CardHead>
          <div style={{ padding: "20px" }}>
            <RateInp label="Fuel Charges %" field="fuel_charges" suffix="%" />
            <RateInp label="GST %" field="gst" suffix="%" />
            <RateInp label="Income Tax %" field="income_tax" suffix="%" />
            <RateInp label="Sales Tax %" field="sales_tax" suffix="%" />
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: 20 }}>
        <CardHead>👁️ Rate Preview — How Invoice Will Look</CardHead>
        <div style={{ padding: "20px" }}>
          <div style={{ background: C.black4, borderRadius: 10, padding: "20px" }}>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 16 }}>Example: Intercity COD — Rs. 5,000</div>
            {[
              ["Delivery Charge", `Rs. ${rates.intercity}`],
              ["Fuel Charges ("+rates.fuel_charges+"%)", `Rs. ${Math.round(rates.intercity * rates.fuel_charges / 100)}`],
              ["GST ("+rates.gst+"%)", `Rs. ${Math.round(5000 * rates.gst / 100)}`],
              ["Income Tax ("+rates.income_tax+"%)", `Rs. ${Math.round(5000 * rates.income_tax / 100)}`],
              ["Sales Tax ("+rates.sales_tax+"%)", `Rs. ${Math.round(5000 * rates.sales_tax / 100)}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{l}</span>
                <span style={{ color: C.white, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 16, fontWeight: 700 }}>
              <span style={{ color: C.white }}>Total Charges</span>
              <span style={{ color: C.red }}>Rs. {(rates.intercity + Math.round(rates.intercity * rates.fuel_charges / 100) + Math.round(5000 * rates.gst / 100) + Math.round(5000 * rates.income_tax / 100) + Math.round(5000 * rates.sales_tax / 100)).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={save} disabled={loading}
          style={{ background: C.red, color: C.white, border: "none", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: `0 4px 20px rgba(232,0,29,0.35)`, opacity: loading ? .7 : 1, fontFamily: "inherit" }}>
          {loading ? "Saving..." : "💾 Save All Rates"}
        </button>
      </div>
    </div>
  );
}

// ── PAYMENTS ──────────────────────────────────────────────────────────────────
function Payments() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: merchants } = await supabase.from("merchants").select("*");
      const { data: allBookings } = await supabase.from("bookings").select("*").eq("status", "Delivered");
      const customerSummary = (merchants || []).map(m => {
        const mb = (allBookings || []).filter(b => b.merchant_id === m.id);
        const totalCOD = mb.reduce((s, b) => s + Number(b.cod_amount || 0), 0);
        const totalCharges = mb.reduce((s, b) => s + Number(b.total_charges || 0), 0);
        return { ...m, deliveredCount: mb.length, totalCOD, totalCharges, netPayable: totalCOD - totalCharges, bookings: mb };
      });
      setCustomers(customerSummary);
      setLoading(false);
    };
    load();
  }, []);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "transparent", border: `1px solid ${C.black3}`, color: C.grayL, padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontWeight: 600, fontFamily: "inherit" }}>← Back to Payments</button>
        <Card>
          <div style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.black3}` }}>
              <div>
                <Logo size="md" /><SpeedLines />
                <div style={{ color: C.gray, fontSize: 12, marginTop: 8 }}>Lahore, Pakistan</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 18 }}>PAYMENT INVOICE</div>
                <div style={{ color: C.gray, fontSize: 13, marginTop: 4 }}>Date: {new Date().toLocaleDateString("en-PK")}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              {[["Client", selected.company], ["Contact", selected.name], ["Bank", selected.bank_name || "—"], ["Account Title", selected.account_title || "—"], ["Account No", selected.account_no || "—"], ["IBAN", selected.iban || "—"]].map(([l, v]) => (
                <div key={l} style={{ background: C.black4, borderRadius: 8, padding: "12px" }}>
                  <div style={{ color: C.gray, fontSize: 11, marginBottom: 3 }}>{l}</div>
                  <div style={{ color: C.white, fontWeight: 600, fontSize: 13, wordBreak: "break-all" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>📦 Delivered Parcels</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#0d0d0d" }}>
                  {["#", "Tracking", "Receiver", "City", "COD", "Delivery", "Fuel", "GST", "Income Tax", "Sales Tax", "Net"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, color: C.gray, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {selected.bookings.map((b, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.gray }}>{i + 1}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.red, fontWeight: 600 }}>{b.tracking_no}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.white }}>{b.receiver_name}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>{b.receiver_city}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount || 0).toLocaleString()}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.yellow }}>Rs.{b.delivery_charge || 0}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>Rs.{Math.round((b.delivery_charge || 0) * 0.35)}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>Rs.{Math.round(Number(b.cod_amount || 0) * 0.16)}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>Rs.{b.income_tax || 0}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.grayL }}>Rs.{b.sales_tax || 0}</td>
                      <td style={{ padding: "8px 10px", fontSize: 11, color: C.green, fontWeight: 600 }}>Rs.{(Number(b.cod_amount || 0) - Number(b.total_charges || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ background: C.black4, borderRadius: 12, padding: "20px", minWidth: 300 }}>
                <div style={{ color: C.white, fontWeight: 700, marginBottom: 12 }}>💰 Payment Summary</div>
                {[
                  ["Total Deliveries", selected.deliveredCount + " parcels"],
                  ["Total COD Amount", `Rs.${selected.totalCOD.toLocaleString()}`],
                  ["Total Charges", `Rs.${selected.totalCharges.toLocaleString()}`],
                  ["Net Payable to Customer", `Rs.${selected.netPayable.toLocaleString()}`],
                ].map(([l, v], i) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.black3}`, fontSize: 13, fontWeight: i === 3 ? 700 : 400 }}>
                    <span style={{ color: i === 3 ? C.white : C.gray }}>{l}</span>
                    <span style={{ color: i === 3 ? C.green : C.white }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <Btn onClick={() => window.print()} color={C.red} small>🖨️ Print Invoice</Btn>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHead>💳 Customer Payment Summary</CardHead>
        {loading ? <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading...</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Customer", "Bank", "Deliveries", "Total COD", "Charges", "Net Payable", "Action"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {customers.length === 0 ? <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No payment data</td></tr>
                  : customers.map((c, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 13, color: C.white, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: C.gray }}>{c.company}</div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{c.bank_name || "—"}</td>
                      <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>{c.deliveredCount}</td>
                      <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{c.totalCOD.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", fontSize: 12, color: C.yellow }}>Rs.{c.totalCharges.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", fontSize: 14, color: C.green, fontWeight: 700 }}>Rs.{c.netPayable.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <button onClick={() => setSelected(c)} style={{ background: C.red, color: C.white, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>View Invoice</button>
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

// ── REPORTS ───────────────────────────────────────────────────────────────────
function Reports() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = bookings.filter(b => {
    if (!dateFrom && !dateTo) return true;
    const d = new Date(b.created_at);
    if (dateFrom && d < new Date(dateFrom)) return false;
    if (dateTo && d > new Date(dateTo)) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = ["Tracking No,Sender,Sender City,Receiver,Receiver City,COD Amount,Delivery Charge,Fuel,GST,Income Tax,Sales Tax,Total Charges,Status,Date"];
    const rows = filtered.map(b => `${b.tracking_no},${b.sender_name},${b.sender_city},${b.receiver_name},${b.receiver_city},${b.cod_amount},${b.delivery_charge},${Math.round((b.delivery_charge || 0) * 0.35)},${Math.round(Number(b.cod_amount || 0) * 0.16)},${b.income_tax},${b.sales_tax},${b.total_charges},${b.status},${b.created_at ? new Date(b.created_at).toLocaleDateString() : ""}`);
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `khanzxpress-report-${new Date().toLocaleDateString()}.csv`; a.click();
  };

  const total = filtered.length;
  const delivered = filtered.filter(b => b.status === "Delivered").length;
  const returned = filtered.filter(b => b.status === "Returned").length;
  const totalCOD = filtered.filter(b => b.status === "Delivered").reduce((s, b) => s + Number(b.cod_amount || 0), 0);
  const totalCharges = filtered.reduce((s, b) => s + Number(b.total_charges || 0), 0);

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <CardHead>📅 Filter by Date</CardHead>
        <div style={{ padding: "20px", display: "flex", gap: 16, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 11, color: C.grayL, marginBottom: 5 }}>FROM DATE</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 11, color: C.grayL, marginBottom: 5 }}>TO DATE</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <Btn onClick={() => { setDateFrom(""); setDateTo(""); }} outline color={C.gray} small>Clear</Btn>
          <Btn onClick={exportCSV} color={C.green} small>📥 Export Excel/CSV</Btn>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Parcels", value: total, color: C.blue },
          { label: "Delivered", value: delivered, color: C.green },
          { label: "Returned", value: returned, color: C.red },
          { label: "Total COD", value: `Rs.${totalCOD.toLocaleString()}`, color: C.yellow },
        ].map(s => (
          <Card key={s.label} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: C.gray, marginBottom: 6 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead>📊 Report ({filtered.length} records)</CardHead>
        {loading ? <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Loading...</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#0d0d0d" }}>
                {["Tracking", "Sender", "Receiver", "City", "COD", "Total Charges", "Status", "Date"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.slice(0, 50).map((b, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.red, fontWeight: 600 }}>{b.tracking_no}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.white }}>{b.sender_name}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_name}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{b.receiver_city}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>Rs.{Number(b.cod_amount || 0).toLocaleString()}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.yellow }}>Rs.{b.total_charges || "—"}</td>
                    <td style={{ padding: "10px 14px" }}><Badge status={b.status} /></td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{b.created_at ? new Date(b.created_at).toLocaleDateString("en-PK") : "-"}</td>
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

// ── SUB ADMINS ────────────────────────────────────────────────────────────────
function SubAdmins() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("admins").select("*").order("created_at", { ascending: false });
      setAdmins(data || []);
    };
    load();
  }, []);

  const addAdmin = async () => {
    if (!form.name || !form.email || !form.password) { alert("Fill all fields"); return; }
    setLoading(true);
    const { data, error } = await supabase.from("admins").insert([form]).select().single();
    if (!error) { setAdmins(prev => [data, ...prev]); setAdding(false); setForm({ name: "", email: "", password: "", role: "admin" }); }
    setLoading(false);
  };

  const removeAdmin = async (id) => {
    if (!confirm("Remove this admin?")) return;
    await supabase.from("admins").delete().eq("id", id);
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Btn onClick={() => setAdding(!adding)} color={C.red} small>{adding ? "Cancel" : "➕ Add Sub Admin"}</Btn>
      </div>

      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <CardHead>➕ Add New Sub Admin</CardHead>
          <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Inp label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required />
            <Inp label="Email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} type="email" required />
            <Inp label="Password" value={form.password} onChange={v => setForm(p => ({ ...p, password: v }))} type="password" required />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.grayL, marginBottom: 5 }}>ROLE</label>
              <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                style={{ width: "100%", background: C.black4, border: `1px solid ${C.black3}`, borderRadius: 8, padding: "10px 14px", color: C.white, fontSize: 14, outline: "none", boxSizing: "border-box" }}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Btn onClick={addAdmin} disabled={loading}>{loading ? "Adding..." : "✅ Add Admin"}</Btn>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <CardHead>🔑 Sub Admins</CardHead>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#0d0d0d" }}>
              {["Name", "Email", "Role", "Added", "Action"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: C.gray, fontWeight: 700 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {admins.length === 0 ? <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.gray }}>No sub admins added yet</td></tr>
                : admins.map((a, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.black3}` }}>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: C.white, fontWeight: 600 }}>{a.name}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.grayL }}>{a.email}</td>
                    <td style={{ padding: "10px 14px" }}><Badge status={a.role} /></td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{a.created_at ? new Date(a.created_at).toLocaleDateString("en-PK") : "-"}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <button onClick={() => removeAdmin(a.id)} style={{ background: "rgba(232,0,29,0.1)", color: C.red, border: `1px solid rgba(232,0,29,0.2)`, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>Remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kzx_admin");
      if (saved) { setAdmin(JSON.parse(saved)); }
    } catch(e) {}
    setChecking(false);
  }, []);

  const handleLogin = (data) => {
    try { localStorage.setItem("kzx_admin", JSON.stringify(data)); } catch(e) {}
    setAdmin(data);
  };

  const handleLogout = () => {
    try { localStorage.removeItem("kzx_admin"); } catch(e) {}
    setAdmin(null); setPage("dashboard");
  };

  if (checking) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#e8001d", fontSize: 18, fontWeight: 700 }}>Loading KhanZxpress Admin...</div>
    </div>
  );

  if (!admin) return <LoginPage onLogin={handleLogin} />;

  return (
    <Layout admin={admin} page={page} setPage={setPage} onLogout={handleLogout}>
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "customers" && <Customers />}
      {page === "bookings" && <AllBookings />}
      {page === "payments" && <Payments />}
      {page === "rates" && <RateSettings />}
      {page === "reports" && <Reports />}
      {page === "admins" && <SubAdmins />}
    </Layout>
  );
}
