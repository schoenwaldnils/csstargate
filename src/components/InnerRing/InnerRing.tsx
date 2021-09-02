import { css } from '@emotion/react'
import styled from '@emotion/styled'
import btoa from 'btoa'
import { FC } from 'react'

import { stargate } from '../../data/colors'
import { center } from '../../utils/mixins'
import { OuterRing } from '../OuterRing'

// $stargate_size: 45rem;
// $stargate_inner_ring_size: 33.3rem;
// $stargate_horizon_size: $stargate_inner_ring_size;
// $shevron_n: 9;
// $shevron_angle: 360deg / $shevron_n;
// $chevron_transition: 150ms;
// $chevron_lock_transition: 200ms;
// $screws_n: 6;
// $screws_radius: 22.0275rem;
// $screws_size: .27rem;
// $screws_shadow: ();
// $screws_spaces: (
//   11deg,
//   13deg,
//   19deg,
//   25deg,
//   28deg,
//   30deg,
// );
// $symboles_n: 39;
// $symboles_angle: 360deg / $symboles_n;
// $symboles_size_outer: 40.316rem;
// $symboles_height: 2.55rem;
const inner_engravings_n = 480
const triangles_n = 145

const InnerRingContainer = styled.div`
  --innerSize: calc(var(--size, 45rem) * 0.74);
  position: relative;

  width: var(--innerSize);
  height: var(--innerSize);
  border-radius: 50%;
  box-shadow: 0 0 0 1.0125rem ${stargate.gateMetal},
    0 0 0.25rem 1.0125rem rgba(0, 0, 0, 0.5);
`

const EngravingLine = styled.div<{ engravingKey: number }>`
  --angleSingle: ${360 / inner_engravings_n}deg;
  --angle: calc(var(--angleSingle) * ${(p) => p.engravingKey});

  ${center}

  width: 0.12rem;
  height: 0.34rem;
  background-color: ${stargate.engraving};
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-17.4375rem);

  &:nth-of-type(13n + 1),
  &:nth-of-type(9n + 1) {
    height: 0.12rem;
    margin-top: 0.12rem * -0.5;
  }
`

const Triangle = styled.div<{ triangleKey: number }>`
  --angleSingle: ${360 / triangles_n}deg;
  --angle: calc(var(--angleSingle) * ${(p) => p.triangleKey});

  ${center}

  width: 0;
  height: 0;

  display: block;
  border-right: 0.35rem solid transparent;
  border-bottom: 0.45rem solid ${stargate.engraving};
  border-left: 0.35rem solid transparent;
  transform-origin: top;
  transform: translateX(-50%) rotate(var(--angle)) translateY(-17.15rem);

  &:nth-of-type(7n + 1),
  &:nth-of-type(9n + 1) {
    border-top: 0.1875rem solid ${stargate.engraving};
    border-right: 0.1875rem solid transparent;
    border-bottom: 0;
    border-left: 0.1875rem solid transparent;
    transform: translateX(-50%) rotate(var(--angle)) translateY(-17rem);
  }
`

export const InnerRing: FC = (props) => {
  return (
    <InnerRingContainer {...props}>
      {/* eslint-disable-next-line prefer-spread */}
      {Array.apply(null, Array(inner_engravings_n)).map((_, key: number) => (
        <EngravingLine engravingKey={key} key={key} />
      ))}

      {/* eslint-disable-next-line prefer-spread */}
      {Array.apply(null, Array(triangles_n)).map((_, key: number) => (
        <Triangle triangleKey={key} key={key} />
      ))}
    </InnerRingContainer>
  )
}
