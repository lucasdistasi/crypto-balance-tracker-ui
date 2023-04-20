import React, {useEffect} from 'react';

function withScrollToTop(WrappedComponent: Function) {
  return function WithScrollToTop(props: JSX.IntrinsicAttributes) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withScrollToTop