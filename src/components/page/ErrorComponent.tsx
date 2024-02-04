import React, {Fragment} from "react";

const ErrorComponent = ({text}: {text: string}) => {

  return (
    <Fragment>
      <p className="text-xl mx-auto my-16 text-center md:text-3xl lg:text-5xl">
        {text}
      </p>
      <p className="text-base md:text-lg lg:text-xl">
        Please try again later.
      </p>
    </Fragment>
  );
}

export default ErrorComponent