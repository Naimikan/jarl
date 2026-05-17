export interface CheckmarkProps {
  checked?: boolean;
  id?: string;
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkmark = ({ id, indeterminate, checked, invalid }: CheckmarkProps) => (
  <div
    aria-hidden="true"
    className="jarl-checkbox__checkmark-container"
    data-checked={checked || undefined}
    data-invalid={invalid || undefined}
    id={id}
  >
    <svg aria-hidden="true" className="jarl-checkbox__checkmark" role="img" viewBox="0 0 14 14">
      <g>
        {indeterminate ? (
          <rect height="3" width="14" x="0" y="5.5" />
        ) : (
          <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
        )}
      </g>
    </svg>
  </div>
);
