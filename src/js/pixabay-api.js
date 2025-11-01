import axios from 'axios';

const API_KEY = '53021043-6beb26dd5ed38e7bac2943366';
const BASE_URL = 'https://pixabay.com/api/';

/**
 *
 * @param {string} query
 * @param {number} page
 * @returns {Promise<object>}
 */
export async function getImagesByQuery(query, page) { 
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images from API');
  }
}