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

#### 스크린샷
<img width="1420" height="710" alt="스크린샷 2025-10-12 오후 3 22 23" src="https://github.com/user-attachments/assets/83004521-4d9d-4ba7-928f-b34004a82256" />

---

### 2. 📝 로그인 페이지
**경로**: `/signin`  
**컨셉**: 간편하고 안전한 로그인

#### 특징
- **실시간 폼 검증**: Zod + React Hook Form
- **에러 메시지 한글화**: 사용자 친화적인 에러 메시지
- **Google 소셜 로그인**: 클릭 한 번으로 간편 로그인
- **Toast 알림**: 로그인 상태를 시각적으로 표시

#### 스크린샷
<img width="1432" height="717" alt="스크린샷 2025-10-12 오후 3 23 01" src="https://github.com/user-attachments/assets/57e0e117-a553-44e4-86a6-ef272b592f6e" />

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

#### 스크린샷
<img width="1431" height="776" alt="스크린샷 2025-10-12 오후 3 24 15" src="https://github.com/user-attachments/assets/bf9ccb0c-5a2f-4fae-81c9-209ccd61f82e" />


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

#### 스크린샷
<img width="1426" height="718" alt="스크린샷 2025-10-12 오후 3 25 09" src="https://github.com/user-attachments/assets/9c2fcf33-b1b8-4e2f-b34a-6597b224713c" />


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
<img width="243" height="602" alt="스크린샷 2025-10-12 오후 3 14 44" src="https://github.com/user-attachments/assets/5a0e0402-5f0c-4ce5-b78c-1638098a0e9e" />

