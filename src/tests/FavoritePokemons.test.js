import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se mostra favorite pokemon found, caso não tenha pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoriteEl = screen.getByText(/no favorite pokemon found/i);

    expect(noFavoriteEl).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const typeEl = screen.getByRole('button', { name: /fire/i });
    const infoPokeEl = screen.getByRole('link', { name: /more details/i });

    userEvent.click(typeEl);
    userEvent.click(infoPokeEl);

    const checkFavEl = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const favoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(checkFavEl);
    userEvent.click(favoriteEl);

    const pokeFavorite = screen.getByText(/fire/i);

    expect(pokeFavorite).toBeInTheDocument();
  });
});
