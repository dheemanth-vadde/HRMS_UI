import sagarsoftLogo from "figma:asset/6937755954383c35f9d73d62ece6430f61843b75.png";

export function PNBLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={sagarsoftLogo}
      alt="Sagarsoft"
      className={className}
    />
  );
}
