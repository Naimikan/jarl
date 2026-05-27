import { colors } from '@jarl/theme';

const ColorCard = ({ colorName, colorHex }: { colorName: string; colorHex: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '12px',
      width: '200px',
      height: '200px',
      gap: '12px',
      border: '1px solid black',
      borderRadius: '8px',
    }}
  >
    <div
      style={{
        backgroundColor: colorHex,
        width: '100%',
        height: '100%',
        border: '1px solid black',
      }}
    />
    <p>
      {colorName}: {colorHex}
    </p>
  </div>
);

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
