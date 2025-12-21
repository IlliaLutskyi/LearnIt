const Content = () => {
  return (
    <main className="flex flex-col gap-4 pb-20">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">
          Ready to take your skills further? Explore advanced learning paths
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex flex-col gap-4 bg-card text-card-foreground hover:shadow-lg hover:shadow-accent p-2 rounded-sm duration-400"
            >
              <h3 className="text-lg">{card.name}</h3>
              <p className="text-muted-foreground text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const cards = [
  {
    name: "Propmt engeneering",
    description: "Dive deep into building applications with AI help",
  },
  {
    name: "React development",
    description: "Build user interfaces with React and TypeScript",
  },
  {
    name: "Node.js development",
    description: "Build server-side applications with Node.js and TypeScript",
  },
  {
    name: "Python development",
    description: "Build server-side applications with Python and Django",
  },
  {
    name: "Go development",
    description: "Build server-side applications with Go and Gin",
  },
];

export default Content;
