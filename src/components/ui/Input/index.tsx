import { IMaskInput } from 'react-imask';

import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  value?: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  labelText?: string;
  type?: string;
  mask?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  name,
  labelText,
  type = 'text',
  mask,
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
          className={styles.field__input}
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
          className={styles.field__input}
          onChange={onChange}
          name={name}
          type={type}
        />
      )}
    </div>
  );
};

export default Input;
