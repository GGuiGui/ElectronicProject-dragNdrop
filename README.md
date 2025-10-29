# ElectronicProject-dragNdrop
일렉트로닉을 통한 브라우저 드래그앤 드랍[맥OS 및 윈도우OS 빌드]

A. OS별 모듈 설치 명령어
   Windows
      1. `node_modules` 폴더 삭제:
         rmdir /s /q node_modules
      2. `package-lock.json` 파일 삭제:
         del package-lock.json
      3. 패키지 재설치:
         npm install

   macOS (및 Linux)
      1. `node_modules` 폴더와 `package-lock.json` 파일 삭제:
         rm -rf node_modules package-lock.json
      2. 패키지 재설치:
         npm install

B. 실행 명령어
   1. npm start

C. 빌드 명령어
   1. macOS( M시리즈 및 intel 혼용 )
      npm run build:mac
   2. windowsOS
      npm run build:win