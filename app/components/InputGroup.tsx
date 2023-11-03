import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect } from 'react'
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import Label from './Label'

interface InputGroupGlobalProps {
  variant?: 'top' | 'inline' | 'overlap' | 'hidden'
}

interface InputGroupProps
  extends InputGroupGlobalProps,
    InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: HTMLInputTypeAttribute
  label?: React.ReactNode
  placeholder?: string
  helperText?: string
  error?: boolean
  disabled?: boolean
  hint?: React.ReactNode
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  className?: string
  modelValue: any
  modelModifiers?: any
  onChange: (value: any) => void
}

export default function InputGroup({
  variant = 'top',
  name,
  type = 'text',
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  hint,
  leftComponent,
  rightComponent,
  className,
  modelValue,
  modelModifiers,
  onChange,
  ...props
}: InputGroupProps) {
  const classes = {
    input: clsx(
      'block w-full rounded-md border-0 px-3 py-1.5',
      'ring-1 ring-inset',
      'focus:ring-2 focus:ring-inset',
      'sm:text-sm sm:leading-6',
      error
        ? 'pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
        : clsx(
            'text-gray-900 shadow-sm  ring-gray-300 placeholder:text-gray-400',
            'focus:ring-indigo-600',
          ),
      leftComponent ? 'pl-9' : '',
      rightComponent ? 'pr-9' : '',
      className,
    ),
    helperText: clsx('mt-2 text-sm', error ? 'text-red-500' : 'text-gray-500'),
  }

  useEffect(() => {
    let valueTemp = modelValue
    if (modelModifiers?.capitalize) {
      valueTemp = valueTemp?.charAt(0).toUpperCase() + valueTemp?.slice(1)
    }
    if (modelModifiers?.upper) {
      valueTemp = valueTemp?.toUpperCase()
    }
    if (modelModifiers?.lower) {
      valueTemp = valueTemp?.toLowerCase()
    }
    onChange(valueTemp)
  }, [modelValue])

  return (
    <div className='w-full'>
      {label && (
        <Label
          variant={variant}
          name={name}
          label={label}
          hint={hint}
        />
      )}
      <div
        className={clsx(
          'relative rounded-md shadow-sm',
          variant === 'top' && label ? 'mt-2' : '',
        )}>
        {leftComponent && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-gray-500 sm:text-sm'>{leftComponent}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          className={classes.input}
          placeholder={placeholder}
          value={modelValue}
          onChange={e => onChange(e.target.value)}
          {...props}
        />
        {(rightComponent || error) && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {error ? (
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            ) : (
              <span className='text-gray-500 sm:text-sm'>{rightComponent}</span>
            )}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={classes.helperText}
          id={`${name}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  )
}