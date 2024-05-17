import { H2, Spinner, Td, Th, Table, RACContainer } from "@/components";

const RolesSection = ({ rolesRows }) => {
  return (
    <>
      <RACContainer
        title={"Roles"}
        className="row-span-2 flex flex-col lg:w-full lg:overflow-y-hidden lg:row-span-full">
        <H2 text="roles" className="mb-2" />
        {rolesRows ? (
          rolesRows.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="bg-accent-1-base text-sm">
                <tr>
                  <Th position="beginning" className="w-1/3">
                    admin
                  </Th>
                  <Th className="w-1/3">architect</Th>
                  <Th position="end" className="w-1/3">
                    receptionist
                  </Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {rolesRows?.map((row, i) => (
                  <tr key={i}>
                    {row?.map((user, j) => (
                      <Td
                        key={j}
                        position={
                          j === 0
                            ? "beginning"
                            : j === row.length - 1
                            ? "end"
                            : "middle"
                        }
                        isLastRow={i === rolesRows?.length - 1}>
                        {user}
                      </Td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No roles added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading roles..." />
          </div>
        )}
      </RACContainer>
    </>
  );
};

export default RolesSection;
