import styles from './Textarea.module.scss';

interface TextareaProps {
  placeholder?: string;
  value?: string | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  labelText?: string;
}

const Textarea = ({ placeholder, value, onChange, name, labelText }: TextareaProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.field__label}>
        {labelText}
      </label>

      <textarea
        placeholder={placeholder}
        value={value ?? ''}
        className={styles.field__textarea}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Textarea;
