import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MainStore from "./store/MainStore";
import DashboardStore from "./store/DashboardStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const mainStore = new MainStore();
const dashboard = new DashboardStore();

export const Context = createContext({
    mainStore,
    dashboard
});


root.render(
    <Context.Provider value={{mainStore, dashboard}}>
        <App />
    </Context.Provider>
);
