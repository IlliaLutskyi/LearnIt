import Link from "next/link";

const Heading = () => {
  return (
    <div className="flex flex-col gap-4 mt-[6rem] w-full border-b-[1px] border-gray-200 pb-[5rem]">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome to our <span className="text-purple-600 ">LearnIt </span>
          platform
        </h1>
        <p className="text-sm text-center text-gray-600">
          The platform is designed to provide you with the best learning
          experience possible. Whether you are a student, a teacher, or a
          professional, our platform has everything you need to succeed.
        </p>
      </section>
      <section className="self-center">
        <button className="p-2 bg-purple-600 rounded-xs text-sm text-white  hover:scale-95 duration-500 focus:scale-95">
          <Link href="/courses">View courses</Link>
        </button>
      </section>
    </div>
  );
};

export default Heading;
