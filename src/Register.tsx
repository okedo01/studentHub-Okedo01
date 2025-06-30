import React from 'react'
import { useForm } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { useParams } from 'react-router-dom';

type formData = {
    username: string;
}

const Register: React.FC = () => {
    const { id } = useParams();
    const courseID = Number(id);

    const form = useForm<formData>();
    return (
        <div className="bg-amber-300">
            <h2 className="text-xl font-bold mb-4">
                Register for Course ID: {courseID}
            </h2>
            {/* <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
        </div>
    )
}

export default Register