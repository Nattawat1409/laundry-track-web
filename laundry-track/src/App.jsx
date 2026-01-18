import './App.css' 
import Logo from './assets/Logo_Nav.png'
function App() {
  return (
    
    <div className="w-full h-full absolute bg-gradient-to-r from-teal-200 to-emerald-200">
      {/* Navbar */}
      <header className='flex justify-between items-center py-6 px-8 md:px-32 bg-slate-100 drop-shadow-md'><a href="#"><img src={Logo} alt="Laundry Track Logo" className='w-52 hover:scale-105 transition-all' /></a>
      <ul className='hidden xl:flex items-center gap-12 font-semibold text-base '>
        <li className='hover:scale-105 transition-all text-slate-950 hover:text-teal-400'>Laundry</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Collections</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Add</li>
        <li className='hover:scale-105 transition-all  text-slate-950 hover:text-teal-400'>Account</li>
      </ul>
      </header>

      <div className='lg:w-full h-120 flex items-center justify-center sm:py-20 px-4 '>
        <div className='bg-white w-400 h-100 rounded-lg'> 
          <div className=' text-4xl text-center font-semibold py-4'>Collection
      </div>

      
      <div className='flex items-center justify-end py-65 px-5 '>
          <button className='bg-teal-400 rounded-full px-4 py-2 font-medium text-white hover:bg-teal-800 text-teal-100 hover:scale-108 hover:transition-all'>Save Changes</button>
      </div>
      </div>
       

          
        
      </div>
    </div>
  )
}

export default App
