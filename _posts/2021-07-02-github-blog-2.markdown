---
layout: post
title:  "📝 Github로 개발 블로그 개설하기 #2"
date:   2021-07-02
categories: Blog
comments: true
---
✨ 개발 블로그는 만들었지만 어떻게 꾸며야 할지 모르겠어!

<br/>
## 프롤로그
안녕하세요! 제로입니다.   
[저번 포스팅][github-blog-1]에서는 Github Pages를 생성해보고, Ruby와 jekyll을 설치해 블로그에 테마를 적용해보았습니다.   
이번 포스팅에선 테마의 내용을 수정해 온전히 '내 블로그'처럼 만들어보고, 글을 작성해보고, 작성된 글에 댓글을 달아 의견을 나눌 수 있게끔 하는 방법을 알려드리려 합니다 😁
<br/><br/>
## 목차
1. jekyll 테마 사용자화 
2. 글 작성하기
3. 댓글 기능 추가하기<br/>
<br/>

# 1. jekyll 테마 사용자화
![1](https://user-images.githubusercontent.com/52748335/124222304-7311d000-db3c-11eb-8db6-8b6db795d9ef.PNG)<br/>
jekyll에선 테마를 커스텀하기 위해 [_config.yml][jekyll-config] 파일을 제공합니다.
프로젝트 폴더에서 _config.yml 파일을 찾아서 들어가봅시다.
 <br/><br/>
![2](https://user-images.githubusercontent.com/52748335/124222692-32ff1d00-db3d-11eb-96f6-4bce5e44722a.PNG)<br/>

제 테마의 경우 이렇게 내용이 들어가 있었는데요, 주석으로 어디에 어떤 내용을 넣어야 하는지 친절하게 설명되어 있습니다. <br/>
```
title: 영의 시간
author: 6h15m
email: 6h15m.develop@gmail.com
description: >
  0년차 프론트엔드 개발자 성장기
show_excerpts: true
sass:
  sass_dir: _sass
plainwhite:
  name: 제로
  tagline: Front-end Developer ´◡`
  date_format: "%b %-d, %Y"
  sitemap: true
  search: true
  dark_mode: true
  portfolio_image: "assets/portfolio.png"
  html_lang: "ko"
  condensed_mobile:
    - page
    - post
  social_links:
    twitter: 20develop
    github:  6h15m
    facebook: 100007430927430
    email: 6h15m.devleop@gmail.com
theme: plainwhite

plugins:
  - jekyll-seo-tag
```
<br/>
제가 커스텀한 _config.xml을 참고하여 작성해보셔도 좋을 것 같습니다.<br/>
<br/>

# 2. 글 작성하기
![3](https://user-images.githubusercontent.com/52748335/124423203-a56f3780-dd9f-11eb-972b-28984628656b.PNG)<br/>
글은 **_posts**폴더에 `.md` 형태의 파일로 씁니다. 없으면 같은 이름으로 생성해주세요.   
.md 파일의 이름은 **yyyy-mm-dd-제목** 형태여야 합니다.   

글에 레이아웃과 제목, 카테고리, 날짜 등을 지정하기 위해 **머릿글 생성**이 필요한데요, 제 테마는 이미 생성되어 있는 양식이 있어 내용만 교체하였습니다. 없으신 분들은 해당 테마의 readme.md를 참고하여 작성하시면 될 것 같습니다.
```
---
layout: post
title:  "📝 Github로 개발 블로그 개설하기 #1"
date:   2021-06-28
categories: Blog
---
```

글 내용을 작성하기 위해선 **마크다운 문법**을 알아야 하는데, 이 부분은 [Kim Ji-Heon 님의 정리자료][ihoneymon-markdown]와 [위키독스 마크다운 설명서][wikidocs-markdown]를 참고하시면 좋을 것 같습니다. 저도 추후에 단독 포스팅으로 정리해볼 생각이지만요!   
~~알아두면 Github readme를 꾸밀 때 매우 유용합니다 😙~~   <br/>
<br/>

# 3. 댓글 기능 추가하기
처음엔 [disqus][disqus]를 활용하여 댓글 기능을 추가해보았으나, 댓글 기록이 날아갈 수도 있고 블로그 로딩 속도가 느려진다는 글을 보아서, [utterances][utterances]로 교체해보았습니다. disqus에 비해 나은 점은 **디자인이 깔끔**하고, **Github Issue에 자동으로 저장**된다는 것이 있었습니다. 만약 댓글이 많이 달린다면 속도 차이도 체감할 수 있을 것 같네요.

![7](https://user-images.githubusercontent.com/52748335/124427642-9d66c600-dda6-11eb-833f-c845aa0277c0.PNG)<br/>
Github apps에서 [utterances app][github-apps-utterances]을 찾아 블로그 레포지토리에 설치해줍니다.   
설치되면 [utterances][utterances] 페이지로 이동되는데, 이곳에서 Issue title의 매핑 방식과 label, 테마 등을 커스텀할 수 있습니다. 자신이 원하는 설정으로 커스텀해줍시다.   
저는 매핑 방식은 'Issue title contains page title', label은 설정하지 않았고 테마는 'Github Light'로 설정했습니다.

```html
<script src="https://utteranc.es/client.js" 
        repo="6h15m/6h15m.github.io" 
        issue-term="title" 
        theme="github-light"
        crossorigin="anonymous" 
        async>
</script>
```

이런 식으로 커스텀되어 나온 코드를 `_layouts` 폴더의 댓글을 넣고 싶은 레이아웃 파일에 포함시켜 주면 댓글 기능이 추가됩니다.   
저는 포스팅된 글에만 댓글 기능을 추가하고 싶어서, `post.html`에만 이렇게 추가해보았습니다.
![8](https://user-images.githubusercontent.com/52748335/124428938-36e2a780-dda8-11eb-875b-b470a069df6c.PNG)<br/>

댓글을 작성해볼까요?
![4](https://user-images.githubusercontent.com/52748335/124429177-81fcba80-dda8-11eb-8640-2963339895b9.PNG)<br/>

잘 작성되네요!
![5](https://user-images.githubusercontent.com/52748335/124429196-8923c880-dda8-11eb-9b33-fd1217a6c7a9.PNG)<br/>

이렇게 Github Issues에도 잘 추가되는 모습을 볼 수 있습니다.
![6](https://user-images.githubusercontent.com/52748335/124429271-9f318900-dda8-11eb-8def-da8e9c172141.PNG)<br/>
<br/>
## 다음 포스팅은
제가 생각해둔 내용은 모두 다룬 것 같아서 추가적인 커스텀(통계, 디자인 커스텀 등....)이 필요하다면 해볼 생각입니다. 추천하시는 커스텀 방향이 있으면 댓글로 남겨주세요! 

<br/>

[github-blog-1]: https://6h15m.github.io/blog/2021/06/28/github-blog.html
[jekyll-config]: https://jekyllrb.com/docs/configuration/ 
[ihoneymon-markdown]: https://gist.github.com/ihoneymon/652be052a0727ad59601
[wikidocs-markdown]: https://wikidocs.net/1678
[disqus]: https://disqus.com/
[utterances]: https://utteranc.es/
[github-apps-utterances]: https://github.com/apps/utterances
