import { colors, type JarlColors } from '@jarl/theme';

import { ColorCard } from '@/components/ui/ColorCard';

export const ColorsTable = () => {
  const colorKeys = Object.keys(colors) as Array<keyof JarlColors>;

  return (
    <div className="colors-table">
      {colorKeys.map((colorKey) => {
        const currentColor = colors[colorKey];

        if (typeof currentColor === 'string') {
          return <ColorCard colorHex={currentColor} colorName={colorKey} key={colorKey} />;
        }

        const subColors = Object.entries(currentColor);

        return (
          <div className="palette-section" key={colorKey}>
            <div className="palette-information">
              <p className="palette-name">{colorKey}</p>
              <span className="palette-count">{subColors.length}</span>
            </div>
            <div className="palette-grid">
              {subColors.map(([subColorKey, subColorHex]) => (
                <ColorCard
                  colorHex={subColorHex}
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
};
