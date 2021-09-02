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

const SymboleBorder = styled.div``

// .Stargate-svg {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   color: $c_symbole;
//   transform: translateX(-50%);
// }

// @for $i from 0 through $symboles_n {
//   .Stargate-symbole:nth-child(#{$i}) {

//     .Stargate-symboleBefore {
//       transform: translateX(-50%) rotate($symboles_angle * -.47) translateY($symboles_size_outer * -.5);
//     }

//     .Stargate-symboleAfter {
//       transform: translateX(-50%) rotate($symboles_angle * .47) translateY($symboles_size_outer * -.5);
//     }

//     .Stargate-svg {
//       transform: translate(-50%, -19.6rem);
//     }
//   }
// }

// .Stargate-symboles
// - for (var i = 1; i <= symboles_n; ++i)
//   .Stargate-symbole
//     .Stargate-symboleBefore
//     //- Glyphs are taken from http://stargate.wikia.com/wiki/Glyph
//     svg.Stargate-svg.Svg(class="Svg--"+i)
//       use("xmlns:xlink"="http://www.w3.org/1999/xlink",
//         "xlink:href"="svg-sprite/symbol/svg/sprite.symbol.svg#"+i,
//         :role="img")
//     .Stargate-symboleAfter

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
