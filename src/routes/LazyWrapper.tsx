import React, { Suspense } from "react";
import FallBack from "./FallBack";

interface LazyWrapperProps {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ Component }) => {
  return (
    <Suspense fallback={<FallBack />}>
      <Component />
    </Suspense>
  );
};

export default LazyWrapper;
