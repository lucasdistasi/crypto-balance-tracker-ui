const SubmitButton = ({text}: { text: string }) => {

  return (
    <button type="submit"
            className="mt-10 uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {text}
    </button>
  );
}

export default SubmitButton