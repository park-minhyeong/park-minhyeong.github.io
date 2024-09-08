import React, { Fragment } from "react";
import { useActionStore } from "@/store";
import { Replace as _Replace, Show as _Show } from "@/interface/Action";

interface ShowProps {
  actions?: _Show[];
  children: React.ReactNode;
}

interface ReplaceProps {
  actions?: _Replace[];
  children?: React.ReactNode;
}

function Show({ actions, children }: ShowProps) {
  const { events } = useActionStore();
  return (
    <>
      {children}
      {actions?.map(([flag, Component], index) => {
        const isVisible =
          typeof flag === "boolean"
            ? flag
            : events?.some(({ event }) => event === flag);
        const event = () => {
          if (typeof flag === "string") {
            return flag;
          }
        };
        if (React.isValidElement(Component)) {
          const ComponentWithVisibility = React.cloneElement(
            Component as React.ReactElement<any>,
            {
              showAction: {
                event: event(),
                isVisible,
              },
            }
          );
          return <Fragment key={index}>{ComponentWithVisibility}</Fragment>;
        }
        return null;
      })}
    </>
  );
}

function Replace({ actions, children }: ReplaceProps) {
  const { events } = useActionStore();
  if (!actions) return <>{children}</>;
  const trueComponents = actions
    .filter(([action]) => action)
    .map(([flag, Component], index) => {
      if (typeof flag === "string") {
        return events?.some(({ event }) => event === flag) ? (
          <>{Component}</>
        ) : null;
      }
      return <Fragment key={index}>{Component}</Fragment>;
    })
    .filter((component) => component !== null);
  return <>{trueComponents.length > 0 ? trueComponents : children}</>;
}

const Action = {
  Show,
  Replace,
};

export default Action;
