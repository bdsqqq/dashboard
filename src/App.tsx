import React from 'react';
import styled from 'styled-components'

import { AuthProvider } from './Auth'
import Routes from './routes'

const Wrapper = styled.div`
  min-height: 100vh;
`
function App() {
  return  (
    <Wrapper>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Wrapper>
  );
}

export default App;
