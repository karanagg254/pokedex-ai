// src/App.tsx
import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css';
import { ROUTES } from './constants/routepaths';
import { PokemonProvider } from './context/pokemonContext/pokemon.provider';

// Lazy pages
const HomePage = lazy(() => import("./pages/home/home.page"));
const DetailPage = lazy(() => import("./pages/details/details.page"));

// Small, typed fallback
const LoadingFallback: React.FC = () => <div>Loading…</div>;

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <BrowserRouter>
        {/* Wrap Routes with one Suspense so every lazy route is covered */}
        <Suspense fallback={<LoadingFallback />}>
          <main>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={<HomePage />}
              />
              <Route
                path={ROUTES.DETAILS}
                element={ <DetailPage
                  isCardSelected={false}
                  toggleModal={() => {}}
                  pokemonId={1}
                  offset={100}/>}
              />
              {/* Optional: add a NotFound route here */}
            </Routes>
          </main>
        </Suspense>
      </BrowserRouter>
    </PokemonProvider>
  );
};

export default App;
