import * as XLSX from "xlsx";

/**
 * Reads an Excel file and converts it into an array of JSON rows.
 * @param file File object (from input type="file")
 * @returns Promise<any[]> - Parsed rows from first sheet
 */
export const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Pick the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet → JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      resolve(jsonData);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};
