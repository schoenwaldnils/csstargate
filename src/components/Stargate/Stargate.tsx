import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'

import { center } from '../../utils/mixins'
import { Chevron } from '../Chevron'
import { InnerRing } from '../InnerRing'
import { OuterRing } from '../OuterRing'
import { Symboles } from '../Symboles'

// $stargate_horizon_size: $stargate_inner_ring_size;
const shevron_n = 9

const StargateContainer = styled.div`
  --size: 45rem;

  position: relative;
  width: var(--size);
  height: var(--size);
`

const SymbolesPositioned = styled(Symboles)`
  ${center}
`

const InnerRingCentered = styled(InnerRing)`
  ${center}
`

const ChevronWrapper = styled.div<{ index: number }>`
  --angleSingle: ${360 / shevron_n}deg;
  --angle: calc(var(--angleSingle) * ${(p) => p.index});

  ${center}

  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-20.75rem);
`

export const Stargate: FC = () => {
  return (
    <StargateContainer>
      <SymbolesPositioned />
      <OuterRing />
      <InnerRingCentered />
      {/* eslint-disable-next-line prefer-spread */}
      {Array.apply(null, Array(shevron_n)).map((_, key: number) => (
        <ChevronWrapper index={key} key={key}>
          <Chevron />
        </ChevronWrapper>
      ))}
    </StargateContainer>
  )
}