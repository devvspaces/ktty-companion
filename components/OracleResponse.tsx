export default function OracleResponse({ message }: { message: string }) {
  return (
    <div className="text-pastel-yellow italic animate-pulse-glow mt-1">
      {message}
    </div>
  );
}
