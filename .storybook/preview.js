import { addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import styled from '@emotion/styled'

import { GlobalStyles } from '../src/components/GlobalStyles'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  // layout: 'fullscreen',
}

addDecorator((Story) => {
  return (
    <>
      <GlobalStyles />
      <Story />
    </>
  )
})
