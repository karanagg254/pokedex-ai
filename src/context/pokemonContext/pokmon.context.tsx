import { createContext, Dispatch } from "react";
import { initialState } from "../../store/reducers/reducer";
import { PokemonState, PokemonAction } from "../../models";

interface PokemonContextType {
  state: PokemonState;
  dispatch: Dispatch<PokemonAction>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (
    results: { name: string; url: string }[]
  ) => Promise<any[]>;
  setAppLoading: (loading: boolean) => void;
}

const PokemonContext = createContext<PokemonContextType>({
  state: initialState,
  dispatch: () => undefined,
  getPokemonData: async () => {},
  getPokemonDetailsListByUrl: async () => [],
  setAppLoading: () => {},
});

export default PokemonContext;
