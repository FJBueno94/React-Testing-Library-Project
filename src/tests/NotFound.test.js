import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFoundEl = screen.getByRole('heading',
      { name: /page requested not found crying emoji/i });

    expect(notFoundEl).toBeInTheDocument();
  });
  it('', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const imgEl = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });

    expect(imgEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
