---
name: 토스
slug: toss
category: finance
last_updated: "2026-08-22"
created_at: "2026-05-11"
lang: ko
logo: https://getdesign.kr/logos/toss.png
colors:
  fill-brand: "{colors.blue-500}"
  fill-primary: "{colors.grey-900}"
  fill-secondary: "{colors.grey-100}"
  fill-weak: "{colors.grey-50}"
  fill-danger: "{colors.red-500}"
  fill-success: "{colors.green-500}"
  fill-warning: "{colors.orange-500}"
  text-primary: "{colors.grey-900}"
  text-secondary: "{colors.grey-700}"
  text-tertiary: "{colors.fg-tertiary}"
  text-placeholder: "{colors.fg-quaternary}"
  text-alt: "{colors.white}"
  text-brand: "{colors.blue-500}"
  text-danger: "{colors.red-500}"
  border-primary: "{colors.blue-500}"   # focused input
  border-secondary: "{colors.grey-200}"   # default divider
  border-strong: "{colors.grey-400}"
  border-subtle: "{colors.line-subtle}"
  overlay-scrim: "{colors.bg-overlay}"
  overlay-press: "{colors.press-overlay}"
  tds-fg-primary: "{colors.text-primary}"   # grey-900
  tds-fg-secondary: "{colors.text-secondary}"   # grey-700
  tds-fg-tertiary: "{colors.fg-tertiary}"   # navy-900 @ 58%
  tds-fg-quaternary: "{colors.fg-quaternary}"   # navy-900 @ 28%
  tds-fg-disabled: "{colors.grey-400}"
  tds-fg-inverse: "{colors.text-alt}"   # white
  tds-fg-brand: "{colors.text-brand}"
  tds-fg-danger: "{colors.text-danger}"
  tds-fg-success: "{colors.green-500}"
  tds-bg-primary: "{colors.white}"
  tds-bg-secondary: "{colors.fill-secondary}"   # grey-100
  tds-bg-tertiary: "{colors.grey-200}"
  tds-bg-elevated: "{colors.white}"
  tds-bg-overlay: "{colors.overlay-scrim}"
  tds-bg-brand: "{colors.fill-brand}"
  tds-bg-brand-weak: "{colors.blue-50}"
  tds-bg-danger: "{colors.fill-danger}"
  tds-line-default: "{colors.border-secondary}"   # grey-200
  tds-line-subtle: "{colors.border-subtle}"
  tds-line-strong: "{colors.border-strong}"   # grey-400
  tds-press-overlay: "{colors.overlay-press}"   # 검정 26%
  ## Brand
  blue-500: oklch(0.624 0.176 254)   # 카노니컬 Toss Blue, 화면당 하나의 primary CTA
  blue-600: oklch(0.522 0.176 257)   # pressed-blue 단계
  blue-700: oklch(0.476 0.174 259)   # pressed gradient stop
  blue-50: oklch(0.965 0.020 250)   # brand-weak background
  ## Greyscale
  grey-900: oklch(0.234 0.030 254)   # primary text, never pure black
  grey-800: oklch(0.342 0.030 253)
  grey-700: oklch(0.452 0.028 253)   # secondary text
  grey-600: oklch(0.555 0.022 253)
  grey-500: oklch(0.652 0.020 252)
  grey-400: oklch(0.752 0.016 251)   # disabled text, strong line
  grey-300: oklch(0.840 0.012 248)
  grey-200: oklch(0.913 0.008 247)   # default divider/border
  grey-150: oklch(0.918 0.007 247)
  grey-100: oklch(0.957 0.005 247)   # secondary surface
  grey-50: oklch(0.978 0.003 247)
  white: oklch(1.000 0.000 0)
  ## Toss yellow & orange
  yellow-500: oklch(0.853 0.156 86)   # illustration / emoji body
  yellow-400: oklch(0.893 0.123 85)
  yellow-300: oklch(0.901 0.124 84)
  yellow-600: oklch(0.840 0.171 87)
  yellow-700: oklch(0.872 0.169 87)
  orange-500: oklch(0.748 0.183 56)   # semantic warning
  orange-400: oklch(0.828 0.108 52)
  orange-300: oklch(0.870 0.078 51)
  ## Semantic palette
  red-500: oklch(0.628 0.218 22)   # error / danger
  red-600: oklch(0.626 0.216 22)
  green-500: oklch(0.493 0.143 154)   # success
  navy-900: oklch(0.155 0.060 261)   # text-shadow base, source of overlay rgba
  ## Illustration warms
  brown-900: oklch(0.359 0.083 39)
  brown-700: oklch(0.444 0.062 30)
  brown-500: oklch(0.535 0.073 39)
  brown-400: oklch(0.659 0.097 41)
  ## Semantic alpha tokens
  fg-tertiary: oklch(0.155 0.060 261 / 0.58)   # 흐린 본문 텍스트
  fg-quaternary: oklch(0.155 0.060 261 / 0.28)   # placeholder
  line-subtle: oklch(0.000 0.000 0 / 0.08)   # 그레이 배경 위 카드 보더
  bg-overlay: oklch(0.000 0.000 0 / 0.56)   # bottom-sheet scrim
  press-overlay: oklch(0.000 0.000 0 / 0.26)   # 보편 pressed-state tint
typography:
  display-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.005em
  display-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.020em
  h1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.020em
  h3:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: -0.015em
  h4:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.015em
  title-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  title-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.010em
  body-1:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-2:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.005em
  body-3:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0em
  label-l:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-m:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  label-s:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  caption:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
  caption-s:
    fontFamily: "\"Pretendard Variable\", Pretendard, -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.40
    letterSpacing: 0em
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-7: 28px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  space-20: 80px
rounded:
  radius-xs: 4px   # small badges
  radius-s: 8px   # inline tags
  radius-m: 12px   # text inputs
  radius-l: 14px   # L button (48px)
  radius-xl: 16px   # XL button (56px), cards
  radius-2xl: 20px   # sheets, dialogs
  radius-3xl: 24px   # big cards / sections
  radius-4xl: 32px   # hero blocks
  radius-full: 999px   # chips, pills, capsules
opacity:
  disabled-opacity: 0.30   # 컴포넌트 전체 노드에 적용
  tds-disabled-opacity: 0.30
fonts:
  font-family-emoji: "Tossface"
---

# 토스 (Toss) — design.md

> 비바리퍼블리카가 운영하는 한국 최대 핀테크 슈퍼앱.
