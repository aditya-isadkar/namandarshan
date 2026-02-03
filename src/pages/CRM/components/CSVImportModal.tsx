import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, XCircle, Download } from "lucide-react";

import { getApiUrl } from "@/utils/api";

interface CSVImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    serviceType: string;
}

const CSVImportModal = ({ isOpen, onClose, onSuccess, serviceType }: CSVImportModalProps) => {
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<any[]>([]);
    const [importResults, setImportResults] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.name.endsWith('.csv')) {
                toast({ variant: "destructive", title: "Invalid File", description: "Please select a CSV file" });
                return;
            }
            setFile(selectedFile);
            parseCSV(selectedFile);
        }
    };

    const parseCSV = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split("\n").filter((line) => line.trim());

            if (lines.length < 2) {
                toast({ variant: "destructive", title: "Invalid CSV", description: "CSV must have headers and at least one data row" });
                return;
            }

            // Parse headers
            const headers = lines[0].split(",").map((h) => h.trim().replace(/['"]/g, ""));

            // Parse data rows (show first 5 for preview)
            const previewRows = lines.slice(1, 6).map((line) => {
                const values = line.split(",").map((v) => v.trim().replace(/['"]/g, ""));
                const row: any = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || "";
                });
                return row;
            });

            setPreview(previewRows);
        };
        reader.readAsText(file);
    };

    const handleImport = async () => {
        if (!file) return;

        setIsUploading(true);
        setImportResults(null);

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target?.result as string;
                const lines = text.split("\n").filter((line) => line.trim());

                const headers = lines[0].split(",").map((h) => h.trim().replace(/['"]/g, ""));

                // Parse all data rows
                const records = lines.slice(1).map((line) => {
                    const values = line.split(",").map((v) => v.trim().replace(/['"]/g, ""));
                    const row: any = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || "";
                    });
                    return row;
                });

                // Send to backend
                const response = await fetch(getApiUrl("/api/crm/csv-import"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ records, serviceType }),
                });

                const data = await response.json();

                if (data.success) {
                    setImportResults(data.results);
                    toast({
                        title: "Import Complete",
                        description: `${data.results.success} records imported successfully, ${data.results.failed} failed`,
                    });

                    if (data.results.failed === 0) {
                        setTimeout(() => {
                            onSuccess();
                            onClose();
                        }, 2000);
                    }
                } else {
                    toast({ variant: "destructive", title: "Import Failed", description: data.message });
                }
            };
            reader.readAsText(file);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to import CSV" });
        } finally {
            setIsUploading(false);
        }
    };

    const downloadTemplate = () => {
        let csvContent = "";

        if (serviceType === "ops") {
            csvContent = "name,mobile,email,paymentDate,amountReceived,serviceDetails,hotel,taxi,extraServices,panditAssigned,panditContact,panditPayment,status,rating\n";
            csvContent += "John Doe,9876543210,john@example.com,2025-01-31,10000,Kedarnath Puja,Hotel Ganga,Innova,Prasad,Pt. Ram Sharma,9876543211,3000,completed,5\n";
        } else if (serviceType === "darshan") {
            csvContent = "name,mobile,email,temple,darshanType,preferredDate,devoteeCount,status\n";
            csvContent += "Jane Doe,9876543210,jane@example.com,Kedarnath,VIP Darshan,2025-02-15,4,confirmed\n";
        } else {
            csvContent = "name,mobile,email,serviceType,preferredDate,status\n";
            csvContent += "Sample User,9876543210,user@example.com,General Inquiry,2025-01-31,new\n";
        }

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${serviceType}_import_template.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Import CSV Data - {serviceType.toUpperCase()}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Download Template */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-blue-900">Need a template?</h3>
                                <p className="text-sm text-blue-700">Download our CSV template with sample data and correct column names</p>
                            </div>
                            <Button onClick={downloadTemplate} variant="outline" className="border-blue-300">
                                <Download className="w-4 h-4 mr-2" />
                                Download Template
                            </Button>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="csv-file">Select CSV File</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <input
                                id="csv-file"
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="csv-file" className="cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <p className="text-sm text-gray-600">
                                    {file ? (
                                        <span className="text-green-600 font-medium">
                                            <FileText className="w-4 h-4 inline mr-2" />
                                            {file.name}
                                        </span>
                                    ) : (
                                        <>Click to upload or drag and drop CSV file</>
                                    )}
                                </p>
                            </label>
                        </div>
                    </div>

                    {/* Preview */}
                    {preview.length > 0 && (
                        <div className="space-y-2">
                            <Label>Preview (First 5 rows)</Label>
                            <div className="border rounded-lg overflow-auto max-h-64">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {Object.keys(preview[0]).map((header) => (
                                                <th key={header} className="px-4 py-2 text-left font-semibold border-b">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preview.map((row, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                {Object.values(row).map((value: any, i) => (
                                                    <td key={i} className="px-4 py-2">
                                                        {value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Import Results */}
                    {importResults && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <FileText className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                                    <div className="text-2xl font-bold text-blue-900">{importResults.total}</div>
                                    <div className="text-sm text-blue-700">Total Records</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                                    <div className="text-2xl font-bold text-green-900">{importResults.success}</div>
                                    <div className="text-sm text-green-700">Successful</div>
                                </div>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                    <XCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
                                    <div className="text-2xl font-bold text-red-900">{importResults.failed}</div>
                                    <div className="text-sm text-red-700">Failed</div>
                                </div>
                            </div>

                            {importResults.errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-red-900 mb-2">Errors:</h4>
                                    <div className="space-y-1 max-h-40 overflow-y-auto">
                                        {importResults.errors.map((error: any, index: number) => (
                                            <div key={index} className="text-sm text-red-700">
                                                Row {error.row}: {error.error}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Column Mapping Guide */}
                    {serviceType === "ops" && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Expected CSV Columns for OPS/Fulfilment:</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div><code className="bg-white px-2 py-1 rounded">name</code> - Customer name</div>
                                <div><code className="bg-white px-2 py-1 rounded">mobile</code> - Mobile number</div>
                                <div><code className="bg-white px-2 py-1 rounded">email</code> - Email address</div>
                                <div><code className="bg-white px-2 py-1 rounded">paymentDate</code> - Payment date</div>
                                <div><code className="bg-white px-2 py-1 rounded">amountReceived</code> - Amount (₹)</div>
                                <div><code className="bg-white px-2 py-1 rounded">serviceDetails</code> - Services</div>
                                <div><code className="bg-white px-2 py-1 rounded">hotel</code> - Hotel details</div>
                                <div><code className="bg-white px-2 py-1 rounded">taxi</code> - Taxi details</div>
                                <div><code className="bg-white px-2 py-1 rounded">extraServices</code> - Extra services</div>
                                <div><code className="bg-white px-2 py-1 rounded">panditAssigned</code> - Pandit name</div>
                                <div><code className="bg-white px-2 py-1 rounded">panditContact</code> - Pandit phone</div>
                                <div><code className="bg-white px-2 py-1 rounded">panditPayment</code> - Pandit pay</div>
                                <div><code className="bg-white px-2 py-1 rounded">status</code> - Status</div>
                                <div><code className="bg-white px-2 py-1 rounded">rating</code> - Rating (1-5)</div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            onClick={handleImport}
                            disabled={!file || isUploading}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isUploading ? "Importing..." : `Import ${preview.length > 0 ? `(${preview.length}+ rows)` : ""}`}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CSVImportModal;
