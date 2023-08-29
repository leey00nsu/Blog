---
slug: nivo-chart-사용기
title: nivo chart 사용기
authors: [leeyoonsu]
tags: [react, nivo, artfolio, chart, graph]
keywords: [react, nivo, artfolio, chart, graph]
description: nivo 라이브러리를 사용하여 차트를 그리는 방법에 대해 설명합니다.
date: "2023-08-07"
---

## nivo chart 사용기

| ![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/be89d400-0be0-4dbe-8440-a5f4209b1c12) | ![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/f6292ce9-4fad-4bd1-9ed5-42ad3b57f7a8) |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

`artfolio` 프로젝트를 진행하면서 위와 같이 `실시간 경매가`와 , `태그`를 표시할 그래프를 구현해야 했습니다.

제 기준에서 **커스터마이징이 잘 되며 문서가 자세한 라이브러리**를 고르다 `nivo`를 선택하였습니다.

### nivo?

[nivo 문서](https://nivo.rocks/)에서는 다음과 같이 라이브러리를 소개하고 있습니다.

> [nivo](https://github.com/plouc/nivo) provides supercharged React components to easily build dataviz apps, it's built on top of d3.
>
> Several libraries already exist for React d3 integration, but just a few provide server side rendering ability and fully declarative charts.

설명에 의하면 nivo는 `D3` 이라는 데이터기반 시각화 라이브러리를 이용하여 리액트에서 쉽게 사용할 수 있도록 만든 리액트 라이브러리입니다.

### 라인 차트 만들기

실시간 경매가는 `라인 차트`로 그려져야 하므로 , nivo의 Line 항목을 살펴보겠습니다.

![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/718d6ec2-bf73-4aeb-b195-17f3edd3219f)

좌측에는 실시간으로 커스터마이징 할 수 있게 되어있으며 , 오른쪽에 차트의 모습과 코드를 살펴볼 수 있습니다.

라인 차트를 그리려면 `ResponsiveLine` 컴포넌트가 필요하므로 `@nivo/line` 을 설치해주어야 합니다.

그 후 제공되는 코드를 넣으면 다음과 같은 `svg` 가 그려집니다.

![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/36bbbaeb-ad40-4cef-a47f-f538f08f3e6e)

기본적으로 `data` 에 할당되는 데이터셋에 의하여 차트가 자동적으로 그려지게 됩니다.

하지만 제가 구현할 실시간 경매가 차트는 x축에는 시간 , y축에는 가격이 표시되므로 데이터를 변경해야 합니다.

현재 더미데이터는 다음과 같이 구성되어 있습니다.

```jsx
const chartData = [
  {
    id: "japan",
    color: "hsl(148, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 248,
      },
      {
        x: "helicopter",
        y: 293,
      },
      {
        x: "boat",
        y: 151,
      },
      {
        x: "train",
        y: 55,
      },
      {
        x: "subway",
        y: 282,
      },
      {
        x: "bus",
        y: 90,
      },
      {
        x: "car",
        y: 225,
      },
      {
        x: "moto",
        y: 85,
      },
      {
        x: "bicycle",
        y: 68,
      },
      {
        x: "horse",
        y: 153,
      },
      {
        x: "skateboard",
        y: 240,
      },
      {
        x: "others",
        y: 298,
      },
    ],
  },
];
```

변경할 데이터에는 x축에 시간이 할당 될 것이므로 다음과 같이 바꿀 수 있습니다.

```jsx
const chartData = [
  {
    id: "price",
    color: "hsl(148, 70%, 50%)",
    data: [
      {
        x: new Date("2023-08-04 13:00"),
        y: 1000,
      },
      {
        x: new Date("2023-08-05 13:00"),
        y: 1100,
      },
      {
        x: new Date("2023-08-06 13:00"),
        y: 1500,
      },
      {
        x: new Date("2023-08-07 13:00"),
        y: 2000,
      },
    ],
  },
];
```

이제 축(axis)을 담당하는 `xScale`과 `axisBottom`을 수정해야 합니다.

시간을 데이터로 하였을때는 xScale에서 type을 time으로 지정해주는 방법이 존재하지만 ,

**이 경우 중간값이 자동적으로 계산되어 데이터의 포인트를 정확하게 정해주기 힘들기 때문에** , point로 지정한 후

axisBottom에서 format을 이용해 , 시간을 `intl`을 이용해 보기좋게 포매팅하여 표시해주도록 하는 방식을 택했습니다.

또한 차트 그라디언트 색이 x축을 넘어서 표시되는데 , **이는** `areaBaselineValue`**의 값을 데이터 y의 최소값으로 지정해주어야 넘치지 않고 표시되게 됩니다.**

최종 이미지와 코드는 다음과 같습니다.

![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/6e0587e8-0c07-4b7a-9343-73d7f5a5e274)

```jsx
const LineChart = () => {
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (tick) =>
          new Intl.DateTimeFormat("ko", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(tick),
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaBaselineValue={chartData[0].data[0].y}
      isInteractive={false}
      useMesh={true}
    />
  );
};
```

### 파이 차트 만들기

이제 그림의 태그를 표시할 `파이 차트`를 만들어보겠습니다.

라인 차트와 유사하게 , 파이 차트를 그리려면 `ResponsivePie` 컴포넌트가 필요하므로 `@nivo/pie` 를 설치합니다.

그 후 제공되는 코드를 넣으면 다음과 같은 파이 차트가 그려집니다.

![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/5a40bf85-2ef0-41f7-b53c-c4367a918529)

기본적으로 `data` 에 할당되는 데이터셋에 의하여 차트가 자동적으로 그려지게 됩니다.

제가 구현할 태그 차트와 유사하지만 `value`와 `label`이 숫자가 밖으로 나오게 반대로 표시되어야 합니다.

따라서 수정해보도록 하겠습니다.

파이 안쪽의 글자는 `arcLabel`에 해당하는데 , 여기에 `id`를 할당합니다.

파이 바깥의 글자는 `arcLinkLabel`에 해당하는데 , 여기에는 `value`를 할당해줍니다.

이때 value에 %를 붙여서 표시하고 싶으므로 , `${d.value}%` 와 같이 표시해줍니다.

최종 이미지와 코드는 다음과 같습니다.

![image](https://github.com/leey00nsu/ArtFolio-FE/assets/101182523/2bca8af6-80dd-4d43-9704-05d11aef282e)

```jsx
const PieChart = () => {
  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLabel="id"
      arcLinkLabel={(d) => `${d.value}%`}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      isInteractive={false}
    />
  );
};
```

### 결론

리액트 환경에서 nivo를 사용하면 데이터를 쉽게 시각화할 수 있어 유용하게 사용할 수 있었습니다.

다양한 차트 라이브러리가 있지만 nivo를 사용하며 아직까지 다른 라이브러리를 사용해야할 이유를 느끼지 못하였기에 차트가 필요하면 앞으로도 nivo를 적극적으로 활용할 것 같습니다.
