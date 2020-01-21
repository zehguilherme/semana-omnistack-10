import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

// Importação das rotas
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Possible'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7"></StatusBar>
      <Routes></Routes>
    </>
  );
}
