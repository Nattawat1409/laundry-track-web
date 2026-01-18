import './App.css' 
import LogoImage from './assets/Logo_Nav.png'
import React, { useState } from 'react';
import { Plus, Home, Package, User, Menu, X } from 'lucide-react';



// Navigation component
const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { label: 'Laundry', icon: Home, href: '#laundry' },
    { label: 'Collections', icon: Package, href: '#collections' },
    { label: 'Account', icon: User, href: '#account' },
  ];

  return (

    // Navbar
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img src={LogoImage} alt="Logo" className='w-52 hover:scale-105 transition-all' />
          <a href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-slate-600 hover:text-teal-300 font-medium flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-teal-500 rounded-lg hover:scale-105 transition-all"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

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

// Main App Component
function App() {
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
    <div className="min-h-screen bg-slate-50">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
    </div>
  );
}

export default App;
