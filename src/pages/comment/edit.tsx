import { CTextarea, SlideoversFoot } from "components/shared";
import { useForm } from "react-hook-form";
import { Toast, updateService } from "services/index";
import { getAll } from "store/comment/comment.thunks";
import { useAppDispatch, useAppSelector } from "store/hooks";

interface Props {
  close: () => void;
}

export const EditComment: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { comment } = useAppSelector((state) => state.comments);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Идет обновление`);

    return updateService(comment!.id, data, "comment")
      .then(({ name }) => {
        Toast.success(`${name} обновлен`);
        dispatch(getAll());
        close();
      })
      .catch((e) => {
        Toast.error(e);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CTextarea
            name="text"
            title="Комментарий"
            placeholder="Комментарий"
            defaultValue={comment?.text}
            control={control}
            error={errors["text"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
