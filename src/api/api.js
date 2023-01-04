import axios from 'axios';

const KEY = '31396725-3e8f0bf1315c05b54d621a44f';
const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const BASE_URL = 'https://pixabay.com/api/';

// const PER_PAGE = 12;

export async function getImages(name, page) {
  const { data } = await imagesApi.get(
    // `/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    `/`,
    {
      params: {
        key: KEY,
        q: name,
        page,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    }
  );
  return data;
}
