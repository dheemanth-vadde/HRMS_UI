import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Badge } from "../ui/badge";
import { Settings, Calendar, Clock, Shield, DollarSign, Users, ChevronDown, Check, X, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

// Timezone data
const timezones = [
  { value: "UTC-12:00", label: "(UTC-12:00) International Date Line West" },
  { value: "UTC-11:00", label: "(UTC-11:00) Coordinated Universal Time-11" },
  { value: "UTC-10:00", label: "(UTC-10:00) Hawaii" },
  { value: "UTC-09:00", label: "(UTC-09:00) Alaska" },
  { value: "UTC-08:00", label: "(UTC-08:00) Pacific Time (US & Canada)" },
  { value: "UTC-07:00", label: "(UTC-07:00) Mountain Time (US & Canada)" },
  { value: "UTC-06:00", label: "(UTC-06:00) Central Time (US & Canada)" },
  { value: "UTC-05:00", label: "(UTC-05:00) Eastern Time (US & Canada)" },
  { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Time (Canada)" },
  { value: "UTC-03:30", label: "(UTC-03:30) Newfoundland" },
  { value: "UTC-03:00", label: "(UTC-03:00) Buenos Aires, Georgetown" },
  { value: "UTC-02:00", label: "(UTC-02:00) Mid-Atlantic" },
  { value: "UTC-01:00", label: "(UTC-01:00) Azores" },
  { value: "UTC+00:00", label: "(UTC+00:00) London, Dublin, Lisbon" },
  { value: "UTC+01:00", label: "(UTC+01:00) Paris, Berlin, Rome" },
  { value: "UTC+02:00", label: "(UTC+02:00) Cairo, Athens, Istanbul" },
  { value: "UTC+03:00", label: "(UTC+03:00) Moscow, St. Petersburg" },
  { value: "UTC+03:30", label: "(UTC+03:30) Tehran" },
  { value: "UTC+04:00", label: "(UTC+04:00) Dubai, Muscat" },
  { value: "UTC+04:30", label: "(UTC+04:30) Kabul" },
  { value: "UTC+05:00", label: "(UTC+05:00) Islamabad, Karachi" },
  { value: "UTC+05:30", label: "(UTC+05:30) India Standard Time (IST)" },
  { value: "UTC+05:45", label: "(UTC+05:45) Kathmandu" },
  { value: "UTC+06:00", label: "(UTC+06:00) Dhaka, Almaty" },
  { value: "UTC+06:30", label: "(UTC+06:30) Yangon (Rangoon)" },
  { value: "UTC+07:00", label: "(UTC+07:00) Bangkok, Jakarta" },
  { value: "UTC+08:00", label: "(UTC+08:00) Singapore, Beijing, Hong Kong" },
  { value: "UTC+09:00", label: "(UTC+09:00) Tokyo, Seoul" },
  { value: "UTC+09:30", label: "(UTC+09:30) Adelaide, Darwin" },
  { value: "UTC+10:00", label: "(UTC+10:00) Sydney, Melbourne" },
  { value: "UTC+11:00", label: "(UTC+11:00) Solomon Islands" },
  { value: "UTC+12:00", label: "(UTC+12:00) Auckland, Fiji" },
  { value: "UTC+13:00", label: "(UTC+13:00) Nuku'alofa" },
];

const currencies = [
  { value: "USD", label: "$ - USD (US Dollar)", symbol: "$" },
  { value: "INR", label: "₹ - INR (Indian Rupee)", symbol: "₹" },
  { value: "EUR", label: "€ - EUR (Euro)", symbol: "€" },
  { value: "GBP", label: "£ - GBP (British Pound)", symbol: "£" },
  { value: "JPY", label: "¥ - JPY (Japanese Yen)", symbol: "¥" },
  { value: "AUD", label: "A$ - AUD (Australian Dollar)", symbol: "A$" },
  { value: "CAD", label: "C$ - CAD (Canadian Dollar)", symbol: "C$" },
  { value: "CHF", label: "CHF - CHF (Swiss Franc)", symbol: "CHF" },
  { value: "CNY", label: "¥ - CNY (Chinese Yuan)", symbol: "¥" },
  { value: "AED", label: "د.إ - AED (UAE Dirham)", symbol: "د.إ" },
];

export function SiteConfigurationModule() {
  // Date Format
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  // Time Format
  const [timeFormat, setTimeFormat] = useState("24-Hour");

  // Timezone
  const [timezone, setTimezone] = useState("UTC+05:30");
  const [timezoneOpen, setTimezoneOpen] = useState(false);

  // Password Policy
  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireSpecialChars, setRequireSpecialChars] = useState(true);

  // Currency
  const [currency, setCurrency] = useState("USD");

  // Employee Types
  const [employeeTypes, setEmployeeTypes] = useState(["Intern", "Contract", "Full-Time"]);
  const [newEmployeeType, setNewEmployeeType] = useState("");

  const handleAddEmployeeType = () => {
    if (newEmployeeType.trim() && !employeeTypes.includes(newEmployeeType.trim())) {
      setEmployeeTypes([...employeeTypes, newEmployeeType.trim()]);
      setNewEmployeeType("");
      toast.success("Employee type added successfully");
    } else if (employeeTypes.includes(newEmployeeType.trim())) {
      toast.error("This employee type already exists");
    }
  };

  const handleRemoveEmployeeType = (type: string) => {
    setEmployeeTypes(employeeTypes.filter(t => t !== type));
    toast.success("Employee type removed successfully");
  };

  const handleSaveConfiguration = () => {
    // Validate password length
    if (minPasswordLength < 6 || minPasswordLength > 20) {
      toast.error("Password length must be between 6 and 20 characters");
      return;
    }

    // Save configuration logic here
    toast.success("Configuration saved successfully");
  };

  const getPasswordPolicyValidation = () => {
    const messages = [];
    if (minPasswordLength < 8) {
      messages.push("Minimum length should be at least 8 for better security");
    }
    if (!requireUppercase && !requireNumbers && !requireSpecialChars) {
      messages.push("At least one password requirement should be enabled");
    }
    return messages;
  };

  const validationMessages = getPasswordPolicyValidation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Site Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Manage global system settings and configurations
          </p>
        </div>
      </div>

      {/* Configuration Grid - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date & Time Settings Card */}
        <Card className="border-[#e5e7eb]">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              <h3 className="font-semibold">Date & Time Settings</h3>
            </div>
            <Separator />
            
            <div className="grid grid-cols-1 gap-6">
              {/* Date Format */}
              <div className="space-y-2">
                <Label htmlFor="date-format">
                  Date Format <span className="text-destructive">*</span>
                </Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format" className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Example: {dateFormat === "DD/MM/YYYY" ? "14/10/2025" : dateFormat === "MM/DD/YYYY" ? "10/14/2025" : "2025-10-14"}
                </p>
              </div>

              {/* Time Format */}
              <div className="space-y-2">
                <Label htmlFor="time-format">
                  Time Format <span className="text-destructive">*</span>
                </Label>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger id="time-format" className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12-Hour">12-Hour (AM/PM)</SelectItem>
                    <SelectItem value="24-Hour">24-Hour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Example: {timeFormat === "12-Hour" ? "02:30 PM" : "14:30"}
                </p>
              </div>
            </div>

            {/* Time Zone */}
            <div className="space-y-2">
              <Label htmlFor="timezone">
                Default Time Zone <span className="text-destructive">*</span>
              </Label>
              <Popover open={timezoneOpen} onOpenChange={setTimezoneOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={timezoneOpen}
                    className="w-full justify-between"
                  >
                    {timezone
                      ? timezones.find((tz) => tz.value === timezone)?.label
                      : "Select timezone..."}
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search timezone..." />
                    <CommandList>
                      <CommandEmpty>No timezone found.</CommandEmpty>
                      <CommandGroup>
                        {timezones.map((tz) => (
                          <CommandItem
                            key={tz.value}
                            value={tz.label}
                            onSelect={() => {
                              setTimezone(tz.value);
                              setTimezoneOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                timezone === tz.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {tz.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                This will be the default timezone for all users and system timestamps
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Password Policy Card */}
        <Card className="border-[#e5e7eb]">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <h3 className="font-semibold">Password Policy</h3>
            </div>
            <Separator />

            <div className="space-y-4">
              {/* Minimum Length */}
              <div className="space-y-2">
                <Label htmlFor="min-password-length">
                  Minimum Password Length <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="min-password-length"
                    type="number"
                    min={6}
                    max={20}
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(parseInt(e.target.value) || 8)}
                    className="w-32 border-gray-300"
                  />
                  <span className="text-sm text-muted-foreground">characters</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: 8 or more characters
                </p>
              </div>

              {/* Requirements Toggles */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                    <p className="text-xs text-muted-foreground">
                      Password must contain at least one uppercase letter (A-Z)
                    </p>
                  </div>
                  <Switch
                    id="require-uppercase"
                    checked={requireUppercase}
                    onCheckedChange={setRequireUppercase}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-numbers">Require Numbers</Label>
                    <p className="text-xs text-muted-foreground">
                      Password must contain at least one number (0-9)
                    </p>
                  </div>
                  <Switch
                    id="require-numbers"
                    checked={requireNumbers}
                    onCheckedChange={setRequireNumbers}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-special">Require Special Characters</Label>
                    <p className="text-xs text-muted-foreground">
                      Password must contain at least one special character (!@#$%^&*)
                    </p>
                  </div>
                  <Switch
                    id="require-special"
                    checked={requireSpecialChars}
                    onCheckedChange={setRequireSpecialChars}
                  />
                </div>
              </div>

              {/* Validation Messages */}
              {validationMessages.length > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 space-y-1">
                  {validationMessages.map((message, index) => (
                    <p key={index} className="text-xs text-warning-foreground flex items-start gap-2">
                      <span className="text-warning mt-0.5">⚠</span>
                      {message}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings Card */}
        <Card className="border-[#e5e7eb]">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <DollarSign className="size-5 text-primary" />
              <h3 className="font-semibold">Currency Settings</h3>
            </div>
            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currency">
                Default Currency <span className="text-destructive">*</span>
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="w-full border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This currency will be used across all financial modules
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Employee Types Card */}
        <Card className="border-[#e5e7eb]">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-primary" />
              <h3 className="font-semibold">Employee Types</h3>
            </div>
            <Separator />

            <div className="space-y-4">
              <Label>
                Employee Type Categories <span className="text-destructive">*</span>
              </Label>

              {/* Tags Display */}
              <div className="flex flex-wrap gap-1.5 p-2 border rounded-lg min-h-[60px] bg-muted/20">
                {employeeTypes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No employee types added yet</p>
                ) : (
                  employeeTypes.map((type) => (
                    <Badge
                      key={type}
                      className="px-1.5 py-0.5 text-[10px] flex items-center gap-0.5 bg-orange-500 hover:bg-orange-600 text-white border-0"
                    >
                      {type}
                      <button
                        onClick={() => handleRemoveEmployeeType(type)}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="size-2.5" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>

              {/* Add New Type */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter new employee type..."
                  value={newEmployeeType}
                  onChange={(e) => setNewEmployeeType(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddEmployeeType();
                    }
                  }}
                  className="flex-1 border-gray-300"
                />
                <Button
                  onClick={handleAddEmployeeType}
                  className="btn-gradient-primary"
                  disabled={!newEmployeeType.trim()}
                >
                  <Plus className="size-4 mr-2" />
                  Add Type
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                These employee types will be available when adding or categorizing employees
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons - Bottom Right */}
      <div className="flex justify-end items-center gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            // Reset to defaults
            setDateFormat("DD/MM/YYYY");
            setTimeFormat("24-Hour");
            setTimezone("UTC+05:30");
            setMinPasswordLength(8);
            setRequireUppercase(true);
            setRequireNumbers(true);
            setRequireSpecialChars(true);
            setCurrency("USD");
            setEmployeeTypes(["Intern", "Contract", "Full-Time"]);
            toast.success("Settings reset to defaults");
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSaveConfiguration}
          className="btn-gradient-primary"
        >
          <Settings className="size-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
