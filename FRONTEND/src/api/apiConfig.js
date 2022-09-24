const apiConfig = {
  baseUrl: "http://localhost:5000/",
  accessToken: localStorage.getItem("accessToken"),
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

// const apiConfig = {
//     baseUrl: 'https://api.themoviedb.org/3/',
//     apiKey: 'get from themoviedb.org',
//     originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
//     w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
// }
