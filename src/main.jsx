
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StoreProvider } from 'easy-peasy';
import store from '../store/index.js';
import "react-toastify/dist/ReactToastify.css"
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <StoreProvider store={store}>
    <App />
    <ToastContainer/>
  </StoreProvider>
)
