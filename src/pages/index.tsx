import styled from '@emotion/styled'
import { NextPage } from 'next'

import { Stargate } from '../components/Stargate'
import { Link } from '../components/Typography'

const View = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: 90vh;
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`

const Text = styled.div`
  text-align: center;
`

const IndexPage: NextPage = () => {
  return (
    <View>
      <Stargate />
      <Text>
        Work in progress. <br />
        Currently refactoring{' '}
        <Link href="https://csstargate.schoen.world/" target="_blank">
          csstargate.schoen.world
        </Link>
      </Text>
    </View>
  )
}

export default IndexPage
