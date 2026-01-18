function CollectionCard()
{
    return(
        <div className='lg:w-full h-120 flex items-center justify-center sm:py-20 px-4 '>
        <div className='bg-white w-400 h-100 rounded-lg'> 
          <div className=' text-4xl text-center font-semibold py-4'>Collection</div>
          
          <div className='flex items-center justify-end py-65 px-5 '>
            <button className='bg-teal-400 rounded-full px-4 py-2 font-medium text-white hover:bg-teal-800 text-teal-100 hover:scale-108 hover:transition-all'>Save Changes</button>
            </div>
        </div>
        </div>
    )
}

export default CollectionCard;