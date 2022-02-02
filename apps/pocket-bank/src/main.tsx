import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import RouterWrapper from './app/RouterWrapper';

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <RecoilRoot>
        <RouterWrapper />
      </RecoilRoot>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
