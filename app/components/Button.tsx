/** @jsxImportSource react */

import clsx from 'clsx'
import Image from 'next/image'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: 'button' | 'submit'
  variant?: 'solid' | 'outline' | 'none'
  color?: 'primary' | 'white' | 'slate'
  leftIcon?: string
  rightIcon?: string
  onClick?: (value: any) => void
}

export default function Button({
  type = 'button',
  variant = 'solid',
  color = 'primary',
  leftIcon,
  rightIcon,
  onClick,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const superClass = 'inline-flex items-center font-semibold text-sm'
  const roundClass =
    'rounded-md py-2 px-4 justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const baseStyles = {
    solid: clsx(
      superClass,
      roundClass,
      'focus-visible:outline-2 focus-visible:outline-offset-2',
    ),
    outline: clsx(superClass, roundClass, 'ring-1'),
    none: clsx(superClass, 'leading-6'),
  }

  const variantStyles: { [key: string]: any } = {
    solid: {
      primary:
        'bg-indigo-600 text-white hover:text-slate-100 hover:bg-indigo-500 active:bg-indigo-800 active:text-indigo-100 focus-visible:outline-indigo-600',
      white:
        'bg-white text-slate-900 hover:bg-indigo-50 active:bg-indigo-200 active:text-slate-600 focus-visible:outline-white',
      slate:
        'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    },
    outline: {
      primary:
        'bg-white-100 text-indigo-600 ring-indigo-200 hover:ring-indigo-300',
      white:
        'ring-slate-700 text-black hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
      slate:
        'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    },
    none: {
      primary: 'text-indigo-800',
      white: 'text-gray-800',
      slate: 'text-slate-800',
    },
  }

  className = clsx(
    baseStyles[variant],
    variantStyles[variant]?.[color],
    disabled ? 'cursor-not-allowed' : '',
    className,
  )

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      onSubmit={onClick}
      disabled={disabled}
      {...props}>
      {leftIcon && (
        <Image
          src={`data:image/svg+xml;utf8,${leftIcon}`}
          className='-ml-0.5 mr-1.5 h-5 w-5'
          aria-hidden='true'
          width={20}
          height={20}
          alt=''
        />
      )}
      {children}
      {rightIcon && (
        <Image
          src={`data:image/svg+xml;utf8,${rightIcon}`}
          className='-mr-0.5 ml-1.5 h-5 w-5'
          aria-hidden='true'
          width={20}
          height={20}
          alt=''
        />
      )}
    </button>
  )
}