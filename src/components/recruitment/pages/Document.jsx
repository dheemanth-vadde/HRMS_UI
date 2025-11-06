// Documents.jsx
import React, { useState, useEffect } from "react";
// Remove react-bootstrap imports since we're using custom UI components
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import "../css/Department.css"; // reuse same CSS or create Documents.css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import apiService from "../services/apiService";

const Document = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState({
    document_name: "",
    document_desc: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errr, setErrr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getAllDocuments(); // 🔹 Replace with your API call
      setDocs(res.data.data || res.data);
    } catch (err) {
      setError("Failed to fetch Documents.");
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (doc = { document_name: "", document_desc: "" }, index = null) => {
    setCurrentDoc(doc);
    setEditIndex(index);
    setShowModal(true);
  };
  
 

  const handleSave = () => {
    const newErrors = {};
    const trimmedName = currentDoc.document_name?.trim();
    const trimmedDesc = currentDoc.document_desc?.trim();

    if (!trimmedName) {
      newErrors.document_name = "Document Name is required";
    }

    // Duplicate check
    const isDuplicate = docs.some((doc, idx) =>
      (doc.document_name?.trim().toLowerCase() === trimmedName?.toLowerCase()) &&
      idx !== editIndex
    );

    if (isDuplicate) {
      newErrors.document_name = "Document name already exists";
    }

    setErrr(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSaveCallback();
    }
  };

  const handleSaveCallback = async () => {
    try {
      if (editIndex !== null) {
        const updatedDoc = {
          ...currentDoc,
          document_id: docs[editIndex].document_id,
        };
        await apiService.updateDocument(updatedDoc.document_id, updatedDoc); // 🔹 Update API
        toast.success("Document updated successfully");

        const updatedDocs = [...docs];
        updatedDocs[editIndex] = updatedDoc;
        setDocs(updatedDocs);
      } else {
        const response = await apiService.addDocument(currentDoc); // 🔹 Add API
        const newDoc = response.data?.data || currentDoc;

        toast.success("Document added successfully");
        setDocs(prev => [...prev, newDoc]);
        await fetchDocuments();
      }
      resetForm();
    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Save failed");
    }
  };

  const handleDelete = async (index) => {
    const idToDelete = docs[index]?.document_id;

    try {
      await apiService.deleteDocument(idToDelete); // 🔹 Delete API
      setDocs(docs.filter((doc) => doc.document_id !== idToDelete));
      toast.success("Document deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setCurrentDoc({ document_name: "", document_desc: "" });
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

  const filteredAndSortedDocs = () => {
    let filteredItems = [...docs];

    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (doc) =>
          doc.document_name?.toLowerCase().includes(lowerTerm) ||
          doc.document_desc?.toLowerCase().includes(lowerTerm)
      );
    }

    if (sortConfig.key !== null) {
      filteredItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (aValue == null || bValue == null) return 0;
        return sortConfig.direction === "asc"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }

    return filteredItems;
  };

  const docsToDisplay = filteredAndSortedDocs();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  // if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="space-y-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage organization documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search by document name or description"
              className="w-full pl-9 h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal()} 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive btn-gradient-primary shadow-sm hover:shadow-md h-9 px-4 py-2 has-[>svg]:px-3 btn-add-purple"
          >
            + Add Document
          </button>
        </div>
      </div>

      <div className="border border-[#e5e7eb] rounded-md">
        <div className="rounded-md">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                  onClick={() => handleSort("document_name")}
                >
                  Document Name
                  <span className="ml-1">{getSortIndicator("document_name")}</span>
                </th>
                <th 
                  className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 cursor-pointer"
                  onClick={() => handleSort("document_desc")}
                >
                  Description
                  <span className="ml-1">{getSortIndicator("document_desc")}</span>
                </th>
                <th className="text-foreground h-10 px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-semibold text-base mb-1 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {docsToDisplay.length > 0 ? (
                docsToDisplay.map((doc, index) => (
                  <tr key={doc.document_id || index} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-normal">
                      {doc.document_name}
                    </td>
                    <td className="px-2 py-4 whitespace-normal">
                      {doc.document_desc || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(doc, index)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No documents found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showModal} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#FF7043]">
              {editIndex !== null ? "Edit Document" : "Add Document"}
            </DialogTitle>
            <DialogDescription>
              {editIndex !== null ? "Update the document details" : "Add a new document to the system"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gp-4 ">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document_name" className="text-sm font-medium">
                  Document Name <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  id="document_name"
                  placeholder="Enter document name"
                  value={currentDoc.document_name}
                  onChange={(e) =>
                    setCurrentDoc({ ...currentDoc, document_name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.document_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errr.document_name && (
                  <p className="mt-1 text-sm text-red-600">{errr.document_name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document_desc" className="text-sm font-medium">
                  Description
                </Label>
                <textarea
                  id="document_desc"
                  rows={3}
                  placeholder="Enter description"
                  value={currentDoc.document_desc}
                  onChange={(e) =>
                    setCurrentDoc({ ...currentDoc, document_desc: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errr.document_desc ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
                {errr.document_desc && (
                  <p className="mt-1 text-sm text-red-600">{errr.document_desc}</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 transition-colors"
            >
              {editIndex !== null ? "Update Document" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Document;
