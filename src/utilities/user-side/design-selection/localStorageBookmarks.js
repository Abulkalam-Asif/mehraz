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

export { getBookmarkedProjects, setBookmarkedProjects };
