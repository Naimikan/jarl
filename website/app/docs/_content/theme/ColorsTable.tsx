import { colors } from '@jarl/theme';

import { ColorCard } from '../../../_components/color-card';

export const ColorsTable = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {Object.keys(colors).map((colorKey) => {
      if (typeof colors[colorKey] === 'string') {
        return <ColorCard colorHex={colors[colorKey]} colorName={colorKey} key={colorKey} />;
      }

      return (
        <div key={colorKey} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>{colorKey}</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {Object.keys(colors[colorKey]).map((subColorKey) => (
              <ColorCard
                colorHex={colors[colorKey][subColorKey]}
                colorName={`${colorKey}-${subColorKey}`}
                key={subColorKey}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
