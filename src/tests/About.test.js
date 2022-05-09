import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/RenderwithRouter';
import App from '../App';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutEl = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const titleEl = screen.getByRole('heading', { name: /about pokédex/i });

    expect(titleEl).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const descrptionEl1 = screen.getByText(/this application simulates a pokédex,/i);
    const descrptionEl2 = screen.getByText(/One can filter Pokémons by type,/i);

    expect(descrptionEl1).toBeInTheDocument();
    expect(descrptionEl2).toBeInTheDocument();
  });
  it('Teste se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgEl = screen.getByRole('img', { name: /pokédex/i });

    expect(imgEl.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
