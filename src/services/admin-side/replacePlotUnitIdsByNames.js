export default function replacePlotUnitIdsByNames(plots, units) {
  return plots?.map(plot => ({
    ...plot,
    unit: units.find(unit => unit.id === plot.unit)?.name,
  }));
}
