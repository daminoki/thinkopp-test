import { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import styles from './Select.module.scss';

interface SelectProps {
  title?: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  selectedOptions: string[];
  error?: string;
}

const Select = ({
  title,
  options,
  onChange,
  placeholder,
  selectedOptions,
  error,
}: SelectProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.select}>
      <p className={styles.select__title}>{title}</p>

      <div className={styles.select__element} ref={selectRef}>
        <button
          type="button"
          className={classnames(styles.select__header, {
            [styles.select__header_opened]: isOpened,
            [styles.select__header_filled]: selectedOptions.length > 0,
            [styles.select__header_error]: error,
          })}
          onClick={handleSelectClick}
        >
          {placeholder}
        </button>

        <div
          className={classnames(styles.select__body, {
            [styles.select__body_opened]: isOpened,
          })}
        >
          <ul className={styles.select__list}>
            {options.map((option) => (
              <li className={styles.select__item} key={option}>
                <input
                  type="checkbox"
                  className={styles.select__input}
                  id={option}
                  name={option}
                  value={option}
                  onChange={onChange}
                  checked={selectedOptions.includes(option)}
                />
                <label htmlFor={option} className={styles.select__label}>
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && <span className={styles.select__error}>{error}</span>}
    </div>
  );
};

export default Select;
