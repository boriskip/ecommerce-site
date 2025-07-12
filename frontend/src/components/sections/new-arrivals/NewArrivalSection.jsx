import BenefitsBar from './BenefitsBar';
// const newArrivalItems = [
//   {
//     title: "PlayStation 5",
//     subtitle: "Black and White version of the PS5 coming out on sale.",
//     image: "public/new-arrival/ps5.png",
//   },
//   {
//     title: "Women’s Collections",
//     subtitle: "Featured women collections that give you another vibe.",
//     image: "/public/new-arrival/attractive-woman-wearing-hat-posing-black-background 1.png",
//   },
//   {
//     title: "Speakers",
//     subtitle: "Amazon wireless speakers.",
//     image: "public/new-arrival/amazon.png",
//   },
//   {
//     title: "Perfume",
//     subtitle: "GUCCI INTENSE OUD EDP.",
//     image: "public/new-arrival/gucci.png",
//   },
// ];

export default function NewArrivalSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-8">
        <p className="text-sm text-red-500 font-medium mb-1">Featured</p>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        {newArrivalItems.map((item, index) => (
          <div
            key={index}
            className={`relative rounded overflow-hidden group 
              ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} 
              ${index === 1 ? "md:col-start-3 md:col-span-2 md:row-start-1" : ""}
            `}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm mb-2">{item.subtitle}</p>
              <button className="bg-white text-black text-xs px-3 py-1 rounded w-fit hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <BenefitsBar />
    </section>
  );
}