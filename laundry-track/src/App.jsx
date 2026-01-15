import './App.css' 
import Logo from './assets/Logo_Nav.png'
function App() {
  return (
    // Navbar
    <div className="w-full h-full absolute bg-gradient-to-r from-teal-200 to-emerald-200">
      <header className='flex justify-between items-center py-6 px-8 md:px-32 bg-slate-100 drop-shadow-md'><a href="#"><img src={Logo} alt="Laundry Track Logo" className='w-52 hover:scale-105 transition-all' /></a>
      <ul className='hidden xl:flex items-center gap-12 font-semibold text-base '>
        <li className='hover:scale-105 transition-all text-slate-950 hover:text-teal-400'>Laundry</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Collections</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Add</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Account</li>
      </ul>
      </header>
    </div>
  )
}

export default App
