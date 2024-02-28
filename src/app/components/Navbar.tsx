import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex justify-between items-center py-4 px-16 border-b border-stone-200 max-md:justify-center max-md:flex-col max-md:space-y-4'>
        <Link href={'/'}>
          <h1 className='text-3xl font-bold'>app-todo</h1>
        </Link>
        <ul className='flex space-x-6 text-xl'>
            <li className='hover:underline'><Link href={'/'}>Home</Link></li>
            <li className='hover:underline'><a href="https://github.com/WoraponK/todo-local-next">GitHub</a></li>
        </ul>
    </nav>
  )
}

export default Navbar