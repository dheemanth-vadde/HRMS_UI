import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import "../css/Location.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "sonner";
import apiService from "../services/apiService";
import { Edit, Eye, Trash2 } from "lucide-react";
import { usePermissions } from "../../../utils/permissionUtils";


const Location = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentLoc, setCurrentLoc] = useState({
    location_name: "",
    city_id: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [locs, setLocs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errr, setErrr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { hasPermission } = usePermissions();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
     setLoading(true);
        const [locationRes, cityRes] = await Promise.all([
        apiService.getallLocations(),
        apiService.getallCities()
        ]);

      const locations = locationRes.data.data || locationRes.data;
      const citiesData = cityRes.data.data || cityRes.data;
      setCities(citiesData);

      // Merge city_name into locations for display
      const mergedData = locations.map(loc => {
        const city = citiesData.find(c => c.city_id === loc.city_id);
        return {
          ...loc,
          city_name: city ? city.city_name : "Unknown"
        };
      });

      setLocs(mergedData);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("GET Data Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (req = { location_name: "", city_id: "" }, index = null) => {
    setCurrentLoc(req);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = () => {
  const newErrors = {};

  if (!currentLoc.location_name?.trim()) {
    newErrors.location_name = "Location is required";
  }
  if (!currentLoc.city_id) {
    newErrors.city_id = "City is required";
  }

  // Duplicate check (case-insensitive)
  const isDuplicate = locs.some((loc, index) =>
    loc.location_name.trim().toLowerCase() === currentLoc.location_name.trim().toLowerCase() &&
    loc.city_id === parseInt(currentLoc.city_id) && // Ensure city_id matches
    index !== editIndex // Ignore same row if editing
  );

  if (isDuplicate) {
    newErrors.location_name = "This location already exists for the selected city";
  }

  setErrr(newErrors);

  if (Object.keys(newErrors).length === 0) {
    handleSaveCallback();
  }
};


  const handleSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedLoc = {
          ...currentLoc,
          location_id: locs[editIndex].location_id
        };
       await apiService.updateLocation(updatedLoc.location_id, updatedLoc);

        toast.success("Location updated successfully");
        await fetchData(); // reload with updated city name
      } else {
        const response =  await apiService.addLocation(currentLoc);
        toast.success("Location added successfully");
        await fetchData();
      }
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (index) => {
    const idToDelete = locs[index]?.location_id;
    try {
      await apiService.deleteLocation(idToDelete);
      setLocs(locs.filter((loc) => loc.location_id !== idToDelete));
      toast.success("Location deleted");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentLoc({ location_name: "", city_id: "" });
    setEditIndex(null);
    setErrr({});
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const filteredAndSortedJobs = () => {
    let filteredItems = [...locs];
    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (loc) =>
          loc.location_name?.toLowerCase().includes(lowerTerm) ||
          loc.city_name?.toLowerCase().includes(lowerTerm)
      );
    }
    if (sortConfig.key !== null) {
      filteredItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (aValue == null || bValue == null) return 0;
        return sortConfig.direction === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
    }
    return filteredItems;
  };

  const jobsToDisplay = filteredAndSortedJobs();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  // if (error) return <div className="alert alert-danger mt-5">{error}</div>;

 return (
  <div className="space-y-6 py-3">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">Locations</h1>
        <p className="text-muted-foreground mt-1">
          Manage locations
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-80">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search by location or city"
            className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {hasPermission('/recruitment/master/location', 'create') === true && (
          <button 
            onClick={() => openModal()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3 btn-add-purple"
          >
            <span>+</span> Add Location
          </button>
        )}
      </div>
    </div>

    <div className="border border-[#e5e7eb] rounded-md">
      <div className="rounded-md">
        <Table className="w-full caption-bottom text-sm">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead 
                className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                onClick={() => handleSort("city_name")}
              >
                City Name
                <span className="ml-1">{getSortIndicator("city_name")}</span>
              </TableHead>
              <TableHead 
                className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                onClick={() => handleSort("location_name")}
              >
                Location Name
                <span className="ml-1">{getSortIndicator("location_name")}</span>
              </TableHead>
              <TableHead className="text-right  text-foreground h-10  pr-35 whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {jobsToDisplay.length > 0 ? (
              jobsToDisplay.map((job, index) => (
                <TableRow key={job.location_id || index} className="hover:bg-gray-50">
                  <TableCell className="px-2 py-4 whitespace-normal">
                    {job.city_name}
                  </TableCell>
                  <TableCell className="px-2 py-4 whitespace-normal">
                    {job.location_name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                        {hasPermission('/recruitment/master/location', 'edit') === true && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Edit className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {(hasPermission('/recruitment/master/location', 'view') === true)
                          && (hasPermission('/recruitment/master/location', 'edit') !== true) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(job, index)}
                          >
                            <Eye className="size-4 text-gray-500" />
                          </Button>
                        )}
                        {hasPermission('/recruitment/master/location', 'delete') === true && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash2 className="size-4 text-gray-500" />
                          </Button>
                        )}
                      </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No locations found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>

    {/* Dialog */}
    <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editIndex !== null ? "Edit Location" : "Add Location"}
          </DialogTitle>
          <DialogDescription>
            {editIndex !== null 
              ? "Update the location details below." 
              : "Add a new location by filling in the details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="city_id" className="text-right">
              City Name <span className="text-red-500">*</span>
            </Label>
            <select
              id="city_id"
              value={currentLoc.city_id}
              onChange={(e) => setCurrentLoc({ ...currentLoc, city_id: e.target.value })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#746def] ${
                errr.city_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.city_name}
                </option>
              ))}
            </select>
            {errr.city_id && (
              <p className="mt-1 text-sm text-red-600">{errr.city_id}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_name" className="text-right">
              Location Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location_name"
              placeholder="Enter location name"
              value={currentLoc.location_name}
              onChange={(e) => setCurrentLoc({ ...currentLoc, location_name: e.target.value })}
              className={errr.location_name ? 'border-red-500' : ''}
            />
            {errr.location_name && (
              <p className="mt-1 text-sm text-red-600">{errr.location_name}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={resetForm}
            className="border-gray-300"
          >
            Cancel
          </Button>
          {editIndex === null && hasPermission('/recruitment/master/location', 'create') && (
            <Button 
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            >
              Save
            </Button>
          )}

          {/* Edit location (edit mode) */}
          {editIndex !== null && hasPermission('/recruitment/master/location', 'edit') && (
            <Button 
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3"
            >
              Update Location
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);
};

export default Location;
