import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Building2, Search, RefreshCw, Plus, Edit, Trash2, MoreVertical, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { getValidationError } from "../../utils/validations";
interface BusinessUnitsModuleProps {
  viewOnly?: boolean;
}
import api from "../../services/interceptors";
import BUSSINESSUNIT_ENDPOINTS from "../../services/businessUnitEndpoints";
import CITY_ENDPOINTS from "../../services/cityEndpoints";
import STATE_ENDPOINTS from "../../services/stateEndpoints";
import COUNTRY_ENDPOINTS from "../../services/countryEndpoints";
import EMPLOYEEMENTTPE_ENDPOINTS from "../../services/employEementTypeEndpoints";

export function BusinessUnitsModule({ viewOnly = false }: BusinessUnitsModuleProps) {
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newUnit, setNewUnit] = useState({
    name: "",
    code: "",
    startedOn: "",
    streetAddress: "",
    cityId: "",
    stateId: "",
    countryId: "",
    empPrefix: "",
    empTypes: [] as string[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [cities, setCities] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [employeeTypes, setEmployeeTypes] = useState<any[]>([]);
  const [filteredStates, setFilteredStates] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default to 10, matching your Select

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  const validateUnit = (unit: typeof newUnit, idToExclude?: string) => {
    const requiredFields: (keyof typeof unit)[] = [
      "name",
      "code",
      "startedOn",
      "streetAddress",
      "cityId",
      "stateId",
      "countryId",
      "empPrefix",
      "empTypes"
    ];

    const errors: { [key: string]: string | null } = {};

    for (const field of requiredFields) {
      const value = unit[field];
      let error: string | null = null;
 
      // Handle City, State, Country, and Employment Types
      if (["cityId", "stateId", "countryId", "empTypes"].includes(field)) {
        // For empTypes, check array length
        if (field === "empTypes") {
          if (!Array.isArray(value) || value.length === 0) {
            error = "Please select an option";
          }
        } else {
          error = getValidationError("required", value as any, "Please select an option");
        }
      }
      // Handle other text fields
      else {
        error = getValidationError("required", value as any ?? "", "This field is required");
      }
 
      if (error) {
        errors[String(field)] = error;
        continue;
      }
      if ((field === "name" || field === "code" || field === "empPrefix" || field === "streetAddress") && typeof value === "string") {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `Field has extra spaces`
        );
        if (spaceError) {
          errors[field] = spaceError;
          continue;
        }
      }
      // Unique validation for name/code
      if (["name", "code"].includes(field)) {
        error = getValidationError("unique", value as any, "This field already exists", {
          list: businessUnits.filter((u) => u.id !== idToExclude),
          propertyName: field,
        });
        if (error) errors[field] = error;
      }
    }


    return errors;
  };

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      setLoading(true);
      try {
        const response = await api.get(BUSSINESSUNIT_ENDPOINTS.GET_BUSSINESSUNIT);
        const unitsArray = response.data.data;

        // Map API data to frontend structure
        const mappedUnits = unitsArray.map((unit: any) => {
          const cityObj = cities.find((c) => c.id === unit.cityId) || { city: unit.cityId };
          const stateObj = states.find((s) => s.id === unit.stateId) || { state: unit.stateId };
          const countryObj = countries.find((c) => c.id === unit.countryId) || { country: unit.countryId };
          const empTypesArray =
            Array.isArray(unit.empTypes)
              ? unit.empTypes
              : Array.isArray(unit.empTypes?.types)
                ? unit.empTypes.types
                : [];

          return {
            id: unit.id,
            name: unit.unitName || "",
            code: unit.unitCode || "",
            startedOn: unit.startDate || "",
            streetAddress: unit.address1 || "",
            city: cityObj ? cityObj.city : unit.cityId,
            state: stateObj ? stateObj.state : unit.stateId,
            country: countryObj ? countryObj.country : unit.countryId,
            empTypes: unit.empTypes?.types || [],
            empPrefix: unit.empPrefix || "",
          };
        });

        setBusinessUnits(mappedUnits);
      } catch (err) {
        console.error("Failed to fetch business units", err);
        toast.error("Failed to load business units");
      } finally {
        setLoading(false);
      }
    };

    if (cities.length > 0 && states.length > 0 && countries.length > 0) {
      fetchBusinessUnits();
    }
  }, [cities, states, countries]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get(CITY_ENDPOINTS.GET_CITY);
        setCities(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch cities", err);
        toast.error("Failed to load cities");
      }
    };
    const fetchStates = async () => {
      try {
        const response = await api.get(STATE_ENDPOINTS.GET_STATE);
        setStates(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch states", err);
        toast.error("Failed to load states");
      }
    };
    const fetchCountries = async () => {
      try {
        const response = await api.get(COUNTRY_ENDPOINTS.GET_COUNTRY);
        setCountries(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch countries", err);
        toast.error("Failed to load countries");
      }
    };


    const fetchEmployeeTypes = async () => {
      try {
        const response = await api.get(EMPLOYEEMENTTPE_ENDPOINTS.GET_EMPLOYEEMENTTPE);
        setEmployeeTypes(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch employee types", err);
        toast.error("Failed to load employee types");
      }
    };
    fetchEmployeeTypes();
    fetchCities();
    fetchStates();
    fetchCountries();


  }, []);

  const handleAdd = async () => {
    const newErrors = validateUnit(newUnit);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Make POST request to backend
      const payload = {
        unitName: newUnit.name,
        unitCode: newUnit.code,
        startDate: newUnit.startedOn,
        address1: newUnit.streetAddress,
        cityId: newUnit.cityId,
        stateId: newUnit.stateId,
        countryId: newUnit.countryId,
        empPrefix: newUnit.empPrefix,
        empTypes: {
          types: newUnit.empTypes // array of selected typeNames
        },
      };
      console.log("Payload for adding business unit:", payload);

      const response = await api.post(BUSSINESSUNIT_ENDPOINTS.POST_BUSSINESSUNIT, payload);

      // On success, add the returned unit to local state
      const addedUnit = response.data.data;

      setBusinessUnits([

        {
          id: addedUnit.id,
          name: addedUnit.unitName,
          code: addedUnit.unitCode,
          startedOn: addedUnit.startDate,
          streetAddress: addedUnit.address1,
          city: cities.find(c => c.id === addedUnit.cityId)?.city || addedUnit.cityId,
          state: states.find(s => s.id === addedUnit.stateId)?.state || addedUnit.stateId,
          country: countries.find(c => c.id === addedUnit.countryId)?.country || addedUnit.countryId,
          empPrefix: addedUnit.empPrefix || newUnit.empPrefix, // 
          empTypes:
            Array.isArray(addedUnit.empTypes?.types)
              ? addedUnit.empTypes.types
              : newUnit.empTypes, // 
        },
        ...businessUnits,
      ]);



      toast.success("Business unit added successfully!");
      setShowAddDialog(false);
      resetNewUnit();
      setCurrentPage(1);

    } catch (err) {
      console.error("Failed to add business unit", err);
      toast.error("Failed to add business unit");
    }
  };


  const handleEdit = (unit: any) => {
    setEditingUnit({
      ...unit,
      empTypes: unit.empTypes || [],
      cityId: cities.find(c => c.city === unit.city)?.id || "",
      stateId: states.find(s => s.state === unit.state)?.id || "",
      countryId: countries.find(c => c.country === unit.country)?.id || "",


    });
  };

  // New useEffect to handle State/City filtering on dialog open (for Edit only)
  useEffect(() => {
    if (showEditDialog && editingUnit) {
      // 1. Filter States based on the initial countryId
      const initialFilteredStates = states.filter(
        (s) => s.countryId === editingUnit.countryId
      );
      setFilteredStates(initialFilteredStates);

      // 2. Filter Cities based on the initial countryId and stateId
      const initialFilteredCities = cities.filter(
        (c) =>
          c.stateId === editingUnit.stateId &&
          c.countryId === editingUnit.countryId
      );
      setFilteredCities(initialFilteredCities);
    }
  }, [showEditDialog, editingUnit, states, cities]); // Dependencies: dialog open, unit data, all states/cities


  const handleUpdate = async () => {
    if (!editingUnit) return;

    const newErrors = validateUnit(editingUnit, editingUnit.id); // pass current unit id
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    try {
      const payload = {
        unitName: editingUnit.name,
        unitCode: editingUnit.code,
        startDate: editingUnit.startedOn,
        address1: editingUnit.streetAddress,
        cityId: editingUnit.cityId,
        stateId: editingUnit.stateId,
        countryId: editingUnit.countryId,
        empPrefix: editingUnit.empPrefix,
        empTypes: { types: editingUnit.empTypes },
      };

      const response = await api.put(
        BUSSINESSUNIT_ENDPOINTS.PUT_BUSSINESSUNIT(editingUnit.id),
        payload
      );

      const updatedUnit = response.data.data;

      setBusinessUnits(
        businessUnits.map(u =>
          u.id === updatedUnit.id
            ? {
              ...updatedUnit,
              name: updatedUnit.unitName,
              code: updatedUnit.unitCode,
              startedOn: updatedUnit.startDate,
              streetAddress: updatedUnit.address1,
              city: cities.find(c => c.id === updatedUnit.cityId)?.city || updatedUnit.cityId,
              state: states.find(s => s.id === updatedUnit.stateId)?.state || updatedUnit.stateId,
              country: countries.find(c => c.id === updatedUnit.countryId)?.country || updatedUnit.countryId,
              cityId: updatedUnit.cityId,
              stateId: updatedUnit.stateId,
              countryId: updatedUnit.countryId,
              empPrefix: updatedUnit.empPrefix,
              empTypes:
                Array.isArray(updatedUnit.empTypes?.types)
                  ? updatedUnit.empTypes.types
                  : editingUnit.empTypes, // ✅ keep types

            }
            : u
        )
      );

      toast.success("Business unit updated successfully!");

      // ✅ Close the dialog after successful update
      setShowEditDialog(false);
      setEditingUnit(null);
      setCurrentPage(1);
      setErrors({});
    } catch (err) {
      console.error("Failed to update business unit", err);
      toast.error("Failed to update business unit");
    }
  };




  const handleDeleteClick = (id: number) => {
    setUnitToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (unitToDelete !== null) {
      try {
        // Call DELETE API
        await api.delete(BUSSINESSUNIT_ENDPOINTS.DELETE_BUSSINESSUNIT(unitToDelete));

        // Update local state only if API succeeds
        setBusinessUnits(businessUnits.filter(u => u.id !== unitToDelete));
        toast.success("Business unit deleted successfully!");
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to delete business unit", err);
        toast.error("Failed to delete business unit");

      } finally {
        setDeleteConfirmOpen(false);
        setUnitToDelete(null);
      }
    }
  };
  const filteredUnits = businessUnits.filter(unit => {
    const query = searchQuery.toLowerCase();

    // Check employee ID (empPrefix)
    const empPrefixMatch = unit.empPrefix?.toLowerCase().includes(query);

    // Check employment types (array of strings)
    const empTypesMatch =
      Array.isArray(unit.empTypes) &&
      unit.empTypes.some((type: any) => type.toLowerCase().includes(query));

    // Check other fields
    const otherFieldsMatch =
      unit.name.toLowerCase().includes(query) ||
      unit.code.toLowerCase().includes(query) ||
      unit.city.toLowerCase().includes(query) ||
      unit.state.toLowerCase().includes(query) ||
      unit.country.toLowerCase().includes(query) ||
      unit.streetAddress.toLowerCase().includes(query) ||
      unit.startedOn.toLowerCase().includes(query);

    return empPrefixMatch || empTypesMatch || otherFieldsMatch;
  });


  const totalPages = Math.ceil(filteredUnits.length / pageSize);
  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetNewUnit = () => {
    setNewUnit({
      name: "",
      code: "",
      startedOn: "",
      streetAddress: "",
      cityId: "",
      stateId: "",
      countryId: "",
      empPrefix: "",
      empTypes: [],
    });
    setErrors({});
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Business Units</h1>
          <p className="text-muted-foreground mt-1">
            {viewOnly ? "View organization business units" : "Manage organization business units"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!viewOnly && (
            <Button className="btn-add-purple" onClick={() => setShowAddDialog(true)}>
              <Plus className="size-4 mr-2" />
              Add Business Unit
            </Button>
          )}
        </div>
      </div>

      {/* Business Units Table */}
      <Card className="border-[#e5e7eb]">
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-base mb-1">Employee ID</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Code</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Started On</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Employment Types</TableHead>
                  {/* <TableHead>Street Address</TableHead> */}
                  <TableHead className="font-semibold text-base mb-1">Country</TableHead>
                  <TableHead className="font-semibold text-base mb-1">State</TableHead>
                  <TableHead className="font-semibold text-base mb-1">City</TableHead>
                  <TableHead className="font-semibold text-base mb-1 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUnits.length > 0 ? (
                  paginatedUnits.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell>{unit.empPrefix || "-"}</TableCell>
                      <TableCell>{unit.name}</TableCell>
                      <TableCell>{unit.code}</TableCell>
                      <TableCell>{unit.startedOn}</TableCell>
                      <TableCell>
                        {Array.isArray(unit.empTypes) && unit.empTypes.length > 0
                          ? unit.empTypes.join(", ")
                          : "-"}
                      </TableCell>
                      <TableCell>{unit.country}</TableCell>
                      <TableCell>{unit.state}</TableCell>
                      <TableCell>{unit.city}</TableCell>
                      <TableCell className="text-right">
                        {!viewOnly && (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                handleEdit(unit);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="size-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(unit.id)}
                            >
                              <Trash2 className="size-4 text-gray-500" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-4">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1 || totalPages === 0}  // CHANGED: Enable/disable based on page
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}  // CHANGED: Handle prev
              >
                <span>←</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages || totalPages === 0}  // CHANGED: Enable/disable based on page
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}  // CHANGED: Handle next
              >
                <span>→</span>
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Page {currentPage} of {totalPages || 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Records per page:</span>
              <Select
                value={pageSize.toString()}  // CHANGED: Controlled by pageSize state
                onValueChange={(value: any) => {
                  setPageSize(Number(value));  // CHANGED: Update pageSize
                  setCurrentPage(1);  // CHANGED: Reset to page 1
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Business Unit Dialog */}
      <Dialog open={showAddDialog}
        // onOpenChange={setShowAddDialog}
        onOpenChange={(open: boolean) => {
          setShowAddDialog(open);
          if (!open) resetNewUnit(); // Reset the form when dialog is closed
        }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Business Unit</DialogTitle>
            <DialogDescription>
              Add a new business unit to your organization
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Unit Name *</Label>
                <Input
                  placeholder="e.g., Delhi Regional Office"
                  value={newUnit.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, name: value });
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                // onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label>Unit Code *</Label>
                <Input
                  placeholder="e.g., PNB-DEL"
                  value={newUnit.code}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setNewUnit({ ...newUnit, code: value });
                    if (errors.code) {
                      setErrors((prev) => ({ ...prev, code: "" }));
                    }
                  }}
                // onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })}
                />
                {errors.code && <p className="text-destructive text-sm mt-1">{errors.code}</p>}
              </div>
              {/* Employee Prefix */}
              <div className="space-y-2">
                <Label>Employee Prefix *</Label>
                <Input
                  placeholder="e.g., EMP"
                  value={newUnit.empPrefix}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, empPrefix: value });
                    if (errors.empPrefix) setErrors((prev) => ({ ...prev, empPrefix: "" }));
                  }}
                />
                {errors.empPrefix && (
                  <p className="text-destructive text-sm mt-1">{errors.empPrefix}</p>
                )}
              </div>
              <div className="space-y-2">
    <Label>Employeement Types *</Label>


    <Select
        value={newUnit.empTypes}
        onValueChange={(value: any) => {
            // value is the clicked item
            setNewUnit((prev) => {
                const exists = prev.empTypes.includes(value);
                let updated: string[];
                if (exists) {
                    // remove if already selected
                    updated = prev.empTypes.filter((v) => v !== value);
                } else {
                    // add if not selected
                    updated = [...prev.empTypes, value];
                }
                return { ...prev, empTypes: updated };
            });
            if (errors.empTypes) setErrors((prev) => ({ ...prev, empTypes: "" }));

        }}
        multiple
    >
        <SelectTrigger>
            <SelectValue placeholder="Select employment types">
                {newUnit.empTypes.length > 0
                    ? newUnit.empTypes.join(", ")
                    : "Select employment types"}
            </SelectValue>
        </SelectTrigger>

        <SelectContent>
            {employeeTypes.map((type) => {
                const isSelected = newUnit.empTypes.includes(type.typeName);
                return (
                    <div
                        key={type.id}
                        onClick={() => {
                            const updated = isSelected
                                ? newUnit.empTypes.filter((v) => v !== type.typeName)
                                : [...newUnit.empTypes, type.typeName]; 
                            setNewUnit((prev) => ({ ...prev, empTypes: updated }));
                            if (errors.empTypes) setErrors((prev) => ({ ...prev, empTypes: "" }));
                        }}
                        // CHANGE MADE HERE: Added hover:text-primary
                        className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent hover:accent-foreground text-sm ${isSelected ? "bg-accent text-primary" : ""
                            }`}
                    >
                        <span>{type.typeName}</span>
                        {isSelected && <Check className="size-4 text-green-500" />}
                    </div>
                );
            })}
        </SelectContent>
    </Select>

    {errors.empTypes && <p className="text-destructive text-sm mt-1">{errors.empTypes}</p>}
</div>




              <div className="space-y-2">
                <Label>Started On *</Label>
                <Input
                  type="date"
                  placeholder="DD-MM-YYYY"
                  value={newUnit.startedOn}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, startedOn: value });
                    if (errors.startedOn) {
                      setErrors((prev) => ({ ...prev, startedOn: "" }));
                    }
                  }}
                //  onChange={(e) => setNewUnit({ ...newUnit, startedOn: e.target.value })}
                />
                {errors.startedOn && <p className="text-destructive text-sm mt-1">{errors.startedOn}</p>}
              </div>
              <div className="space-y-2">
                <Label>Street Address *</Label>
                <Input
                  placeholder="Enter address"
                  value={newUnit.streetAddress}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewUnit({ ...newUnit, streetAddress: value });
                    if (errors.streetAddress) {
                      setErrors((prev) => ({ ...prev, streetAddress: "" }));
                    }
                  }}
                // onChange={(e) => setNewUnit({ ...newUnit, streetAddress: e.target.value })}
                />
                {errors.streetAddress && <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>}
              </div>
              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  value={newUnit.countryId}
                  onValueChange={(value: any) => {
                    setNewUnit({ ...newUnit, countryId: value, stateId: "", cityId: "" });
                    setFilteredStates(states.filter((s) => s.countryId === value));
                    setFilteredCities([]);
                    if (errors.countryId) setErrors((prev) => ({ ...prev, countryId: "" }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.countryId && <p className="text-destructive text-sm mt-1">{errors.countryId}</p>}
              </div>
              <div className="space-y-2">
                <Label>State *</Label>
                <Select
                  value={newUnit.stateId}
                  onValueChange={(value: any) => {
                    setNewUnit({ ...newUnit, stateId: value, cityId: "" });
                    setFilteredCities(cities.filter((c) => c.stateId === value && c.countryId === newUnit.countryId));
                    if (errors.stateId) setErrors((prev) => ({ ...prev, stateId: "" }));
                  }}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStates.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stateId && <p className="text-destructive text-sm mt-1">{errors.stateId}</p>}
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Select
                  value={newUnit.cityId}
                  onValueChange={(value: any) => {
                    setNewUnit({ ...newUnit, cityId: value });
                    if (errors.cityId) {
                      setErrors((prev) => ({ ...prev, cityId: "" }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCities.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cityId && <p className="text-destructive text-sm mt-1">{errors.cityId}</p>}
              </div>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddDialog(false); resetNewUnit(); }}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>
                <Plus className="size-4 mr-2" />
                Add Unit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Business Unit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={(open: any) => {
        if (!open) setEditingUnit(null);
        setShowEditDialog(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Business Unit</DialogTitle>
            <DialogDescription>Update business unit information</DialogDescription>
          </DialogHeader>

          {editingUnit && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Unit Name *</Label>
                  <Input
                    placeholder="e.g., Delhi Regional Office"
                    value={editingUnit.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingUnit({ ...editingUnit, name: value });

                      // Clear error for this field as soon as user types
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                  />

                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Unit Code *</Label>
                  <Input
                    placeholder="e.g., PNB-DEL"
                    value={editingUnit.code}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setEditingUnit({ ...editingUnit, code: value });
                      // Clear error for this field as soon as user types
                      if (errors.code) {
                        setErrors((prev) => ({ ...prev, code: "" }));
                      }
                    }}
                  //   onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value })}
                  />
                  {errors.code && <p className="text-destructive text-sm mt-1">{errors.code}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Employee Prefix *</Label>
                  <Input
                    placeholder="e.g., EMP"
                    value={editingUnit.empPrefix || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingUnit({ ...editingUnit, empPrefix: value });
                      if (errors.empPrefix) setErrors((prev) => ({ ...prev, empPrefix: "" }));
                    }}
                  />
                  {errors.empPrefix && (
                    <p className="text-destructive text-sm mt-1">{errors.empPrefix}</p>
                  )}
                </div>


                <div className="space-y-2">
                  <Label>Employment Types *</Label>

                  <Select
                    value={editingUnit.empTypes || []}
                    onValueChange={(value: any) => {
                      setEditingUnit((prev: any) => {
                        if (!prev) return prev;
                        const exists = prev.empTypes.includes(value);
                        let updated: string[];
                        if (exists) {
                          updated = prev.empTypes.filter((v: any) => v !== value);
                        } else {
                          updated = [...prev.empTypes, value];
                        }
                        return { ...prev, empTypes: updated };
                      });

                      if (errors.empTypes) setErrors((prev) => ({ ...prev, empTypes: "" }));
                    }}
                    multiple
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment types">
                        {editingUnit.empTypes?.length > 0
                          ? editingUnit.empTypes.join(", ")
                          : "Select employment types"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {employeeTypes.map((type) => {
                        const isSelected = editingUnit.empTypes?.includes(type.typeName);
                        return (
                          <div
                            key={type.id}
                            onClick={() => {
                              const updated = isSelected
                                ? editingUnit.empTypes.filter((v: any) => v !== type.typeName)
                                : [...(editingUnit.empTypes || []), type.typeName];
                              setEditingUnit((prev: any) => prev ? { ...prev, empTypes: updated } : prev);
                              if (errors.empTypes) setErrors((prev) => ({ ...prev, empTypes: "" }));
                            }}
                            className={`flex items-center justify-between w-full cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent ${isSelected ? "bg-accent text-primary font-medium" : ""
                              }`}
                          >
                            <span>{type.typeName}</span>
                            {isSelected && <Check className="size-4 text-green-500" />}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  {errors.empTypes && <p className="text-destructive text-sm mt-1">{errors.empTypes}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Started On *</Label>
                  <Input
                    type="date"
                    value={editingUnit.startedOn}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingUnit({ ...editingUnit, startedOn: value });
                      // Clear error for this field as soon as user types
                      if (errors.startedOn) {
                        setErrors((prev) => ({ ...prev, startedOn: "" }));
                      }
                    }}
                  //onChange={(e) => setEditingUnit({ ...editingUnit, startedOn: e.target.value })}
                  />
                  {errors.startedOn && <p className="text-destructive text-sm mt-1">{errors.startedOn}</p>}
                </div>


                <div className="space-y-2">
                  <Label>Street Address *</Label>
                  <Input
                    value={editingUnit.streetAddress}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditingUnit({ ...editingUnit, streetAddress: value });
                      // Clear error for this field as soon as user types
                      if (errors.streetAddress) {
                        setErrors((prev) => ({ ...prev, streetAddress: "" }));
                      }
                    }}
                  //onChange={(e) => setEditingUnit({ ...editingUnit, streetAddress: e.target.value })}
                  />
                  {errors.streetAddress && <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Select
                    value={editingUnit.countryId}
                    onValueChange={(value: any) => {
                      setEditingUnit({
                        ...editingUnit,
                        countryId: value,
                        // Reset state and city when country changes
                        stateId: "",
                        cityId: "",
                      });
                      setFilteredStates(states.filter((s) => s.countryId === value));
                      // 2. Clear filtered cities
                      setFilteredCities([]);
                      // Clear error for country as soon as user selects
                      if (errors.countryId) {
                        setErrors((prev) => ({ ...prev, countryId: "" }));
                      }
                    }}
                  // onValueChange={(value) => setEditingUnit({ ...editingUnit, countryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.countryId && <p className="text-destructive text-sm mt-1">{errors.countryId}</p>}
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select
                    value={editingUnit.stateId}
                    onValueChange={(value: any) => {
                      setEditingUnit({
                        ...editingUnit,
                        stateId: value,
                        // Reset city when state changes
                        cityId: ""
                      });

                      // 1. Filter cities for the new state (must also check country)
                      setFilteredCities(
                        cities.filter(
                          (c) => c.stateId === value && c.countryId === editingUnit.countryId
                        )
                      );

                      if (errors.stateId) {
                        setErrors((prev) => ({ ...prev, stateId: "" }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStates.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.stateId && <p className="text-destructive text-sm mt-1">{errors.stateId}</p>}
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Select
                    value={editingUnit.cityId}
                    onValueChange={(value: any) => {
                      setEditingUnit({ ...editingUnit, cityId: value });
                      // Clear error for city as soon as user selects
                      if (errors.cityId) {
                        setErrors((prev) => ({ ...prev, cityId: "" }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cityId && <p className="text-destructive text-sm mt-1">{errors.cityId}</p>}
                </div>

              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>

            <AlertDialogDescription>
              Are you sure you want to delete this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
