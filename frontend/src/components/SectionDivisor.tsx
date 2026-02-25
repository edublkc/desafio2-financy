interface SectionDivisorProps {
  content: string;
  contentColor?: string;
  linesColor?: string;
}

export function SectionDivisor({ content, contentColor, linesColor }: SectionDivisorProps) {
  return (
    <div className="flex items-center w-full my-4">
      <div className={`flex-grow border-t ${linesColor || 'border-gray-300'}`}></div>
      <span className={`flex-shrink mx-4 text-sm ${contentColor || 'text-gray-500'}`}>{content}</span>
      <div className={`flex-grow border-t ${linesColor || 'border-gray-300'}`}></div>
    </div>
  )
}