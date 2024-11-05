'use client';

import { useState } from 'react';
import Image from 'next/image';

import ArrowIcon from '@/assets/images/icons/arrow-icon.svg';
import styles from './page.module.scss';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: 'genres' | 'formats' | 'countries',
  ) => {
    const { name, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]:
        checked && !prevFormData.genres.includes(name)
          ? [...prevFormData[category], name]
          : prevFormData[category].filter((item) => item !== name),
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className={styles.form}>
      {JSON.stringify(formData)}
      <form className={styles.form__content} onSubmit={handleSubmit}>
        <div className={styles.form__header}>
          <h1 className={styles.form__title}>Производственные параметры фильма</h1>
          <Button className={styles.form__reset}>Отменить заполнение</Button>
        </div>

        <div className={styles.form__body}>
          <div className={styles.form__column}>
            <Input
              placeholder="Название"
              labelText="Название проекта"
              value={formData.title}
              onChange={handleInputChange}
              name="title"
            />

            <Select
              title="Жанр"
              options={['Комедия', 'Драма', 'Триллер']}
              placeholder={
                formData.genres.length > 0 ? formData.genres.join(', ') : 'Жанр'
              }
              onChange={(e) => handleCheckboxChange(e, 'genres')}
              selectedOptions={formData.genres}
            />

            <Select
              title="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
              options={['Онлайн-платформа', 'Большой экран', 'Интернет']}
              placeholder={
                formData.formats.length > 0 ? formData.formats.join(', ') : 'Формат'
              }
              onChange={(e) => handleCheckboxChange(e, 'formats')}
              selectedOptions={formData.formats}
            />

            <Input
              placeholder="890-000-000-00-000"
              labelText="№ УНФ или отсутствует"
              value={formData.unf}
              onChange={handleInputChange}
              name="unf"
              mask="000-000-000-00-000"
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
          <Button className={styles.form__submit} type="submit">
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
