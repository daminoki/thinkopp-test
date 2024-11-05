import classnames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  className,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classnames(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
