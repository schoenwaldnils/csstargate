import { FC } from 'react'

import { OuterRing as OuterRingComponent } from './OuterRing'

export default {
  title: 'Outer Ring',
  component: OuterRingComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const OuterRing: FC = () => <OuterRingComponent />
