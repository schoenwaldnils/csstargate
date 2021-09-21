import styled from '@emotion/styled'
import { FC } from 'react'

import { stargate } from '../../data/colors'

const IrisContainer = styled.div`
  --size: 45rem; // copied from InnerRing

  position: relative;
  flex-shrink: 0;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
`

const Panels = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 50%;
  perspective: 1000rem;
  transform-style: preserve-3d;
`

const Panel = styled.div<{ panelKey: number }>`
  --deg: ${(p) => (360 / 20) * p.panelKey}deg;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform: translateZ(-1px) rotateZ(var(--deg)) rotateX(0.5deg);
`

const PanelSvg = styled.svg<{ isActive: boolean }>`
  position: absolute;
  right: 1px;
  bottom: 50%;
  z-index: 0;
  width: 20rem;
  height: 17rem;
  transition: transform 1500ms;
  transition-timing-function: ${(p) =>
    p.isActive
      ? 'cubic-bezier(0.4, 1, 0.9, 0.5)'
      : 'cubic-bezier(0.1, 0.5, 0.6, 0)'};
  transform-origin: 14.85rem bottom;

  transform: ${(p) => (p.isActive ? 'rotateZ(-60deg)' : 'rotateZ(0deg)')};
`

export const Iris: FC<{ isActive?: boolean }> = ({
  isActive = false,
  ...props
}) => {
  return (
    <IrisContainer {...props}>
      <svg viewBox="0 0 222 190">
        <defs>
          <path
            id="a"
            d="M165 190C165 56.343 41.924 0 0 0c15.152 0 222 0 222 190h-57z"
          />
          <mask id="b" fill="#fff" height="190" width="222" x="0" y="0">
            <use xlinkHref="#a" />
          </mask>
        </defs>
      </svg>
      <Panels>
        {/* eslint-disable-next-line prefer-spread */}
        {Array.apply(null, Array(20)).map((_, key) => (
          <Panel key={`panel-${key}`} panelKey={key}>
            <PanelSvg isActive={isActive} viewBox="0 0 222 190">
              <g fill="none" fillRule="evenodd">
                <use fill={stargate.symbolesBackground} xlinkHref="#a" />
                <use
                  mask="url(#b)"
                  stroke={stargate.gateMetalDark}
                  strokeWidth="1"
                  xlinkHref="#a"
                />
              </g>
            </PanelSvg>
          </Panel>
        ))}
      </Panels>
    </IrisContainer>
  )
}
