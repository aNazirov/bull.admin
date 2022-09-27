interface Props {
  size?: number;
}

export const Spinner: React.FC<Props> = ({ size = 6 }) => {
  return (
    <div>
      <div
        className={`w-${size} h-${size} border-4 border-blue-400 border-solid rounded-full animate-spin border-t-inherit`}
      />
    </div>
  );
};
