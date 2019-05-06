export const SettingsActionType = {
  SWITCH_THEME: 'switch_theme'
};

export function switchTheme() {
  return { type: SettingsActionType.SWITCH_THEME };
}