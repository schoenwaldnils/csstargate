import { FC } from 'react'

import { Iris as IrisComponent } from './Iris'

export default {
  title: 'Iris',
  component: IrisComponent,
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isActive: false,
  },
  parameters: {
    percy: { skip: true },
  },
}

export const Iris: FC = (props) => <IrisComponent {...props} />
