import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  value?: string | number | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  labelText?: string;
  type?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  name,
  labelText,
  type = 'text',
}: InputProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.field__label}>
        {labelText}
      </label>

      <input
        placeholder={placeholder}
        value={value ?? ''}
        className={styles.field__input}
        onChange={onChange}
        name={name}
        type={type}
      />
    </div>
  );
};

export default Input;
