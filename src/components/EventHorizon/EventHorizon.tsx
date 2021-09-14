import styled from '@emotion/styled'
import { FC } from 'react'

const EventHorizonContainer = styled.div<{ isActive: boolean }>`
  --size: 33.3rem;

  position: relative;
  display: block;
  width: var(--size);
  height: var(--size);
  overflow: hidden;
  border-radius: 50%;
  opacity: ${(p) => (p.isActive ? 1 : 0)};
  transition: opacity 300ms;
`

const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: none;
  height: 104%;
  transform: translate(-50%, -50%);
`

// .Stargate-video {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   height: 104%;
//   transform: translate(-50%, -50%);
// }

export const EventHorizon: FC<{ isActive?: boolean; src?: string }> = ({
  isActive = false,
  src = '/horizon.mp4',
  ...props
}) => {
  return (
    <EventHorizonContainer isActive={isActive} {...props}>
      <Video src={src} loop autoPlay />
    </EventHorizonContainer>
  )
}
