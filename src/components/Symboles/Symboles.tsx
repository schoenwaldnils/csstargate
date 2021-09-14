import styled from '@emotion/styled'
import { FC } from 'react'

import { stargate } from '../../data/colors'
import { center } from '../../utils/mixins'
import { symboles } from './svgs'

const symboles_n = 39

const SymboleContainer = styled.div`
  --size: 40.316rem;
  --symboleHeight: 2.55rem;

  position: relative;
  width: var(--size);
  height: var(--size);
  font-size: 1.3rem;
  color: ${stargate.symbole};
  border: solid ${stargate.symbolesBackground} var(--symboleHeight);
  border-radius: 50%;
`

const Symbole = styled.div<{ symboleKey: number }>`
  --angleSingle: ${360 / symboles_n}deg;
  --angle: calc(var(--angleSingle) * ${(p) => p.symboleKey});

  ${center}

  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--symboleHeight);
  width: ${(Math.PI * (40.316 - 2.55 / 2)) / symboles_n}rem;

  transform: translate(-50%, -50%) rotate(var(--angle))
    translateY(calc(var(--size) * -0.5 + 1em));

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    display: block;
    width: 0.0625rem;
    margin-left: calc(0.0625rem * -0.5);
    height: 100%;
    background-color: ${stargate.symbolesBorder};
    transform: rotate(calc(var(--angleSingle) * 0.5));
    box-shadow: -0.1rem 0 0 0 ${stargate.symbolesBorder},
      0.1rem 0 0 0 ${stargate.symbolesBorder};
  }
`

export const Symboles: FC = (props) => {
  return (
    <SymboleContainer {...props}>
      {symboles.map((SymboleSvg, key) => (
        <Symbole symboleKey={key} key={key}>
          <SymboleSvg />
        </Symbole>
      ))}
    </SymboleContainer>
  )
}
