import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { State } from "core/store/index";

interface Props {
  operation: number[];
  alternative?: ReactNode;
  children?: ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({
  operation,
  alternative,
  children,
}) => {
  const { user } = useSelector((state: State) => state.global);

  const canActivate = user?.role?.id && operation.includes(user.role.id);

  if (!canActivate) {
    return alternative ? <>{alternative}</> : null;
  }

  return <>{children}</>;
};

export const PrivateComponent: React.FC<Props> = ({
  operation,
  alternative,
  children,
}) => {
  const { user } = useSelector((state: State) => state.global);

  const canActivate = user?.role?.id && operation?.includes(user.role.id);

  if (!canActivate) {
    return alternative ? <>{alternative}</> : null;
  }

  return <>{children}</>;
};
