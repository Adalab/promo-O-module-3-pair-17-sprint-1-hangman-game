const callToApi = () => {
  return fetch("https://palabras-aleatorias-public-api.herokuapp.com/random")
    .then((response) => response.json())
    .then((response) => {
      const result = {
        word: response.body.Word,
      };
      return result;
    });
};

export default callToApi;
