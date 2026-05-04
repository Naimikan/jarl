import styles from './index.module.scss';

export const PreviewBox = ({ children }) => (
  <div className={`${styles['preview-box']} x:bg-white x:dark:bg-black`}>{children}</div>
);
