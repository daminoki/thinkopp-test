'use client';

import { useState } from 'react';

import styles from './page.module.scss';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { FormData } from './entities/form';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genres: [],
    formats: [],
    unf: null,
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
    category: 'genres' | 'formats',
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

  return (
    <div className={styles.form}>
      {JSON.stringify(formData)}
      <div className={styles.form__header}>
        <h1 className={styles.form__title}>Производственные параметры фильма</h1>
        <Button className={styles.form__reset}>Отменить заполнение</Button>
      </div>

      <form className={styles.form__body}>
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
            placeholder={formData.genres.length > 0 ? formData.genres.join(', ') : 'Жанр'}
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
            type="number"
          />
        </div>
        <div className={styles.form__column}></div>
      </form>
    </div>
  );
}
