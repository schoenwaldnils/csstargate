import { FC } from 'react'

import { Link as LinkComponent } from './Link'

export default {
  title: 'Typography / Link',
  component: LinkComponent,
}

export const Link: FC = () => (
  <LinkComponent href="#">Lorem Ipsum</LinkComponent>
)
