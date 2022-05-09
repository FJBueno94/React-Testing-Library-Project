import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', { name: /home/i });
    const aboutEl = screen.getByRole('link', { name: /about/i });
    const favoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(favoriteEl).toBeInTheDocument();
  });
  it('Teste se é redirecionado para a URL / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se é redirecionado para a URL /about ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutEl = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se é redirecionado para /favorites ao clicar em Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se é redirecionada para a Not Found ao inserir uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFoundEl = screen.getByRole('heading',
      { name: /page requested not found crying emoji/i });

    expect(notFoundEl).toBeInTheDocument();
  });
});
