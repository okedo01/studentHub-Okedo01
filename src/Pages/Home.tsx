import Cards from '@/Cards'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <header>
        <h1 className="text-5xl text-start pb-5 text-blue-950">Courses</h1>
      </header>
      <main>
        <Cards />
      </main>
    </div>
  )
}

export default Home