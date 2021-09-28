import { useFormik, getIn, setIn } from "formik";
import classnames from "classnames";
import { merge } from "lodash";
import SelfServiceMessages from "./SelfServiceMessages";

export default function SelfServiceForm({ flow, fieldsConfig, title, button = "Submit" }) {
  const fields = flow.ui.nodes
    .filter((field) => !field.attributes.name.startsWith("traits.name")) // drop name fields
    .map((field) => merge({}, field, fieldsConfig[field.attributes.name]))
    .sort((a, b) => (a.attributes.position < b.attributes.position ? -1 : 1));
  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => setIn(acc, field.attributes.name, field.attributes.value ?? ""), {}),
  });

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      {title && <h3 className="pb-5 text-lg leading-6 font-medium text-gray-900">{title}</h3>}
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" action={flow.ui.action} method={flow.ui.method}>
          {fields.map((field) => (
            <div key={field.attributes.name} className={classnames({ hidden: field.attributes.type === "hidden" })}>
              <label htmlFor={field.attributes.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.meta.label?.text ?? field.attributes.name}
              </label>
              <div>
                <input
                  id={field.attributes.type === "hidden" ? null : field.attributes.name}
                  name={field.attributes.name}
                  type={field.attributes.type}
                  disabled={field.attributes.disabled}
                  autoComplete={field.attributes.autoComplete}
                  required={field.attributes.required}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={getIn(formik.values, field.attributes.name) ?? ""}
                  className={classnames(
                    "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm",
                    {
                      "border-gray-300 placeholder-gray-400 focus:ring-green-500 focus:border-green-500": !Boolean(
                        field?.messages?.length
                      ),
                      "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500":
                        Boolean(field?.messages?.length),
                    }
                  )}
                />

                <SelfServiceMessages messages={field.messages} />

                {field.checks && (
                  <div className="mt-4">
                    <ul className="space-y-1">
                      {field.checks.map((check, index) => (
                        <li
                          key={index}
                          className={
                            check.validate(formik.values, field.name) ? "text-green-600 font-medium" : "text-gray-600"
                          }
                        >
                          <div className="flex space-x-3 items-center">
                            <span className="flex items-center justify-center ">
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                                />
                              </svg>
                            </span>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xs">{check.label}</h3>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {button}
          </button>

          <SelfServiceMessages messages={flow.ui.messages} />
        </form>
      </div>
    </div>
  );
}
