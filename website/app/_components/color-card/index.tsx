import styles from './index.module.scss';

export interface ColorCardProps {
  colorHex: string;
  colorName: string;
  selected?: boolean;
}

export const ColorCard = ({ colorName, colorHex }: ColorCardProps) => (
  <div className={styles.container}>
    <div className={styles.colorContainer} style={{ backgroundColor: colorHex }} />
    <div className={styles.colorNameContainer}>
      <span className={styles.colorName}>{colorName}</span>
    </div>
  </div>
);
