import { FC } from 'react'

import { EventHorizon as EventHorizonComponent } from './EventHorizon'

export default {
  title: 'Event Horizon',
  component: EventHorizonComponent,
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isActive: true,
    src: 'http://csstargate.schoen.world/assets/horizon.mp4',
  },
  parameters: {
    percy: { skip: true },
  },
}

export const EventHorizon: FC = (args) => <EventHorizonComponent {...args} />
