import React, { Dispatch, SetStateAction } from "react";
import { SlideoverModes } from "./enums";

interface IAppContext {
  open: boolean;
  mode: SlideoverModes;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<SlideoverModes>>;
}

export const AppContext = React.createContext<IAppContext>({
  mode: SlideoverModes.none,
  open: false,
  setMode: () => null,
  setOpen: () => null,
});
