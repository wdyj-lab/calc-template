import React from "react";
import styled from "styled-components";

import { setMargins } from "../../mixins/setMargins";
import { MarginProps } from "../../types/MarginProps";

import Icons, { IconInterface, getDedicatedSizeForIcon } from "./icons";

interface IconWrapperProps {
  width?: string;
  height?: string;
  color?: string;
}

const IconWrapper = styled.i<IconWrapperProps>`
  ${(props) => setMargins(props)};
  position: relative;
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};

  color: ${(props) => props.color};

  > svg {
    vertical-align: top;
  }

  > .icon-tooltip {
    display: none;
    font-style: normal;
  }

  &:hover > .icon-tooltip {
    display: block;
  }
`;

const IconElement = styled.svg<{ width?: string; height?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    MarginProps {
  width?: string;
  height?: string;
  svgWidth?: string;
  svgHeight?: string;
  name: keyof IconInterface;
  color?: string;
  title?: string;
  iconWidth?: number;
  iconHeight?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  offsetLeft?: number;
  offsetTop?: number;
}

const getIcon = (name: keyof IconInterface) => Icons[name];

/**
 * 아이콘을 렌더링합니다. 아이콘의 사이즈는 다음과 같이 적용됩니다.
 *
 * wrapper: width/height 우선 적용, 비어있을 경우 svgWidth/svgHeight 적용, 둘 다 비어있을 경우 viewBoxWidth/viewBoxHeight 적용
 *
 * SVG 엘리먼트: svgWidth/svgHeight 우선 적용, 비어있을 경우 width/height 적용, 둘 다 비어있을 경우 viewBoxWidth/viewBoxHeight 적용
 *
 * 아이콘: 무조건 offsetLeft/offsetTop/viewBoxWidth/viewBoxHeight 사용 (없을 경우 0 0 24 24가 기본값)
 *
 * @param width 아이콘의 wrapper의 너비입니다.
 * @param height 아이콘의 wrapper의 높이입니다.
 * @param svgWidth 아이콘 SVG의 너비입니다. SVG를 확대/축소하는 데 이용되는 값입니다.
 * @param svgHeight 아이콘 SVG의 높이입니다. SVG를 확대/축소하는 데 이용되는 값입니다.
 * @param viewBoxWidth 아이콘이 렌더링되는 viewBox의 너비입니다. SVG를 확대/축소하는 데 이용되는 값입니다. (alias: iconWidth. 둘 다 지정될 경우 viewBoxWidth가 적용됨)
 * @param viewBoxHeight 아이콘이 렌더링되는 viewBox의 높이입니다. SVG를 확대/축소하는 데 이용되는 값입니다. (alias: iconHeight. 둘 다 지정될 경우 viewBoxWidth가 적용됨)
 * @param offsetLeft 아이콘이 렌더링되는 viewBox의 수평 방향 오프셋입니다. 양수인 경우 아이콘이 왼쪽으로 당겨집니다.
 * @param offsetTop 아이콘이 렌더링되는 viewBox의 수직 방향 오프셋입니다. 양수인 경우 아이콘이 윗쪽으로 당겨집니다.
 */
const Icon: React.FunctionComponent<IconProps> = ({
  name,
  className,
  color,
  width,
  height,
  svgWidth,
  svgHeight,
  offsetLeft = 0,
  offsetTop = 0,
  iconWidth,
  iconHeight,
  viewBoxWidth = iconWidth,
  viewBoxHeight = iconHeight,
  children,
  ...restProps
}) => {
  const {
    viewBoxWidth: dedicatedWidth,
    viewBoxHeight: dedicatedHeight,
  } = getDedicatedSizeForIcon(name);

  const wrapperWidth =
    width || svgWidth || `${viewBoxWidth ?? dedicatedWidth}px`;
  const wrapperHeight =
    height || svgHeight || `${viewBoxHeight ?? dedicatedHeight}px`;
  const elementWidth =
    svgWidth || width || `${viewBoxWidth ?? dedicatedWidth}px`;
  const elementHeight =
    svgHeight || height || `${viewBoxHeight ?? dedicatedHeight}px`;

  return (
    <IconWrapper
      className={className}
      width={wrapperWidth}
      height={wrapperHeight}
      color={color}
      {...restProps}
    >
      <IconElement
        width={elementWidth}
        height={elementHeight}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${offsetLeft} ${offsetTop} ${
          viewBoxWidth ?? dedicatedWidth
        } ${viewBoxHeight ?? dedicatedHeight}`}
      >
        {children || getIcon(name)}
      </IconElement>
    </IconWrapper>
  );
};

export default Icon;
