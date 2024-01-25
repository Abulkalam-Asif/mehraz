import { Button, H2, Th, Td } from "@/components";
import { Table } from ".";

const CurrenciesSectionDesktop = ({ plots }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <H2 text="plots" />
        <Table border={false} className="h-full overflow-y-auto px-3 py-2">
          <thead className="text-sm">
            <tr>
              <Th position="beginning" className="w-1/2">
                area
              </Th>
              <Th position="end" className="w-1/2">
                unit
              </Th>
            </tr>
          </thead>
          <tbody className="text-xs font-semibold">
            {plots.map((plot, i) => (
              <tr key={i}>
                <Td position="beginning" isLastRow={i === plots.length - 1}>
                  {plot.area}
                </Td>
                <Td position="end" isLastRow={i === plots.length - 1}>
                  {plot.unit}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button text="add plot" className="text-xs mr-auto" />
      </div>
    </>
  );
};

export default CurrenciesSectionDesktop;
