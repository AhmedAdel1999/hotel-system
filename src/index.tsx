import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'reduxjs-toolkit-persist/es/integration/react';
import { persistStore } from 'reduxjs-toolkit-persist';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import InitialLoading from './components/loading/initialLoading';
import './index.scss';
const LazyApp = React.lazy(()=>import("./App"))

let persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider placement='bottom-center'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<InitialLoading />}>
            <LazyApp />
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ToastProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
