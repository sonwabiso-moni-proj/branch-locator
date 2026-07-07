export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900">
          Branch Locator
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Use our branch locator below to find your nearest branch.
          Use the filters to see ATMs, branches or Smart ID services.
        </p>

        <div className="mt-10">
          <input
            type="text"
            placeholder="E.g. Cape Town, South Africa"
            autoComplete="off"
            role="combobox"
            className="
              w-full
              h-14
              rounded-xl
              border
              border-[#9ca9c6]
              bg-white
              px-5
              text-base
              placeholder:text-slate-400
              shadow-sm
              transition-all
              duration-200
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              focus:outline-none
            "
          />
        </div>
      </div>
    </header>
  );
}