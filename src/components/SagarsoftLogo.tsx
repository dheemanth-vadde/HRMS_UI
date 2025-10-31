import { useEffect, useState } from "react";
import ORGANIZATION_ENDPOINTS from "../services/organizationEndpoints";
import defaultLogo from "figma:asset/5e84dbe916feedfd8554f0268000392b84c23eb0.png";
import api from "../services/interceptors";
interface SagarsoftLogoProps {
  className?: string;
}

export function SagarsoftLogo({ className }: SagarsoftLogoProps) {
  const [orgLogo, setOrgLogo] = useState<string | null>(null);

  const fetchOrganizationLogo = async () => {
    try {
      const response = await api.get(ORGANIZATION_ENDPOINTS.GET_ORGANIZATION);
      const orgData = Array.isArray(response.data?.data)
        ? response.data.data[0]
        : response.data?.data;

      if (orgData?.orgImage) {
        setOrgLogo(`data:image/png;base64,${orgData.orgImage}`);
      } else {
        setOrgLogo(null);
      }
    } catch (error) {
      console.error("Error fetching organization logo:", error);
      setOrgLogo(null);
    }
  };

  useEffect(() => {
    fetchOrganizationLogo();

    // Listen for logo update event
    const handleLogoUpdate = () => {
      fetchOrganizationLogo();
    };
    window.addEventListener("orgLogoUpdated", handleLogoUpdate);

    return () => {
      window.removeEventListener("orgLogoUpdated", handleLogoUpdate);
    };
  }, []);

  return (
    <img
      src={orgLogo || defaultLogo}
      alt="Sagarsoft Logo"
      className={className}
    />
  );
}