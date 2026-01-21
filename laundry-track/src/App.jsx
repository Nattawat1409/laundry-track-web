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

      <div className='lg:w-full h-120 flex  items-center justify-center sm:py-20 px-4 '>
        <div className='bg-white w-400 h-100 rounded-lg'> 
          <div className=' text-4xl text-start font-semibold py-4 px-4'>Collection</div>
           {/* Card of collection clothes*/}
          <div className='bg-slate-200 w-90 h-40 rounded-lg mx-4 my-4'>
          <div className=' text-lg text-start font-medium py-4 px-4 flex flex-col  '>
            <h2 className='text-start text-xl '>Collection Name</h2>
            <h3 className='text-start text-sm/9 font-normal'>10 items</h3>
            <button className='bg-slate-300 text-slate-800 rounded-lg px-5 py-1 w-80 my-7  hover:bg-slate-800 hover:text-slate-100 '>Add more</button>
          </div>
          </div>
          
      
      <div className='flex items-center justify-end  px-5 '>
          <button className='bg-teal-400 rounded-full px-4 py-2 font-medium text-white hover:bg-teal-800 text-teal-100 hover:scale-108 hover:transition-all'>Save Changes</button>
      </div>
      </div>
       

          
        
      </div>
    </div>
  )
}

export default App
