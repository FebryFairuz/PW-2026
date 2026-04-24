import React from "react";
import { Icon, Label } from "../atoms/texts";
import { Input, InputTexarea } from "../atoms/inputText";
import { Button } from "../atoms/buttons";

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="form-field mb-3">
      <Label htmlFor={name} className={`fw-bold`}>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

const FormTAreaField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="form-field mb-3">
      <Label htmlFor={name} className={`fw-bold`}>
        {label}
      </Label>
      <InputTexarea
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

const FormFieldRow = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <Label htmlFor={name} className={`fw-bold`}>
          {label}
        </Label>
      </div>
      <div className="col-auto">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

const PasswordField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  ...props
}) => {
  return (
    <div className="mb-3">
      {label && (
        <Label htmlFor={name} className="form-label fw-bold">
          {label}
        </Label>
      )}
      <div className="position-relative">
        <Input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-control pe-5"
          {...props}
        />
        <Button
          type="button"
          className="btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none"
          style={{ zIndex: 10 }}
          tabIndex="-1"
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            className="text-muted"
          />
        </Button>
      </div>
    </div>
  );
};

const InputCheckbox = ({
  label,
  name,
  value,
  required,
  is_switch = false,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <Label htmlFor={name} className="form-label fw-bold">
          {label}
        </Label>
      )}
      <div className={`"form-check ${is_switch ? "form-switch" : ""}`}>
        <input type="checkbox" className="form-check-input" {...props} />
        <Label className="form-check-label ms-1">{value}</Label>
      </div>
    </div>
  );
};

const InputImage = ({ title, imagePreview, required, ...props }) => {
    return (
        <div className="form-group mb-3">
            {title && (
                <Label>{title}</Label>
            )}
            <input
                type="file"
                className="form-control"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                required={required}
                {...props}
            />
            {imagePreview && (
                <div className="mt-3">
                    <img
                        src={imagePreview}
                        alt="Cover Preview"
                        style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
                        className="img-thumbnail"
                    />
                </div>
            )}
        </div>
    )
}

export { FormField, FormTAreaField, FormFieldRow, PasswordField, InputCheckbox, InputImage };
