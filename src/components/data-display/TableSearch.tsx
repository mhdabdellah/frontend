const TableSearch = ({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder?: string }) => {
  return (
    <div className="relative">
      {/* Prefix Image */}
      <img
        src="/search.png" // Replace with your image path
        alt="prefix"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
      />
      
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search"}
        className="border pl-10 pr-2 text-gray-500 p-1 rounded w-full focus:ring-2 focus:ring-[#38b000] focus:border-1 focus:outline-none"
      />
    </div>
  );
};

export default TableSearch;
