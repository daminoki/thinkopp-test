import classnames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ className, children, type = 'button', disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      className={classnames(styles.button, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
