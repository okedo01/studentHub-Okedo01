import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Courses } from './Types'
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';

const Cards: React.FC = () => {
    const [courses, setCourses] = useState<Courses[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/data.json")
            .then((resouurce) => {
                if (!resouurce.ok) {
                    throw new Error("Failed to fetch data")
                }
                return resouurce.json();
            })
            .then((data: Courses[]) => {
                setCourses(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }, [])

    if(isLoading) return (
        <div className="loading">
            <div className="spinner">

            </div>
        </div>
    )
    if(error) return (
        <div className="error">
            { error }
        </div>
    )

    if(!courses) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {courses.map((course) => (
                <Card key={course.id} className="cards">
                    <CardHeader>
                        <CardTitle className="text-2xl">{ course.title }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text">{ course.description }</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <span>{ course.duration }</span>
                        <Link to="/register">
                            <Button variant="outline" className="cursor-pointer">Register</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Cards