import { FC } from 'react'

import { Stargate as StargateComponent } from './Stargate'

export default {
  title: 'Stargate',
  component: StargateComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const Stargate: FC = () => <StargateComponent />
