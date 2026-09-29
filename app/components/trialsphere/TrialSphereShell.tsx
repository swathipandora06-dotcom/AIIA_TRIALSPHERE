import { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Trial = {
  id: string;
  title: string;
  intervention: string;
  phase: string;
  site: string;
  participants: number;
  status: "Recruiting" | "Active" | "Completed" | "Not yet recruiting";
  updated: string;
};

const trials: Trial[] = [
  { id: "AIIA-AY-026", title: "Ashwagandha support for healthy sleep", intervention: "Withania somnifera · root extract", phase: "Phase II", site: "AIIA, New Delhi", participants: 64, status: "Recruiting", updated: "Updated 2h ago" },
  { id: "AIIA-AY-024", title: "Ayurvedic care for knee osteoarthritis", intervention: "Integrative care pathway", phase: "Phase III", site: "NIA, Jaipur", participants: 82, status: "Active", updated: "Updated yesterday" },
  { id: "AIIA-AY-021", title: "Guduchi and immune wellness", intervention: "Tinospora cordifolia · standardized extract", phase: "Phase II", site: "IPGT&RA, Jamnagar", participants: 48, status: "Recruiting", updated: "Updated 1d ago" },
  { id: "AIIA-AY-019", title: "Yoga and prakriti-informed metabolic care", intervention: "Lifestyle intervention · 12 weeks", phase: "Phase II", site: "AIIA, New Delhi", participants: 36, status: "Not yet recruiting", updated: "Updated 3d ago" },
  { id: "AIIA-AY-016", title: "Triphala formulation tolerability study", intervention: "Triphala · oral formulation", phase: "Phase I", site: "NIA, Jaipur", participants: 30, status: "Completed", updated: "Updated 1w ago" },
  { id: "AIIA-AY-013", title: "Ayurvedic support for digestive health", intervention: "Dietary and herbal care pathway", phase: "Phase II", site: "AIIA, New Delhi", participants: 57, status: "Active", updated: "Updated 2w ago" },
];

const demoRoles = ["Investigator", "Participant", "Monitor", "Ethics reviewer", "Safety officer", "Registry reviewer", "Administrator"];

const nodeDetails: Record<string, { name: string; value: string; note: string }> = {
  Trial: { name: "Trial", value: "AIIA-AY-026", note: "Protocol version 2.1 · Phase II" },
  Site: { name: "Site", value: "AIIA, New Delhi", note: "Site activation complete" },
  Participants: { name: "Participants", value: "64 enrolled", note: "Recruitment is 12% below plan" },
  Visits: { name: "Visits", value: "118 scheduled", note: "9 visits due this week" },
  eCRF: { name: "eCRF", value: "92% complete", note: "4 forms need source review" },
  Safety: { name: "Safety", value: "1 open review", note: "No serious events reported" },
};

const guidedSteps = ["Trial operations", "Public trial registry"];

function BrandHeader() {
  const location = useLocation();
  const [role, setRole] = useState("Investigator");
  const [language, setLanguage] = useState("EN");
  const isRegistry = location.pathname === "/registry";
  const labels = language === "தமிழ்" ? { dashboard: "கண்ணோட்டம்", registry: "ஆய்வு பதிவகம்" } : language === "हिंदी" ? { dashboard: "डैशबोर्ड", registry: "ट्रायल रजिस्ट्री" } : { dashboard: "Overview", registry: "Trial registry" };

  return (
    <header className="ts-header">
      <Link className="ts-brand" to="/" aria-label="AIIA TrialSphere home">
        <span className="ts-brand-mark">A</span>
        <span className="ts-brand-copy"><strong>AIIA</strong><span>TRIALSPHERE</span></span>
      </Link>
      <nav className="ts-nav" aria-label="Main navigation">
        <Link className={!isRegistry ? "ts-nav-link is-active" : "ts-nav-link"} to="/">{labels.dashboard}</Link>
        <Link className={isRegistry ? "ts-nav-link is-active" : "ts-nav-link"} to="/registry">{labels.registry}</Link>
      </nav>
      <div className="ts-header-tools">
        <span className="ts-prototype-tag">SYNTHETIC DATA</span>
        <label className="ts-language-select"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option>EN</option><option>தமிழ்</option><option>हिंदी</option></select></label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><button className="ts-role-button" type="button"><span className="ts-avatar">{role.slice(0, 1)}</span><span>{role} demo</span><span className="ts-chevron">⌄</span></button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="ts-role-menu" aria-label="Select demo role">{demoRoles.map((item) => <DropdownMenuItem key={item} onSelect={() => setRole(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function TwinGraph({ selected, onSelect }: { selected: string; onSelect: (node: string) => void }) {
  return (
    <div className="ts-graph" aria-label="Connected trial data graph">
      <svg className="ts-graph-lines" viewBox="0 0 600 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M300 48 L115 139 M300 48 L300 139 M300 48 L485 139 M115 139 L115 255 M300 139 L300 255 M485 139 L485 255 M115 139 L300 139 M300 139 L485 139" />
        <circle cx="300" cy="48" r="4" /><circle cx="115" cy="139" r="4" /><circle cx="300" cy="139" r="4" /><circle cx="485" cy="139" r="4" /><circle cx="115" cy="255" r="4" /><circle cx="300" cy="255" r="4" /><circle cx="485" cy="255" r="4" />
      </svg>
      {(["Trial", "Site", "Participants", "Visits", "eCRF", "Safety"] as const).map((node) => <button key={node} className={`ts-node ts-node-${node.toLowerCase()}${selected === node ? " is-selected" : ""}`} onClick={() => onSelect(node)} type="button" aria-pressed={selected === node}><span className="ts-node-dot" /><span className="ts-node-label">{node}</span><span className="ts-node-value">{nodeDetails[node].value}</span></button>)}
    </div>
  );
}

export function TrialSphereShell({ children }: { children: React.ReactNode }) {
  return <div className="ts-app"><BrandHeader />{children}<footer className="ts-footer"><span>Prototype · Synthetic / de-identified data</span><span>Not an official Ministry of AYUSH service</span></footer></div>;
}

export function TrialTwinDashboard() {
  const [selectedNode, setSelectedNode] = useState("Participants");
  const [guided, setGuided] = useState(false);
  const detail = nodeDetails[selectedNode];
  return (
    <TrialSphereShell>
      <main className="ts-main">
        <section className="ts-welcome">
          <div><div className="ts-kicker"><span className="ts-kicker-dot" /> DEMO WORKSPACE <span className="ts-kicker-separator">/</span> INVESTIGATOR</div><h1>Trial operations</h1></div>
          <div className="ts-welcome-actions"><Link className="ts-button-secondary" to="/registry">Browse public registry</Link><button className="ts-button-primary" onClick={() => setGuided(!guided)} type="button">{guided ? "Exit guided demo" : "Start guided demo"}</button></div>
        </section>
        {guided && <section className="ts-guided" aria-live="polite"><span className="ts-guided-step">01 <span>/ 02</span></span><div><strong>{guidedSteps[0]}</strong><span>Select a connected node to inspect the synthetic trial data.</span></div><Link className="ts-guide-next" to="/registry?guided=1">Next · Public registry <span aria-hidden="true">→</span></Link><button type="button" onClick={() => setGuided(false)} aria-label="Close guided demo">×</button></section>}
        <section className="ts-metrics" aria-label="Trial summary">
          <article className="ts-metric"><span>Active trials</span><strong>08</strong><small><span className="ts-trend-up">+2</span> this quarter</small></article>
          <article className="ts-metric"><span>Participants</span><strong>317</strong><small>Across 12 synthetic sites</small></article>
          <article className="ts-metric"><span>Open data signals</span><strong className="ts-metric-alert">03</strong><small>2 need review today</small></article>
        </section>
        <section className="ts-workspace">
          <article className="ts-panel ts-twin-panel">
            <div className="ts-panel-heading"><div><span className="ts-panel-overline">AIIA-AY-026 <span>·</span> PHASE II</span><h2>Digital trial twin</h2></div><span className="ts-health"><i /> Attention required</span></div>
            <div className="ts-graph-wrap"><TwinGraph selected={selectedNode} onSelect={setSelectedNode} /></div>
            <div className="ts-graph-foot"><span><i className="ts-legend-dot" /> Connected synthetic records</span><span>Last sync · 09:42 IST</span></div>
          </article>
          <aside className="ts-side-column">
            <article className="ts-panel ts-detail-panel"><div className="ts-section-heading"><h2>Node detail</h2><span className="ts-node-kind">{detail.name}</span></div><strong className="ts-detail-value">{detail.value}</strong><p className="ts-detail-note">{detail.note}</p><div className="ts-detail-divider" /><div className="ts-detail-foot"><span>Operational health</span><strong className="ts-warning-text">Needs attention</strong></div></article>
            <article className="ts-panel ts-signals-panel"><div className="ts-section-heading"><h2>Priority signals</h2><span className="ts-signal-count">02</span></div><div className="ts-signal-row"><span className="ts-signal-mark ts-mark-amber">!</span><div><strong>Enrollment below plan</strong><span>12% behind target · Participants</span></div></div><div className="ts-signal-row"><span className="ts-signal-mark ts-mark-green">i</span><div><strong>Source review due</strong><span>4 eCRFs require attention</span></div></div></article>
          </aside>
        </section>
        <section className="ts-bottom-row"><div className="ts-section-heading"><h2>Trial activity</h2><span>DEMO FEED</span></div><div className="ts-activity-list"><div><span className="ts-activity-marker" /><p><strong>Site AIIA-01</strong> completed a scheduled monitoring visit</p><time>09:18</time></div><div><span className="ts-activity-marker ts-marker-amber" /><p><strong>4 eCRFs</strong> flagged for source data review</p><time>08:54</time></div><div><span className="ts-activity-marker" /><p><strong>Participant P-1048</strong> completed visit 3</p><time>Yesterday</time></div></div></section>
      </main>
    </TrialSphereShell>
  );
}

export function TrialRegistry() {
  const [searchParams] = useSearchParams();
  const guided = searchParams.get("guided") === "1";
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All trials");
  const [expanded, setExpanded] = useState<string | null>(null);
  const statuses = ["All trials", "Recruiting", "Active", "Completed"];
  const filteredTrials = useMemo(() => trials.filter((trial) => {
    const matchesFilter = filter === "All trials" || trial.status === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [trial.id, trial.title, trial.intervention, trial.site, trial.status].some((value) => value.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  }), [filter, search]);

  return (
    <TrialSphereShell>
      <main className="ts-main ts-registry-main">
        {guided && <section className="ts-guided" aria-live="polite"><span className="ts-guided-step">02 <span>/ 02</span></span><div><strong>{guidedSteps[1]}</strong><span>Search, filter, or expand a record to review its lifecycle.</span></div><Link className="ts-guide-next" to="/">Return to overview <span aria-hidden="true">→</span></Link></section>}
        <section className="ts-registry-heading"><div><div className="ts-kicker"><span className="ts-kicker-dot" /> PUBLIC SANDBOX REGISTRY</div><h1>Clinical trial registry</h1></div><span className="ts-registry-total">{filteredTrials.length.toString().padStart(2, "0")} <span>TRIALS</span></span></section>
        <section className="ts-registry-controls" aria-label="Filter trials"><label className="ts-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search trials</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by trial, intervention, or site" /></label><div className="ts-filter-group" aria-label="Filter by status">{statuses.map((status) => <button key={status} type="button" className={filter === status ? "is-active" : ""} onClick={() => setFilter(status)}>{status}</button>)}</div></section>
        <section className="ts-trial-list" aria-live="polite">{filteredTrials.map((trial) => <article className={`ts-trial-card${expanded === trial.id ? " is-expanded" : ""}`} key={trial.id}>
          <button className="ts-trial-main" type="button" aria-expanded={expanded === trial.id} onClick={() => setExpanded(expanded === trial.id ? null : trial.id)}>
            <span className="ts-trial-id">{trial.id}<span>{trial.phase}</span></span><span className="ts-trial-title">{trial.title}<small>{trial.intervention}</small></span><span className="ts-trial-site">{trial.site}<small>{trial.participants} participants</small></span><span className={`ts-status ts-status-${trial.status.toLowerCase().replace(/\s+/g, "-")}`}><i />{trial.status}</span><span className="ts-trial-chevron">{expanded === trial.id ? "−" : "+"}</span>
          </button>
          {expanded === trial.id && <div className="ts-trial-expanded"><div><span>Study phase</span><strong>{trial.phase}</strong></div><div><span>Study site</span><strong>{trial.site}</strong></div><div><span>Record updated</span><strong>{trial.updated}</strong></div><div className="ts-lifecycle"><span className="is-complete">Registered</span><i /><span className={trial.status === "Recruiting" || trial.status === "Active" || trial.status === "Completed" ? "is-complete" : ""}>Approved</span><i /><span className={trial.status === "Recruiting" || trial.status === "Active" || trial.status === "Completed" ? "is-complete" : ""}>Recruiting</span><i /><span className={trial.status === "Completed" ? "is-complete" : ""}>Complete</span></div></div>}
        </article>)}{filteredTrials.length === 0 && <div className="ts-empty-state"><span>No matching trials</span><button type="button" onClick={() => { setSearch(""); setFilter("All trials"); }}>Clear filters</button></div>}</section>
        <p className="ts-registry-disclaimer">Registry records are synthetic and for demonstration only. This is not an official CTRI service.</p>
      </main>
    </TrialSphereShell>
  );
}
