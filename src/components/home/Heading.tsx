import Link from "next/link";

const Heading = () => {
  return (
    <div className="flex flex-col gap-4 mt-[6rem] w-screen border-b-[1px] border-gray-200 pb-[5rem]">
      <section>
        <h1 className="text-3xl font-bold text-center">
          This platform is for those who wants to learn
        </h1>
        <p className="text-sm text-center">
          A lot of courses were made for you that includes quizes, videos and
          more...
        </p>
      </section>
      <section className="self-center">
        <button className="p-2 bg-purple-500 rounded-xs text-sm text-white  hover:scale-95 duration-500 focus:scale-95">
          <Link href="/courses">View courses</Link>
        </button>
      </section>
    </div>
  );
};

export default Heading;
