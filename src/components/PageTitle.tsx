import React from 'react'

interface PageTitleProps {
    title: string;
    brief?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, brief }) => {
  return (
    <div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-wide leading-16">
          {title}
        </h2>
        <h6 className="text-md lg:text-lg text-neutral-400/95 leading-5">
          {brief}
        </h6>
      </div>
  )
}

export default PageTitle