'use client'

import { FormEvent, useEffect, useState } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import InputGroup from './components/InputGroup'
import Button from './components/Button'

interface ITask {
  id?: string
  name: string
}

export default function Home() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [task, setTask] = useState<ITask>({ name: '' })
  const [btnDisabled, setBtnDisabled] = useState(false)

  const resetTask = () => {
    setTask({ name: '' })
  }

  const getTasks = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!)
    if (res?.ok) {
      const data = await res.json()
      setTaskList(data)
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const isUpdate = task?.id ? true : false
    const url =
      process.env.NEXT_PUBLIC_API_URL! + (isUpdate ? `/${task?.id}` : '')
    const {id, ...body} = task
    const res = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (res?.ok) {
      resetTask()
      await getTasks()
    }
  }

  const deleteTask = async ({ id }: ITask) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (res?.ok) {
      await getTasks()
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    setBtnDisabled(!task.name)
  }, [task.name])

  return (
    <main className='max-w-xl m-auto px-4 lg:px-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='pt-4 text-2xl text-center'>My personal tasks</h1>
        <form
          className='flex flex-wrap gap-4 items-end justify-center'
          onSubmit={onSubmit}>
          <InputGroup
            name='name'
            type='text'
            label='Task name'
            modelValue={task.name}
            onChange={value => setTask(v => ({ ...v, name: value }))}
          />
          {task.id ? (
            <Button
              variant='outline'
              color='white'
              type='button'
              name='btn-cancel'
              onClick={resetTask}>
              Cancel
            </Button>
          ) : null}
          <Button
            type='submit'
            name='btn-save'
            disabled={btnDisabled}>
            Save
          </Button>
        </form>
        {taskList.map(task => (
          <div
            key={task.id}
            className='flex gap-2 justify-center'>
            <div className='flex-1'>{task.name}</div>
            <PencilSquareIcon
              className='h-5 w-5 cursor-pointer text-orange-500'
              aria-hidden='true'
              onClick={() => setTask(task)}
            />
            <TrashIcon
              className='h-5 w-5 cursor-pointer text-red-500'
              aria-hidden='true'
              onClick={() => deleteTask(task)}
            />
          </div>
        ))}
      </div>
    </main>
  )
}