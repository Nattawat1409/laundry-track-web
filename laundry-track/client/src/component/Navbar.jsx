import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, LayoutGrid, User as UserIcon,
  LogOut, ListChecks, Settings,
} from 'lucide-react';
import LogoImage from '../assets/Logo_Nav.png';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/home', label: 'Collections', icon: LayoutGrid },
  { to: '/home?filter=at-laundry', label: 'At Laundry', icon: ListChecks },
];

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const path = to.split('?')[0];
  const active = location.pathname === path;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'text-teal-600 bg-teal-50'
          : 'text-slate-700 hover:text-teal-500 hover:bg-slate-50'
      }`}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    setMobileOpen(false);
    navigate('/login');
  };

  const initials =
    user?.fullName
      ?.split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?';

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/home' : '/'} className="flex items-center">
            <img src={LogoImage} alt="Laundry Track" className="w-40 h-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && user && (
              <>
                {navLinks.map((link) => (
                  <NavLink key={link.to} to={link.to}>
                    {link.label}
                  </NavLink>
                ))}

                {/* Account dropdown */}
                <div className="relative ml-2" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen((o) => !o)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-teal-300 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-teal-400 text-white text-xs font-semibold flex items-center justify-center">
                      {initials}
                    </span>
                    <span className="text-sm font-medium text-slate-700 max-w-[140px] truncate">
                      {user.fullName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setAccountOpen(false); navigate('/home'); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <UserIcon className="w-4 h-4" /> Account
                      </button>
                      <button
                        onClick={() => { setAccountOpen(false); navigate('/home'); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!loading && !user && (
              <Link
                to="/login"
                className="bg-teal-400 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {!loading && user && (
            <>
              <div className="flex items-center gap-3 px-2 py-2 mb-2 border-b border-slate-100">
                <span className="w-9 h-9 rounded-full bg-teal-400 text-white text-sm font-semibold flex items-center justify-center">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{user.fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Log out
              </button>
            </>
          )}
          {!loading && !user && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block bg-teal-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-500 text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
