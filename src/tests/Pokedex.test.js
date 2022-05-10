import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const titleEl = screen.getByRole('heading', { name: /encountered pokémons/i });

    expect(titleEl).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);

    const buttonEl = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(buttonEl).toBeInTheDocument();

    const detailsEl = screen.getByRole('link', { name: /more details/i });

    const n = 9;
    for (let i = 1; i <= n; i += 1) {
      userEvent.click(buttonEl);
      expect(detailsEl).toBeInTheDocument();
    }

    const firstPokeEl = screen.getByText(/pikachu/i);

    expect(firstPokeEl).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const detailsEl = screen.getByRole('link', { name: /more details/i });

    expect(detailsEl).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const firstPokeEl = screen.getByText(/pikachu/i);

    expect(firstPokeEl).toBeInTheDocument();

    const allEl = screen.getByRole('button', { name: /all/i });
    const typeButtonEl = screen.getAllByTestId('pokemon-type-button');

    expect(allEl).toHaveTextContent('All');
    expect(typeButtonEl[0].textContent).toBe('Electric');
    expect(typeButtonEl[1].textContent).toBe('Fire');
    expect(typeButtonEl[2].textContent).toBe('Bug');
    expect(typeButtonEl[3].textContent).toBe('Poison');
    expect(typeButtonEl[4].textContent).toBe('Psychic');
    expect(typeButtonEl[5].textContent).toBe('Normal');
    expect(typeButtonEl[6].textContent).toBe('Dragon');

    const fireButtonEl = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireButtonEl);
    const fireTypePokeEl = screen.getAllByText(/fire/i);

    expect(fireTypePokeEl.length).toBeGreaterThan(1);
    userEvent.click(fireButtonEl);
    expect(fireTypePokeEl.length).toBeGreaterThan(1);

    expect(allEl).toBeInTheDocument();

    userEvent.click(allEl);

    expect(firstPokeEl).toBeInTheDocument();
  });
});
