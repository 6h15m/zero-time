---
layout: post
title:  "📝 Github로 개발 블로그 개설하기 #1"
date:   2021-06-28
categories: Blog
comments: true
---
✨ 개발은 못하지만 개발 블로그는 만들고 싶어!

<br/>
## 프롤로그
안녕하세요! '영의 시간' 블로그 운영자 제로입니다.   
그동안 티스토리를 이용해 개발 블로그를 운영해오다, 자유도 높게 커스텀할 수 있다는 깃허브 블로그의 장점에 반해 새롭게 개설해보게 되었습니다.   
첫 글에서는 Github 개발 블로그를 개설하고, 테마를 적용하는 방법을 알려드리려 합니다😊
<br/><br/>
## 목차
1. Github 블로그 사이트 만들기   
2. Ruby, jekyll 설치   
3. jekyll 테마 적용<br/>
<br/>

# 1. Github 블로그 사이트 만들기
![1](https://user-images.githubusercontent.com/52748335/123634195-1b7e1680-d855-11eb-8024-5753975ee141.PNG)
블로그 사이트를 생성하기 위해, [Github pages][github-pages] 기능을 이용해볼 것입니다.   
해당 사진처럼 [Github][github-main]에 새 레포지토리를 생성합니다.    
 Repository name은 <b>[Github 아이디].github.io</b> 로 해주세요. 이렇게 해야 Repository name과 같은 도메인으로 접속할 수 있습니다.
 <br/><br/>
 ![2](https://user-images.githubusercontent.com/52748335/123637165-ab718f80-d858-11eb-94ba-c3e21a6b3982.png)
 생성된 Repository의 Settings-Pages에 들어가보면 페이지가 잘 생성되었는지 확인할 수 있습니다.<br/>
<br/>

# 2. Ruby, jekyll 설치
## [jekyll][jekyll-main]이란?
 jekyll은 다양한 포맷의 텍스트 파일을 가공해서, 정적인 웹사이트로 만들어주는 Ruby 기반의 사이트 생성기입니다. markdown 문법을 지원하고, 블로그를 위한 다양한 테마가 존재하기 때문에 많이 사용되는 것 같아요. 자세한 내용을 알고 싶다면 [jekyll 문서][jekyll-docs]에 상세하게 설명되어 있으니 참고해 보세요!<br/><br/>
## 설치하기
 jekyll을 사용하기 위해 먼저 Ruby를 설치해 보겠습니다. [Ruby 다운로드 링크][ruby-downloads]를 참고하여 다운로드해 주세요. 저는 RubyInstaller [Ruby+Devkit 2.7.3-1 (x64)][ruby-download-direct] 버전을 이용하여 다운받았습니다.
<br/><br/>
![3](https://user-images.githubusercontent.com/52748335/123639839-892d4100-d85b-11eb-9a59-32849bfe8b73.PNG)<br/>
 cmd에 `ruby -v` 명령어를 입력하면 잘 설치되었는지 확인할 수 있습니다.
<br/><br/>
![4](https://user-images.githubusercontent.com/52748335/123641331-1f159b80-d85d-11eb-8d09-9a782d6d240f.PNG)<br/>
이어서 `gem install jekyll bundler` 를 입력해 jekyll과 [bundler][jekyll-bundler-docs] [젬][jekyll-gem-docs]을 설치해줍니다.<br/>
<br/>

# 3. jekyll 테마 적용
## 테마 선정
- [jamstackthemes.dev][jamstackthemes-dev]
- [jekyllthemes.org][jekyll-themes]
- [jekyllthemes.io][jekyll-themes-io](일부 유료)<br/>
  
이외에도 다양한 테마가 있는데, 잘 찾아본 후 가장 마음에 드는 테마를 골라주세요. 
저는 비교적 꾸준히 업데이트되고 있고, 디자인이 깔끔해보이는 [plainwhite][plainwhite] 테마를 사용하였습니다. 원래 다른 테마(persephone)을 사용하려 했는데 중국어로 구성되어 있어 알아보기 힘들었고, 현재의 테마로 교체하였습니다.
## 적용하기
![5](https://user-images.githubusercontent.com/52748335/123653761-6b1a0d80-d868-11eb-920a-3527031903d3.png)
원하는 테마를 Clone해서, 1단계에서 만들었던 자신의 repository에 가져옵니다. 전 ZIP 파일로 다운로드해 압축을 풀고 다시 제 프로젝트 폴더에 넣는 과정을 거쳤지만, 클론에는 다양한 방법이 있으니 다른 방법도 참고해 보시면 좋을 것 같습니다.
<br/><br/>
![6](https://user-images.githubusercontent.com/52748335/123654467-11fea980-d869-11eb-97c2-ea2f95b7b40b.PNG)<br/>
터미널에 `bundle exec jekyll serve` 라고 입력하면 저의 경우 에러가 났습니다. 이런 경우 터미널에서 알려주는 대로 `bundle install` 을 입력하고, 다시 `bundle exec jekyll serve` 를 해주면 해결되었습니다. 

### 에러 발생 사례
종종 본인이 세팅한 jekyll의 버전이 다운받은 테마의 jekyll 버전과 달라서 에러가 발생하기도 합니다. 그럴 땐 Gemfile.lock 파일을 삭제하고, `bundle install` 을 입력하면 다시 Gemfile.lock을 만들며 테마가 적용된 사이트의 jekyll 버전이 변경됩니다.

세팅된 jekyll 버전을 바꾸고 싶다면 `gem install bundler -v [설치할 버전]` 으로 바꿀 버전을 설치해주고, `gem uninstall bundler -v [삭제할 버전]` 으로 기존 버전을 삭제해주면 됩니다.

### 접속
![7](https://user-images.githubusercontent.com/52748335/123655881-5e96b480-d86a-11eb-8983-4d50ee677483.PNG)<br/>
잘 따라오셨다면 http://localhost:4000으로 접속했을 시, 테마의 기본적인 레이아웃이 보일 것입니다. 

만약 <b>index of /</b> 같은 엉뚱한 페이지가 보인다면, _layouts 폴더에서 main으로 사용하고 싶은 레이아웃을 가져와 프로젝트 폴더에 index.md를 만들어줘야 합니다. 예시를 보여드리겠습니다.
```
---
layout: home
---
```
<br/>
## 다음 포스팅은
jekyll 테마를 사용자화하는 방법, 글을 작성하는 방법(마크다운 문법은 다루지 않을 예정입니다)과 댓글 기능을 추가하는 방법에 대해 다룰 예정입니다.

감사합니다! 😚

<br/>

[github-main]: https://github.com
[github-pages]: https://pages.github.com
[jekyll-main]: https://jekyllrb-ko.github.io/
[jekyll-docs]: https://jekyllrb-ko.github.io/docs
[jekyll-bundler-docs]: https://jekyllrb-ko.github.io/docs/ruby-101/#bundler
[jekyll-gem-docs]: https://jekyllrb-ko.github.io/docs/ruby-101/#gems
[jamstackthemes-dev]: https://jamstackthemes.dev/ssg/jekyll/
[jekyll-themes]: http://jekyllthemes.org/
[jekyll-themes-io]: https://jekyllthemes.io/
[plainwhite]: https://github.com/samarsault/plainwhite-jekyll
[ruby-downloads]: https://www.ruby-lang.org/ko/downloads/
[ruby-download-direct]: https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.7.3-1/rubyinstaller-devkit-2.7.3-1-x64.exe