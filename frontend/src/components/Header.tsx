import { FC } from 'react';

import { APPLICATION_TITLE } from '../constants/labels';
import { SETTINGS_ICON_SOURCE, TILE_TITLE_SOURCE } from '../constants/layoutElements';

const Header: FC = () => (
  <div className="flex justify-center p-2 h-40 bg-DARKTHEME_BACKGROUND_COLOR">
    <div className="mt-2">
      <div className="absolute top-5 right-7 ">
        <img src={SETTINGS_ICON_SOURCE} alt="titile_tile" className="w-30 h-30" />
      </div>
      <div className="absolute">
        <img src={TILE_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
      </div>
      <div className="font-ALMENDRA text-DARKTHEME_LIGHT_GREEN_COLOR font-regular mt-1 text-9xl ml-3">
        {APPLICATION_TITLE}
      </div>
      <div />
    </div>
  </div>
);

export default Header;
