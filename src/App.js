import {  RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Router';

function App() {
  return (
    <div className='max-w-[1440px]'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
