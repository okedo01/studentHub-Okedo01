import React, { useEffect } from 'react'
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

const Cards: React.FC = () => {
    useEffect(() => {
        fetch("/data.json")
            .then((resouurce) => {
                if(!resouurce.ok) {
                    throw new Error("Failed to fetch data")
                }
                return resouurce.json();
            })
            .then((data: Courses) => {
                console.log(data)
            })
    }, [])

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Cards