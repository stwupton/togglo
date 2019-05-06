import { ThemeType } from '../names';
import { SettingsActionType } from '../actions/settings';

export function settings(state, action) {
  return { themeType: themeType(state.themeType, action) };
}

function themeType(state, action) {
  switch (action.type) {
    case SettingsActionType.SWITCH_THEME:
      return state == ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
    default:
      return state;
  }
}