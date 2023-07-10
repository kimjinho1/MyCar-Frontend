export const getImageUrl = (imgUrl: string): string => {
  return `import.meta.env.VITE_BACKEND_URL/${imgUrl}`;
};
