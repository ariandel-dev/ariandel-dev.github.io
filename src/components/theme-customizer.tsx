"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ColorPreset {
  name: string;
  primary: string;
  background: string;
  foreground: string;
}

const colorPresets: ColorPreset[] = [
  {
    name: "기본",
    primary: "oklch(0.723 0.219 149.579)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.141 0.005 285.823)",
  },
  {
    name: "블루",
    primary: "oklch(0.5 0.2 240)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.141 0.005 285.823)",
  },
  {
    name: "퍼플",
    primary: "oklch(0.6 0.25 280)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.141 0.005 285.823)",
  },
  {
    name: "그린",
    primary: "oklch(0.65 0.2 120)",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.141 0.005 285.823)",
  },
];

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";
  
  const applyTheme = useCallback(
    (preset: ColorPreset) => {
      const root = document.documentElement;

      // 다크모드 상태에 따라 다른 색상 적용
      if (isDark) {
        // 다크모드용 색상
        root.style.setProperty("--primary", preset.primary);
        root.style.setProperty("--background", "oklch(0.141 0.005 285.823)");
        root.style.setProperty("--foreground", "oklch(0.985 0 0)");
        root.style.setProperty("--card", "oklch(0.21 0.006 285.885)");
        root.style.setProperty("--card-foreground", "oklch(0.985 0 0)");
        root.style.setProperty("--muted", "oklch(0.274 0.006 286.033)");
        root.style.setProperty("--muted-foreground", "oklch(0.705 0.015 286.067)");
        root.style.setProperty("--border", "oklch(1 0 0 / 10%)");
      } else {
        // 라이트모드용 색상
        root.style.setProperty("--primary", preset.primary);
        root.style.setProperty("--background", preset.background);
        root.style.setProperty("--foreground", preset.foreground);
        root.style.setProperty("--card", "oklch(1 0 0)");
        root.style.setProperty("--card-foreground", preset.foreground);
        root.style.setProperty("--muted", "oklch(0.967 0.001 286.375)");
        root.style.setProperty("--muted-foreground", "oklch(0.552 0.016 285.938)");
        root.style.setProperty("--border", "oklch(0.92 0.004 286.32)");
      }

      // 관련 색상들도 함께 업데이트
      root.style.setProperty("--ring", preset.primary);
      root.style.setProperty("--sidebar-primary", preset.primary);
    },
    [isDark]
  );

  // 마운트 후에만 렌더링 (hydration 문제 방지)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 변경 시 현재 색상 프리셋 다시 적용
  useEffect(() => {
    if (mounted) {
      const currentPrimary = document.documentElement.style.getPropertyValue("--primary");
      if (currentPrimary) {
        const currentPreset = colorPresets.find((p) => p.primary === currentPrimary);
        if (currentPreset) {
          applyTheme(currentPreset);
        }
      }
    }
  }, [resolvedTheme, mounted, applyTheme]);

  if (!mounted) {
    return (
      <div className="p-2 rounded-md bg-muted">
        <div className="w-4 h-4" />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-md bg-muted hover:bg-accent transition-colors" title="테마 설정">
          <Palette className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>테마 설정</DialogTitle>
        </DialogHeader>

        {/* 다크모드 토글 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">테마</span>
            <button
              onClick={() => {
                setTheme(resolvedTheme === "light" ? "dark" : "light");
              }}
              className="p-2 rounded-md bg-muted hover:bg-accent transition-colors"
              title={`현재: ${resolvedTheme === "dark" ? "다크" : "라이트"}`}
            >
              {resolvedTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{resolvedTheme === "dark" ? "다크 모드" : "라이트 모드"}</div>
        </div>

        {/* 프리셋 색상 */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">프리셋 색상</h4>
          <div className="grid grid-cols-2 gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  applyTheme(preset);
                  setOpen(false);
                }}
                className="p-3 text-sm border border-border rounded-md hover:bg-accent transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: preset.primary }} />
                  <span className="font-medium">{preset.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
