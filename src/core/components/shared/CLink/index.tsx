import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

interface Props extends LinkProps {
  className?: string;
  mainClassName?: string;
  activeClassName?: string;
}

export const CLink: React.FC<Props> = ({
  to,
  className,
  mainClassName,
  activeClassName,
  children,
  ...props
}) => {
  className = className || '';
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  if (mainClassName) {
    className = `${className} ${mainClassName}`;
  }

  if (activeClassName && match) {
    className = `${className
      .replace(mainClassName || '', '')
      .trim()} ${activeClassName}`;
  }
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};
