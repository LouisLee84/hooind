export function FieldError({
  id,
  message,
}: {
  id: string;
  message: string | undefined;
}) {
  return (
    <p className="mt-1.5 text-sm font-medium text-red-600" id={id}>
      {message}
    </p>
  );
}
