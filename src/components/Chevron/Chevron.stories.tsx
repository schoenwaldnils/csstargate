import { FC } from 'react'

import { Chevron as ChevronComponent } from './Chevron'

export default {
  title: 'Chevron',
  component: ChevronComponent,
  argTypes: {
    status: {
      options: ['idle', 'open', 'locked'],
      control: { type: 'radio' },
    },
  },
  args: {
    status: 'idle',
  },
  parameters: {
    percy: { skip: true },
  },
}

export const Chevron: FC = (args) => <ChevronComponent {...args} />
