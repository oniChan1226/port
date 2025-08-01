import React from 'react'
import { Link } from 'react-router-dom'

interface BackToProps {
    to: string;
    text: string;
};

const BackTo = ({ text, to }: BackToProps) => {
  return (
    <Link
        to={to}
        className="flex items-center space-x-1 text-neutral-500 duration-300 hover:text-white/90 hover:pl-1"
      >
        <span className="text-sm">{"<--"}</span>
        <span className="font-semibold">{text}</span>
      </Link>
  )
}

export default BackTo