'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import ArrowIcon from '@/assets/images/icons/arrow-icon.svg';
import styles from './page.module.scss';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Pagination from '@/components/ui/Pagination';
import { FormData } from './entities/form';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genres: [],
    formats: [],
    unf: null,
    countries: [],
    price: null,
    synopsis: null,
  });
  const [errors, setErrors] = useState({
    title: '',
    genres: '',
    formats: '',
    unf: '',
    countries: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: 'genres' | 'formats' | 'countries',
  ) => {
    const { name, checked } = e.target;

    const updatedCategory = checked
      ? [...formData[category], name]
      : formData[category].filter((item) => item !== name);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: updatedCategory,
    }));

    validateField(category, updatedCategory);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name: string, value: string | string[]) => {
    let error = '';

    switch (name) {
      case 'title':
        if (typeof value === 'string' && value.trim() === '') {
          error = 'Заполните поле';
        }
        break;
      case 'genres':
      case 'formats':
      case 'countries':
        if (value.length === 0) {
          error = 'Заполните поле';
        }
        break;
      case 'unf':
        if (
          typeof value === 'string' &&
          value &&
          !/^(\d{3}-\d{3}-\d{3}-\d{2}-\d{3})?$/.test(value)
        ) {
          error = 'Неверный формат';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    validateForm();
  };

  const validateForm = () => {
    const { title, genres, formats, countries, unf } = formData;

    const isTitleValid = title.trim() !== '';
    const isGenresValid = genres.length > 0;
    const isFormatsValid = formats.length > 0;
    const isCountriesValid = countries.length > 0;
    const isUnfValid = !unf || /^(\d{3}-\d{3}-\d{3}-\d{2}-\d{3})?$/.test(unf);

    setIsFormValid(
      isTitleValid && isGenresValid && isFormatsValid && isCountriesValid && isUnfValid,
    );
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      console.log('Form data:', formData);

      localStorage.setItem('formData', JSON.stringify(formData));
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      genres: [],
      formats: [],
      unf: null,
      countries: [],
      price: null,
      synopsis: null,
    });
    setErrors({
      title: '',
      genres: '',
      formats: '',
      unf: '',
      countries: '',
    });
    setIsFormValid(false);
    localStorage.removeItem('formData');
  };

  return (
    <div className={styles.form}>
      <form className={styles.form__content} onSubmit={handleSubmit}>
        <div className={styles.form__header}>
          <h1 className={styles.form__title}>Производственные параметры фильма</h1>
          <Button className={styles.form__reset} onClick={handleReset}>
            Отменить заполнение
          </Button>
        </div>

        <div className={styles.form__body}>
          <div className={styles.form__column}>
            <Input
              placeholder="Название"
              labelText="Название проекта"
              value={formData.title}
              onChange={handleInputChange}
              name="title"
              error={errors.title}
            />

            <Select
              title="Жанр"
              options={['Комедия', 'Драма', 'Триллер']}
              placeholder={
                formData.genres.length > 0 ? formData.genres.join(', ') : 'Жанр'
              }
              onChange={(e) => handleCheckboxChange(e, 'genres')}
              selectedOptions={formData.genres}
              error={errors.genres}
            />

            <Select
              title="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
              options={['Онлайн-платформа', 'Большой экран', 'Интернет']}
              placeholder={
                formData.formats.length > 0 ? formData.formats.join(', ') : 'Формат'
              }
              onChange={(e) => handleCheckboxChange(e, 'formats')}
              selectedOptions={formData.formats}
              error={errors.formats}
            />

            <Input
              placeholder="890-000-000-00-000"
              labelText="№ УНФ или отсутствует"
              value={formData.unf}
              onChange={handleInputChange}
              name="unf"
              mask="000-000-000-00-000"
              error={errors.unf}
            />
          </div>
          <div className={styles.form__column}>
            <Select
              title="Страна-производитель (копродукция)"
              options={['Россия', 'Казахстан', 'Франция']}
              placeholder={
                formData.countries.length > 0 ? formData.countries.join(', ') : 'Страна'
              }
              onChange={(e) => handleCheckboxChange(e, 'countries')}
              selectedOptions={formData.countries}
              error={errors.countries}
            />

            <Input
              placeholder="Сметная стоимость"
              labelText="Сведения о сметной стоимости производства фильма 
              на территории Нижегородской области, если есть"
              value={formData.price}
              onChange={handleInputChange}
              name="price"
              type="number"
            />

            <Textarea
              placeholder="Напишите краткое изложение"
              labelText="Синопсис"
              value={formData.synopsis}
              onChange={handleTextareaChange}
              name="synopsis"
            />
          </div>
        </div>

        <div className={styles.form__footer}>
          <Button className={styles.form__back} type="button">
            <Image
              src={ArrowIcon}
              alt="Arrow icon"
              width={16}
              height={16}
              className={styles['form__back-icon']}
            />
            Предыдущий шаг
          </Button>
          <Pagination pageNumber={1} totalPages={4} className={styles.form__pagination} />
          <Button className={styles.form__submit} type="submit" disabled={!isFormValid}>
            Следующий шаг
            <Image
              src={ArrowIcon}
              alt="Arrow icon"
              width={16}
              height={16}
              className={styles['form__submit-icon']}
            />
          </Button>
        </div>
      </form>
    </div>
  );
}
