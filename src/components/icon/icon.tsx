import React, { type ComponentType, type ComponentProps } from 'react';
import * as S from './icon.styles';

export interface IconProps {
  icon: string | ComponentType<ComponentProps<'svg'>>;
  color?: string;
  size?: number;
  width?: number;
  height?: number;
  rotate?: number | 'spin' | boolean;
  className?: string;
  alt?: string;
}

const parseRotation = (
  rotateValue?: number | 'spin' | boolean,
): number | 'spin' => {
  if (rotateValue === 'spin') {
    return 'spin';
  }
  if (typeof rotateValue === 'number') {
    return rotateValue;
  }
  return rotateValue ? 180 : 0;
};

export const Icon = ({
  icon,
  color,
  size,
  width,
  height,
  rotate,
  className,
  alt,
}: Readonly<IconProps>) => {
  const rotationDegrees = parseRotation(rotate);
  const finalWidth = width ?? size ?? 24;
  const finalHeight = height ?? size ?? 24;
  const isStringIcon = typeof icon === 'string';
  const accessibilityRole = alt ? 'img' : undefined;
  const iconChildNode = alt ? React.createElement('title', null, alt) : null;
  const wrapperAriaHidden = alt ? undefined : 'true';

  return (
    <S.IconWrapper
      $color={color}
      $width={finalWidth}
      $height={finalHeight}
      $rotate={rotationDegrees}
      className={className}
      aria-hidden={wrapperAriaHidden}
    >
      {isStringIcon ? (
        <S.Image src={icon} alt={alt ?? 'icon'} />
      ) : (
        React.createElement(
          icon,
          {
            className: 'h-full w-full',
            role: accessibilityRole,
            'aria-label': alt,
          },
          iconChildNode,
        )
      )}
    </S.IconWrapper>
  );
};
