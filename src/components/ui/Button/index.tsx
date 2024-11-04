import classnames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ className, children, type = 'button' }: ButtonProps) => {
  return (
    <button type={type} className={classnames(styles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
