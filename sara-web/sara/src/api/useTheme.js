
import { useGlobalVariable } from '../providers/GlobalVariableProvider'

export const THEME = {
 DARK_MODE: 'dark',
 LIGHT_MODE: 'light',
 THEME_STORAGE_NAME: 'THEME_DARK_MODE'
}

export const useTheme = () => {

 const { globalProps, setUIProps } = useGlobalVariable();

 const initTheme = () => {
  const darkMode = localStorage.getItem(THEME.THEME_STORAGE_NAME);
  setUIProps({
   darkMode: darkMode === 'Y' ? true : false
  });
 }

 const toggleDarkMode = () => {
  setUIProps({
   darkMode: !globalProps.ui.darkMode
  });
  localStorage.setItem(THEME.THEME_STORAGE_NAME, !globalProps.ui.darkMode ? 'Y' : 'N');
 }

 return {
  props: globalProps.ui,
  initTheme: initTheme,
  toggleDarkMode: toggleDarkMode
 }
}
