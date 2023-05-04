import {Link} from "react-router-dom";

const NotFoundPage = () => {

  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-300">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-100">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link to="/" className="px-8 py-3 font-semibold rounded dark:bg-gray-400 dark:text-black">
            Take me back home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage