import styles from '@/app/styles/Home.module.css';

export default function MapLegend() {
  return (
    <div className={`${styles.mapLegend} bg-white p-4 rounded-lg shadow-lg`}>
      <div>
        <div className='text-md font-bold p-2 text-center underline'>
          Color Legend
        </div>

        <div className='flex items-center my-2 mx-2'>
          <div className='w-5 h-5 bg-orange-400 rounded-full mr-2 ring-2 ring-inset ring-orange-700'></div>
          <span>Pothole</span>
        </div>
        
        <div className='flex items-center my-2 mx-2'>
          <div className='w-5 h-5 bg-green-400 rounded-full mr-2 ring-2 ring-inset ring-green-700'></div>
          <span>Fallen tree</span>
        </div>

        <div className='flex items-center my-2 mx-2'>
          <div className='w-5 h-5 bg-yellow-300 rounded-full mr-2 ring-2 ring-inset ring-yellow-600'></div>
          <span>Broken streetlight</span>
        </div>

        <div className='flex items-center my-2 mx-2'>
          <div className='w-5 h-5 bg-blue-400 rounded-full mr-2 ring-2 ring-inset ring-blue-700'></div>
          <span>Flooding</span>
        </div>
      </div>
    </div>
  );
}
