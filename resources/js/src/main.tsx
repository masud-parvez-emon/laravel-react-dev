import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
// import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
// import { Router, RouterProvider } from 'react-router';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './router/index';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <Router/>
            </Provider>
        </Suspense>
    </React.StrictMode>
);

