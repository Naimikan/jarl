import { colors } from '@jarl/theme';

import { ColorCard } from '@/components/ui/ColorCard';

export const ColorsTable = () => (
  <div className="colors-table">
    {Object.keys(colors).map((colorKey) => {
      if (typeof colors[colorKey] === 'string') {
        return <ColorCard colorHex={colors[colorKey]} colorName={colorKey} key={colorKey} />;
      }

      return (
        <div className="palette-section" key={colorKey}>
          <div className="palette-information">
            <p className="palette-name">{colorKey}</p>
            <span className="palette-count">{Object.keys(colors[colorKey]).length}</span>
          </div>
          <div className="palette-grid">
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
