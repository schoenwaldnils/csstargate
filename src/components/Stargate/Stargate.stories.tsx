import { FC } from 'react'

import { Stargate as StargateComponent } from './Stargate'

export default {
  title: 'Stargate',
  component: StargateComponent,
  irisActive: {
    control: { type: 'boolean' },
  },
  args: {
    irisActive: true,
  },
  parameters: {
    percy: { skip: true },
  },
}

export const Stargate: FC = (props) => <StargateComponent {...props} />
