import { useRef } from 'react';
import { Icon } from '@iconify/react';
import moonFill from '@iconify/icons-eva/moon-fill';
import sunFill from '@iconify/icons-eva/sun-fill';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

export default function ThemeModeSwitch() {
  const anchorRef = useRef(null);

  const { themeMode, toggleChangeMode } = useSettings();
  const isLight = themeMode === 'light';

  return (
    <MIconButton
      ref={anchorRef}
      onClick={toggleChangeMode}
      sx={{
        padding: 0,
        width: 44,
        height: 44
      }}
    >
      <Icon icon={isLight ? sunFill : moonFill} />
    </MIconButton>
  );
}
