'use client'
import { useMemo } from 'react'

import { Status, useTaskStore } from '@/lib/store'

import Task from './task'

export default function Column({ title, status }: Readonly<{ title: string; status: Status }>) {
  const { tasks, updateTask, draggedTask, dragTask } = useTaskStore()
  const filteredTasks = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status])
  const handleDrop = () => {
    if (!draggedTask) return
    updateTask(draggedTask, status)
    dragTask(null)
    console.log(tasks)
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div
        className='mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4'
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  )
}
