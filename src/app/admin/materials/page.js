import useMaterialCategoriesFromDb from "@/Firebase/admin-side/materials/material-categories/getMaterialCategoriesFromDb";
import useMaterialsFromDb from "@/Firebase/admin-side/materials/materials/getMaterialsFromDb";
import { chevronLeftIcon } from "@/assets";
import { H1, MaterialsClientPage } from "@/components";
import Image from "next/image";
import Link from "next/link";

const Materials = async () => {
  const materials = await useMaterialsFromDb();
  const materialCategories = await useMaterialCategoriesFromDb();

  return (
    <>
      {/* for 1024px+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0px-1024px, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1 text="materials upload" className="mx-auto xl:text-2xl" />
          </div>
        </div>
        <MaterialsClientPage
          materials={materials}
          materialCategories={materialCategories}
        />
      </section>
    </>
  );
};

export default Materials;
