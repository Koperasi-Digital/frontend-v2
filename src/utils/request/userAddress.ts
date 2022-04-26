import axios from 'utils/axios';

export const getUserAddressBook = async (userId: string) => {
  try {
    const response = await axios.get(`user-addresses`, { params: { userId } });
    return response.data.payload;
  } catch (error) {
    console.error(error);
  }
};
