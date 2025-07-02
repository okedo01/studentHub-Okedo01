import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Courses } from './Types'
import { Button } from './components/ui/button'
import { Link } from 'react-router-dom'

const Cards: React.FC = () => {
  const [courses, setCourses] = useState<Courses[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json()
      })
      .then((data: Courses[]) => {
        setCourses(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-red-600 text-center mt-8 font-medium">
        {error}
      </div>
    )

  if (!courses) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 animate-fade-in">
      {courses.map((course, index) => (
        <Card
          key={course.id}
          className="cards transform transition duration-300 hover:scale-105 hover:shadow-xl opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">
              {course.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800">{course.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-blue-700 font-medium">{course.duration}</span>
            <Link to={`/courses/${course.id}`}>
              <Button variant="outline" className="transition duration-200 hover:bg-blue-100 hover:text-blue-900">
                Register
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Cards
