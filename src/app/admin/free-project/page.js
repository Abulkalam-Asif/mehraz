import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getPlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import { chevronLeftIcon } from "@/assets";
import { FreeProjectClientPage, H1 } from "@/components";
import Image from "next/image";
import Link from "next/link";

const FreeProject = async () => {
  const cities = await getCitiesFromDB(["id", "name"]);
  const plots = await getPlotsFromDB(["id", "area", "unit", "category"]);

  return (
    <>
      {/* for 1024px+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0px-1024px, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] sm:px-4">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center">
            <Link
              href={"/admin/projects"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1 text="Upload Free Project" className="mx-auto xl:text-2xl" />
          </div>
        </div>
        <FreeProjectClientPage cities={cities} plots={plots} />
      </section>
    </>
  );
};

export default FreeProject;
