import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex justify-between items-center h-[80px] px-16 border-b border-stone-200'>
        <h1 className='text-3xl font-bold'>app-todo</h1>
        <ul className='flex space-x-4 text-xl'>
            <li className='hover:underline'><Link href={'/'}>Home</Link></li>
            <li className='hover:underline'><Link href={'/about'}>About</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar