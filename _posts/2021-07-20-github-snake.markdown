---
layout: post
title: "🐍 Github 프로필에 잔디 먹는 뱀 추가하기"
date: 2021-07-20
categories: Github README
comments: true
---

👀 2분의 투자로, 역동적이고 재밌게 깃허브 꾸미기

<br/>
## 프롤로그
안녕하세요! 제로입니다.
[찬성 님의 facebook 포스팅][facebook-posting]을 보고 너무 신기해서 따라해보게 된 Github Action을 소개해 드릴게요.

![github-contribution-grid-snake](https://user-images.githubusercontent.com/52748335/125471173-30203e61-5705-43f9-9a85-afa9d643d45a.gif)

이번 포스팅에선, 저와 같이 Github README 꾸미기에 진심인 분들을 위해 커밋 내역을 먹는 뱀🐍을 추가하는 방법을 알려드리겠습니다!

[데모 확인하기][demo-site]  
[GitHub 확인하기][github-snk]
<br/><br/>

## 목차

1. Github 프로필 README 생성
2. Github Actions 추가
3. README 수정<br/>
   <br/>

# 1. Github 프로필 README 생성

[Github][github-main]에 **Github 아이디**와 동일한 이름의 새 레포지토리를 생성합니다.
생성 이전에 **Add a README file** 속성을 체크해 주세요.  
생성해서 해당 레포지토리에 들어가 보면, 이런 안내문이 보입니다.
<br/><br/>
![special](https://user-images.githubusercontent.com/52748335/126091043-b18d702d-e01b-4a2b-9c5a-604c719de423.PNG)<br/>

Github 아이디를 이름으로 한 레포지토리는 특별한 레포지토리여서, 이 레포지토리의 README.md는
깃허브 프로필에서 보입니다. 이렇게요!<br/><br/>
![기존 리드미](https://user-images.githubusercontent.com/52748335/126091437-80f02fb3-8545-43e1-87ac-2ae6ee744561.PNG)
<br/>

Github 블로그를 썼던 것처럼 마크다운 문법을 쓰면 저처럼 다양하게 꾸며볼 수 있습니다. Google에 **Github 프로필 꾸미기**로 검색하시면 방법을 많이 찾아볼 수 있습니다! 😁<br/>
<br/>

# 2. Github Actions 추가

## Github Actions란?

본격적으로 뱀 GIF를 생성하기 위해 프로필 레포지토리에 Github Actions를 추가해야 합니다.
[Github Actions][github-actions]는 Github 이벤트를 기반으로 소프트웨어 workflow를 자동화할 수 있도록 하는 도구입니다. 더 자세히 알고 싶다면 [공식 문서][github-actions-docs]를 참고해 주세요.  
여기에선 특정 시간마다 자신의 커밋 내역에 맞게 GIF를 새로 생성하기 위해 사용합니다.<br/><br/>
![yml 추가](https://user-images.githubusercontent.com/52748335/126317621-76ce7c5c-c4a2-45ca-a9dd-b5188b36d73c.PNG)<br/>
위와 같이 `.github` 디렉토리를 만들고, 그 안에 `workflows` 디렉토리를 만들어주세요.
`workflows` 안에 `snake.yml`을 생성 후, 해당 내용을 작성해주세요.

```
# 커밋 먹는 뱀 그래프 생성을 위한 GitHub Action🐍

name: Generate Snake

# Action이 언제 구동될지 결정

on:
  schedule:
    # 6시간마다 한 번(수정 가능)
    - cron: "0 */6 * * *"

  # 자동으로 Action이 실행되도록 함
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # 뱀 생성
      - uses: Platane/snk@master
        id: snake-gif
        with:
          github_user_name: [Github 아이디]
          # output branch에 gif, svg를 각각 생성
          gif_out_path: dist/github-contribution-grid-snake.gif
          svg_out_path: dist/github-contribution-grid-snake.svg

      - run: git status

      # 변경사항 push
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: master
          force: true

      - uses: crazy-max/ghaction-github-pages@v2.1.3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

<br/>
`github_user_name` 을 수정하시고, `schedule` 을 원하는 주기대로 설정 후 커밋해주세요.  
<br/>
다시 Github 레포지토리로 돌아와서, **Actions** 탭에 생성된 Workflow **Generate Snake**를 확인하세요! <br/><br/>
![github actions](https://user-images.githubusercontent.com/52748335/126319031-eba35657-dfc2-4936-9a6d-bb0da9ccc385.PNG)<br/>

`Run workflow` 를 선택해 실행해줍니다.<br/><br/>
![run](https://user-images.githubusercontent.com/52748335/126319154-b4b6a0b4-e3fc-481e-95e7-fca8939263d5.PNG)<br/>

Actions 탭에서 실행이 잘 된 것을 확인할 수 있습니다.<br/><br/>
![실행 완료](https://user-images.githubusercontent.com/52748335/126319484-f92f88f6-2eaa-42a3-b1a4-d78a5b1aa945.PNG)
<br/>
<br/>

# 3. README 수정

이제 생성된 GIF 또는 SVG를 `README.md`에 추가해주는 일만 남았는데요,  
GIF 파일은 흰색 배경이어서 Default light 테마에 어울리고, <br/>

![github-contribution-grid-snake](https://user-images.githubusercontent.com/52748335/126324403-01747446-9a5d-410c-8bb5-96ca13e8a017.gif)<br/>

SVG 파일은 배경이 없고 색이 조금 더 어두운 편이라 Dark high contrast 테마에 어울리는 것 같습니다. 원하는 대로 자유롭게 사용하시면 됩니다! 나중에 색상 커스텀 기능도 추가되면 좋을 것 같네요 ☺ <br/>
![snake gif](https://raw.githubusercontent.com/6h15m/6h15m/output/github-contribution-grid-snake.svg)<br/>
<br/>

```
![snake gif](https://github.com/[GitHub 아이디]/[GitHub 아이디]/blob/output/github-contribution-grid-snake.svg)
```

**GitHub 아이디 수정 후** 해당 코드를 README.md의 원하는 부분에 추가해 주시면 됩니다. GIF 파일로 하고 싶으시면 파일 확장자만 gif로 변경해주세요!
<br/>

![readme 추가](https://user-images.githubusercontent.com/52748335/126319766-dd6587fe-4b85-4dae-aa54-955b6525f30f.PNG)<br/>

완성된 모습입니다 😊<br/>

![완성](https://user-images.githubusercontent.com/52748335/126325009-491bfa72-fe43-4752-a249-93ed82bc621f.PNG)<br/>
<br/>

## 참고한 문서

- [How to enable GitHub Actions on your Profile README for a snake-eating contribution graph 🐍][reference]

[facebook-posting]: https://www.facebook.com/Thomas.CS.Park/posts/10221387355058694
[demo-site]: https://platane.github.io/snk/
[github-snk]: https://github.com/Platane/snk
[github-actions]: https://github.com/features/actions
[github-actions-docs]: https://docs.github.com/en/actions/learn-github-actions
[reference]: https://dev.to/mishmanners/how-to-enable-github-actions-on-your-profile-readme-for-a-contribution-graph-4l66?fbclid=iwar2bgcj9b_0owzs_zr5e45y1nbir-9768lyzt1y5a7e4rd4dwwrtauuliss
