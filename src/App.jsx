import React from 'react';
import Portfolio from './Portfolio';
import WalletsPanel from './WalletsPanel';
import Settings from './Settings';
import Taxes from './Taxes';

export default function App() {
  return (
    <main>
      <Portfolio />
      <WalletsPanel />
      <Taxes />
      <Settings />
    </main>
  );
}
