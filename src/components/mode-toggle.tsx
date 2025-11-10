import React, { useCallback, useMemo } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const prefersDark = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  }, [])

  const isDarkActive = useMemo(() => {
    if (theme === "dark") return true
    if (theme === "light") return false
    return prefersDark
  }, [theme, prefersDark])

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Toggle between dark and light only (no dropdown). If currently system, treat as dark if prefersDark true
    setTheme(isDarkActive ? "light" : "dark")
  }, [isDarkActive, setTheme])

  return (
    <Button
      onClick={handleToggle}
      aria-pressed={isDarkActive}
      title={isDarkActive ? "Switch to light mode" : "Switch to dark mode"}
      className="glass-effect w-10 h-10 rounded-full flex items-center justify-center"
    >
      <Sun className={`transition-transform duration-300 ${isDarkActive ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
      <Moon className={`absolute transition-transform duration-300 ${isDarkActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}