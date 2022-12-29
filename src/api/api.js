import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31396725-3e8f0bf1315c05b54d621a44f';
const PER_PAGE = 12;

export async function getImages(name, page) {
  const response = await axios.get(
    `${BASE_URL}/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return response.data;
}
