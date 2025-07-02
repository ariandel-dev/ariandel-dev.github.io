# My Blog

Next.js로 구축된 개인 블로그입니다.

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **3D Graphics**: Three.js, React Three Fiber
- **Content**: MDX

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## GitHub Pages 배포

이 프로젝트는 GitHub Pages를 통해 자동으로 배포됩니다.

### 배포 설정

1. **GitHub 저장소 설정**
   - GitHub 저장소의 Settings > Pages로 이동
   - Source를 "GitHub Actions"로 설정

2. **자동 배포**
   - `main` 브랜치에 푸시하면 자동으로 배포됩니다
   - GitHub Actions 워크플로우가 빌드하고 배포를 처리합니다

### 수동 배포

```bash
# 프로덕션 빌드
pnpm run build

# 배포 (GitHub Actions가 자동으로 처리)
pnpm run deploy
```

### 배포 URL

배포가 완료되면 다음 URL에서 접근할 수 있습니다:
`https://[your-username].github.io/my-blog/`

## 프로젝트 구조

```
my-blog/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React 컴포넌트
│   ├── content/       # MDX 콘텐츠
│   ├── contexts/      # React Context
│   └── lib/          # 유틸리티 함수
├── public/           # 정적 파일
└── .github/          # GitHub Actions 워크플로우
```

## 주요 기능

- 📝 MDX 기반 블로그 포스트
- 🎨 다크/라이트 테마 지원
- 📱 반응형 디자인
- 🎮 3D 인터랙티브 요소
- 🔍 블로그 포스트 필터링
- 📏 텍스트 크기 커스터마이징

## 라이선스

MIT License 