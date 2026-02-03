import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const DarshanForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        image: "",
        // features removed
        historyArchitectureDesc: "",
        historyArchitectureImage: "",
        religiousSignificanceDesc: "",
        religiousSignificanceImage: "",
        // Fields removed as per request
        faqs: [] as { question: string; answer: string }[],
        // entryFee: "",
        schedule: [] as { label: string; time: string }[], // New structured schedule
        // address: "",
        mapImage: "",
        googleMapLink: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: ""
    });

    // const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        if (id) {
            fetchDarshan();
        }
    }, [id]);

    const fetchDarshan = async () => {
        try {
            const res = await fetch(getApiUrl(`/api/darshan/${id}`));
            // Force reset state if 404/error to avoid editing stale data (safety check)
            if (!res.ok) {
                toast({ title: "Darshan not found", variant: "destructive" });
                navigate("/admin/darshan");
                return;
            }

            const data = await res.json();
            setFormData({
                ...data,
                features: data.features || [],
                historyArchitectureDesc: data.historyArchitectureDesc || "",
                historyArchitectureImage: data.historyArchitectureImage || "",
                // removed fields assignments
                faqs: data.faqs || [],
                // entryFee, darshanTimings, address, notableEvents, connectivity, liveDarshanUrl REMOVED
                mapImage: data.mapImage || "",
                googleMapLink: data.googleMapLink || "",
                seoTitle: data.seoTitle || "",
                seoDescription: data.seoDescription || "",
                seoKeywords: data.seoKeywords || ""
            });
        } catch (error) {
            console.error("Error fetching darshan:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Features / Tags Management removed

    // Schedule Management
    const handleScheduleChange = (index: number, field: "label" | "time", value: string) => {
        const newSchedule = [...formData.schedule];
        newSchedule[index][field] = value;
        setFormData({ ...formData, schedule: newSchedule });
    };

    const addScheduleRow = () => {
        setFormData({ ...formData, schedule: [...formData.schedule, { label: "", time: "" }] });
    };

    const removeScheduleRow = (index: number) => {
        const newSchedule = formData.schedule.filter((_, i) => i !== index);
        setFormData({ ...formData, schedule: newSchedule });
    };


    // FAQ Management
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = id ? getApiUrl(`/api/darshan/${id}`) : getApiUrl("/api/darshan");
            const method = id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to save");

            toast({ title: `Darshan ${id ? "updated" : "created"} successfully` });
            navigate("/admin/darshan");
        } catch (error) {
            toast({ title: "Error saving darshan", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">
                {id ? "Edit Darshan Details" : "Add New Darshan"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Temple Name</label>
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
                    <label className="block text-sm font-medium mb-2">Short Description</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Main Image URL</label>
                    <Input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        placeholder="/assets/image.jpg"
                    />
                </div>

                {/* Features removed as per request */}

                {/* Detailed Sections */}
                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Content Sections</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Historical & Architecture</label>
                            <Textarea
                                name="historyArchitectureDesc"
                                value={formData.historyArchitectureDesc}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Description..."
                                className="mb-2"
                            />
                        </div>

                        {/* Religious & Festival Sections removed */}
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Detailed Schedule</h2>
                    <p className="text-sm text-gray-500 mb-4">Add specific timings (e.g., "6:00 AM - 7:00 AM" for "Morning Aarti").</p>
                    <div className="space-y-3">
                        {formData.schedule.map((row, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    placeholder="Label (e.g. Temple Opens)"
                                    value={row.label}
                                    onChange={(e) => handleScheduleChange(index, "label", e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    placeholder="Time (e.g. 5:00 AM)"
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

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Map & Location</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Map Image URL</label>
                            <Input
                                name="mapImage"
                                value={formData.mapImage}
                                onChange={handleChange}
                                placeholder="Custom Vintage Map Image URL"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Google Maps Link</label>
                            <Input
                                name="googleMapLink"
                                value={formData.googleMapLink}
                                onChange={handleChange}
                                placeholder="https://maps.google.com/..."
                            />
                        </div>
                        {/* Address & Connectivity removed */}
                    </div>
                </div>

                {/* Other Info Section removed */}

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">FAQs</h2>
                    <div className="space-y-4">
                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="bg-muted/50 p-4 rounded-lg relative">
                                <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-500 font-bold">Remove</button>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Question</label>
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Answer</label>
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addFaq} className="w-full">+ Add FAQ</Button>
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
                    <Button type="button" variant="outline" onClick={() => navigate("/admin/darshan")}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Darshan"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DarshanForm;
