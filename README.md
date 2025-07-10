# 커튼 시뮬레이터

Next.js와 TypeScript로 개발된 커튼/블라인드 시뮬레이터입니다.

## 기능

- 🏠 사진 업로드 및 창 위치 선택
- 🪟 커튼 상태 조절 (열림/반개방/닫힘)
- 🎨 제품 및 색상 선택
- 💡 조명 조건 설정 (낮/흐림/밤)
- 📸 시뮬레이션 결과 JPG 저장
- 👨‍💼 관리자 기능 (제품/컬러 등록)

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 프로젝트 구조

```
커튼시뮬레이터/
├── components/           # React 컴포넌트
│   ├── admin/           # 관리자 컴포넌트
│   ├── simulator/       # 시뮬레이터 관련 컴포넌트
│   └── ...
├── pages/               # Next.js 페이지
├── data/                # 샘플 데이터
├── public/              # 정적 파일
│   └── samples/         # 샘플 이미지
└── utils/               # 유틸리티 함수
```

## 주요 페이지

- `/` - 홈페이지
- `/Simulator` - 커튼 시뮬레이터

## 샘플 이미지 추가

`public/samples/` 디렉토리에 다음 이미지들을 추가하세요:

- `room_sample.jpg` - 기본 방 배경
- `curtain1_open.png`, `curtain1_half.png`, `curtain1_closed.png`
- `curtain2_open.png`, `curtain2_half.png`, `curtain2_closed.png`
- `blind1_open.png`, `blind1_half.png`, `blind1_closed.png`

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: 인라인 스타일
- **Image Processing**: html2canvas
- **Build Tool**: Next.js

## 개발 가이드

### 컴포넌트 추가
새로운 컴포넌트는 `components/` 디렉토리에 추가하고 인라인 스타일을 사용하세요.

### 페이지 추가
새로운 페이지는 `pages/` 디렉토리에 추가하세요.

### 데이터 수정
샘플 데이터는 `data/` 디렉토리의 파일들을 수정하세요. 