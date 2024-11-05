import { IMaskInput } from 'react-imask';
import classnames from 'classnames';

import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  value?: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  labelText?: string;
  type?: string;
  mask?: string;
  error?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  name,
  labelText,
  type = 'text',
  mask,
  error,
}: InputProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.field__label}>
        {labelText}
      </label>

      {mask ? (
        <IMaskInput
          placeholder={placeholder}
          value={(value as string) ?? ''}
          className={classnames(styles.field__input, {
            [styles.field__input_error]: error,
          })}
          name={name}
          mask={mask}
          onAccept={(value: string) =>
            onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      ) : (
        <input
          placeholder={placeholder}
          value={value ?? ''}
          className={classnames(styles.field__input, {
            [styles.field__input_error]: error,
          })}
          onChange={onChange}
          name={name}
          type={type}
        />
      )}

      {error && <span className={styles.field__error}>{error}</span>}
    </div>
  );
};

export default Input;
