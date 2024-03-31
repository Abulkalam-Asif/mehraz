import useMaterialCategoriesFromDb from "@/Firebase/admin-side/materials/material-categories/getMaterialCategoriesFromDb";
import useMaterialsFromDb from "@/Firebase/admin-side/materials/materials/getMaterialsFromDb";
import usePropertiesFromDb from "@/Firebase/admin-side/materials/properties/getPropertiesFromDb";
import useCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import { chevronLeftIcon } from "@/assets";
import { H1, MaterialsClientPage } from "@/components";
import Image from "next/image";
import Link from "next/link";

const Materials = async () => {
  const materials = await useMaterialsFromDb([
    "id",
    "name",
    "vendor",
    "rate",
    "category",
    "description",
    "specs",
    "orderedAs",
    "image1",
    "image2",
  ]);
  const materialCategories = await useMaterialCategoriesFromDb([
    "id",
    "name",
    "coverImage",
    "fixCoverImage",
    "fixedMaterialId",
  ]);
  const properties = await usePropertiesFromDb([
    "id",
    "area",
    "description",
    "location",
    "demand",
    "city",
    "type",
  ]);
  const cities = await useCitiesFromDB(["id", "name"]);

  return (
    <>
      {/* for 1024px+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0px-1024px, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto sm:px-4">
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
          properties={properties}
          cities={cities}
        />
      </section>
    </>
  );
};

export default Materials;
