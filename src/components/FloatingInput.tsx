import { type ChangeEvent, type FC, type ReactNode } from "react";
import "./FloatingInput.css";

interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  color?: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
}

const FloatingInput: FC<FloatingInputProps> = ({
  id,
  label,
  value,
  onChange,
  icon,
  color = "#4AA7B3",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className="inputGroup"
      style={{ "--accent-color": color } as React.CSSProperties}
    >
      <input
        id={id}
        className={`inputUnderline ${value ? "filled" : ""}`}
        value={value}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor={id} className="inputLabel">
        {label}
      </label>
      {icon && <span className="inputIcon">{icon}</span>}
    </div>
  );
};

export default FloatingInput;
