import React from 'react';
import FYQ_logo from '../assets/images/FYQ_logo.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='flex w-full bg-black border-8 border-red h-16'>
      <div className='flex justify-center items-center h-16 w-auto p-4 border-black'>
        <Image src={FYQ_logo} alt='FYQ_logo' height={64} />
      </div>
    </div>
  );
};
export default Navbar;
