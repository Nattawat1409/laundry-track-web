import React, { use } from 'react';
import { Zap, BarChart3, Clock, Users, ArrowRight, Droplets } from 'lucide-react';
import LogoImage from '../assets/Logo_Nav.png';
import LaundryImage from '../assets/Laundry_image.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';

function LandingPage() {
  const [count,setCount] = useState(0);
  const [name,setName] = useState("John Doe");
  // const [array,setArray] = useState([]);


  // // we create asynchornously function //
  // const fetchAPI = async() =>{
  //   const response = await axios.get("http://localhost:3000/register");
  //   setArray(response.data.message);
  //   console.log(response.data.message);
  // }

  // useEffect(()=> {
  //   fetchAPI();
  // },[]);

  // usEffect Hook 
  // useEffect(() =>{
  //   document.title = `You clicked ${count} times`;
  // },[count]);
  

  // useEffect(()=> {
  //   const handleResize = () =>{
  //     console.log(`resized window : Window width: ${window.innerWidth}, Window height: ${window.innerHeight}`);
  //   }

  //   // call function //
  //   window.addEventListener("resize",handleResize);

  //   return () =>{
  //     window.removeEventListener("resize",handleResize);
  //   }
  // },[])
  

  return (
    
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Keep Your Laundry <span className="text-teal-400">Organized</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Never lose track of your laundry again. Laundry Track helps you manage, organize, and monitor your laundry collections with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center bg-teal-400 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-teal-500 transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center border-2 border-teal-400 text-teal-400 font-semibold px-8 py-3.5 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Sign In
                </a>
              </div>
              <p className="text-slate-500 text-sm mt-6">✓ Free forever • ✓ No credit card • ✓ Easy setup</p>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full h-96">
                <img src={LaundryImage} alt="Laundry Illustration" className="w-full h-full object-cover rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Laundry Track?
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to manage laundry efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Save Time</h3>
              <p className="text-slate-600">
                Stop juggling multiple systems. Track everything in one place and save hours every week.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Stay Organized</h3>
              <p className="text-slate-600">
                Create collections, categorize items, and maintain perfect organization of all your laundry.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600">
                Blazing-fast performance with a beautiful, intuitive interface designed for simplicity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">
                Perfect for Everyone
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-400 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">For Families</h3>
                    <p className="text-slate-600 mt-2">
                      Manage laundry for the whole family with shared collections and easy tracking.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-400 text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">For Busy Professionals</h3>
                    <p className="text-slate-600 mt-2">
                      Never worry about laundry again. Organize and track with just a few clicks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-400 text-white">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">For Laundromat Owners</h3>
                    <p className="text-slate-600 mt-2">
                      Manage customer laundry items and collections efficiently and professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-4xl font-bold text-teal-400">10K+</p>
                  <p className="text-slate-600">Active Users</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">100K+</p>
                  <p className="text-slate-600">Laundry Collections Tracked</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">99.9%</p>
                  <p className="text-slate-600">Uptime Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Join thousands of users already managing their laundry with Laundry Track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center bg-teal-400 text-white font-semibold px-8 py-4 rounded-lg hover:bg-teal-500 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Sign Up (It's Free)
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center border-2 border-teal-400 text-teal-400 font-semibold px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors text-lg"
            >
              Already a Member? Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                <li><a href="#twitter" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#facebook" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#instagram" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex justify-between items-center">
            <p className="text-sm">&copy; 2024 Laundry Track. All rights reserved.</p>
            <a href="/login" className="text-teal-400 hover:text-teal-300 font-semibold">
              Sign In
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
