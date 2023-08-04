import React, {useEffect} from 'react';

function withScrollToTop(WrappedComponent: React.FC) {
  return function WithScrollToTop(props: React.JSX.IntrinsicAttributes) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withScrollToTop