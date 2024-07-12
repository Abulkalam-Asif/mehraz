const convertRolesToRows = (roles, setRolesRows) => {
  const maxLength = Math.max(
    ...Object.values(roles)?.map((user) => user.length)
  );
  const rows = [];
  for (let i = 0; i < maxLength; i++) {
    rows.push([]);
  }
  for (const [key, value] of Object.entries(roles)) {
    for (let i = 0; i < maxLength; i++) {
      rows[i].push(value[i] || "");
    }
  }
  setRolesRows(rows);
};

export { convertRolesToRows };
