import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
// import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// i18n (needs to be bundled)
import './i18n';

// Router
// import { Router, RouterProvider } from 'react-router';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './router/index';
import { GlobalStyles, StyledEngineProvider } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <Suspense>
                <Provider store={store}>
                    <Router/>
                </Provider>
            </Suspense>
        </StyledEngineProvider>
    </React.StrictMode>
);

