import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Terminal, 
  Layout, 
  Network, 
  Zap, 
  Server, 
  Cpu, 
  Boxes, 
  Globe, 
  Palette, 
  Database, 
  Box, 
  ShieldCheck, 
  Layers, 
  GitBranch, 
  Github, 
  CheckCircle2, 
  Send,
  Search,
  Sparkles,
  X,
  ChevronRight,
  Shield,
  Layers as LayersIcon
} from 'lucide-react';
import { TECH_STACK_ITEMS } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

// Detailed project implementation and terminal lore for each of the 27 technologies
const TECH_EXTENDED_INFO = {
  'tech-c': {
    usageProject: 'Aegis Micro-Daemon & Systems Projects',
    role: 'Low-level systems programming, deterministic manual heap management, POSIX thread pools, and memory safety audits.',
    codeSnippet: 'gcc -O3 -Wall -Wextra -pthread -pedantic -o aegis_daemon daemon.c',
  },
  'tech-python': {
    usageProject: 'Julisha Healthcare AI Platform (GDG Pwani Winner)',
    role: 'Asynchronous REST APIs, Pearson stockout-to-satisfaction correlation algorithms, and multi-modal clinical prompt pipelines.',
    codeSnippet: 'python3 -m uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000',
  },
  'tech-react-router': {
    usageProject: 'GeoMakazi Housing & Portfolio Single Page Architecture',
    role: 'Client-side declarative routing, nested viewports, search parameter sync, and seamless navigation.',
    codeSnippet: 'createBrowserRouter([ { path: "/", element: <Layout />, children: [...] } ])',
  },
  'tech-rabbitmq': {
    usageProject: 'Asynchronous Task Processing & Queue Workers',
    role: 'Decoupled asynchronous task queues, direct/topic exchange routing, and resilient pub/sub worker pools.',
    codeSnippet: 'amqp.connect("amqp://localhost", (err, conn) => conn.createChannel(...))',
  },
  'tech-react': {
    usageProject: 'Julisha AI, GeoMakazi Campus Housing & Portfolio',
    role: 'Component state machines, hooks, reactive UI flows, and high-performance interactive interfaces.',
    codeSnippet: 'const [state, setState] = useState(initialState);',
  },
  'tech-nodejs': {
    usageProject: 'KMFRI Ticketing Engine & Julisha Microservices',
    role: 'Non-blocking V8 event loops, asynchronous I/O stream processing, and microservice APIs.',
    codeSnippet: 'node dist/server.cjs',
  },
  'tech-django': {
    usageProject: 'Scalable Enterprise Backends & ORM Architectures',
    role: 'Django REST Framework, automated database schema migrations, CSRF/CORS security middleware, and admin portals.',
    codeSnippet: 'python manage.py makemigrations && python manage.py migrate',
  },
  'tech-vite': {
    usageProject: 'Production Bundler for all Frontend Projects',
    role: 'Fast esbuild dev server, instant HMR, tree-shaking, and Rollup production optimizations.',
    codeSnippet: 'vite build --mode production',
  },
  'tech-express': {
    usageProject: 'High-Throughput RESTful APIs & Middleware Proxies',
    role: 'Modular route pipelines, JSON middleware, rate-limiting, and error-handling layers.',
    codeSnippet: 'app.use("/api/v1", rateLimiter, authMiddleware, apiRouter);',
  },
  'tech-flask': {
    usageProject: 'Lightweight AI Inference Endpoints & Rapid Prototyping',
    role: 'Modular blueprints, WSGI microservices, and lightweight machine learning model serving.',
    codeSnippet: '@app.route("/api/predict", methods=["POST"]) def run_inference(): ...',
  },
  'tech-html5': {
    usageProject: 'Universal Web Architecture Across All Applications',
    role: 'Accessible semantic structures, ARIA accessibility standards, Canvas API, and SEO optimization.',
    codeSnippet: '<header role="banner"> <nav aria-label="Main Navigation"> ... </nav> </header>',
  },
  'tech-javascript': {
    usageProject: 'Full-Stack Scripting & Browser Runtime Engines',
    role: 'Modern ES6+, async/await asynchronous promises, closures, prototypes, and event-driven DOM engines.',
    codeSnippet: 'const results = await Promise.allSettled(microservices.map(fetchHealth));',
  },
  'tech-css3': {
    usageProject: 'Responsive Layouts, Tailwind CSS & Fluid Grids',
    role: 'CSS Grid, Flexbox, custom CSS properties, hardware-accelerated transitions, and dark themes.',
    codeSnippet: '@supports (display: grid) { .layout-grid { display: grid; grid-template-columns: repeat(12, 1fr); } }',
  },
  'tech-nginx': {
    usageProject: 'GeoMakazi & Cloud Gateway Deployments',
    role: 'High-performance HTTP reverse proxy, TLS/SSL certificate termination, upstream load balancing, and static caching.',
    codeSnippet: 'upstream api_cluster { server 127.0.0.1:8001; server 127.0.0.1:8002; }',
  },
  'tech-supabase': {
    usageProject: 'GeoMakazi Campus & Student Housing Infrastructure',
    role: 'PostgreSQL database hosting, Row-Level Security (RLS) policies, OAuth identity, and realtime change webhooks.',
    codeSnippet: 'create policy "Allow comrades to view verified houses" on houses for select using (status = "active");',
  },
  'tech-postgres': {
    usageProject: 'Enterprise Data Stores, Julisha AI & KMFRI Ticketing',
    role: 'ACID relational modeling, B-Tree and GIN indexes, JSONB document querying, and foreign key integrity.',
    codeSnippet: 'CREATE INDEX idx_stock_hospital ON stocks (hospital_id, medicine_name);',
  },
  'tech-redis': {
    usageProject: 'In-Memory Cache, Rate Limiting & Session Revocation',
    role: 'Sub-millisecond key-value caching, Pub/Sub message broker, and JWT revocation blacklists.',
    codeSnippet: 'redis-cli SETEX "session:token:usr_24" 3600 "valid"',
  },
  'tech-mongodb': {
    usageProject: 'NoSQL Document Store & Flexible Schemas',
    role: 'BSON document modeling, dynamic schema migrations, aggregation pipelines, and high-write logging.',
    codeSnippet: 'db.sensor_telemetry.aggregate([ { $match: { level: { $gt: 80 } } } ])',
  },
  'tech-mysql': {
    usageProject: 'KMFRI Marine Research Equipment Asset Database',
    role: 'InnoDB relational transactions, table normalization, composite foreign keys, and SQL tuning.',
    codeSnippet: 'EXPLAIN ANALYZE SELECT * FROM equipment_tickets WHERE status = "OPEN";',
  },
  'tech-mssql': {
    usageProject: 'Enterprise T-SQL & Microsoft Database Stacks',
    role: 'Transact-SQL scripting, stored procedures, triggers, execution plan analysis, and Azure SQL DB.',
    codeSnippet: 'CREATE PROCEDURE sp_ReconcileStockOuts @HospitalId INT AS BEGIN TRANSACTION ... COMMIT;',
  },
  'tech-figma': {
    usageProject: 'Design Systems & UI/UX Wireframing for all Apps',
    role: 'Interactive prototypes, auto-layout hierarchies, color token scales, and developer handoffs.',
    codeSnippet: 'Auto-Layout (Direction: Horizontal, Gap: 12px, Padding: 16px 24px)',
  },
  'tech-git': {
    usageProject: 'Core Version Control System Across All Repositories',
    role: 'Branching strategies, interactive rebasing, stash manipulation, and team collaboration workflows.',
    codeSnippet: 'git checkout -b feature/systems-enhancement && git commit -m "feat: implement token rotation"',
  },
  'tech-github': {
    usageProject: 'Remote Code Hosting, PR Reviews & Open Source Hub',
    role: 'Code collaboration, pull request reviews, issue tracking, and project releases.',
    codeSnippet: 'gh pr create --title "feat: daemon benchmark" --body "Benchmarks sub-2ms latency"',
  },
  'tech-github-actions': {
    usageProject: 'Automated CI/CD DevOps Pipelines',
    role: 'Automated test runners, security linting, Docker container builds, and deployment webhooks.',
    codeSnippet: 'name: CI/CD Pipeline\non: [push]\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest',
  },
  'tech-jest': {
    usageProject: 'Automated JavaScript / TypeScript Testing Suite',
    role: 'Unit tests, assertions, mock functions, snapshot verification, and test coverage auditing.',
    codeSnippet: 'npm test -- --coverage --bail',
  },
  'tech-docker': {
    usageProject: 'Immutable Microservice Containerization',
    role: 'Multi-stage Dockerfiles, minimal Alpine images, Docker Compose orchestration, and environment parity.',
    codeSnippet: 'docker compose -f docker-compose.prod.yml up -d --build',
  },
  'tech-postman': {
    usageProject: 'API Verification, Mock Servers & Integration Suites',
    role: 'Collection runners, pre-request scripts, environment variable token handshakes, and automated testing.',
    codeSnippet: 'pm.test("Status code is 200 OK", () => pm.response.to.have.status(200));',
  },
};

export default function TechStackSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);

  const filterTabs = [
    { label: 'All Technologies', value: 'All', count: 27 },
    { label: 'Languages', value: 'Languages', count: 5 },
    { label: 'Frontend', value: 'Frontend', count: 4 },
    { label: 'Backend', value: 'Backend', count: 4 },
    { label: 'Databases', value: 'Databases', count: 6 },
    { label: 'DevOps & Messaging', value: 'DevOps & Queues', count: 4 },
    { label: 'Testing & Tools', value: 'Testing & Tools', count: 4 },
  ];

  const getTechIcon = (iconName) => {
    switch (iconName) {
      case 'Terminal': return <Terminal size={18} className="text-amber-400" />;
      case 'Code2': return <Code2 size={18} className="text-sky-400" />;
      case 'Layout': return <Layout size={18} className="text-blue-400" />;
      case 'Network': return <Network size={18} className="text-indigo-400" />;
      case 'Zap': return <Zap size={18} className="text-amber-400" />;
      case 'Server': return <Server size={18} className="text-emerald-400" />;
      case 'Cpu': return <Cpu size={18} className="text-rose-400" />;
      case 'Boxes': return <Boxes size={18} className="text-teal-400" />;
      case 'Globe': return <Globe size={18} className="text-orange-400" />;
      case 'Palette': return <Palette size={18} className="text-pink-400" />;
      case 'Database': return <Database size={18} className="text-violet-400" />;
      case 'Box': return <Box size={18} className="text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck size={18} className="text-emerald-400" />;
      case 'Layers': return <Layers size={18} className="text-amber-400" />;
      case 'GitBranch': return <GitBranch size={18} className="text-rose-400" />;
      case 'Github': return <Github size={18} className="text-slate-200" />;
      case 'CheckCircle2': return <CheckCircle2 size={18} className="text-emerald-400" />;
      case 'Send': return <Send size={18} className="text-orange-400" />;
      default: return <Code2 size={18} className="text-sky-400" />;
    }
  };

  const filteredItems = useMemo(() => {
    return TECH_STACK_ITEMS.filter((item) => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleCardClick = (item) => {
    soundManager.playClick();
    setSelectedTech(item);
  };

  return (
    <section id="techstack" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Subtle Header */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-7">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
                Technical Proficiencies
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-400">27 Technologies</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
              Tech Stack & Engineering Arsenal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Full-spectrum technical proficiencies from C systems programming to Python and Node.js backends, modern reactive user interfaces, distributed databases, message queues, and automated DevOps workflows.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-800/80 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Core Languages</span>
              <strong className="text-sm text-white">C, Python, JS, HTML5, CSS3</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Databases (6)</span>
              <strong className="text-sm text-white">Postgres, Redis, Mongo, MySQL...</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Backends & APIs</span>
              <strong className="text-sm text-white">Django, Node.js, Express, Flask</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">DevOps & Infra</span>
              <strong className="text-sm text-white">Docker, Actions, RabbitMQ, Nginx</strong>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveFilter(tab.value);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-['Chakra_Petch'] font-semibold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-60 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-7 py-1.5 text-xs rounded-md bg-slate-900 border border-slate-800 focus:border-sky-500 focus:outline-none text-white placeholder:text-slate-500 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* 27 Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredItems.map((item) => {
            const extra = TECH_EXTENDED_INFO[item.id] || {};

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                onMouseEnter={() => soundManager.playHover()}
                className="rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 p-4 flex flex-col justify-between cursor-pointer transition-all duration-150 group"
              >
                <div className="space-y-2.5">
                  {/* Top: Icon + Name + Category */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-md bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0">
                        {getTechIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="font-['Chakra_Petch'] font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.subcategory || item.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                      {item.tier}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                    {item.description}
                  </p>

                  {/* Active Project Hint */}
                  {extra.usageProject && (
                    <div className="p-2 rounded bg-slate-900 border border-slate-800/70 text-[11px] font-mono space-y-0.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Project Application:</span>
                      <span className="text-slate-200 line-clamp-1">{extra.usageProject}</span>
                    </div>
                  )}
                </div>

                {/* Footer Tags & Inspect Prompt */}
                <div className="pt-2.5 mt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[10px] font-mono text-slate-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-sky-400 font-semibold flex items-center gap-0.5 transition-colors">
                    Details <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Inspector */}
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl relative text-slate-200">
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getTechIcon(selectedTech.icon)}
                </div>
                <div>
                  <h3 className="font-['Chakra_Petch'] font-bold text-xl text-white">
                    {selectedTech.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedTech.subcategory || selectedTech.category} · {selectedTech.tier}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <strong className="text-slate-300 font-semibold uppercase block text-[11px]">
                    Engineering Overview:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedTech.description}
                  </p>
                </div>

                {TECH_EXTENDED_INFO[selectedTech.id]?.usageProject && (
                  <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <strong className="text-sky-400 font-semibold uppercase block text-[11px]">
                      Practical Implementation:
                    </strong>
                    <p className="text-white font-medium">
                      {TECH_EXTENDED_INFO[selectedTech.id].usageProject}
                    </p>
                    <p className="text-slate-400 mt-0.5">
                      {TECH_EXTENDED_INFO[selectedTech.id].role}
                    </p>
                  </div>
                )}

                {TECH_EXTENDED_INFO[selectedTech.id]?.codeSnippet && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Command / Implementation Snippet:
                    </span>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-slate-300 text-xs overflow-x-auto">
                      <code>{TECH_EXTENDED_INFO[selectedTech.id].codeSnippet}</code>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTech.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedTech(null)}
                className="mt-5 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
