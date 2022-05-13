import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';
import Data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);

    const pokemons = Data[1];

    const pokeNameEl = screen.getByText(pokemons.name);
    const pokeTypeEl = screen.getByTestId('pokemon-type');
    const pokeWeightEl = screen.getByTestId('pokemon-weight');
    const type = `${pokemons.type}`;
    const pokeImgEl = screen.getByRole('img', { name: `${pokemons.name} sprite` });

    expect(pokeNameEl).toBeInTheDocument();
    expect(pokeTypeEl).toHaveTextContent(type);

    const { value, measurementUnit } = pokemons.averageWeight;

    expect(pokeWeightEl).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImgEl).toHaveAttribute('src', pokemons.image);
  });
  it('Teste se o link tem a URL /pokemons/<id>, onde <id> é o id do pokémon.', () => {
    renderWithRouter(<App />);

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);

    const pokemons = Data[1];

    const linkEl = screen.getByRole('link', { name: /more details/i });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveProperty('href', `http://localhost/pokemons/${pokemons.id}`);
  });
  it('Teste o link de navegação é redirecionado para a página de detalhes.', () => {
    renderWithRouter(<App />);

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);

    const detailsButtonEl = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsButtonEl);

    const pokemons = Data[1];
    const titleEl = screen.getByRole('heading', { name: `${pokemons.name} Details` });

    expect(titleEl).toBeInTheDocument();
  });
  it('Teste se a URL exibida no navegador é /pokemon/<id>.', () => {
    const { history } = renderWithRouter(<App />);

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);

    const detailsButtonEl = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsButtonEl);

    const pokemons = Data[1];
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${pokemons.id}`);
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);

    const detailsButtonEl = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsButtonEl);

    const pokemons = Data[1];

    const favoriteCheckEl = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });

    userEvent.click(favoriteCheckEl);

    expect(favoriteCheckEl).toBeChecked();

    const favoriteImgEl = screen.getByRole('img',
      { name: `${pokemons.name} is marked as favorite` });

    expect(favoriteImgEl).toBeInTheDocument();
    expect(favoriteImgEl).toHaveAttribute('src', '/star-icon.svg');
  });
});
