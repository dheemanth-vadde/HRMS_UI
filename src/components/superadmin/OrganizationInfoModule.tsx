import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, Globe, Calendar, Phone, MapPin, Edit, Save, X, Plus, Upload, Image } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { getValidationError } from "../../utils/validations";

interface OrganizationInfoModuleProps {
  viewOnly?: boolean;
}

export function OrganizationInfoModule({ viewOnly = false }: OrganizationInfoModuleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasOrganization, setHasOrganization] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [orgData, setOrgData] = useState({
    name: "",
    domain: "",
    website: "",
    employees: "",
    established: "",
    customerCare: "",
    country: "",
    state: "",
    category: "",
    headOffice: "",
    regionalOffice: "",
    logo: "",
  });

  const handleSave = () => {
    // Validate that at least the organization name is filled
    if (!orgData.name.trim()) {
      toast.error("Organization name is required");
      return;
    }

    const customerCareError = getValidationError("phone", orgData.customerCare, "Customer care number must be exactly 10 digits");

    if (customerCareError) {
      toast.error(customerCareError);
      return;
    }

    // If valid, proceed
    setIsEditing(false);
    setHasOrganization(true);
    toast.success("Organization information saved successfully");
    // Here you would typically save to backend/database
  };

  const handleAddOrganization = () => {
    setIsEditing(true);
    setHasOrganization(false);
  };

  const handleCancel = () => {
    if (!hasOrganization) {
      // If no organization exists, reset all fields
      setOrgData({
        name: "",
        domain: "",
        website: "",
        employees: "",
        established: "",
        customerCare: "",
        country: "",
        state: "",
        category: "",
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
            {!isEditing && !hasOrganization ? (
              <Button 
                className="btn-add-purple"
                onClick={handleAddOrganization}
              >
                <Plus className="size-4 mr-2" />
                Add Organization
              </Button>
            ) : !isEditing && hasOrganization ? (
              <Button 
                className="btn-gradient-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="size-4 mr-2" />
                Edit Info
              </Button>
            ) : (
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
            )}
          </div>
        )}
      </div>

      {(hasOrganization || isEditing || viewOnly) && (
        <Card>
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <Building2 className="size-6 text-primary" />
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
                    <Image className="size-4" />
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
                    <Input
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                      placeholder="Enter organization name"
                    />
                  ) : (
                    <p className="font-medium">{orgData.name || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Business Domain</Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.domain}
                      onChange={(e) => setOrgData({ ...orgData, domain: e.target.value })}
                      placeholder="Enter business domain"
                    />
                  ) : (
                    <p className="font-medium">{orgData.domain || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Globe className="size-4" />
                    Website
                  </Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.website}
                      onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                      placeholder="Enter website URL"
                    />
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
                    <Input
                      value={orgData.employees}
                      onChange={(e) => setOrgData({ ...orgData, employees: e.target.value })}
                      placeholder="Enter total employees"
                    />
                  ) : (
                    <p className="font-medium">{orgData.employees || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="size-4" />
                    Established On
                  </Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.established}
                      onChange={(e) => setOrgData({ ...orgData, established: e.target.value })}
                      placeholder="DD-MM-YYYY"
                    />
                  ) : (
                    <p className="font-medium">{orgData.established || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="size-4" />
                    Customer Care
                  </Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.customerCare}
                      onChange={(e) => setOrgData({ ...orgData, customerCare: e.target.value })}
                      placeholder="Enter customer care number"
                    />
                  ) : (
                    <p className="font-medium">{orgData.customerCare || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Country</Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.country}
                      onChange={(e) => setOrgData({ ...orgData, country: e.target.value })}
                      placeholder="Enter country"
                    />
                  ) : (
                    <p className="font-medium">{orgData.country || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Headquarters State</Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.state}
                      onChange={(e) => setOrgData({ ...orgData, state: e.target.value })}
                      placeholder="Enter state"
                    />
                  ) : (
                    <p className="font-medium">{orgData.state || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Organization Category</Label>
                  {isEditing && !viewOnly ? (
                    <Input
                      value={orgData.category}
                      onChange={(e) => setOrgData({ ...orgData, category: e.target.value })}
                      placeholder="Enter category"
                    />
                  ) : (
                    <p className="font-medium">{orgData.category || "-"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="size-4" />
                    Head Office Address
                  </Label>
                  {isEditing && !viewOnly ? (
                    <Textarea
                      value={orgData.headOffice}
                      onChange={(e) => setOrgData({ ...orgData, headOffice: e.target.value })}
                      rows={4}
                      placeholder="Enter head office address"
                    />
                  ) : (
                    <p className="font-medium">{orgData.headOffice || "-"}</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <Label className="text-sm text-muted-foreground mb-2">Regional Office</Label>
                  {isEditing && !viewOnly ? (
                    <Textarea
                      value={orgData.regionalOffice}
                      onChange={(e) => setOrgData({ ...orgData, regionalOffice: e.target.value })}
                      rows={4}
                      className="mt-2"
                      placeholder="Enter regional office address (optional)"
                    />
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
