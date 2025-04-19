import {ErrorMessage, Field, FieldHookConfig, useField} from "formik";

const EditableTextInput = ({label, ...props}: {
  label: string
} & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const classes = meta.touched && meta.error ?
    'bg-red-100 border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 focus:outline-none dark:bg-red-100 dark:text-gray-900 dark:border-red-500' :
    'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="mb-6">
      <label htmlFor={props.id ?? props.name}
             className="text-gray-900 block mb-2 text-sm font-medium dark:text-gray-100">
        {label}
      </label>

      <Field className={`${classes} border text-sm rounded-lg block w-full p-2.5 dark:bg-dark-input dark:border-gray-600 dark:text-white`}
             autoComplete="off"
             {...field}
             {...props} />
      <ErrorMessage name={props.id ?? props.name}
                    component="span"
                    className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium"/>
    </div>
  );
}

export default EditableTextInput