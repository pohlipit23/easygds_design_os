import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { ChevronRight, Layout } from 'lucide-react'

// Map Tailwind color names to actual color values for preview
const colorMap: Record<string, { light: string; base: string; dark: string }> = {
  red: { light: '#fca5a5', base: '#ef4444', dark: '#dc2626' },
  orange: { light: '#fdba74', base: '#f97316', dark: '#ea580c' },
  amber: { light: '#fcd34d', base: '#f59e0b', dark: '#d97706' },
  yellow: { light: '#fde047', base: '#eab308', dark: '#ca8a04' },
  lime: { light: '#bef264', base: '#84cc16', dark: '#65a30d' },
  green: { light: '#86efac', base: '#22c55e', dark: '#16a34a' },
  emerald: { light: '#6ee7b7', base: '#10b981', dark: '#059669' },
  teal: { light: '#5eead4', base: '#14b8a6', dark: '#0d9488' },
  cyan: { light: '#67e8f9', base: '#06b6d4', dark: '#0891b2' },
  sky: { light: '#7dd3fc', base: '#0ea5e9', dark: '#0284c7' },
  blue: { light: '#93c5fd', base: '#3b82f6', dark: '#2563eb' },
  indigo: { light: '#a5b4fc', base: '#6366f1', dark: '#4f46e5' },
  violet: { light: '#c4b5fd', base: '#8b5cf6', dark: '#7c3aed' },
  purple: { light: '#d8b4fe', base: '#a855f7', dark: '#9333ea' },
  fuchsia: { light: '#f0abfc', base: '#d946ef', dark: '#c026d3' },
  pink: { light: '#f9a8d4', base: '#ec4899', dark: '#db2777' },
  rose: { light: '#fda4af', base: '#f43f5e', dark: '#e11d48' },
  slate: { light: '#cbd5e1', base: '#64748b', dark: '#475569' },
  gray: { light: '#d1d5db', base: '#6b7280', dark: '#4b5563' },
  zinc: { light: '#d4d4d8', base: '#71717a', dark: '#52525b' },
  neutral: { light: '#d4d4d4', base: '#737373', dark: '#525252' },
  stone: { light: '#d6d3d1', base: '#78716c', dark: '#57534e' },
}

/**
 * Determine the status of each step on the Design page
 * Steps: 1. Design Tokens, 2. Shell Design
 */
function getDesignPageStepStatuses(
  hasDesignSystem: boolean,
  hasShell: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Design Tokens
  if (hasDesignSystem) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Shell
  if (hasShell) {
    statuses.push('completed')
  } else if (hasDesignSystem) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function DesignPage() {
  const productData = useMemo(() => loadProductData(), [])
  const designSystem = productData.designSystem
  const shell = productData.shell

  const hasDesignSystem = !!(designSystem?.colors || designSystem?.typography)
  const hasShell = !!shell?.spec
  const allStepsComplete = hasDesignSystem && hasShell

  const stepStatuses = getDesignPageStepStatuses(hasDesignSystem, hasShell)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Design System
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Define the visual foundation and application shell for your product.
          </p>
        </div>

        {/* Step 1: Design Tokens */}
        <StepIndicator step={1} status={stepStatuses[0]}>
          {!designSystem?.colors && !designSystem?.typography ? (
            <EmptyState type="design-system" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Design Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Colors */}
                {designSystem?.colors && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                      Colors
                    </h4>
                    <div className="grid grid-cols-3 gap-6">
                      <ColorSwatch
                        label="Primary"
                        colorName={
                          typeof designSystem.colors.primary === 'string'
                            ? designSystem.colors.primary
                            : designSystem.colors.primary.value || designSystem.colors.primary.name || ''
                        }
                      />
                      <ColorSwatch
                        label="Secondary"
                        colorName={
                          typeof designSystem.colors.secondary === 'string'
                            ? designSystem.colors.secondary
                            : designSystem.colors.secondary.value || designSystem.colors.secondary.name || ''
                        }
                      />
                      <ColorSwatch
                        label="Neutral"
                        colorName={
                          typeof designSystem.colors.neutral === 'string'
                            ? designSystem.colors.neutral
                            : designSystem.colors.neutral['500'] || designSystem.colors.neutral.value || ''
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Typography */}
                {designSystem?.typography && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                      Typography
                    </h4>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Heading</p>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {renderTypographyValue(designSystem.typography.heading)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Body</p>
                        <p className="text-stone-900 dark:text-stone-100">
                          {renderTypographyValue(designSystem.typography.body)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Mono</p>
                        <p className="font-mono text-stone-900 dark:text-stone-100">
                          {renderTypographyValue(designSystem.typography.mono)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Elements */}
                <div>
                  <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-6">
                    Interactive Elements
                  </h4>

                  {/* Buttons */}
                  <div className="mb-8">
                    <h5 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">
                      Buttons
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Primary</p>
                        <button className="w-full h-11 bg-[#203C94] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#1a3076] shadow-md transition-all hover:shadow-lg active:scale-95">
                          View Deal
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Secondary (Outline)</p>
                        <button className="w-full h-11 bg-transparent border border-[#203C94] text-[#203C94] dark:border-[#0891B2] dark:text-[#0891B2] rounded-lg text-xs font-bold uppercase hover:bg-[#203C94]/5 dark:hover:bg-[#0891B2]/10 transition-colors active:scale-95">
                          More Details
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Toolbar / Utility</p>
                        <button className="w-full flex items-center justify-center gap-2 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm active:scale-95">
                          <span className="material-icons-round text-lg">tune</span>
                          <span>Filters</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Ghost / Text</p>
                        <button className="w-full h-10 bg-transparent text-[#203C94] dark:text-[#0891B2] rounded-lg text-xs font-bold uppercase hover:bg-[#203C94]/5 dark:hover:bg-[#0891B2]/10 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Components */}
                  <div className="mb-8">
                    <h5 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">
                      Navigation Structure
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Tabs */}
                      <div className="space-y-3">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Tabs</p>
                        <div className="flex border-b border-slate-200 dark:border-slate-700">
                          <button className="px-4 py-2 text-sm font-semibold text-[#203C94] dark:text-[#0891B2] border-b-2 border-[#203C94] dark:border-[#0891B2]">
                            Flights
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                            Hotels
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                            Cars
                          </button>
                        </div>
                      </div>

                      {/* Breadcrumbs */}
                      <div className="space-y-3">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Breadcrumbs</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="hover:text-[#203C94] dark:hover:text-[#0891B2] cursor-pointer transition-colors">Home</span>
                          <span className="material-icons-round text-[10px]">chevron_right</span>
                          <span className="hover:text-[#203C94] dark:hover:text-[#0891B2] cursor-pointer transition-colors">Hotels</span>
                          <span className="material-icons-round text-[10px]">chevron_right</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-200">Dubai</span>
                        </div>
                      </div>

                      {/* Pagination */}
                      <div className="space-y-3">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Pagination</p>
                        <div className="flex items-center gap-1">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                            <span className="material-icons-round text-sm">chevron_left</span>
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#203C94] dark:bg-[#0891B2] text-white text-sm font-medium shadow-sm">1</button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                            <span className="material-icons-round text-sm">chevron_right</span>
                          </button>
                        </div>
                      </div>

                      {/* Steps / Process */}
                      <div className="space-y-3">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Process Step</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#203C94] text-white text-xs font-bold">1</div>
                          <div className="h-0.5 w-12 bg-[#203C94]"></div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-500 text-xs font-bold">2</div>
                          <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700"></div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-500 text-xs font-bold">3</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Controls */}
                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">
                      Form Controls
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Search Input</p>
                        <div className="relative">
                          <span
                            className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 dark:text-slate-500 text-lg"
                            aria-hidden="true"
                          >
                            search
                          </span>
                          <input
                            type="text"
                            placeholder="Destination..."
                            readOnly
                            className="w-full pl-10 pr-3 h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#203C94]/20 dark:focus:ring-[#0891B2]/20 focus:border-[#203C94] dark:focus:border-[#0891B2] shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Dropdown / Select</p>
                        <div className="relative">
                          <button className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                            <span>2 Guests</span>
                            <span className="material-icons-round text-slate-400">expand_more</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 dark:text-stone-400">Checkbox & Switch</p>
                        <div className="flex items-center gap-4 h-10">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center">
                              <span className="material-icons-round text-[#203C94] dark:text-[#0891B2] text-sm font-bold">check</span>
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300">Option</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-5 rounded-full bg-[#203C94] dark:bg-[#0891B2] relative cursor-pointer">
                              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300">On</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-tokens</code> to update
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Step 2: Application Shell */}
        <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
          {!shell?.spec ? (
            <EmptyState type="shell" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Application Shell
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overview */}
                {shell.spec.overview && (
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {shell.spec.overview}
                  </p>
                )}

                {/* Navigation items */}
                {shell.spec.navigationItems.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                      Navigation
                    </h4>
                    <ul className="space-y-1">
                      {shell.spec.navigationItems.map((item, index) => {
                        // Parse markdown-style bold: **text** → <strong>text</strong>
                        const parts = item.split(/\*\*([^*]+)\*\*/)
                        return (
                          <li key={index} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                            {parts.map((part, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="font-semibold">{part}</strong>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* View Shell Design Link */}
                {shell.hasComponents && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    <Link
                      to="/shell/design"
                      className="flex items-center justify-between gap-4 py-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                          <Layout className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                          View Shell Design
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                    </Link>
                  </div>
                )}

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-shell</code> to update
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <StepIndicator step={3} status="current" isLast>
            <NextPhaseButton nextPhase="sections" />
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}

interface ColorSwatchProps {
  label: string
  colorName: string
}

function ColorSwatch({ label, colorName }: ColorSwatchProps) {
  // Accept either a Tailwind color key (mapped in `colorMap`) or a hex value like "#203C94".
  const colors = /^#/.test(colorName)
    ? { light: colorName, base: colorName, dark: colorName }
    : colorMap[colorName] || colorMap.stone

  return (
    <div>
      <div className="flex gap-0.5 mb-2">
        <div
          className="flex-1 h-14 rounded-l-md"
          style={{ backgroundColor: colors.light }}
          title={`${colorName}-300`}
        />
        <div
          className="flex-[2] h-14"
          style={{ backgroundColor: colors.base }}
          title={`${colorName}-500`}
        />
        <div
          className="flex-1 h-14 rounded-r-md"
          style={{ backgroundColor: colors.dark }}
          title={`${colorName}-600`}
        />
      </div>
      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{label}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{colorName}</p>
    </div>
  )
}

function renderTypographyValue(value: any) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return value.fontFamily || value.name || ''
  }
  return String(value)
}
