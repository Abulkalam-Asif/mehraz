import { H1, PreviewClientPage } from "@/components";

const Preview = () => {
  return (
    <>
      <section className="px-8 sm:px-4">
        <div className="max-w-8xl w-full mx-auto h-24 xl:h-20">
          <H1 text="Final look" />
        </div>
        <PreviewClientPage />
      </section>
    </>
  );
};

export default Preview;
