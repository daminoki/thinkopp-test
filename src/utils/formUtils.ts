export const validateField = (name: string, value: string | string[]) => {
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

  return error;
};

export const resetFormData = () => ({
  title: '',
  genres: [],
  formats: [],
  unf: null,
  countries: [],
  price: null,
  synopsis: null,
});
