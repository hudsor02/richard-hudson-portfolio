import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  error?: string; // Error message for validation
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
        </label>
      )}
      <input className={`input-field ${error ? 'input-error' : 'input-normal'}`} {...props} />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default Input;
