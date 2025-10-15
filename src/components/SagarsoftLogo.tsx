import logo from "figma:asset/5e84dbe916feedfd8554f0268000392b84c23eb0.png";

interface SagarsoftLogoProps {
  className?: string;
}

export function SagarsoftLogo({ className }: SagarsoftLogoProps) {
  return (
    <img 
      src={logo} 
      alt="Sagarsoft" 
      className={className}
    />
  );
}
