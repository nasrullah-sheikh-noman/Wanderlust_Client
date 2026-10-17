import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex justify-between gap-6 p-3 bg-white'>
      <ul className='flex gap-4'>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/my_booking'}>My Booking</Link></li>
        <li><Link href={'/destinations'}>Destinations</Link></li>
      </ul>
      <div>
        <h4 className='text-2xl font-bold text-cyan-500'>Wanderlust</h4>
      </div>
      <ul className='flex gap-4'>
        <li><Link href={'/profile'}>Profile</Link></li>
        <li><Link href={'/login'}>Login</Link></li>
        <li><Link href={'/signup'}>Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;