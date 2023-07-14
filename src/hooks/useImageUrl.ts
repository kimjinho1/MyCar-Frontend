export const useImageUrl = (imagePath: string): string => {
  return import.meta.env.VITE_BACKEND_URL + imagePath;
};
