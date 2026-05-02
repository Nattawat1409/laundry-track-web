import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Package, Shirt, CheckCircle2, Clock3, Trash2 } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import AddClothingModal, { DEFAULT_TAGS } from '../component/AddClothingModal';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY_PREFIX = 'laundryTrackData';

const tagLabel = (tagId, customTags) => {
  const all = [...DEFAULT_TAGS, ...customTags];
  return all.find((t) => t.id === tagId)?.label || tagId;
};

const initialCollections = () => [
  { id: 1, name: 'Weekly Laundry', clothes: [] },
  { id: 2, name: 'Delicates', clothes: [] },
  { id: 3, name: 'Bedding', clothes: [] },
];

// Collection Card
const CollectionCard = ({ collection, onSave, onOpenDetails, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);

  const handleSave = () => {
    onSave({ ...collection, name });
    setIsEditing(false);
  };

  const total = collection.clothes?.length || 0;
  const atLaundry = collection.clothes?.filter((c) => !c.returned).length || 0;
  const returned = total - atLaundry;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-semibold text-slate-900 border-b-2 border-teal-400 focus:outline-none w-full"
            />
          ) : (
            <h3 className="text-2xl font-semibold text-slate-900 truncate">{name}</h3>
          )}
          <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
            <span>{total} items</span>
            {total > 0 && (
              <>
                <span className="text-amber-600 inline-flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" /> {atLaundry} at laundry
                </span>
                <span className="text-emerald-600 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {returned} returned
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-teal-500 transition-colors text-sm"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Thumbnails */}
      {collection.clothes && collection.clothes.length > 0 && (
        <div className="flex -space-x-2 mb-4">
          {collection.clothes.slice(0, 4).map((c) => (
            <img
              key={c.id}
              src={c.image}
              alt={c.tag}
              className={`w-10 h-10 rounded-full object-cover border-2 border-white ${
                c.returned ? 'opacity-60' : ''
              }`}
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
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-500 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete collection "${collection.name}"?`)) {
                  onDelete(collection.id);
                }
              }}
              className="px-3 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              aria-label="Delete collection"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => onOpenDetails(collection)}
            className="flex-1 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:text-teal-50 transition-colors hover:bg-slate-800"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

// Details Panel
const DetailsPanel = ({
  collection,
  customTags,
  onAddClothing,
  onClose,
  onToggleReturned,
  onDeleteClothing,
  initialFilter = 'all',
}) => {
  const [filter, setFilter] = useState(initialFilter);
  if (!collection) return null;

  const clothes = collection.clothes || [];
  const visible =
    filter === 'all'
      ? clothes
      : filter === 'at-laundry'
      ? clothes.filter((c) => !c.returned)
      : clothes.filter((c) => c.returned);

  const counts = {
    all: clothes.length,
    'at-laundry': clothes.filter((c) => !c.returned).length,
    returned: clothes.filter((c) => c.returned).length,
  };

  const FilterPill = ({ value, label }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        filter === value
          ? 'bg-teal-400 text-white border-teal-400'
          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
      }`}
    >
      {label} <span className="opacity-75">({counts[value]})</span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-slate-900 truncate">
              {collection.name}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {clothes.length} items tracked
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
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

        <div className="px-6 pt-4 flex flex-wrap gap-2">
          <FilterPill value="all" label="All" />
          <FilterPill value="at-laundry" label="At Laundry" />
          <FilterPill value="returned" label="Returned" />
        </div>

        <div className="p-6">
          {visible.length === 0 && (
            <div className="text-center py-12">
              <Shirt className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-4">
                {clothes.length === 0
                  ? 'No clothing items yet. Add one to start tracking.'
                  : filter === 'at-laundry'
                  ? 'Nothing currently at the laundry — everything is back!'
                  : 'No items have been marked as returned yet.'}
              </p>
              {clothes.length === 0 && (
                <button
                  onClick={onAddClothing}
                  className="inline-flex items-center gap-2 bg-teal-400 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Clothing
                </button>
              )}
            </div>
          )}

          {visible.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {visible.map((c) => (
                <div
                  key={c.id}
                  className={`border rounded-lg overflow-hidden bg-slate-50 ${
                    c.returned ? 'border-emerald-200' : 'border-slate-200'
                  }`}
                >
                  <div className="aspect-square bg-slate-100 relative">
                    <img
                      src={c.image}
                      alt={c.note || c.tag}
                      className={`w-full h-full object-cover ${
                        c.returned ? 'opacity-70' : ''
                      }`}
                    />
                    {c.returned && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Returned
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                      {tagLabel(c.tag, customTags)}
                    </span>
                    {c.note && (
                      <p className="text-sm text-slate-700 truncate">{c.note}</p>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!c.returned}
                          onChange={() => onToggleReturned(collection.id, c.id)}
                          className="w-3.5 h-3.5 accent-emerald-500"
                        />
                        Got it back
                      </label>
                      <button
                        onClick={() => {
                          if (confirm('Remove this item?')) {
                            onDeleteClothing(collection.id, c.id);
                          }
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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

// Main Page
function Home() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get('filter');

  const storageKey = `${STORAGE_KEY_PREFIX}:${user?.id || 'guest'}`;

  const [collections, setCollections] = useState(initialCollections);
  const [customTags, setCustomTags] = useState([]);
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount / when user changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.collections)) setCollections(data.collections);
        if (Array.isArray(data.customTags)) setCustomTags(data.customTags);
      } else {
        setCollections(initialCollections());
        setCustomTags([]);
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  // Persist on change (DB-ready JSON shape)
  useEffect(() => {
    if (!hydrated) return;
    const payload = {
      version: 1,
      userId: user?.id || null,
      updatedAt: new Date().toISOString(),
      collections,
      customTags,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // localStorage might be full from base64 images
    }
  }, [collections, customTags, hydrated, storageKey, user]);

  const activeCollection = useMemo(
    () => collections.find((c) => c.id === activeCollectionId) || null,
    [collections, activeCollectionId]
  );

  // Auto-open the "first" collection if URL filter requests it
  const initialDetailsFilter = urlFilter === 'at-laundry' ? 'at-laundry' : 'all';

  const handleSaveCollection = (updated) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    );
  };

  const handleAddCollection = () => {
    setCollections((prev) => [
      ...prev,
      { id: Date.now(), name: 'New Collection', clothes: [] },
    ]);
  };

  const handleDeleteCollection = (id) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    if (activeCollectionId === id) setActiveCollectionId(null);
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

  const handleToggleReturned = (collectionId, clothingId) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id !== collectionId
          ? c
          : {
              ...c,
              clothes: c.clothes.map((cl) =>
                cl.id !== clothingId
                  ? cl
                  : {
                      ...cl,
                      returned: !cl.returned,
                      returnedAt: !cl.returned ? new Date().toISOString() : null,
                    }
              ),
            }
      )
    );
  };

  const handleDeleteClothing = (collectionId, clothingId) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id !== collectionId
          ? c
          : { ...c, clothes: c.clothes.filter((cl) => cl.id !== clothingId) }
      )
    );
  };

  const handleAddCustomTag = (tag) => {
    setCustomTags((prev) =>
      prev.some((t) => t.id === tag.id) ? prev : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

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
            {user && (
              <>
                {' '}
                — welcome back,{' '}
                <span className="font-medium text-slate-800">
                  {user.fullName.split(' ')[0]}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onSave={handleSaveCollection}
              onDelete={handleDeleteCollection}
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

      {activeCollection && (
        <DetailsPanel
          collection={activeCollection}
          customTags={customTags}
          onAddClothing={() => setIsAddOpen(true)}
          onClose={() => setActiveCollectionId(null)}
          onToggleReturned={handleToggleReturned}
          onDeleteClothing={handleDeleteClothing}
          initialFilter={initialDetailsFilter}
        />
      )}

      <AddClothingModal
        isOpen={isAddOpen}
        collectionName={activeCollection?.name}
        customTags={customTags}
        onAddCustomTag={handleAddCustomTag}
        onClose={() => setIsAddOpen(false)}
        onConfirm={handleAddClothing}
      />
    </div>
  );
}

export default Home;
