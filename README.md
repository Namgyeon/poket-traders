# Poket Traders

> 포켓몬 카드 트레이너들을 위한 커뮤니티 기반 거래 플랫폼

포켓몬 카드 포켓을 좋아하는 사람들이 서로 필요한 카드를 교환하고 거래할 수 있는 커뮤니티 플랫폼입니다.

## 🌐 배포 URL

- **Production**: [https://poket-traders.vercel.app](https://poket-traders.vercel.app)

## ✨ 주요 기능

### 🎯 핵심 기능
- **거래 게시판**: 포켓몬 카드 교환/거래 게시글 작성 및 조회
- **실시간 검색**: 원하는 카드를 빠르게 찾을 수 있는 검색 기능
- **댓글 시스템**: 게시글에 대한 소통과 문의
- **친구 ID 연동**: 포켓몬 포켓 게임 내 친구 ID로 쉽게 연락

### 🔐 인증 시스템
- 이메일 기반 회원가입/로그인
- Google OAuth 소셜 로그인
- Firebase Authentication 활용

### 👤 사용자 관리
- 프로필 정보 수정 (닉네임, 친구 ID)
- 내가 작성한 거래글 관리
- 내가 작성한 댓글 히스토리

---

## 📱 페이지별 상세 설명

### 1. 🏠 메인 페이지 (거래 게시판)
**경로**: `/`  
**컨셉**: 포켓몬 카드 거래의 중심지

#### 특징
- **무한 스크롤**: Intersection Observer API를 활용한 자동 페이지네이션
- **실시간 검색**: 카드 이름으로 즉시 필터링
- **거래 카드 시각화**:
  - 🟢 **교환할 카드** (초록색 태그)
  - 🟠 **원하는 카드** (주황색 태그)
- **친구 ID 표시**: 클릭 한 번으로 복사 가능
- **내 게시글 하이라이트**: 자신의 게시글은 회색 배경으로 구분

#### 기술적 특징
- React Query의 `useInfiniteQuery`로 효율적인 데이터 페칭
- Optimistic Update로 빠른 UI 반응
- Skeleton UI로 로딩 상태 처리

---

### 2. 📝 로그인 페이지
**경로**: `/signin`  
**컨셉**: 간편하고 안전한 로그인

#### 특징
- **실시간 폼 검증**: Zod + React Hook Form
- **에러 메시지 한글화**: 사용자 친화적인 에러 메시지
- **Google 소셜 로그인**: 클릭 한 번으로 간편 로그인
- **Toast 알림**: 로그인 상태를 시각적으로 표시

---

### 3. 🎉 회원가입 페이지
**경로**: `/signup`  
**컨셉**: 필수 정보만 받는 빠른 가입

#### 특징
- **친구 ID 필수 입력**: 거래를 위한 필수 정보
- **비밀번호 확인**: 입력 실수 방지
- **패스워드 토글**: 👁️ 아이콘으로 비밀번호 확인 가능
- **실시간 검증**:
  - 이메일 형식 검증
  - 비밀번호 강도 체크 (최소 6자)
  - 비밀번호 일치 확인
  - 친구 ID 형식 검증 (16자리 숫자)


---

### 4. 👤 마이페이지
**경로**: `/mypage`  
**컨셉**: 내 활동을 한눈에

#### 특징
- **AuthGuard 보호**: 비로그인 시 자동 리다이렉트
- **SEO 최적화**: `robots: noindex` (개인정보 보호)
- **3가지 섹션**:
  1. **프로필 수정**: 닉네임, 친구 ID 업데이트
  2. **내 거래글**: 작성한 거래 게시글 목록
  3. **내 댓글**: 작성한 댓글 히스토리

#### 프로필 업데이트 기능
- 닉네임 변경
- 친구 ID 변경 (거래 필수 정보)
- 실시간 저장 및 Toast 알림

---

## 🏗️ 기술 스택

### Frontend Framework
- **Next.js 15.5.3** - App Router, Server Components
- **React 19.1.0** - 최신 React 기능 활용
- **TypeScript 5** - 타입 안정성

### 상태 관리 & 데이터 페칭
- **TanStack Query (React Query) 5** - 서버 상태 관리
- **React Hook Form 7** - 폼 상태 관리
- **Zod 4** - 스키마 검증

### 스타일링
- **Tailwind CSS 4** - 유틸리티 CSS
- **clsx** - 조건부 클래스명
- **HeadlessUI** - 접근성 있는 UI 컴포넌트
- **Heroicons** - 아이콘

### Backend & Database
- **Firebase 12** - Authentication, Firestore
- **Firestore** - NoSQL 실시간 데이터베이스

### UI/UX
- **Sonner** - 토스트 알림
- **React Loading Skeleton** - 스켈레톤 UI
- **React Intersection Observer** - 무한 스크롤

### 개발 도구
- **Vitest 3** - 단위 테스트
- **Storybook 9** - 컴포넌트 문서화
- **ESLint** - 코드 품질 관리

---

## 📂 프로젝트 구조


poket-traders/
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── (auth)/ # 인증 관련 페이지
│ │ │ ├── signin/ # 로그인
│ │ │ └── signup/ # 회원가입
│ │ ├── (mainBoard)/ # 메인 게시판
│ │ │ ├── mypage/ # 마이페이지
│ │ │ └── page.tsx # 메인 페이지
│ │ ├── layout.tsx # 루트 레이아웃
│ │ ├── sitemap.ts # SEO 사이트맵
│ │ └── robots.ts # 크롤링 규칙
│ ├── components/
│ │ ├── auth/ # 인증 컴포넌트
│ │ ├── mainBoard/ # 게시판 컴포넌트
│ │ ├── mypage/ # 마이페이지 컴포넌트
│ │ └── ui/ # 재사용 UI 컴포넌트
│ │ ├── Button/
│ │ ├── Input/
│ │ ├── Modal/
│ │ └── Skeleton/
│ ├── apis/ # API 레이어
│ │ ├── auth/ # 인증 API
│ │ ├── trades/ # 거래 API
│ │ └── user/ # 사용자 API
│ ├── hooks/ # Custom Hooks
│ │ ├── useAuth.ts # 인증 훅
│ │ ├── useModal.ts # 모달 훅
│ │ └── useInfiniteScroll.ts
│ ├── store/ # Redux Store
│ │ └── auth/
│ ├── lib/ # 유틸리티
│ │ ├── firebase.ts
│ │ └── utils/
│ └── test/ # 테스트 파일
│ ├── auth/
│ ├── comment/
│ └── mainBoard/
├── public/ # 정적 파일
│ ├── fonts/
│ └── images/
└── package.json
