# App Router 기반의 Next.JS (v15.0.0-rc.0)
> **page router에 대해서는 [여기](https://github.com/ahngh0113/onebite-next-challenge-with-page-router/blob/main/README.md)를 참고해 주세요.**

# 목차
1. [리액트 서버 컴포넌트](#리액트-서버-컴포넌트react-server-component)

# 리액트 서버 컴포넌트(react server component)
서버에서만 동작하는 react component / 사용자와 상호작용을 안하는 react component
page router의 방식에서의 JS bundle에서는 모든 react를 가지고 보내주어서 굳이 안불러도 되는 파일이 있어 용량이거 커져 TTI가 느려지는 현상을 초래했다. 하지만 서버 컴포넌트가 생기면서 이러한 문제점을 개선하여 TTI가 더 빠르게 되었다.

예를 들어 `useState()`나 `useRef()`같은 사용자와 상호작용하는 것이 아닌 그냥 `View`만 담당하는 컴포넌트는 서버에서 이미 사전 렌더링 되는데 이것을 또 하이드레이션을 위해 불러오는 것은 리소스 낭비이다. 이것을 방지하고자 서버 컴포넌트라는 매커니즘이 탄생한것이다.

서버 컴포넌트는 서버쪽에서만 필요한 컴포넌트로 `useState()`나 `useRef()`같은 hook이 필요없이 `View`만 담당하는 컴포넌트를 뜻한다. 
서버 컴포넌트는 사전 렌더링에서 1번 실행되고, 클라이언트 컴포넌트는 사전 렌더링 때 1번, 하이드레이션을 위해 1번, 총 2번 실행된다. 그래서 되도록 서버 컴포넌트를 사용하는 것이 성능에 좋다.
(* 컴포넌트의 default는 서버 컴포넌트이다.)
page router방식에서의 컴포넌트는 모두 클라이언트 컴포넌트로 인지하여 2번 실행된다.