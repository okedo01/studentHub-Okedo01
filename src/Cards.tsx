import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Courses } from './Types'
import { Button } from './components/ui/button';

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

    return (
        <div>
            {courses.map((_, course) => (
                <Card>
                    <CardHeader>
                        <CardTitle>Introduction to Python</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Learn the basics of Python Programming</p>
                    </CardContent>
                    <CardFooter>
                        <span>8 weeks</span>
                        <Button>Register</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Cards