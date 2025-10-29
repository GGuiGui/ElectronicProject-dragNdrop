# git 풀 리퀘스트 커밋 방법
임시 브랜치 명: 각 작업의 명칭
A. 임시 브랜치 생성
   git checkout -b CGB-pullRequest-Test
B. 수정 내용 임시 브랜치에 푸시
   git push origin CGB-pullRequest-Test
C. 풀 리퀘스트 후
   로컬 브랜치 삭제
   git branch -D CGB-pullRequest-Test
   1. 삭제된 원격 브랜치를 로컬에서도 목록에서 제거
      git fetch -p
   2. 브랜치 목록 리로드
      git branch -r
=> 변경되었는지 기입 -> 다시 상세하게 설명하면 이 임시 브랜치는 완료되고 소스를 합칠겁니다.

# git 풀 리퀘스트 워크 순서 정리
A. 작업자가 작업명에 해당하는 임시 브랜치를 생성하여 작업을 진행하며 커밋
B. 작업자가 모든 작업이 완료된 이후 push
            ***반복***
C. 관리자가 내용 확인이 수정 요청 내용 작업(pull Request)
D. 작업자가 수정 요청내용에 대하여 추가 작업 후 다시 push(커밋 내용이)
            ***반복***
E. 관리자 승인 후 마지막으로 내용 커밋 및 푸시하여 병합 진행
F. 다시 커밋했습니다.
G. 중간에 pull Request 대상이 변경될 경우 git rebase CGB[변경된 대상 브랜치임] 명령어로 원본 브랜치를 변경함
=> rebase가 실패할 경우에는
   1. git pull origin CGB
   2. git checkout CGB-pullRequest-Test2
   3. 이렇게 아예 브랜치를 다시 받아서 체크아웃하여 변경된 부분 수정 후 커밋할 것
   s


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
      npm run build:win sdsds