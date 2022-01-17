import React from "react";
import { configure, mount } from "enzyme";
import { MemoryRouter} from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import CreateVideogame from "./components/CreateVideogame";
import store from './store/index'
configure({ adapter: new Adapter() });

describe("<CreateVideogame />", () => {
  
  

  describe("Estructura", () => {
    let createGame;
   
    beforeEach(() => {
      createGame = mount(
        <Provider store={store}>
        <MemoryRouter initialEntries={["/videogame"]}>
          <CreateVideogame />
        </MemoryRouter>
      </Provider>
        
      );
    });
   
   
    it("Debería renderizar un form", () => {
      expect(createGame.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "NOMBRE: "', () => {
      expect(createGame.find("label").at(0).text()).toEqual("NOMBRE:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createGame.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "CLASIFICACIÓN: "', () => {
      expect(createGame.find("label").at(1).text()).toEqual("CLASIFICACIÓN:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "rating"', () => {
      expect(createGame.find('input[name="rating"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "FECHA DE CREACIÓN: "', () => {
      expect(createGame.find("label").at(2).text()).toEqual("FECHA DE CREACIÓN:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "released"', () => {
      expect(createGame.find('input[name="released"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "DESCRIPCIÓN "', () => {
        expect(createGame.find("label").at(3).text()).toEqual("DESCRIPCIÓN:");
      });

    it('Debería renderizar un input con la propiedad "name" igual a "description"', () => {
        expect(createGame.find('textarea[name="description"]')).toHaveLength(1);
      });
  

    it('Debería renderizar un button con "type" igual a "submit" y con texto "volver"', () => {
      expect(createGame.find('button[type="submit"]')).toHaveLength(1);
      expect(createGame.find("button").at(0).text()).toEqual("Volver");
    });
  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy,createGame ;
    
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createGame = mount(
           <Provider store={store}>
        <MemoryRouter initialEntries={["/videogame"]}>
          <CreateVideogame />
        </MemoryRouter>
         </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: [],
        description: '',
        createdInDb: true
      });
    });

    describe("Name input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
        createGame.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "House Baratheon" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "House Baratheon",
          released: '',
        rating: 0,
        platforms: [],
        genres: [],
        description: '',
        createdInDb: true
        });
      });
    });

    describe("Rating input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "rating', () => {
        createGame.find('input[name="rating"]').simulate("change", {
          target: { name: "rating", value: 3.5 },
        });
        expect(useState).toHaveBeenCalledWith({
            name: '',
            released: '',
            rating: 3.5,
            platforms: [],
            genres: [],
            description: '',
            createdInDb: true
        });
      });
    });

    describe("Released input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "released', () => {
        createGame.find('input[name="released"]').simulate("change", {
          target: { name: "released", value: "11/04/1988" },
        });
        expect(useState).toHaveBeenCalledWith({
            name: '',
            released: '11/04/1988',
            rating: 0,
            platforms: [],
            genres: [],
            description: '',
            createdInDb: true
        });
      });
    });

    describe("Description textarea", () => {
        it('Debería cambiar de estado cuando cambie el valor del input "description', () => {
          createGame.find('textarea[name="description"]').simulate("change", {
            target: { name: "description", value: "videojuego para testing" },
          });
          expect(useState).toHaveBeenCalledWith({
              name: '',
              released: '',
              rating: 0,
              platforms: [],
              genres: [],
              description: 'videojuego para testing',
              createdInDb: true
          });
        });
      });

    

  });
});