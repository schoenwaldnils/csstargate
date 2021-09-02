/* eslint-disable prefer-spread */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import btoa from 'btoa'
import { FC, useMemo } from 'react'

import { stargate } from '../../data/colors'
import { center } from '../../utils/mixins'

const outer_engravings_n = 300

const OuterRingContainer = styled.div`
  position: relative;
  width: var(--size, 45rem);
  height: var(--size, 45rem);
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.225rem ${stargate.gateMetalDark},
    inset 0 0 0 0.28125rem ${stargate.gateMetalDarker},
    inset 0 0 0 0.675rem ${stargate.gateMetal},
    inset 0 0 0 0.73125rem ${stargate.engraving},
    inset 0 0 0 1.575rem ${stargate.gateMetal},
    inset 0 0 0 1.63125rem ${stargate.engraving},
    inset 0 0 0 2.3625rem ${stargate.gateMetal},
    inset 0 0 0.25rem 2.3625rem rgba(0, 0, 0, 0.5);
`

const Engraving = styled.div<{ engravingKey: number }>`
  --angleSingle: ${360 / outer_engravings_n}deg;
  --angle: calc(var(--angleSingle) * ${(p) => p.engravingKey});

  ${center}

  width: 0;
  height: 0;
  transform-origin: top;
  transform: rotate(var(--angle));
`

const engravingStyles = css`
  position: absolute;
  display: block;
  width: 0.0625rem;
  background-color: ${stargate.engraving};
  transform-origin: top;
`

const EngravingBefore = styled.div`
  ${engravingStyles}
  height: 0.9rem;
  transform: translateX(-50%) rotate(calc(var(--angleSingle) * -0.5))
    translateY(-21.8rem);
`

const EngravingAfter = styled.div`
  ${engravingStyles}

  height: 0.55rem;
  transform: translateX(-50%) translateY(-21.8rem);
`

const ovalSvg =
  'data:image/svg+xml;base64,' +
  btoa(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' preserveAspectRatio='none'>
  <path fill='${stargate.engraving}' d='M42,64 C42,64 40,8 24,8 C8,8 6,64 6,64 L0,64 C0,64 4,3.2657248e-15 24,0 C44,0 48,64 48,64 L42,64 Z' id='Path-2'></path>
  <path fill='${stargate.engraving}' d='M31,64 C31,64 31,29.3333333 24,29.3333333 C17,29.3333333 17,64 17,64 L11,64 C11,64 12,21.3333333 24,21.3333333 C36,21.3333333 37,64 37,64 L31,64 Z' id='Path-2-Copy'></path>
</svg>
`)

const EngravingOval = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.7rem;
  overflow: hidden;
  background-image: url(${ovalSvg});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform-origin: top;
  transform: translateX(-50%) translateY(-21.6rem);
`

const chevron_n = 9
const chevron_angle = 360 / chevron_n
const screws_radius = 22.0275
const screws_spaces = [11, 13, 19, 25, 28, 30]

const Screws = styled.div<{ shadow: string }>`
  ${center}

  width: 0.27rem;
  height: 0.27rem;
  border-radius: 50%;
  box-shadow: ${(p) => p.shadow || 'none'};
`

export const OuterRing: FC = () => {
  const screwsShadow = useMemo(() => {
    let screwsShadow: string

    Array.apply(null, Array(chevron_n)).map((_, chevronKey) => {
      screws_spaces.map((spacing) => {
        const d = (chevron_angle * chevronKey - spacing) * (Math.PI / 180)
        const x = Math.sin(d) * screws_radius * -1
        const y = Math.cos(d) * screws_radius * -1
        screwsShadow = `${
          screwsShadow ? `${screwsShadow}, ` : ''
        }${x}rem ${y}rem ${stargate.screw}`
      })
    })
    return screwsShadow
  }, [])

  return (
    <OuterRingContainer>
      {Array.apply(null, Array(outer_engravings_n)).map((_, key: number) => (
        <Engraving engravingKey={key} key={key}>
          <EngravingBefore />
          <EngravingOval />
          <EngravingAfter />
        </Engraving>
      ))}
      <Screws shadow={screwsShadow} />
    </OuterRingContainer>
  )
}
