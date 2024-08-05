const isBrowser = typeof window !== "undefined";

const getBookmarkedProjects = () => {
  if (!isBrowser) return [];
  const localStorageBookmarkedProjects = JSON.parse(
    localStorage.getItem("bookmarkedProjects"),
  );
  return localStorageBookmarkedProjects || [];
};

const setBookmarkedProjects = projects => {
  if (!isBrowser) return;
  localStorage.setItem("bookmarkedProjects", JSON.stringify(projects));
};

const getBookmarkedDesigns = () => {
  if (!isBrowser) return [];
  const localStorageBookmarkedDesigns = JSON.parse(
    localStorage.getItem("bookmarkedDesigns"),
  );
  return localStorageBookmarkedDesigns || [];
};

const setBookmarkedDesigns = designs => {
  if (!isBrowser) return;
  localStorage.setItem("bookmarkedDesigns", JSON.stringify(designs));
};

export {
  getBookmarkedProjects,
  setBookmarkedProjects,
  getBookmarkedDesigns,
  setBookmarkedDesigns,
};
