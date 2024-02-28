'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'

function aboutPage() {

    useEffect(() => {
        try {
            document.title = "About - AppTodo"
        } catch(e) {
            console.error(e);
        }
    }, [])

  return (
    <>
        <div className='grid grid-cols-1 justify-center space-y-4'>
            <h2 className='text-3xl font-bold text-center'>About</h2>
            <Image 
                src={'/images/profile.jpg'}
                width={250}
                height={250}
                alt='Profile'
                className='rounded-full justify-self-center'
            />
            <p className='text-lg indent-8'>Hi!, I'm Worapon Klabsri. This a todo list web app, it can create your todo list with no database, you can store your local data</p>
            <p className='text-lg indent-8'><span className='font-semibold'>Why I did this website?</span> because I want to practice my coding, And before I create this web I have to create website like with MySQL and database, But someday I think if want to create it has MySQL and database, That's it I have to create this website</p>
        </div>
    </>
  )
}

export default aboutPage