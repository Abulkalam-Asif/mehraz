const checkIfValidUrl = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlPattern.test(url);
};

export default checkIfValidUrl;
