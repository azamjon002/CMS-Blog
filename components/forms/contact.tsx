"use client"

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { ContactSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

function ContactForm() {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
        name: "",
        email: "",
        message: "",
        },
    })

    function onSubmit(values: z.infer<typeof ContactSchema>) {
        setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_CHAT_ID!

        const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `Name: ${values.name}:
Email: ${values.email}:
Message: ${values.message}`,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

        toast.promise(promise, {
            loading: 'Loading...',
			success: 'Successfully sent!',
			error: 'Something went wrong!',
        })
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    className='resize-none h-32'
                                    placeholder='Ask question or just say Hi'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Email address'
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Your name here'
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className='w-fit'
                    size={'lg'}
                    type='submit'
                    disabled={isLoading}
                >
                    <span>Send</span>
                    <Send className='w-4 h-4 ml-2' />
                </Button>
            </form>
        </Form>
    )
}

export default ContactForm