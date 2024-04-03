const createProjectGroupsArr = projects => {
  const projectGroupsArr = projects.reduce((acc, project, index) => {
    const arrayIndex = Math.floor(index / 2);
    acc[arrayIndex] = [...(acc[arrayIndex] || []), project];
    return acc;
  }, []);
  return projectGroupsArr;
};

export default createProjectGroupsArr;
