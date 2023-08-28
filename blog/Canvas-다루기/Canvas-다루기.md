---
slug: Canvas-다루기
title: Canvas를 이용해 그림 그리기
authors: [leeyoonsu]
tags: [react, konva, canvas]
keywords: [react, konva, canvas]
description: 리액트에서 Canvas를 다루는 라이브러리에 대해 설명합니다.
date: "2023-07-05"
---

# 그리기 기능 만들기

### Canvas API

웹페이지에서 그래픽을 그리기 위해 HTML의 canvas 엘리먼트와 자바스크립트를 사용할 수 있다.

기본적으로 2D 그래픽을 그릴 때 사용하며 (물론 WebGL을 통해 3d도 가능하다.)

canvas 요소에 이벤트 핸들러를 추가하여 사용자와 상호작용할 수 있다.

### Konva.js vs Fabric.js

이번 프로젝트를 진행하면서 , 펜으로 그리고 지우는 기능과 , 이미지 파일을 업로드하고 레이어링 하는 기능이 필요했다.

물론 canvas API를 통하여 모든 기능을 직접 구현할 수 있겠지만 , 이미 잘 나와있는 라이브러리를 사용하는것이 더 안전하고 효율적으로 프로그램을 개발할 수 있기에 라이브러리를 사용하기로 결정했다.

다음은 chatGPT가 말해준 두 라이브러리의 차이점이다.

:::info
**목적**

`Konva.js`: Konva.js는 주로 2D 그리기 및 애니메이션에 중점을 둡니다. 2D 그래픽과 도형을 만들고 조작할 수 있는 간단하고 강력한 API를 제공합니다.  
`Fabric.js`: 반면 Fabric.js는 2D 및 3D 렌더링을 모두 지원하는 더 풍부한 기능을 갖춘 라이브러리입니다. 복잡한 그래픽, 텍스트, 이미지 및 인터랙티브 요소로 작업할 수 있는 포괄적인 도구와 기능을 제공합니다.

:::

:::info
**렌더링 엔진**

`Konva.js`: Konva.js는 웹 페이지에서 그래픽을 렌더링하기 위해 HTML5 캔버스 API를 사용합니다. 캔버스 요소의 기능을 활용하여 2D 그래픽을 효율적으로 그리고 조작할 수 있습니다.  
`Fabric.js`: Fabric.js 역시 렌더링에 HTML5 캔버스 API를 사용하지만, SVG(확장 가능한 벡터 그래픽) 렌더러를 추가로 제공합니다. 따라서 개발자는 특정 요구 사항에 따라 캔버스 또는 SVG 중 하나를 선택할 수 있습니다.

:::

:::info
**객체 모델 및 조작**

`Konva.js`: Konva.js에는 레이어, 그룹 및 도형의 계층 구조를 기반으로 하는 간단한 개체 모델이 있습니다. 객체 조작, 변환 적용, 이벤트 처리에 대한 통합된 접근 방식을 제공합니다.  
`Fabric.js`: Fabric.js는 더 복잡하고 유연한 객체 모델로 더 다양한 기능을 지원합니다. 계층적 객체, 스태킹 순서, 그룹화, 클리핑 및 고급 객체 조작을 지원합니다.

:::

:::info
**애니메이션**

`Konva.js`: Konva.js에는 그래픽 요소의 애니메이션을 쉽게 만들고 제어할 수 있는 애니메이션 시스템이 내장되어 있습니다. 트위닝, 완화 및 프레임 기반 애니메이션과 같은 기능을 제공합니다.  
`Fabric.js`: Fabric.js도 애니메이션을 지원하지만 애니메이션 기능이 Konva.js만큼 광범위하지는 않습니다. 기본적인 애니메이션 메서드를 제공하지만 복잡한 애니메이션의 경우 더 많은 수동 제어 및 사용자 지정이 필요할 수 있습니다.

:::

:::info
**커뮤니티 및 문서**

`Konva.js`: Konva.js는 커뮤니티가 성장하고 있으며 개발이 활발합니다. 잘 문서화된 API가 있으며 개발자가 빠르게 시작할 수 있도록 예제와 튜토리얼을 제공합니다.  
`Fabric.js`: Fabric.js는 더 오랜 기간 동안 사용되어 왔으며 더 큰 커뮤니티와 광범위한 문서를 보유하고 있습니다. 학습 및 문제 해결을 위한 풍부한 예제, 데모, 리소스를 제공합니다.

:::

**요약하자면 …**

konva와 fabric 모두 내가 구현하려는 목적에 부합하기 때문에 어느쪽을 선택해도 상관 없었다! (사실 조금 다른 부분이 존재하긴 한다.)

### React에서의 Konva

react에서는 `konva`를 리액트용으로 래핑한 https://github.com/konvajs/react-konva 라이브러리가 존재한다.

konva 문서와 동일하게 구현할 수 있지만 리액트스럽게 컴포넌트식으로 구현할 수 있다.

만약 물체를 리사이징하려면 따로 transformer라는 구현체를 객체에 붙여서 따로 구현해야 한다.

![Untitled](Untitled.png)

```jsx
import { Stage, Layer, Rect } from "react-konva";

const SomeRect = () => {
  return <Rect x={20} y={20} width={50} height={50} fill="black" />;
};

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <SomeRect />
      </Layer>
    </Stage>
  );
};

export default App;
```

### React에서의 Fabric

react에서 `fabric`을 리액트용으로 래핑한 라이브러리가 존재는 하지만 , 타입스크립트 기반에서 오류가 발생한다.

따라서 react 위에서 fabric js를 직접 호출하여 사용할 수 있다.

또한 기본적으로 객체를 조절하는 transformer가 구현되어 있다.(konva에서는 따로 구현해야 한다.)

공식 문서가 굉장히 자세하게 되어있으므로 큰 어려움 없이 구현할 수 있다.( [http://fabricjs.com/](http://fabricjs.com/) )

![Untitled](Untitled%201.png)

```jsx
import { fabric } from "fabric";
import { useState, useEffect } from "react";

const App = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "gray",
    });

  useEffect(() => {
    const newCanvas = initCanvas();
    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose(); // 언마운트 될 때 캔버스를 지운다.
    };
  }, []);

  const addRect = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        width: 200,
        height: 200,
        fill: "yellow",
      });

      canvas.add(rect);
      canvas.renderAll();
    }
  };

  return (
    <div>
      <button onClick={addRect}>Add Rect</button>
      <canvas id="canvas" />
    </div>
  );
};

export default App;
```

### 그래서 무엇을 사용해야 하는가

두 방식으로 모두 구현해보았는데 다음과 같은 장단점이 존재했다.

`konva`가 나은점은 리액트용 라이브러리가 존재한다는 점이고

`fabric`은 기본적으로 transformer가 구현되어 있다는 점이 좋은 점이다.

이미 konva에서 transformer를 구현했지만 , 과정이 쉽지는 않았으므로 만약 다시 선택한다면 fabric으로 구현해볼 것 같다.
