import { PrivateComponent, SlideOvers } from "components/shared";
import { useContext } from "react";
import { AppContext } from "utils/contexts";
import { SlideoverModes } from "utils/enums";

interface Props {
  title?: string;
  description?: string;
  operation: number[];
  Edit: React.JSXElementConstructor<any>;
}

export const PageHead: React.FC<Props> = ({
  title,
  description,
  Edit,
  operation,
}) => {
  const { setOpen, setMode } = useContext(AppContext);

  const close = () => {
    setMode(SlideoverModes.none);
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex gap-3 items-center">
            <h3 className="text-xl leading-6 font-medium text-gray-900 max-w-9/12">
              {title}
            </h3>
            {/* <CLink to={edit} state={{ edit: true }}> */}

            <PrivateComponent operation={operation}>
              <button
                onClick={() => {
                  setMode(SlideoverModes.edit);
                  setOpen(true);
                }}
                className="px-4 text-blue-600 border rounded-sm border-blue-500 cursor-pointer text-sm"
              >
                Изменить
              </button>
              {/* </CLink> */}
            </PrivateComponent>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <PrivateComponent operation={operation}>
        <SlideOvers title={title} close={close} Edit={Edit} />
      </PrivateComponent>
    </>
  );
};
