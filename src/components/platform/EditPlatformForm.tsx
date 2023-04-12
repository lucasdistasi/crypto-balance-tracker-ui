import AddButton from "../form/AddButton";

const EditPlatformForm = () => {

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-gray-900 text-center my-10">Edit Platform Name</h1>
      <form className="my-4 w-1/2">
        <div className="mb-6">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">
            Platform Name
          </label>
          <input type="text" id="base-input"
                 className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <AddButton text="Add Platform"/>
      </form>
    </div>
  );
}

export default EditPlatformForm