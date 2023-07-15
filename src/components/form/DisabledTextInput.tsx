import {Field, useField} from "formik";

const DisabledTextInput = ({label, ...props}) => {
  const [field] = useField(props);

  return (
    <div className="mb-6">
      <label htmlFor={props.id || props.name}
             className="text-gray-900 block mb-2 text-sm font-medium">
        {label}
      </label>

      <Field className="bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 border text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
             aria-label="disabled input"
             autoComplete="off"
             {...field}
             {...props}
             disabled readOnly />
    </div>
  );
}

export default DisabledTextInput