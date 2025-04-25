import {Field, FieldHookConfig} from "formik";

const CheckboxInput = ({label, ...props}: {
  label: string
} & FieldHookConfig<string>) => {

  return (
    <div className="flex items-center mb-4">
      <div className="flex">
        <div className="flex items-center h-5">
          <Field id={props.id ?? props.name}
                 type="checkbox"
                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 {...props}/>
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor={props.id ?? props.name}
                 className="font-medium text-gray-900 dark:text-white">
            {label}
          </label>
          <p id="helper-checkbox-text"
             className="text-xs font-normal text-black dark:text-white">
            If checked, receiver platform receives specified quantity; if not, receives specified quantity minus network
            fee.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckboxInput