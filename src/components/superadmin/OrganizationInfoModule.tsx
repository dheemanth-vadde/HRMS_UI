import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, Globe, Calendar, Phone, MapPin, Edit, Save, X, Plus, Upload, Image } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getValidationError } from "../../utils/validations";
import api from "../../services/interceptors";
import ORGANIZATION_ENDPOINTS from "../../services/organizationEndpoints";
import STATE_ENDPOINTS from "../../services/stateEndpoints";
import COUNTRY_ENDPOINTS from "../../services/countryEndpoints";
import CITY_ENDPOINTS from "../../services/cityEndpoints";
import { usePermissions } from '../../utils/permissionUtils';


interface OrganizationInfoModuleProps {
  viewOnly?: boolean;
}

export function OrganizationInfoModule({ viewOnly = false }: OrganizationInfoModuleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasOrganization, setHasOrganization] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
   const { hasPermission } = usePermissions();

  const [orgData, setOrgData] = useState({
    id: "",
    name: "",
    domain: "",
    website: "",
    employees: "",
    established: "",
    customerCare: "",
    country: "",
    state: "",
    city: "",
    // category: "",
    headOffice: "",
    regionalOffice: "",
    logo: "",
  });
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const businessDomains = [
    "Automotive",
    "Construction",
    "Consulting",
    "Education",
    "Engineering",
    "Government",
    "Healthcare",
    "Hospitality",
    "Insurance/Finance",
    "Manufacturing",
    "Marketing/PR",
    "Media",
    "Not for profit",
    "Oil/Gas/Utilities",
    "Pharmaceutical",
    "Real Estate",
    "Retail and Consumer",
    "Technology",
    "Telecommunications",
    "Travel and Leisure",
    "Other",
  ];

  useEffect(() => {
    // Initial fetch on mount
    if (!countries.length && !hasOrganization) {
      fetchOrganizationData();
      fetchCountries();
    }

    // Fetch states when country changes
    if (orgData.country) {
      fetchStates(orgData.country);
    } else {
      setStates([]);
      setCities([]);
    }

    // Fetch cities when state changes
    if (orgData.state) {
      fetchCities(orgData.state);
    } else {
      setCities([]);
    }
  }, [orgData.country, orgData.state]);

  const fetchCountries = async () => {
    try {
      const response = await api.get(COUNTRY_ENDPOINTS.GET_COUNTRY);
      setCountries(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId: string) => {
    if (!countryId) {
      setStates([]); // clear states if no country selected
      return;
    }

    try {
      const response = await api.get(`${STATE_ENDPOINTS.GET_STATE}`);
      const allStates = response.data?.data || [];

      // Filter states based on selected country
      const filteredStates = allStates.filter((state: any) => state.countryId === countryId);
      setStates(filteredStates);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId: string) => {
    if (!stateId) {
      setCities([]); // clear states if no country selected
      return;
    }

    try {
      const response = await api.get(`${CITY_ENDPOINTS.GET_CITY}`);
      const allCities = response.data?.data || [];

      // Filter states based on selected country
      const filteredCities = allCities.filter((city: any) => city.stateId === stateId);
      setCities(filteredCities);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCountryName = (id: string) => {
    const country = countries.find((c) => c.id === id);
    return country ? country.country || country.name : "-";
  };

  const getStateName = (id: string) => {
    const state = states.find((s) => s.id === id);
    return state ? state.state || state.name : "-";
  };

  const getCityName = (id: string) => {
    const city = cities.find((s) => s.id === id);
    return city ? city.city || city.name : "-";
  };

  const fetchOrganizationData = async () => {
    try {
      const response = await api.get(ORGANIZATION_ENDPOINTS.GET_ORGANIZATION);
      const result = response.data;
      const org = Array.isArray(result?.data) ? result.data[0] : result.data; // ✅ handle both cases

      if (org) {
        setOrgData({
          id: org.id || "",
          name: org.organisationName || "",
          domain: org.domain || "",
          website: org.website || "",
          employees: org.totalEmployees?.toString() || "",
          established: org.orgStartDate || "",
          customerCare: org.phoneNumber || "",
          country: org.countryId || "",
          state: org.stateId || "",
          city: org.cityId || "",
          // category: org.orgCode || "",
          headOffice: org.address1 || "",
          regionalOffice: org.address2 || "",
          logo: org.orgImage ? `data:image/png;base64,${org.orgImage}` : "",
        });
        setHasOrganization(true); // ✅
      } else {
        setHasOrganization(false);
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
      setHasOrganization(false);
    }
  };

  const validateOrgData = () => {
    const newErrors: { [key: string]: string } = {};

    // --- Required fields ---
    const requiredFields: (keyof typeof orgData)[] = ["name"];
    requiredFields.forEach((field) => {
      const error =
        getValidationError("required", orgData[field], `This field is required`) ||
        getValidationError("noSpaces", orgData[field], `Field has extra spaces`);
      if (error) newErrors[field] = error;
    });

    // --- Phone validation for customer care ---
    if (orgData.customerCare) {
      const phoneError = getValidationError(
        "phone",
        orgData.customerCare,
        "Customer care number must be 10 digits"
      );
      if (phoneError) newErrors.customerCare = phoneError;
    }

    // --- Optional text fields ---
    const optionalFields: (keyof typeof orgData)[] = [
      "domain",
      "website",
      "country",
      "state",
      "city",
      // "category",
      "headOffice",
      "regionalOffice",
    ];

    optionalFields.forEach((field) => {
      const value = orgData[field];
      if (value) {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `${field} cannot start or end with a space`
        );
        if (spaceError) newErrors[field] = spaceError;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSave = async () => {
    const isValid = validateOrgData();
    if (!isValid) {
      setIsEditing(true);
      return;
    }

    try {
      const data = new FormData();
      // Build formData dynamically
      data.append("organisationName", orgData.name);
      // data.append("orgCode", orgData.category || "");
      data.append("totalEmployees", orgData.employees);
      data.append("orgStartDate", orgData.established);
      data.append("countryId", orgData.country);
      data.append("stateId", orgData.state);
      data.append("cityId", orgData.city);
      data.append("phoneNumber", orgData.customerCare);
      data.append("secondaryPhone", "");
      data.append("email", "");
      data.append("secondaryEmail", "");
      data.append("faxNumber", "");
      data.append("description", orgData.regionalOffice);
      data.append("orgHead", "");
      // data.append("designation", orgData.category);
      data.append("address1", orgData.headOffice);
      data.append("orgImage", "string");
      data.append("domain", orgData.domain);
      data.append("website", orgData.website);
      data.append("orgDescription", "");
      data.append("address2", "");
      data.append("registrationNumber", "");
      data.append("address3", "");

      // Add the logo file if uploaded
      const fileInput = document.getElementById("logo-upload") as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        data.append("orgImageFile", fileInput.files[0]);
      }

      let response: any;

      if (orgData.id) {
        // ✅ Update existing organization
        response = await api.put(
          ORGANIZATION_ENDPOINTS.PUT_ORGANIZATION(orgData.id),
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Organization updated successfully");
      } else {
        // ✅ Create new organization
        response = await api.post(
          ORGANIZATION_ENDPOINTS.POST_ORGANIZATION,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Organization created successfully");
      }
      console.log("API response:", response.data);

      setIsEditing(false);
      setHasOrganization(true);
      fetchOrganizationData(); // refresh updated data
      window.dispatchEvent(new Event("orgLogoUpdated"));
    } catch (error: any) {
      console.error("Error saving organization:", error);
      toast.error(error?.response?.data?.message || "Failed to save organization");
    }
  };

  const handleAddOrganization = () => {
    setIsEditing(true);
    setHasOrganization(false);
  };

  const handleCancel = () => {
    if (!hasOrganization) {
      // If no organization exists, reset all fields
      setOrgData({
        id: "",
        name: "",
        domain: "",
        website: "",
        employees: "",
        established: "",
        customerCare: "",
        country: "",
        state: "",
        city: "",
        // category: "",
        headOffice: "",
        regionalOffice: "",
        logo: "",
      });
      setLogoPreview(null);
    }
    setIsEditing(false);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setOrgData({ ...orgData, logo: reader.result as string });
        toast.success("Logo uploaded successfully");
        // dispatch(setLogo(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Organization Info</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View organization details" : hasOrganization ? "View and manage organization details" : "Add your organization information"}
          </p>
        </div>
        {!viewOnly && (
          <div className="flex gap-2">
            {hasPermission('/superadmin/organization/info', 'create')===true && !isEditing && !hasOrganization ? (
              <Button
                className="btn-add-purple"
                onClick={handleAddOrganization}
              >
                <Plus className="size-4 mr-2" />
                Add Organization
              </Button>
            ) : hasPermission('/superadmin/organization/info', 'edit')===true && !isEditing && hasOrganization ? (
              <Button
                className="btn-gradient-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="size-4 mr-2" />
                Edit Info
              </Button>
            ) : hasPermission('/superadmin/organization/info', 'create')===true ?(
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="size-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  className="btn-gradient-primary"
                  onClick={handleSave}
                >
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ):null}
          </div>
        )}
      </div>

      {(hasOrganization || isEditing || viewOnly) && (
        <Card>
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                {logoPreview || orgData.logo ? (
                  <img
                    src={logoPreview || orgData.logo}
                    alt="Organization Logo"
                    className="size-10 object-contain rounded-md"
                  />
                ) : (
                  <Building2 className="size-6 text-primary" />
                )}
              </div>
              <CardTitle>{orgData.name || "Organization Information"}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Logo Upload Section */}
                <div className="space-y-2 border-b pb-4">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    {/* <Image className="size-4" /> */}
                    Organization Logo
                  </Label>
                  {isEditing && !viewOnly ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        {logoPreview || orgData.logo ? (
                          <div className="relative">
                            <img
                              src={logoPreview || orgData.logo}
                              alt="Organization Logo"
                              className="size-24 object-contain border-2 border-primary/20 rounded-lg p-2 bg-white"
                            />
                          </div>
                        ) : (
                          <div className="size-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-muted/30">
                            <Building2 className="size-8 text-muted-foreground/50" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            className="hidden"
                            id="logo-upload"
                            onChange={handleLogoUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('logo-upload')?.click()}
                          >
                            <Upload className="size-4 mr-2" />
                            Upload Logo
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {orgData.logo ? (
                        <img
                          src={orgData.logo}
                          alt="Organization Logo"
                          className="size-24 object-contain border-2 border-primary/20 rounded-lg p-2 bg-white"
                        />
                      ) : (
                        <div className="size-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-muted/30">
                          <Building2 className="size-8 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Organization Name *</Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setOrgData({ ...orgData, name: value });
                
                          // Clear the error as soon as user starts typing
                          if (errors.name && value.trim() !== "") {
                            setErrors((prev) => ({ ...prev, name: "" }));
                          }
                        }}
                        placeholder="Enter organization name"
                      />
                      {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.name || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Business Domain</Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <select
                        value={orgData.domain}
                        onChange={(e) => setOrgData({ ...orgData, domain: e.target.value })}
                        className="w-full border rounded-md p-2 text-sm"
                      >
                        <option value="">Select Business Domain</option>
                        {businessDomains.map((domain) => (
                          <option key={domain} value={domain}>
                            {domain}
                          </option>
                        ))}
                      </select>
                      {errors.domain && <p className="text-sm text-red-600">{errors.domain}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.domain || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    {/* <Globe className="size-4" /> */}
                    Website
                  </Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.website}
                        onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                        placeholder="Enter website URL"
                      />
                      {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
                    </>
                  ) : orgData.website ? (
                    <a href={`https://${orgData.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                      {orgData.website}
                    </a>
                  ) : (
                    <p className="font-medium">-</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Total Employees</Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.employees}
                        onChange={(e) => setOrgData({ ...orgData, employees: e.target.value })}
                        placeholder="Enter total employees"
                      />
                      {errors.employees && <p className="text-sm text-red-600">{errors.employees}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.employees || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    {/* <Calendar className="size-4" /> */}
                    Established On
                  </Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.established}
                        onChange={(e) => setOrgData({ ...orgData, established: e.target.value })}
                        placeholder="DD-MM-YYYY"
                        type="date"
                      />
                      {errors.established && <p className="text-sm text-red-600">{errors.established}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.established || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    {/* <Phone className="size-4" /> */}
                    Customer Care
                  </Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.customerCare}
                        onChange={(e) => setOrgData({ ...orgData, customerCare: e.target.value })}
                        placeholder="Enter customer care number"
                      />
                      {errors.customerCare && <p className="text-sm text-red-600">{errors.customerCare}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.customerCare || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Country</Label>

                  {isEditing && !viewOnly ? (
                    <>
                      <Select
                        value={orgData.country}
                        onValueChange={(selectedCountry: any) => {
                          setOrgData({ ...orgData, country: selectedCountry, state: "", city: "" });
                          fetchStates(selectedCountry);
                        }}
                      >
                        <SelectTrigger className="w-full border rounded-md p-2 text-sm">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>

                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.country && (
                        <p className="text-sm text-red-600">{errors.country}</p>
                      )}
                    </>
                  ) : (
                    <p className="font-medium">{getCountryName(orgData.country)}</p>
                  )}
                </div>


                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">State</Label>

                  {isEditing && !viewOnly ? (
                    <>
                      <Select
                        value={orgData.state}
                        onValueChange={(selectedState: any) => {
                          setOrgData({ ...orgData, state: selectedState, city: "" });
                          // useEffect will automatically fetch cities
                        }}
                      >
                        <SelectTrigger className="w-full border rounded-md p-2 text-sm">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>

                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.state && (
                        <p className="text-sm text-red-600">{errors.state}</p>
                      )}
                    </>
                  ) : (
                    <p className="font-medium">{getStateName(orgData.state)}</p>
                  )}
                </div>


                {/* <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Organization Code</Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Input
                        value={orgData.category}
                        onChange={(e) => setOrgData({ ...orgData, category: e.target.value })}
                        placeholder="Enter category"
                      />
                      {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.category || "-"}</p>
                  )}
                </div> */}

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">City</Label>

                  {isEditing && !viewOnly ? (
                    <>
                      <Select
                        value={orgData.city}
                        onValueChange={(selectedCity: any) =>
                          setOrgData({ ...orgData, city: selectedCity })
                        }
                      >
                        <SelectTrigger className="w-full border rounded-md p-2 text-sm">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>

                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.city && (
                        <p className="text-sm text-red-600">{errors.city}</p>
                      )}
                    </>
                  ) : (
                    <p className="font-medium">{getCityName(orgData.city)}</p>
                  )}
                </div>

              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    {/* <MapPin className="size-4" /> */}
                    Head Office Address
                  </Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Textarea
                        value={orgData.headOffice}
                        onChange={(e) => setOrgData({ ...orgData, headOffice: e.target.value })}
                        rows={4}
                        placeholder="Enter head office address"
                      />
                      {errors.headOffice && <p className="text-sm text-red-600">{errors.headOffice}</p>}
                    </>
                  ) : (
                    <p className="font-medium">{orgData.headOffice || "-"}</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <Label className="text-sm text-muted-foreground mb-2">Regional Office</Label>
                  {isEditing && !viewOnly ? (
                    <>
                      <Textarea
                        value={orgData.regionalOffice}
                        onChange={(e) => setOrgData({ ...orgData, regionalOffice: e.target.value })}
                        rows={4}
                        className="mt-2"
                        placeholder="Enter regional office address (optional)"
                      />
                      {errors.regionalOffice && <p className="text-sm text-red-600">{errors.regionalOffice}</p>}
                    </>
                  ) : (
                    <p className="font-medium mt-2">{orgData.regionalOffice || "-"}</p>
                  )}
                </div>

                {!isEditing && hasOrganization && !viewOnly && (
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <MapPin className="size-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!hasOrganization && !isEditing && !viewOnly && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building2 className="size-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">No Organization Added</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Click the "Add Organization" button above to add your organization information
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
