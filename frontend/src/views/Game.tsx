import React, { ReactElement, useState } from 'react';
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import GameTimer from '../components/GameTimer/GameTimer';
import GameBoard from '../components/GameBoard/GameBoard';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import DrawPile from '../components/DrawPile/DrawPile';
import Legend from '../components/Legend/Legend';
import { GAMEBOARD_LAYOUT_PROPORTION } from '../constants/gameDefaults';
import { MENU_TITLE_SOURCE } from '../constants/layoutElements';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';
import { ShowScoreModal } from '../components/Modal/ShowScoreModal';
import { InvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import { EndTurnModal } from '../components/Modal/EndTurnModal';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';
import NextPhaseButton, { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';

const GamePage: React.FunctionComponent = observer((): ReactElement => {
  const players = rootStore.playersStore.players;
  const drawPileLength = rootStore.gameStore.drawPile.length;
  const [currentPlayer] = useState<number>(0);

  const gamebordLayoutProportion = `${GAMEBOARD_LAYOUT_PROPORTION * 100}%`;
  const playersInfoLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION) / 2) * 100 - 1}%`;
  const drawPileLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION * 100) / 2) * 100 - 1}%`;

  return (
    <div
      className={rootStore.room && !rootStore.playersStore.isMyTurn() ? 'pointer-events-none' : ''}
      style={{ height: '97vh' }}
    >
      <div
        className="flex justify-between items-center z-0 border-b-2 border-DARKTHEME_LIGHT_GREEN_COLOR"
        style={{ height: playersInfoLayoutProportion, maxHeight: playersInfoLayoutProportion, minHeight: '128px' }}
      >
        <div className="flex justify-center mt-4">
          <Link to={PATH_TO_HOMEPAGE}>
            <img src={MENU_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
          </Link>
        </div>
        <PlayersInfo players={players} currentPlayer={currentPlayer} />
        <NextPhaseButton />
        <GameTimer isTurnTimerVisible={false} turnLength={60} />
        <div className="flex justify-end">
          <Legend />
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ height: gamebordLayoutProportion, maxHeight: gamebordLayoutProportion, overflow: 'auto' }}
      >
        {/* <ProjectList /> */}
        <MapInteractionCSS minScale={0.5} maxScale={3}>
          <div
            className={
              rootStore.gameStore.currentPhase != GamePhases.TILE_PLACEMENT
                ? `flex justify-center items-center w-screen pointer-events-none`
                : `flex justify-center items-center w-screen`
            }
            style={{ height: gamebordLayoutProportion }}
          >
            <GameBoard />
          </div>
        </MapInteractionCSS>
      </div>
      <div
        className="flex justify-around border-t-2 border-DARKTHEME_LIGHT_GREEN_COLOR pt-2"
        style={{ bottom: 0, height: drawPileLayoutProportion, maxHeight: drawPileLayoutProportion }}
      >
        {!(
          (rootStore.room && !rootStore.playersStore.isMyTurn()) ||
          rootStore.gameStore.currentPhase != GamePhases.TILE_PLACEMENT
        ) && <PlayersHand />}
        <DrawPile numberOfAvailableTiles={drawPileLength} />
      </div>
      <InvalidMoveModal />
      <EndTurnModal />
      <ShowScoreModal />
    </div>
  );
});

export default GamePage;
