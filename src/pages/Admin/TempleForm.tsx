import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const TempleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        image: "",
        historyArchitectureDesc: "",
        historyArchitectureImage: "",
        religiousSignificanceDesc: "",
        religiousSignificanceImage: "",
        festivalCelebrationsDesc: "",
        festivalCelebrationsImage: "",
        surroundingsDesc: "",
        faqs: [] as { question: string; answer: string }[],
        entryFee: "",
        darshanTimings: "",
        address: "",
        notableEvents: "",
        connectivity: "",
        darshanSchedule: [] as { label: string; time: string }[],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: ""
    });

    useEffect(() => {
        if (id) {
            fetchTemple();
        }
    }, [id]);

    const fetchTemple = async () => {
        try {
            // Updated to fetch specific temple directly, matching Darshan logic
            const res = await fetch(getApiUrl(`/api/temples/${id}`));

            if (!res.ok) {
                toast({ title: "Temple not found", variant: "destructive" });
                navigate("/admin/temples");
                return;
            }

            const temple = await res.json();

            setFormData({
                ...temple,
                // Ensure fallbacks for all fields
                historyArchitectureDesc: temple.historyArchitectureDesc || "",
                historyArchitectureImage: temple.historyArchitectureImage || "",
                religiousSignificanceDesc: temple.religiousSignificanceDesc || "",
                religiousSignificanceImage: temple.religiousSignificanceImage || "",
                festivalCelebrationsDesc: temple.festivalCelebrationsDesc || "",
                festivalCelebrationsImage: temple.festivalCelebrationsImage || "",
                surroundingsDesc: temple.surroundingsDesc || "",
                faqs: temple.faqs || [],
                entryFee: temple.entryFee || "",
                darshanTimings: temple.darshanTimings || "",
                address: temple.address || "",
                notableEvents: temple.notableEvents || "",
                connectivity: temple.connectivity || "",
                darshanSchedule: temple.darshanSchedule || [],
                seoTitle: temple.seoTitle || "",
                seoDescription: temple.seoDescription || "",
                seoKeywords: temple.seoKeywords || ""
            });
        } catch (error) {
            console.error("Error fetching temple:", error);
            toast({ title: "Error loading temple data", variant: "destructive" });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
        const newFaqs = [...formData.faqs];
        newFaqs[index][field] = value;
        setFormData({ ...formData, faqs: newFaqs });
    };

    const addFaq = () => {
        setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] });
    };

    const removeFaq = (index: number) => {
        const newFaqs = formData.faqs.filter((_, i) => i !== index);
        setFormData({ ...formData, faqs: newFaqs });
    };

    // Darshan Schedule Management
    const handleScheduleChange = (index: number, field: "label" | "time", value: string) => {
        const newSchedule = [...formData.darshanSchedule];
        newSchedule[index][field] = value;
        setFormData({ ...formData, darshanSchedule: newSchedule });
    };

    const addScheduleRow = () => {
        setFormData({ ...formData, darshanSchedule: [...formData.darshanSchedule, { label: "", time: "" }] });
    };

    const removeScheduleRow = (index: number) => {
        const newSchedule = formData.darshanSchedule.filter((_, i) => i !== index);
        setFormData({ ...formData, darshanSchedule: newSchedule });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = id ? getApiUrl(`/api/temples/${id}`) : getApiUrl("/api/temples");
            const method = id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to save");

            toast({ title: `Temple ${id ? "updated" : "created"} successfully` });
            navigate("/admin/temples");
        } catch (error) {
            toast({ title: "Error saving temple", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">
                {id ? "Edit Temple" : "Add New Temple"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Image URL (local path or http)</label>
                    <Input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        placeholder="/assets/kedarnath.jpg"
                    />
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Historical & Architectural Splendor</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                name="historyArchitectureDesc"
                                value={formData.historyArchitectureDesc}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter specific details about history and architecture..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <Input
                                name="historyArchitectureImage"
                                value={formData.historyArchitectureImage}
                                onChange={handleChange}
                                placeholder="/assets/history.jpg"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Religious Significance</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                name="religiousSignificanceDesc"
                                value={formData.religiousSignificanceDesc}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter details about religious significance..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <Input
                                name="religiousSignificanceImage"
                                value={formData.religiousSignificanceImage}
                                onChange={handleChange}
                                placeholder="/assets/religious.jpg"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Festivals & Celebrations</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                name="festivalCelebrationsDesc"
                                value={formData.festivalCelebrationsDesc}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter details about festivals..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <Input
                                name="festivalCelebrationsImage"
                                value={formData.festivalCelebrationsImage}
                                onChange={handleChange}
                                placeholder="/assets/festivals.jpg"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Surroundings Area & Attractions</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Description (Format: "Attraction Name : Description")</label>
                            <Textarea
                                name="surroundingsDesc"
                                value={formData.surroundingsDesc}
                                onChange={handleChange}
                                rows={6}
                                placeholder={`Basukinath Temple : Located about 43 km from Deoghar...\nNaulakha Mandir : A prominent temple...`}
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">FAQ Section</h2>
                    <div className="space-y-4">
                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="bg-muted/50 p-4 rounded-lg relative">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFaq(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Question {index + 1}</label>
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                            placeholder="Enter question..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Answer</label>
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                            rows={2}
                                            placeholder="Enter answer..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addFaq} className="w-full">
                            + Add FAQ Question
                        </Button>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Visitor Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Entry Fee</label>
                            <Input
                                name="entryFee"
                                value={formData.entryFee}
                                onChange={handleChange}
                                placeholder="Free / Rs. 50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Darshan Timings (Legacy Text)</label>
                            <Textarea
                                name="darshanTimings"
                                value={formData.darshanTimings}
                                onChange={handleChange}
                                rows={2}
                                placeholder="06:00 AM - 12:00 PM&#10;04:00 PM - 09:00 PM"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Detailed Darshan Schedule (New)</label>
                            <div className="space-y-3">
                                {formData.darshanSchedule.map((row, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input
                                            placeholder="Label (e.g. Morning)"
                                            value={row.label}
                                            onChange={(e) => handleScheduleChange(index, "label", e.target.value)}
                                            className="flex-1"
                                        />
                                        <Input
                                            placeholder="Time (e.g. 6AM - 12PM)"
                                            value={row.time}
                                            onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeScheduleRow(index)}>
                                            <span className="text-lg">×</span>
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" className="w-full" onClick={addScheduleRow}>
                                    + Add Schedule Row
                                </Button>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Full address..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Notable Events</label>
                            <Textarea
                                name="notableEvents"
                                value={formData.notableEvents}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Events..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Connectivity</label>
                            <Textarea
                                name="connectivity"
                                value={formData.connectivity}
                                onChange={handleChange}
                                rows={2}
                                placeholder="How to reach..."
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">SEO Title</label>
                            <Input
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Meta Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">SEO Description</label>
                            <Textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Meta Description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">SEO Keywords</label>
                            <Input
                                name="seoKeywords"
                                value={formData.seoKeywords}
                                onChange={handleChange}
                                placeholder="Comma separated keywords"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/admin/temples")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Temple"}
                    </Button>
                </div>
            </form >
        </div >
    );
};

export default TempleForm;
