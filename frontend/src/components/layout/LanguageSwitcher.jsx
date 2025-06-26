export default function LanguageSwitcher() {
return (
    <div className="relative max-w-[80px] w-full">
      <select
        className="bg-black text-white text-sm px-2 py-1 border border-white rounded-md w-full"
        defaultValue="en"
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="fr">FR</option>
      </select>
    </div>
);
}