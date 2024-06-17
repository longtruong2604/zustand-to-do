'use client'

import { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTaskStore } from '@/lib/store'

export default function NewTodoDialog() {
  const addTask = useTaskStore((state) => state.addTask)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(e.currentTarget)
    const { title, description } = Object.fromEntries(formData)
    if (typeof title !== 'string' || typeof description !== 'string') return
    addTask(title, description)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Add new</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add new Todo</DialogTitle>
          <DialogDescription>What do you want to get done today?</DialogDescription>
        </DialogHeader>
        <form className='grid gap-4 py-4' id='to-do-form' onSubmit={handleSubmit}>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-right'>
              Title
            </Label>
            <Input id='title' name='title' defaultValue='Drink water' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              id='description'
              name='description'
              defaultValue='Drink as much as humanly possible'
              className='col-span-3'
            />
          </div>
        </form>
        <DialogFooter>
          <Button type='submit' form='to-do-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
