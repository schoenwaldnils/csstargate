import styled from '@emotion/styled'
import btoa from 'btoa'
import { FC } from 'react'

import { stargate } from '../../data/colors'
import { stargateTimes } from '../../data/times'

const ChevronContainer = styled.div`
  position: relative;
  width: 11rem;
  height: 4rem;
`

const plateSvg =
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns='http://www.w3.org/2000/svg'>
  <rect fill='${stargate.chevronPlate}' x='0' y='0' width='100%' height='100%'/>
</svg>
`)

const ChevronPlate = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 15rem;
  height: 3.8rem;
  clip-path: polygon(
    0% 0%,
    43% 0%,
    50% 100%,
    57% 0%,
    100% 0%,
    100% 100%,
    0% 100%
  );
  background-image: url('${plateSvg}');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 17.15%;
  border-radius: 50%;
  transform: translateX(-50%);
  contain: strict;
`

const hookLightSvg = (isActive: boolean): string =>
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns='http://www.w3.org/2000/svg'>
  <g fill='${
    isActive ? stargate.chevronLightActive : stargate.chevronLight
  }' width='100%' height='100%'>
    <rect x='0' y='0%' width='100%' height='4%'></rect>
    <rect x='0' y='28%' width='100%' height='4%'></rect>
    <rect x='0' y='56%' width='100%' height='4%'></rect>
    <rect x='0' y='14%' width='100%' height='4%'></rect>
    <rect x='0' y='42%' width='100%' height='4%'></rect>
    <rect x='0' y='70%' width='100%' height='4%'></rect>
  </g>
</svg>
`)

const hookSvg2 =
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns='http://www.w3.org/2000/svg'>
  <rect fill='${stargate.chevronHook}' x='0' y='0' width='100%' height='100%'/>
</svg>
`)

const ChevronHook = styled.div<{ isOpen: boolean; isActive: boolean }>`
  position: absolute;
  top: 0.65rem;
  left: 50%;
  width: 4.23rem;
  height: 3.2rem;
  clip-path: polygon(
    0% 0%,
    25% 0%,
    39% 68%,
    61% 68%,
    75% 0%,
    100% 0%,
    68% 100%,
    32% 100%
  );
  background-image: url('${(p) => hookLightSvg(p.isActive)}'),
    url('${hookSvg2}');
  background-position: 0 20%, 0 0;
  background-repeat: no-repeat;
  background-size: 100% 56%, 100% 100%;
  transform: translateX(-50%);
  transition: transform ${stargateTimes.hookLockTransition}ms;
  will-change: transform, opacity, background;

  ${(p) => p.isOpen && 'transform: translateX(-50%) translateY(.5rem);'}
`

const ChevronHookBefore = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 1.525rem;
  height: 1.025rem;
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  background-color: ${stargate.chevronHookLighter};
  transform: translateX(-50%);
`

const chevronLightSvg = (isActive: boolean): string =>
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns='http://www.w3.org/2000/svg'>
  <rect fill='${
    stargate[`chevronLight${isActive ? 'Active' : ''}Lighter`]
  }' x='0' y='0%' width='100%' height='100%'></rect>
  <rect fill='${
    stargate[`chevronLight${isActive ? 'Active' : ''}`]
  }' x='0' y='20%' width='100%' height='80%'></rect>
  <rect fill='${
    stargate[`chevronLight${isActive ? 'Active' : ''}Darker`]
  }' x='0' y='60%' width='100%' height='40%'></rect>
</svg>
`)

const ChevronLightCase = styled.div`
  position: absolute;
  top: -0.1rem;
  left: 50%;
  width: 2.26rem;
  height: 2.78rem;
  clip-path: polygon(2% 0%, 98% 0%, 65% 100%, 35% 100%);
  background-color: ${stargate.chevronLightBorder};
  transform: translateX(-50%);
`

const ChevronLight = styled.div<{ isOpen: boolean; isActive: boolean }>`
  position: absolute;
  top: -0.1rem;
  left: 50%;
  width: 1.8rem;
  height: 2.1rem;
  clip-path: polygon(2% 0%, 98% 0%, 68% 100%, 32% 100%);
  background-image: url('${(p) => chevronLightSvg(p.isActive)}');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: ${(p) =>
    p.isOpen ? 'translateX(-50%) translateY(-.25rem)' : 'translateX(-50%)'};
  transition: transform ${stargateTimes.hookLockTransition}ms,
    background ${stargateTimes.hookLightTransition}ms;
`

export const Chevron: FC<{
  status?: 'idle' | 'open' | 'locked'
}> = ({ status = 'idle' }) => {
  const isOpen = status === 'open'
  const isActive = status !== 'idle'

  return (
    <ChevronContainer>
      <ChevronHook isOpen={isOpen} isActive={isActive}>
        <ChevronHookBefore />
      </ChevronHook>
      <ChevronPlate />
      <ChevronLightCase />
      <ChevronLight isOpen={isOpen} isActive={isActive} />
    </ChevronContainer>
  )
}
