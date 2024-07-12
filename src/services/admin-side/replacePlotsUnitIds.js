function replacePlotsUnitIdsByNames(plots, units) {
  return plots?.map(plot => ({
    ...plot,
    unit: units.find(unit => unit.id === plot.unit)?.name,
  }));
}

function replacePlotsUnitIdsByDocs(plots, units) {
  return plots?.map(plot => ({
    ...plot,
    unit: units.find(unit => unit.id === plot.unit),
  }));
}

export { replacePlotsUnitIdsByNames, replacePlotsUnitIdsByDocs };
