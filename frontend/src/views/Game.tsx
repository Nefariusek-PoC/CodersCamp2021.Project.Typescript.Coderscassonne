import React, { ReactElement, useContext, useState } from 'react';
import DataStoreContext, { drawnTiles } from '../components/DataStoreContext/DataStoreContext';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import GameTimer from '../components/GameTimer/GameTimer';
import GameBoard from '../components/GameBoard/GameBoard';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import DrawPile from '../components/DrawPile/DrawPile';
import Legend from '../components/Legend/Legend';
import { openInvalidMoveModal, InvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import { MENU_TITLE_SOURCE } from '../constants/layoutElements';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';

const GamePage: React.FunctionComponent = (): ReactElement => {
  const context = useContext(DataStoreContext);
  const [currentPlayer] = useState<number>(0);
  const tilesLeft = drawnTiles.length - context.turnNumber > 0 ? drawnTiles.length - context.turnNumber : 0;

  return (
    <div>
      <div className="flex justify-between p-[10px] z-0">
        <div className="mt-6">
          <Link to={PATH_TO_HOMEPAGE}>
            <img src={MENU_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
          </Link>
        </div>
        <PlayersInfo players={context?.allPlayersData} currentPlayer={currentPlayer} />
        <GameTimer isTurnTimerVisible={false} turnLength={60} />
        <div className="w-[300px] mt-6 flex justify-end">
          <Legend />
        </div>
      </div>
      <div className="flex justify-center">
        <GameBoard />
      </div>
      <div className="flex justify-around p-[10px]">
        <button id="btn" className="bg-white text-black h-12" onClick={openInvalidMoveModal}>
          Modal
        </button>
        <PlayersHand />
        <DrawPile numberOfAvailableTiles={tilesLeft} />
      </div>
      <InvalidMoveModal />
    </div>
  );
};

export default GamePage;
