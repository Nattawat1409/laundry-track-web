import './App.css' 
import Logo from './assets/Logo.png'
function App() {
  return (
    <div className="w-full h-full absolute bg-gradient-to-b from-teal-300 to-teal-100">
      <header className='flex justify-between items-center text-white py-6 px-8 md:px-32 bg-slate-100 drop-shadow-md'><a href="#"><img src={Logo} alt="Laundry Track Logo" className='w-52 hover:scale-105 transition-all' /></a>
      <ul className='hidden xl:flex items-center gap-12 font-semibold text-base '>
        <li className='hover:scale-105 transition-all text-teal-950'>Laundry</li>
        <li className='hover:scale-105 transition-all  text-teal-950'>Collections</li>
        <li className='hover:scale-105 transition-all  text-teal-950'>Add</li>
        <li className='hover:scale-105 transition-all  text-teal-950'>Account</li>
      </ul>
      </header>
    </div>
  )
}

export default App
