import { FC } from 'react'

import { InnerRing as InnerRingComponent } from './InnerRing'

export default {
  title: 'Inner Ring',
  component: InnerRingComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const InnerRing: FC = () => <InnerRingComponent />
