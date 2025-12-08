import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col gap-4 mt-24 w-full border-b-[1px] pb-20">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-center">
          Welcome to our <span className="">LearnIt </span>
          platform
        </h1>
        <p className="text-sm text-center text-muted-foreground">
          The platform is designed to provide you with the best learning
          experience possible. Whether you are a student, a teacher, or a
          professional, our platform has everything you need to succeed.
        </p>
      </section>
      <section className="self-center">
        <button className="p-2 bg-accent text-accent-foreground rounded-xs text-sm hover:scale-95 duration-500 focus:scale-95">
          <Link href="/courses">View courses</Link>
        </button>
      </section>
    </div>
  );
};

export default Header;
