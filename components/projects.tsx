'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  X, ExternalLink, Link, FileDown, ChevronRight, Eye,
  Target, Layers, Code, Brain, Container, BarChart2,
  Shield, FileCode, Lightbulb, Users, Rocket, Smartphone, Database,
} from 'lucide-react'
import { projects } from '@/lib/data'
import type { Project } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

const ICONS: Record<string, React.ElementType> = {
  Target, Layers, Code, Brain, Container, BarChart2,
  Shield, FileCode, Lightbulb, Users, Rocket, Smartphone, Database,
}

interface ProjectsProps {
  locale: Locale
}

export default function Projects({ locale }: ProjectsProps) {
  const t = translations[locale].projects
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [previewReport, setPreviewReport] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">{t.subtitle}</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">{t.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              t={t}
              onOpenCaseStudy={() => setActiveProject(project)}
              onPreviewReport={() => setPreviewReport(project)}
            />
          ))}
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewReport && (
          <ReportPreviewModal
            project={previewReport}
            t={t}
            onClose={() => setPreviewReport(null)}
          />
        )}
      </AnimatePresence>

      {/* Case Study Panel */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyPanel
            project={activeProject}
            t={t}
            onClose={() => setActiveProject(null)}
            onPreviewReport={() => {
              setPreviewReport(activeProject)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  inView,
  t,
  onOpenCaseStudy,
  onPreviewReport,
}: {
  project: Project
  index: number
  inView: boolean
  t: typeof translations.en.projects
  onOpenCaseStudy: () => void
  onPreviewReport: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl overflow-hidden border border-border hover:border-cyan/30 transition-all group gradient-border"
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
          style={{ background: `linear-gradient(135deg, ${project.color}55, transparent)` }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold glass-elevated border border-border">
            {project.year}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold"
            style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
          >
            {project.type}
          </span>
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={onOpenCaseStudy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm glass-elevated border-2 shadow-xl"
            style={{ borderColor: project.color, color: project.color }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.view_case} <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-2xl font-black mb-1 group-hover:text-cyan transition-colors">{project.title}</h3>
        <p className="text-sm font-medium text-muted-foreground mb-4">{project.subtitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className="text-sm font-bold" style={{ color: project.color }}>{m.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium glass border border-border">
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-muted-foreground">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap items-center">
          <motion.button
            onClick={onOpenCaseStudy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{ background: `${project.color}22`, color: project.color }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ChevronRight size={12} />
            {t.view_case}
          </motion.button>

          {/* Report button group */}
          <div className="flex rounded-xl overflow-hidden border border-border glass">
            <motion.button
              onClick={onPreviewReport}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-r border-border hover:text-cyan hover:bg-cyan/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              title={t.preview_report}
            >
              <Eye size={12} />
              <span className="hidden sm:inline">{t.preview_report}</span>
            </motion.button>
            <motion.a
              href={project.reportUrl}
              download
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold hover:text-cyan hover:bg-cyan/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              title={t.view_report}
            >
              <FileDown size={12} />
              <span className="hidden sm:inline">{t.view_report}</span>
            </motion.a>
          </div>

          <motion.a
            href="https://github.com/Mahrez-Ourabi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold glass border border-border hover:border-cyan hover:text-cyan transition-all ml-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link size={12} />
            <span className="hidden sm:inline">{t.view_code}</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

// ── PDF Preview Modal ─────────────────────────────────────────────────────────
function ReportPreviewModal({
  project,
  t,
  onClose,
}: {
  project: Project
  t: typeof translations.en.projects
  onClose: () => void
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [loading, setLoading] = useState(true) // State to manage loading spinner visibility

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'oklch(0 0 0 / 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-5xl h-[90vh] flex flex-col glass-elevated rounded-3xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-none"
              style={{ background: `${project.color}22` }}
            >
              <FileDown size={15} style={{ color: project.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-mono text-muted-foreground">Project Report</p>
              <h3 className="font-black text-sm truncate">{project.title} — Technical Report</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-none ml-4">
            <motion.a
              href={project.reportUrl}
              download
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all"
              style={{ borderColor: project.color, color: project.color, background: `${project.color}15` }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileDown size={13} />
              <span className="hidden sm:inline">{t.view_report}</span>
            </motion.a>
            <motion.button
              onClick={onClose}
              className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center hover:text-cyan hover:border-cyan transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close preview"
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>

        {/* PDF iframe or fallback */}
        <div className="flex-1 relative bg-muted/30">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src={`${project.reportUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full"
            title={`${project.title} Report`}
            onLoad={() => {
              setIframeLoaded(true)
              setLoading(false) // Hide spinner when iframe loads
            }}
            onError={() => {
              setIframeLoaded(false)
              setLoading(false) // Hide spinner if iframe fails
            }}
          />
          {/* Fallback overlay — shown only if the iframe fails to load */}
          {!iframeLoaded && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none select-none">
              <motion.div
                className="glass-elevated rounded-3xl border border-border px-10 py-10 flex flex-col items-center gap-5 text-center max-w-sm mx-4 pointer-events-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: `${project.color}20` }}
                >
                  <FileDown size={28} style={{ color: project.color }} />
                </div>
                <div>
                  <p className="font-black text-lg mb-1">{project.title}</p>
                  <p className="text-xs text-muted-foreground font-mono mb-1">{project.caseStudy.period}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Technical project report — upload your PDF to{' '}
                    <code className="text-xs glass px-1.5 py-0.5 rounded border border-border font-mono">
                      public/reports/
                    </code>{' '}
                    to enable the preview.
                  </p>
                </div>
                <motion.a
                  href={project.reportUrl}
                  download
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileDown size={15} />
                  {t.view_report}
                </motion.a>
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom bar with report metadata */}
        <div className="flex-none flex items-center justify-between gap-4 px-6 py-3 border-t border-border glass">
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span
              className="px-2 py-0.5 rounded-full font-bold"
              style={{ background: `${project.color}18`, color: project.color }}
            >
              {project.type}
            </span>
            <span>{project.caseStudy.company}</span>
            <span className="hidden sm:inline">{project.caseStudy.period}</span>
          </div>
          <p className="text-xs text-muted-foreground hidden md:block">
            {project.caseStudy.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Case Study Panel ──────────────────────────────────────────────────────────

const SECTION_TABS = [
  { key: 'overview',      labelKey: 'overview' },
  { key: 'challenge',     labelKey: 'challenge' },
  { key: 'my_role',       labelKey: 'my_role' },
  { key: 'architecture',  labelKey: 'architecture' },
  { key: 'results',       labelKey: 'results' },
  { key: 'stack',         labelKey: 'stack' },
  { key: 'lessons',       labelKey: 'lessons' },
  { key: 'gallery',       labelKey: 'gallery' },
] as const

type SectionKey = typeof SECTION_TABS[number]['key']

function CaseStudyPanel({
  project,
  t,
  onClose,
  onPreviewReport,
}: {
  project: Project
  t: typeof translations.en.projects
  onClose: () => void
  onPreviewReport: () => void
}) {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview')
  const cs = project.caseStudy

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      style={{ backgroundColor: 'oklch(0 0 0 / 0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        className="relative w-full max-w-3xl h-full flex flex-col glass-elevated border-l border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-none px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-border">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                  style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
                >
                  {project.type}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{cs.period}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{project.title}</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{cs.company} · {cs.role}</p>
            </div>
            <div className="flex items-center gap-2 flex-none">
              {/* Report button group in header */}
              <div className="hidden sm:flex rounded-xl overflow-hidden border border-border glass">
                <motion.button
                  onClick={onPreviewReport}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-r border-border hover:text-cyan hover:bg-cyan/10 transition-all"
                  style={{ color: project.color }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  title={t.preview_report}
                >
                  <Eye size={13} />
                  {t.preview_report}
                </motion.button>
                <motion.a
                  href={project.reportUrl}
                  download
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold hover:text-cyan hover:bg-cyan/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  title={t.view_report}
                >
                  <FileDown size={13} />
                  {t.view_report}
                </motion.a>
              </div>
              <motion.button
                onClick={onClose}
                className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center hover:text-cyan hover:border-cyan transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close case study"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {SECTION_TABS.map((tab) => {
              const label = t[tab.labelKey as keyof typeof t] as string
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key)}
                  className="flex-none px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap"
                  style={
                    activeSection === tab.key
                      ? { background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }
                      : { color: 'var(--muted-foreground)', border: '1px solid transparent' }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {label}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeSection === 'overview' && <SectionOverview project={project} cs={cs} />}
              {activeSection === 'challenge' && <SectionList items={cs.challenge} color={project.color} type="warning" />}
              {activeSection === 'my_role' && <SectionRoles roles={cs.myRole} color={project.color} />}
              {activeSection === 'architecture' && <SectionArchitecture rows={cs.architecture} color={project.color} />}
              {activeSection === 'results' && <SectionResults results={cs.results} color={project.color} />}
              {activeSection === 'stack' && <SectionStack stack={cs.stack} color={project.color} />}
              {activeSection === 'lessons' && <SectionList items={cs.lessons} color={project.color} type="check" />}
              {activeSection === 'gallery' && <SectionGallery images={cs.gallery} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Section components ────────────────────────────────────────────────────────

function SectionOverview({ project, cs }: { project: Project; cs: Project['caseStudy'] }) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden aspect-video">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${project.color}33, transparent)` }} />
      </div>
      <p className="text-base leading-relaxed text-foreground/90">{cs.overview}</p>
      <div className="grid grid-cols-2 gap-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <p className="text-xl font-black" style={{ color: project.color }}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionList({ items, color, type }: { items: string[]; color: string; type: 'check' | 'warning' }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-3 glass rounded-xl p-4 border border-border"
        >
          <span
            className="flex-none mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
            style={{ background: `${color}22`, color }}
          >
            {type === 'check' ? '✓' : '!'}
          </span>
          <span className="text-sm leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

function SectionRoles({ roles, color }: { roles: Project['caseStudy']['myRole']; color: string }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {roles.map((role, i) => {
        const Icon = ICONS[role.icon] ?? Code
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4 glass rounded-xl p-4 border border-border"
          >
            <div
              className="flex-none w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${color}22` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-bold mb-0.5">{role.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{role.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function SectionArchitecture({ rows, color }: { rows: Project['caseStudy']['architecture']; color: string }) {
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.35 }}
          className="flex items-stretch glass rounded-xl border border-border overflow-hidden"
        >
          <div
            className="flex-none w-28 md:w-32 px-3 md:px-4 py-3 flex items-center"
            style={{ background: `${color}15`, borderRight: `1px solid ${color}30` }}
          >
            <span className="text-xs font-mono font-bold" style={{ color }}>{row.layer}</span>
          </div>
          <div className="flex-1 px-3 md:px-4 py-3 flex items-center">
            <span className="text-xs md:text-sm text-muted-foreground">{row.tech}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SectionResults({ results, color }: { results: Project['caseStudy']['results']; color: string }) {
  return (
    <div className="space-y-4">
      {results.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
          className="glass rounded-xl p-4 border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{r.label}</span>
            <span className="text-sm font-black" style={{ color }}>{r.value}</span>
          </div>
          {r.bar !== undefined && (
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${r.bar}%` }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function SectionStack({ stack, color }: { stack: Project['caseStudy']['stack']; color: string }) {
  return (
    <div className="space-y-2">
      {stack.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          className="flex items-stretch glass rounded-xl border border-border overflow-hidden"
        >
          <div
            className="flex-none w-24 md:w-28 px-3 md:px-4 py-3 flex items-center"
            style={{ background: `${color}15`, borderRight: `1px solid ${color}30` }}
          >
            <span className="text-xs font-mono font-bold" style={{ color }}>{row.category}</span>
          </div>
          <div className="flex-1 px-3 md:px-4 py-3 flex items-center flex-wrap gap-1.5">
            {row.items.split(' · ').map((item) => (
              <span key={item} className="px-2 py-0.5 rounded-md text-xs font-mono glass border border-border">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SectionGallery({ images }: { images: Project['caseStudy']['gallery'] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden aspect-video glass border border-border">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active].src}
            alt={images[active].caption}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
        <div className="absolute bottom-0 inset-x-0 px-5 py-3 glass-elevated border-t border-border">
          <p className="text-xs font-mono text-muted-foreground">{images[active].caption}</p>
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className="relative rounded-xl overflow-hidden w-24 aspect-video glass border transition-all"
              style={{ borderColor: active === i ? 'var(--cyan)' : 'var(--border)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
