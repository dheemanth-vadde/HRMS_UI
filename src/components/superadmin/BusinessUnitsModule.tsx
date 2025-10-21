import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Building2, Search, RefreshCw, Plus, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
import TIMEZONE_ENDPOINTS from "../../services/timeZoneEndpoints";

export function BusinessUnitsModule({ viewOnly = false }: BusinessUnitsModuleProps) {
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
    timezoneId: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [cities, setCities] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [timezones, setTimezones] = useState<any[]>([]);


  const validateUnit = (unit: typeof newUnit) => {
    const requiredFields: (keyof typeof unit)[] = [
      "name",
      "code",
      "startedOn",
      "streetAddress",
      "cityId",
      "stateId",
      "countryId",
      "timezoneId",
    ];

    const errors: { [key: string]: string | null } = {};

    for (const field of requiredFields) {
      const value = unit[field];

      // --- Check for leading/trailing spaces for string fields ---
      if (typeof value === "string") {
        const spaceError = getValidationError(
          "noSpaces",
          value,
          `${field} cannot start or end with a space`
        );
        if (spaceError) {
          errors[field] = spaceError;
          continue; // skip required check if space error exists
        }
      }

      // --- Required field check ---
      const requiredError = getValidationError(
        "required",
        value ?? "", // convert null/undefined to empty string
        `${field} is required`
      );
      if (requiredError) {
        errors[field] = requiredError;
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
          const timezoneObj = timezones.find((t) => t.id === unit.timezoneId) || { timezone: unit.timezoneId };

          return {
            id: unit.id,
            name: unit.unitName || "",
            code: unit.unitCode || "",
            startedOn: unit.startDate || "",
            streetAddress: unit.address1 || "",
            city: cityObj ? cityObj.city : unit.cityId,
            state: stateObj ? stateObj.state : unit.stateId,
            country: countryObj ? countryObj.country : unit.countryId,
            timezone: timezoneObj ? timezoneObj.timezone : unit.timezoneId,
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

    if (cities.length > 0 && states.length > 0 && countries.length > 0, timezones.length > 0) {
      fetchBusinessUnits();
    }
  }, [cities, states, countries, timezones]);

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
    const fetchTimezones = async () => {
      try {
        const response = await api.get(TIMEZONE_ENDPOINTS.GET_TIMEZONE);
        setTimezones(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch timezones", err);
        toast.error("Failed to load timezones");
      }
    };
    fetchCities();
    fetchStates();
    fetchCountries();
    fetchTimezones();

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
        timezoneId: newUnit.timezoneId,
      };

      const response = await api.post(BUSSINESSUNIT_ENDPOINTS.POST_BUSSINESSUNIT, payload);

      // On success, add the returned unit to local state
      const addedUnit = response.data.data;

      setBusinessUnits([
        ...businessUnits,
        {
          id: addedUnit.id,
          name: addedUnit.unitName,
          code: addedUnit.unitCode,
          startedOn: addedUnit.startDate,
          streetAddress: addedUnit.address1,
          city: cities.find(c => c.id === addedUnit.cityId)?.city || addedUnit.cityId,
          state: states.find(s => s.id === addedUnit.stateId)?.state || addedUnit.stateId,
          country: countries.find(c => c.id === addedUnit.countryId)?.country || addedUnit.countryId,
          timezone: timezones.find(t => t.id === addedUnit.timezoneId)?.timezone || addedUnit.timezoneId,
        },
      ]);


      toast.success("Business unit added successfully!");
      setShowAddDialog(false);
      resetNewUnit();

    } catch (err) {
      console.error("Failed to add business unit", err);
      toast.error("Failed to add business unit");
    }
  };


  const handleEdit = (unit: any) => {
    setEditingUnit({
      ...unit,
      cityId: cities.find(c => c.city === unit.city)?.id || "",
      stateId: states.find(s => s.state === unit.state)?.id || "",
      countryId: countries.find(c => c.country === unit.country)?.id || "",
      timezoneId: timezones.find(t => t.timezone === unit.timezone)?.id || "",
    });
  };


  const handleUpdate = async () => {
    if (!editingUnit) return;

    const newErrors = validateUnit(editingUnit);
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
        timezoneId: editingUnit.timezoneId,
      };
console.log("Update Payload:", payload); // Debug log
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
              timezone: timezones.find(t => t.id === updatedUnit.timezoneId)?.timezone || updatedUnit.timezoneId,
              cityId: updatedUnit.cityId,
              stateId: updatedUnit.stateId,
              countryId: updatedUnit.countryId,
              timezoneId: updatedUnit.timezoneId,
            }
            : u
        )
      );

      toast.success("Business unit updated successfully!");
      setEditingUnit(null);
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
      } catch (err) {
        console.error("Failed to delete business unit", err);
        toast.error("Failed to delete business unit");
      } finally {
        setDeleteConfirmOpen(false);
        setUnitToDelete(null);
      }
    }
  };



  const filteredUnits = businessUnits.filter(unit =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.state.toLowerCase().includes(searchQuery.toLowerCase())
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
      timezoneId: "",
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
              placeholder="Search business units..."
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
                  <TableHead className="font-semibold text-base mb-1">Name</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Code</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Started On</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Street Address</TableHead>
                  <TableHead className="font-semibold text-base mb-1">City</TableHead>
                  <TableHead className="font-semibold text-base mb-1"> State</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Country</TableHead>
                  <TableHead className="font-semibold text-base mb-1">Time zone</TableHead>
                  <TableHead className="font-semibold text-base mb-1"> Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.name}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, name: value });
                              if (errors.name) {
                                setErrors((prev) => ({ ...prev, name: "" }));
                              }
                            }}
                          // onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                          />
                          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                        </>
                      ) : (
                        unit.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.code}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, code: value });
                              if (errors.code) {
                                setErrors((prev) => ({ ...prev, code: "" }));
                              }
                            }}
                          // onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value })}
                          />
                          {errors.code && <p className="text-destructive text-sm mt-1">{errors.code}</p>}
                        </>
                      ) : (
                        unit.code
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            type="date"
                            value={editingUnit.startedOn}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, startedOn: value });
                              if (errors.startedOn) {
                                setErrors((prev) => ({ ...prev, startedOn: "" }));
                              }
                            }}
                          //onChange={(e) => setEditingUnit({ ...editingUnit, startedOn: e.target.value }) }
                          />
                          {errors.startedOn && (
                            <p className="text-destructive text-sm mt-1">{errors.startedOn}</p>
                          )}
                        </>
                      ) : (
                        unit.startedOn
                      )}
                    </TableCell>

                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <>
                          <Input
                            value={editingUnit.streetAddress}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingUnit({ ...editingUnit, streetAddress: value });
                              if (errors.streetAddress) {
                                setErrors((prev) => ({ ...prev, streetAddress: "" }));
                              }
                            }}
                          //   onChange={(e) => setEditingUnit({ ...editingUnit, streetAddress: e.target.value })}
                          />
                          {errors.streetAddress && <p className="text-destructive text-sm mt-1">{errors.streetAddress}</p>}
                        </>
                      ) : (
                        unit.streetAddress
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Select
                          value={editingUnit.cityId}
                          onValueChange={(value) => setEditingUnit({ ...editingUnit, cityId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        unit.city
                      )}
                    </TableCell>

                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Select
                          value={editingUnit.stateId}
                          onValueChange={(value) => setEditingUnit({ ...editingUnit, stateId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        unit.state
                      )}
                    </TableCell>

                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Select
                          value={editingUnit.countryId}
                          onValueChange={(value) => setEditingUnit({ ...editingUnit, countryId: value })}
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
                      ) : (
                        unit.country
                      )}
                    </TableCell>

                    <TableCell>
                      {editingUnit?.id === unit.id ? (
                        <Select
                          value={editingUnit.timezoneId}
                          onValueChange={(value) => setEditingUnit({ ...editingUnit, timezoneId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map((tz) => (
                              <SelectItem key={tz.id} value={tz.id}>
                                {tz.timezone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        unit.timezone
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      {!viewOnly && (
                        <div className="flex items-center justify-end gap-2">
                          {editingUnit?.id === unit.id ? (
                            <>
                              <Button size="sm" onClick={handleUpdate}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingUnit(null)}>
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(unit)}>
                                  <Edit className="size-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(unit.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="size-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <span>←</span>
              </Button>
              <Button variant="outline" size="icon" disabled>
                <span>→</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Records per page:</span>
              <Select defaultValue="20">
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
            <div className="grid grid-cols-2 gap-4">
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
                <Label>City *</Label>
                <Select
                  value={newUnit.cityId}
                  onValueChange={(value) => setNewUnit({ ...newUnit, cityId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cityId && <p className="text-destructive text-sm mt-1">{errors.cityId}</p>}
              </div>

              <div className="space-y-2">
                <Label>State *</Label>
                <Select
                  value={newUnit.stateId}
                  onValueChange={(value) => setNewUnit({ ...newUnit, stateId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stateId && <p className="text-destructive text-sm mt-1">{errors.stateId}</p>}
              </div>

              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  value={newUnit.countryId}
                  onValueChange={(value) => setNewUnit({ ...newUnit, countryId: value })}
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
                <Label>Timezone *</Label>
                <Select
                  value={newUnit.timezoneId}
                  onValueChange={(value) => {
                    setNewUnit({ ...newUnit, timezoneId: value });
                    if (errors.timezoneId) {
                      setErrors((prev) => ({ ...prev, timezoneId: "" }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.id} value={tz.id}>
                        {tz.timezone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.timezone && <p className="text-destructive text-sm mt-1">{errors.timezone}</p>}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the business unit from the system.
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
