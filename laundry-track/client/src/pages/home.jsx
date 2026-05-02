import React, { useState } from 'react';
import { Plus, Package, Shirt } from 'lucide-react';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import AddClothingModal from '../component/AddClothingModal';

const TAG_LABELS = {
  travel: 'Travel',
  sleeper: 'Sleeper',
  exercise: 'Exercise',
  casual: 'Casual',
  formal: 'Formal',
  work: 'Work',
};

// Collection Card Component
const CollectionCard = ({ collection, onSave, onOpenDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);

  const handleSave = () => {
    onSave({ ...collection, name });
    setIsEditing(false);
  };

  const itemCount = collection.clothes ? collection.clothes.length : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-semibold text-slate-900 border-b-2 border-teal-400 focus:outline-none w-full"
            />
          ) : (
            <h3 className="text-2xl font-semibold text-slate-900">{name}</h3>
          )}
          <p className="text-sm text-slate-500 mt-1">{itemCount} items</p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-teal-500 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Thumbnails preview */}
      {collection.clothes && collection.clothes.length > 0 && (
        <div className="flex -space-x-2 mb-4">
          {collection.clothes.slice(0, 4).map((c, i) => (
            <img
              key={i}
              src={c.image}
              alt={c.tag}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          ))}
          {collection.clothes.length > 4 && (
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
              +{collection.clothes.length - 4}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex-1 bg-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-500 transition-colors"
          >
            Save Changes
          </button>
        )}
        <button
          onClick={() => onOpenDetails(collection)}
          className="flex-1 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:text-teal-50 transition-colors hover:bg-slate-800"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Details Panel — shows clothes already added in a collection
const DetailsPanel = ({ collection, onAddClothing, onClose }) => {
  if (!collection) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {collection.name}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {collection.clothes ? collection.clothes.length : 0} items tracked
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onAddClothing}
              className="flex items-center gap-2 bg-teal-400 text-white font-medium px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Clothing
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 px-2"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6">
          {(!collection.clothes || collection.clothes.length === 0) && (
            <div className="text-center py-12">
              <Shirt className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-4">
                No clothing items yet. Add one to start tracking.
              </p>
              <button
                onClick={onAddClothing}
                className="inline-flex items-center gap-2 bg-teal-400 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Clothing
              </button>
            </div>
          )}

          {collection.clothes && collection.clothes.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {collection.clothes.map((c, i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50"
                >
                  <div className="aspect-square bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.note || c.tag}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wide text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                      {TAG_LABELS[c.tag] || c.tag}
                    </span>
                    {c.note && (
                      <p className="text-sm text-slate-700 mt-2 truncate">
                        {c.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Page Component
function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collections, setCollections] = useState([
    { id: 1, name: 'Weekly Laundry', clothes: [] },
    { id: 2, name: 'Delicates', clothes: [] },
    { id: 3, name: 'Bedding', clothes: [] },
  ]);
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const activeCollection =
    collections.find((c) => c.id === activeCollectionId) || null;

  const handleSaveCollection = (updated) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    );
  };

  const handleAddCollection = () => {
    const newCollection = {
      id: Date.now(),
      name: 'New Collection',
      clothes: [],
    };
    setCollections((prev) => [...prev, newCollection]);
  };

  const handleAddClothing = (clothing) => {
    if (!activeCollectionId) return;
    setCollections((prev) =>
      prev.map((c) =>
        c.id === activeCollectionId
          ? { ...c, clothes: [...(c.clothes || []), clothing] }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Collections
            </h1>
            <button
              onClick={handleAddCollection}
              className="flex items-center gap-2 bg-teal-400 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Collection</span>
            </button>
          </div>
          <p className="text-slate-600">
            Manage and organize your laundry collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onSave={handleSaveCollection}
              onOpenDetails={(c) => setActiveCollectionId(c.id)}
            />
          ))}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No collections yet
            </h3>
            <p className="text-slate-600 mb-6">
              Create your first collection to get started
            </p>
            <button
              onClick={handleAddCollection}
              className="inline-flex items-center gap-2 bg-teal-400 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Collection
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Details panel for the selected collection */}
      {activeCollection && (
        <DetailsPanel
          collection={activeCollection}
          onAddClothing={() => setIsAddOpen(true)}
          onClose={() => setActiveCollectionId(null)}
        />
      )}

      {/* Add clothing modal */}
      <AddClothingModal
        isOpen={isAddOpen}
        collectionName={activeCollection?.name}
        onClose={() => setIsAddOpen(false)}
        onConfirm={handleAddClothing}
      />
    </div>
  );
}

export default Home;
