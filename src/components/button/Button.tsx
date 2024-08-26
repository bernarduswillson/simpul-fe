// Interface
interface ButtonProps {
  width?: string
  onClick?: () => void
  children: React.ReactNode
}

const Button = (props: ButtonProps): JSX.Element => {
  const { children, width = 'auto', onClick } = props;

  return (
    <button 
      className='bg-primary-blue text-white hover:bg-white group border-2 border-primary-blue rounded-lg px-7 py-2 transition-colors duration-500 delay-[0.1s] ease-[cubic-bezier(0.19,1,0.22,1)]'
      style={{ width: `${width}px` }}
      onClick={onClick}
    >
      <div className="overflow-hidden relative lato-bold">
        <p className='text-center w-full group-hover:translate-y-[-20px] duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]'>
          {children}
        </p>
        <p
          aria-hidden
          className='absolute text-primary-blue text-center left-0 top-5 w-full group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]'
        >
          {children}
        </p>
      </div>
    </button>
  );
};

export default Button;
