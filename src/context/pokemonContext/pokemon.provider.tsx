import React, { useReducer, useEffect, useRef } from "react";
import { initialState, reducer } from "../../store/reducers/reducer";
import PokemonContext from "./pokmon.context";
import {
  allPokemonURL,
  initialURL,
} from "../../services/common.service";
import { PokemonDetail, ActionTypes } from "../../models";
import { ReactNode } from "react";

export interface PokemonProviderProps {
  children: ReactNode;
}

export interface PokemonContextValue {
  state: typeof initialState;
  dispatch: React.Dispatch<any>; // we can tighten later with Action type
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: { name: string; url: string }[]) => Promise<PokemonDetail[]>;
  setAppLoading: (loading: boolean) => void;
}


export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string | null>(initialURL);

  const setAppLoading = (loading: boolean) => {
    dispatch({
      type: ActionTypes.SET_API_CALL_INPROGRESS,
      payload: loading,
    });
  };

  const setLoadMoreDataInprogress = (loading: boolean) => {
    dispatch({
      type: ActionTypes.SET_LOAD_MORE_API_CALL_INPROGRESS,
      payload: loading,
    });
  };

  const getPokemonData = async (isReset = false): Promise<void> => {
    if (isReset) {
      batchURL.current = initialURL;
    }
    if (!batchURL.current) return;

    setLoadMoreDataInprogress(true);
    const resp = await fetch(batchURL.current);
    const { next, results } = await resp.json();

    batchURL.current = next;
    const pokemonsList = await getPokemonDetailsListByUrl(results);
    setPokemonList(pokemonsList);
    setLoadMoreDataInprogress(false);
  };

  const getPokemonDetailsListByUrl = async (
    results: { name: string; url: string }[]
  ): Promise<PokemonDetail[]> => {
    const pokemonsDetailsList = await Promise.all(
      results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    return pokemonsDetailsList;
  };

  const getAllPokemonDataList = async (): Promise<void> => {
    const resp = await fetch(allPokemonURL);
    const { results } = await resp.json();
    dispatch({
      type: ActionTypes.SET_ALL_POKEMON_LIST,
      payload: results,
    });
  };

  const setPokemonList = (pokemonsList: PokemonDetail[]): void => {
    dispatch({
      type: ActionTypes.SET_POKEMON_LIST,
      payload: pokemonsList,
    });
  };

  useEffect(() => {
    getPokemonData().then(() => state.isLoading && setAppLoading(false));
    getAllPokemonDataList();
  }, []);

  const contextValue: PokemonContextValue = {
    state,
    dispatch,
    getPokemonData,
    getPokemonDetailsListByUrl,
    setAppLoading,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};
