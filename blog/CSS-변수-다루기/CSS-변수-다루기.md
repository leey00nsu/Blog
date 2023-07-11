---
slug: CSS-변수-다루기
title: 리액트에서 CSS 변수 다루기
authors: [leeyoonsu]
tags: [react, css]
date: "2023-07-02"
---

### 리액트에서 CSS 변수 다루기

현재 프로젝트에서 `Tailwind CSS`와 그를 베이스로한 컴포넌트 라이브러리인 `daisyUI`를 사용하고 있다.

또한 색깔을 고르는 기능이 필요하여 라이브러리인 `react-color`를 사용하기로 하였다.

여기서 이 라이브러리가 버튼과 같은 컴포넌트의 색깔을 지정할 때

—range-shdw 라는 **css 변수**를 이용하여 색을 지정해주고 있다.

하지만 현재 프로젝트에서는 `react-color`의 색깔에 맞게 컴포넌트의 색깔을 변경하고 싶었다.

따라서 hsl라는 state를 만들고 , `react-color`의 값이 바뀔때마다 state를 변경해주고 , —range-shdw에 인라인 스타일을 통하여 state 를 할당해주었다.

```jsx
style={ {"--range-shdw": hsl} as React.CSSProperties }
```

—range-shdw는 “0 0% 0%”와 같은 형식이므로 , `react-color`의 데이터를 맞게 포매팅해주면 된다.
