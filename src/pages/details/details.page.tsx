// src/pages/details.page.tsx
import './details.page.scss';
import React, { useState, useEffect } from "react";
import { Loader, Modal, Placeholder } from 'rsuite';
import { getPokemonDataById, getPokemonTypesById, getSpeciesDataById } from "../../services/common.service";
import DetailsHeader from '../../components/pokemonDetailsCard/detailsHeader/detailsHeader';
import PropertyCard from '../../components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '../../components/pokemonDetailsCard/statCard/statCard';
import EvolutionChainCard from '../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import { FlavorTextEntry, SpeciesData, PokemonDetail } from "../../models";
import { PokemonTypeData } from "../../constants/pokemon.types"; // if you exported it there

/**
 * Local (lightweight) types used by this page.
 * Replace with your central types (from models.ts / pokemon.types.ts) if you export them there.
 */
interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonType {
  type: { name: string; url?: string };
}

interface PokemonSprites {
  front_default?: string | null;
  other?: {
    dream_world?: { front_default?: string | null };
    [key: string]: any;
  };
  [key: string]: any;
}

interface PokemonData {
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
  }


/** Props for DetailPage */
interface DetailPageProps {
  isCardSelected: boolean;
  // parent toggle function — kept flexible since original used toggleModal() with no args
  toggleModal: (open?: boolean, id?: number | null) => void;
  pokemonId: number | undefined;
  offset: number | undefined;
}

const DetailPage: React.FC<DetailPageProps> = ({ isCardSelected, toggleModal, pokemonId, offset }) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number | undefined>(pokemonId);
  const [isDetailLoading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setCloseModal] = useState<boolean>(isCardSelected);
  const [data, setPokemonData] = useState<PokemonDetail | null>(null);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<SpeciesData | null>(null);
  const [pokemonTypeData, setPokemonTypeData] = useState<PokemonTypeData | null>(null);
  

  // keep internal modal open state in sync with incoming prop
  useEffect(() => {
    setCloseModal(isCardSelected);
  }, [isCardSelected]);

  useEffect(() => {
    if (!currentPokemonId) return;

    let mounted = true;

    (async function setPokemonDetails() {
      try {
        setLoading(true);
        const response = await getPokemonDataById(currentPokemonId);
        if (!mounted) return;
        setPokemonData(response);
        setLoading(false);

        const species = await getSpeciesDataById(currentPokemonId);
        if (!mounted) return;
        setPokemonSpeciesData(species);

        const typeData = await getPokemonTypesById(currentPokemonId);
        if (!mounted) return;
        setPokemonTypeData(typeData);
      } catch (err) {
        // handle errors as needed (optionally call parent showError if you have one)
        console.error("Failed to load pokemon details", err);
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currentPokemonId]);

  const handleClose = () => {
    // parent expects toggleModal(); preserve existing behaviour
    toggleModal(false, null);
    setCloseModal(false);
  };

  const handleForwordClick = () => {
    if (currentPokemonId === offset) return;
    setCurrentPokemonId((id) => id && id + 1);
  };

  const handleBackwordClick = () => {
    if (currentPokemonId === 1) return;
    setCurrentPokemonId((id) => id &&  id - 1);
  };

  const closePopUp = () => {
    setCloseModal(false);
  };

  return (
    <>
      <Modal
        dialogClassName={"details-modal-container"}
        size={"md"}
        open={isModalOpen}
        onClose={handleClose}
        onExited={() => {
          setPokemonData(null);
        }}
      >
        {data ? (
          <>
            <div className="model-container">
              <Modal.Header closeButton={false} className="rs-modal-header-2" >
                {isDetailLoading && <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />}
                {!isDetailLoading && (
                  <div>
                    <DetailsHeader
                        data={data}
                        speciesData={pokemonSpeciesData ?? undefined}
                        forwordClick={handleForwordClick}
                        backClick={handleBackwordClick}
                        closeClick={closePopUp}
                        />
                  </div>
                )}

                <div className="padding-components">
                  {pokemonTypeData && (
                    <PropertyCard
                      speciesData={pokemonSpeciesData ?? undefined}
                      data={data}
                      pokemonTypeData={pokemonTypeData}
                    />
                  )}
                </div>

                <div className="padding-components">
                  {data.stats && <StatCard stats={data.stats} />}
                </div>

                <div className="padding-components">
                  <EvolutionChainCard data={data} />
                </div>

              </Modal.Header>

              <Modal.Body>
                {/* Optionally show something in the body */}
              </Modal.Body>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Loader size="md" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailPage;
