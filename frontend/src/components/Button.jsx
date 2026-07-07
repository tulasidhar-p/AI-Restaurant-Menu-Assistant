/**
 * Reusable Button component styled with Tailwind CSS.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {string} [props.type="button"] - The HTML button type.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {function} [props.onClick] - Click handler.
 * @param {string} [props.variant="primary"] - Button variant ('primary' | 'secondary').
 * @param {string} [props.className=""] - Additional CSS classes.
 */
const Button = ({ 
  children, 
  type = 'button', 
  disabled = false, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const baseStyles = 'px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm';
  
  const variants = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
