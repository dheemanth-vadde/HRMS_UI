import axios from "axios";
import { useEffect, useState } from "react";
import ORGANIZATION_ENDPOINTS from "../services/organizationEndpoints";
import defaultLogo from "figma:asset/5e84dbe916feedfd8554f0268000392b84c23eb0.png";
 
interface SagarsoftLogoProps {
  className?: string;
}
 
export function SagarsoftLogo({ className }: SagarsoftLogoProps) {
  const [orgLogo, setOrgLogo] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchOrganizationLogo = async () => {
      try {
        const response = await axios.get(ORGANIZATION_ENDPOINTS.GET_ORGANIZATION);
        const orgData = Array.isArray(response.data?.data)
          ? response.data.data[0]
          : response.data?.data;
 
        if (orgData?.orgImage) {
          setOrgLogo(`data:image/png;base64,${orgData.orgImage}`);
        }
      } catch (error) {
        console.error("Error fetching organization logo:", error);
      }
    };
 
    fetchOrganizationLogo();
  }, []);
 
  return (
    <img
      src={orgLogo || defaultLogo}
      alt="Sagarsoft Logo"
      className={className}
    />
  );
}