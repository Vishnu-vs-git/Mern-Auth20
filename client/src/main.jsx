import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { persistor, Store } from './redux/Store.js'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
// import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor} loading={null}>
    <App />

      </PersistGate>

    </Provider>
  </StrictMode>,
)
