import { ChevronDownIcon, SearchIcon } from "lucide-react";
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
        <div className="top-6 absolute flex justify-between items-center w-2/3 bg-white/5 backdrop-blur-md rounded-xl p-1 mx-auto shadow-lg border border-white/10">
            {/* Search input with glassmorphism effect */}
            <div className="flex flex-1 items-center gap-2 rounded-xl py-1 px-3 bg-white/5 focus-within:ring-2 focus-within:ring-blue-400/30 transition-all">
                <SearchIcon className="w-5 h-5 text-white/60" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full bg-transparent text-white placeholder-white/60 outline-none text-sm py-2"
                />
            </div>

            {/* Sort dropdown with modern styling */}
            <div className="flex items-center mx-2 relative">
                <select
                    value={sort}
                    onChange={handleSort}
                    className="appearance-none bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 pr-8 text-sm cursor-pointer outline-none hover:bg-white/15 transition-colors"
                >
                    <option className="bg-gray-800 text-white" value="latest">Latest</option>
                    <option className="bg-gray-800 text-white" value="oldest">Oldest</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 text-white/60 absolute right-3 pointer-events-none" />
            </div>

            {/* Clear button with smooth hover effect */}
            <button
                onClick={handleClearFilters}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 text-sm py-2 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all shadow-md hover:shadow-red-500/20 active:scale-95"
            >
                Clear Filters
            </button>
        </div>
    )
}