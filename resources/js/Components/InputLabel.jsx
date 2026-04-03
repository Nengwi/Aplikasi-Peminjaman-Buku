export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label 
            {...props} 
            className={`block font-black text-[11px] uppercase tracking-[0.2em] text-blue-400 mb-2 ` + className}
        >
            {value ? value : children}
        </label>
    );
}