import React, { useState, useEffect } from 'react';
import { Plus, Home as HomeIcon, Package, User } from 'lucide-react';
import Navbar from '../component/navbar';
import Footer from '../component/footer';

// Collection Card Component


// Collection Card Component
const CollectionCard = ({ collection, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);
  const [items, setItems] = useState(collection.items);

  const handleSave = () => {
    onSave({ ...collection, name, items });
    setIsEditing(false);
  };

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
          <p className="text-sm text-slate-500 mt-1">{items} items</p>
        </div>
        
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-teal-500 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="flex items-center gap-3">
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex-1 bg-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-500 transition-colors"
          >
            Save Changes
          </button>
        )}
        <button className="flex-1 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:text-teal-50 transition-colors hover:bg-slate-800 ">
          View Details
        </button>
      </div>
    </div>
  );
};

// Main Page Component
function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collections, setCollections] = useState([
    { id: 1, name: 'Weekly Laundry', items: 12 },
    { id: 2, name: 'Delicates', items: 8 },
    { id: 3, name: 'Bedding', items: 5 }
  ]);

  const handleSaveCollection = (updatedCollection) => {
    setCollections(collections.map(c => 
      c.id === updatedCollection.id ? updatedCollection : c
    ));
  };

  const handleAddCollection = () => {
    const newCollection = {
      id: collections.length + 1,
      name: 'New Collection',
      items: 0
    };
    setCollections([...collections, newCollection]);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Collections</h1>
            <button
              onClick={handleAddCollection}
              className="flex items-center gap-2 bg-teal-400 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Collection</span>
            </button>
          </div>
          <p className="text-slate-600">Manage and organize your laundry collections</p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onSave={handleSaveCollection}
            />
          ))}
        </div>

        {/* Empty State */}
        {collections.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No collections yet</h3>
            <p className="text-slate-600 mb-6">Create your first collection to get started</p>
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
    </div>
  );
}

export default Home;
