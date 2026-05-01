import React, { use , useEffect , useState} from 'react';
import { Zap, BarChart3, Clock, Users, ArrowRight, Droplets } from 'lucide-react';
import LogoImage from '../assets/Logo_Nav.png';
import LaundryImage from '../assets/Laundry_image.jpg';


function Navbar () {
    return(
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <img src={LogoImage} alt="Laundry Track" className="w-40 h-auto" />
                    <a
                      href="/login"
                      className="bg-teal-400 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-teal-500 transition-colors"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </nav>
    );
}

export default Navbar;