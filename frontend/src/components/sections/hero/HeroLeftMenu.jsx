export default function HeroLeftMenu() {
  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];
return (
    <ul className="w-1/4 pr-4 space-y-2 text-sm font-medium">
      {categories.map((item, idx) => (
        <li key={idx} className="flex justify-between items-center hover:text-indigo-600 cursor-pointer whitespace-nowrap">
          {item}
          {(item.includes('Fashion')) && <span>➔</span>}
        </li>
      ))}
    </ul>
);
}