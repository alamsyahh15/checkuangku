import React from 'react';
import { formatInputNumber, parseRupiah } from '../utils/formatter';

interface FormInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
}) => {
  const displayValue = value > 0 ? formatInputNumber(value) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const numericVal = parseRupiah(rawVal);
    onChange(numericVal);
  };

  const handleClear = () => {
    onChange(0);
  };

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="input-field-wrapper">
        <span className="currency-prefix">Rp</span>
        <input
          type="text"
          id={id}
          className="form-input-currency"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          inputMode="numeric"
          autoComplete="off"
        />
        {value > 0 && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={handleClear}
            title="Hapus"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
