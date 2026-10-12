export function Toast({ message }: { message: string }) {
  return <div role="status" className="rounded-xl bg-[#191f28] px-4 py-3 text-sm font-medium text-white shadow-lg">{message}</div>;
}
