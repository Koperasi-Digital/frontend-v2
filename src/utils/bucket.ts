import axios from './axios';

export async function handleUploadFile(image: File, folderName: string, savedFileName: string) {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('folderName', folderName);
    formData.append('savedFileName', savedFileName);

    const response = await axios.post('bucket/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.imageUrl;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
