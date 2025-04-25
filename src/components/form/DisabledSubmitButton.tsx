const DisabledSubmitButton = ({text}: { text: string }) => {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-busy="true"
      className="flex items-center justify-center uppercase w-full mt-16 text-white bg-gray-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 focus:outline-hidden dark:bg-gray-700"
    >
      <span className="sr-only">Submitting...</span>
      {text}
      <svg
        aria-hidden="true"
        className="w-4 h-4 ml-2 animate-spin text-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#CBD5E1"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default DisabledSubmitButton