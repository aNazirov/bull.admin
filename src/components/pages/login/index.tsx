import { CInput } from "@components/shared/CInput";
import { ILogin } from "@interfaces/interfaces";
import { loginByPassword } from "@store/global/global.thunks";
import { useAppDispatch } from "@store/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = (data: ILogin | any) => {
    dispatch(loginByPassword(data)).then(() => navigate("/"));
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              <div className="mt-1">
                <CInput
                  name="phone"
                  type="tel"
                  title="Phone number"
                  control={control}
                  error={errors["phone"]}
                  id="phone"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="mt-1">
                <CInput
                  type="password"
                  title="Password"
                  name="password"
                  control={control}
                  error={errors["password"]}
                  id="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
