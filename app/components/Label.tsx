import { LabelHTMLAttributes } from 'react'

interface LabelGlobalProps {
  variant?: 'top' | 'inline' | 'overlap' | 'hidden'
}

const switchContainerVariant = ({ variant }: LabelGlobalProps) => {
  switch (variant) {
    case 'top':
      return ''
    case 'hidden':
      return 'contents'
    case 'overlap':
      return 'relative'
    case 'inline':
      return 'flex justify-between'
  }
}

const switchLabelVariant = ({ variant }: LabelGlobalProps) => {
  switch (variant) {
    case 'top':
    case 'inline':
      return 'block text-sm font-medium leading-6 text-gray-900'
    case 'hidden':
      return 'sr-only'
    case 'overlap':
      return 'absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900'
  }
}

interface LabelProps
  extends LabelGlobalProps,
    LabelHTMLAttributes<HTMLLabelElement> {
  name: string
  label?: React.ReactNode
  hint?: React.ReactNode
}

export default function Label({
  variant = 'top',
  name,
  label,
  hint,
}: LabelProps) {
  return (
    <div className={switchContainerVariant({ variant })}>
      {label && (
        <label
          htmlFor={name}
          className={switchLabelVariant({ variant })}>
          {label}
        </label>
      )}
      {hint && (
        <span
          className='text-sm leading-6 text-gray-500'
          id={`${name}-hint`}>
          {hint}
        </span>
      )}
    </div>
  )
}