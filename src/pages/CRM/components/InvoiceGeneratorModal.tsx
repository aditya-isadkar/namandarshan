import { getApiUrl } from "@/utils/api";
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface InvoiceGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: any;
    onSuccess: () => void;
}

const InvoiceGeneratorModal = ({ isOpen, onClose, lead, onSuccess }: InvoiceGeneratorModalProps) => {
    const { toast } = useToast();
    const invoiceRef = useRef<HTMLDivElement>(null);

    const [customerName, setCustomerName] = useState(
        lead?.userDetails?.name || lead?.customerDetails?.name || lead?.leadInformation?.name || ''
    );
    const [customerId, setCustomerId] = useState(lead?._id?.substring(0, 12) || '');
    const [contactNumber, setContactNumber] = useState(
        lead?.userDetails?.mobile || lead?.customerDetails?.mobile || lead?.contactDetails?.mobile || ''
    );
    const [email, setEmail] = useState(
        lead?.userDetails?.email || lead?.customerDetails?.email || lead?.leadInformation?.email || ''
    );
    const [serviceDescription, setServiceDescription] = useState(
        lead?.serviceName || lead?.templeAndDate?.serviceType || 'darshan'
    );
    const [amount, setAmount] = useState(lead?.bookingDetails?.amount || 700);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateInvoiceNumber = () => {
        const date = new Date();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `ND/INV/${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}/${random}`;
    };

    const [invoiceNumber] = useState(generateInvoiceNumber());
    const [invoiceDate] = useState(new Date().toLocaleDateString('en-GB').replace(/\//g, '/'));

    const downloadPDF = async () => {
        if (!customerName || !contactNumber) {
            toast({ variant: "destructive", title: "Validation Error", description: "Customer name and contact number are required" });
            return;
        }

        setIsGenerating(true);
        try {
            const element = invoiceRef.current;
            if (!element) throw new Error("Invoice element not found");

            // Capture the invoice as canvas
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Convert to PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${invoiceNumber.replace(/\//g, '-')}.pdf`);

            // Save invoice to backend
            const user = JSON.parse(localStorage.getItem('crmUser') || '{}');
            const id = lead._id || lead.leadId;
            const endpoint = lead._id ? `/api/crm/bookings/${id}` : `/api/crm/leads/${id}`;

            await fetch(getApiUrl(endpoint), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    $push: {
                        invoices: {
                            invoiceNumber,
                            invoiceDate: new Date(),
                            customerName,
                            customerId,
                            contactNumber,
                            email,
                            serviceDescription,
                            totalAmount: amount,
                            generatedBy: user.userId,
                            generatedByName: user.agentName || user.userId
                        },
                        activityLog: {
                            action: 'invoice_generated',
                            description: `Invoice ${invoiceNumber} generated for ₹${amount}`,
                            changedBy: user.userId,
                            changedByName: user.agentName || user.userId,
                            timestamp: new Date()
                        }
                    }
                })
            });

            toast({
                title: "Invoice Downloaded",
                description: `Invoice ${invoiceNumber} has been saved successfully`
            });

            onSuccess();
        } catch (error) {
            console.error('PDF generation error:', error);
            toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF" });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto p-0">
                {/* Editable Fields Section */}
                <div className="p-6 bg-gray-50 border-b space-y-4">
                    <h2 className="text-lg font-semibold">Invoice Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Customer Name *</Label>
                            <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </div>
                        <div>
                            <Label>ID Number</Label>
                            <Input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                        </div>
                        <div>
                            <Label>Phone *</Label>
                            <Input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <Label>Service Description</Label>
                            <Input value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
                        </div>
                        <div>
                            <Label>Amount (₹)</Label>
                            <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>

                {/* Invoice Preview */}
                <div ref={invoiceRef} className="bg-white p-12" style={{ width: '210mm', minHeight: '297mm' }}>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <img src="/images/naman-logo.png" alt="Naman Logo" className="h-16" />
                        </div>
                        <div className="text-right">
                            <h1 className="text-3xl font-bold text-orange-600 mb-2">NAMAN DARSHAN</h1>
                            <p className="text-xs text-gray-600">A-57, Sector 136, Noida</p>
                            <p className="text-xs text-gray-600">Lets Connect Business Park, 5th Floor,</p>
                            <p className="text-xs text-gray-600">Sector 136, Noida (201305)</p>
                            <p className="text-xs text-gray-600 mt-1">sales@namandarshan.com</p>
                        </div>
                    </div>

                    {/* Invoice Title and Details */}
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-4xl font-light text-gray-300">INVOICE</h2>
                        <div className="text-right text-sm">
                            <p className="mb-1"><span className="font-semibold">Invoice No:</span> {invoiceNumber}</p>
                            <p><span className="font-semibold">Date:</span> {invoiceDate}</p>
                        </div>
                    </div>

                    {/* Bill To Section */}
                    <div className="mb-8 border-l-4 border-orange-500 pl-4 bg-gray-50 py-3 px-4">
                        <h3 className="text-orange-600 font-semibold text-sm mb-2">BILL TO:</h3>
                        <p className="mb-1"><span className="font-medium">Customer Name:</span> {customerName}</p>
                        <p className="mb-1"><span className="font-medium">ID Number:</span> {customerId}</p>
                        <p className="mb-1"><span className="font-medium">Phone:</span> {contactNumber}</p>
                        <p><span className="font-medium">Email:</span> {email}</p>
                    </div>

                    {/* Service Table */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="text-left py-3 text-sm font-semibold text-gray-700">SERVICE DESCRIPTION</th>
                                <th className="text-right py-3 text-sm font-semibold text-gray-700">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-6 text-sm">{serviceDescription}</td>
                                <td className="text-right py-6 text-sm">₹ {amount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Total */}
                    <div className="flex justify-end mb-12">
                        <div className="text-right">
                            <p className="text-xl font-bold mb-1">TOTAL:</p>
                            <p className="text-2xl font-bold text-green-600">₹ {amount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Signature and Stamp */}
                    <div className="flex justify-end mb-8">
                        <div className="text-center">
                            <img src="/images/naman-stamp.png" alt="Authorized Signature" className="h-24 mb-2" />
                            <p className="text-xs font-semibold">Authorized Signatory</p>
                            <p className="text-xs text-gray-600">Namandarshan Team</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-500 mt-auto pt-8 border-t border-gray-200">
                        <p className="mb-1">Thank you for choosing Naman Darshan. We wish you a blessed spiritual journey.</p>
                        <p>For support, contact: support@namandarshan.com</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="p-6 bg-gray-50 border-t flex justify-center">
                    <Button
                        onClick={downloadPDF}
                        disabled={isGenerating}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                        size="lg"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        {isGenerating ? 'Generating PDF...' : 'Print / Download PDF'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceGeneratorModal;
