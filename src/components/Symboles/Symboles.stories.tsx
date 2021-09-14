import { FC } from 'react'

import { Symboles as SymbolesComponent } from './Symboles'

export default {
  title: 'Symboles',
  component: SymbolesComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const Symboles: FC = (props) => <SymbolesComponent {...props} />
