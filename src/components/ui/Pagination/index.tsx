import classnames from 'classnames';
import Image from 'next/image';

import ArrowIcon from '@/assets/images/icons/arrow-icon.svg';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  className?: string;
}

const Pagination = ({ pageNumber, totalPages, className }: PaginationProps) => {
  const renderPaginationItems = () => {
    const items = [];

    items.push(1);

    if (totalPages <= 3) {
      for (let i = 2; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (pageNumber < 3) {
        items.push(2, '...', totalPages);
      } else if (pageNumber === totalPages) {
        items.unshift('...', totalPages - 1);
      } else {
        items.push(pageNumber - 1, pageNumber, '...', totalPages);
      }
    }

    return items.map((item, index) => (
      <span
        key={index}
        className={classnames(
          styles.pagination__item,
          item === pageNumber && styles.pagination__item_active,
        )}
      >
        {item}
      </span>
    ));
  };

  return (
    <div className={classnames(styles.pagination, className)}>
      {pageNumber !== 1 && (
        <button className={styles.pagination__button}>
          <Image src={ArrowIcon} alt="Предыдущий шаг" />
        </button>
      )}
      <div className={styles.pagination__pages}>{renderPaginationItems()}</div>
      <button className={styles.pagination__button}>
        <Image src={ArrowIcon} alt="Следующий шаг" />
      </button>
    </div>
  );
};

export default Pagination;
