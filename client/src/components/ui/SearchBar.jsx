import { ChevronDown, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchBar({ notes, setNotes }) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");
    const [originalNotes, setOriginalNotes] = useState([]); // Store original notes

    // Initialize original notes when parent's notes change
    useEffect(() => {
        if (notes.length > 0 && originalNotes.length === 0) {
            setOriginalNotes(notes);
        }
    }, [notes]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length > 0) {
            const filteredNotes = originalNotes.filter((note) =>
                note.title.toLowerCase().includes(value.toLowerCase())
            );
            setNotes(filteredNotes);
        } else {
            // Reset to original notes instead of refetching
            setNotes(originalNotes);
        }
    };

    const handleSort = (e) => {
        const value = e.target.value;
        setSort(value);

        // Create a new array before sorting to avoid mutation
        const notesToSort = [...notes];
        const sortedNotes = value === "latest"
            ? notesToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : notesToSort.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setNotes(sortedNotes);
    };

    const handleClearFilters = () => {
        setSearch("");
        setSort("latest");
        setNotes(originalNotes); // Reset to original notes
    };

    return (
        <div className="top-6 absolute flex justify-between items-center w-2/3 bg-white/90 backdrop-blur-sm rounded-xl p-1.5 mx-auto shadow-md border border-amber-200/50">
          {/* Search input */}
          <div className="flex flex-1 items-center gap-2 rounded-lg py-1 px-3 bg-white focus-within:ring-2 focus-within:ring-amber-300/50 transition-all">
            <Search className="w-5 h-5 text-amber-800/60" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={handleSearch}
              className="w-full bg-transparent text-gray-900 placeholder-amber-800/40 outline-none text-sm py-1.5"
            />
          </div>
      
          {/* Sort dropdown */}
          <div className="flex items-center mx-2 relative">
            <select
              value={sort}
              onChange={handleSort}
              className="appearance-none bg-white border border-amber-200 text-gray-900 rounded-lg px-3 py-1.5 pr-7 text-sm cursor-pointer outline-none hover:border-amber-300 transition-colors"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown className="w-4 h-4 text-amber-800/60 absolute right-2 pointer-events-none" />
          </div>
      
          {/* Clear button */}
          <button
            onClick={handleClearFilters}
            className="bg-amber-600 text-white px-4 text-sm py-1.5 rounded-lg hover:bg-amber-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        </div>
      );
}