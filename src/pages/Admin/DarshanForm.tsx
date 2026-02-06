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
        scheduleSummer: [] as { label: string; time: string }[],
        scheduleWinter: [] as { label: string; time: string }[],
        scheduleSectionTitle: "",
        scheduleDescription: "",
        scheduleNote: "",
        // address: "",
        mapImage: "",
        googleMapLink: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",

        // New Extended Fields
        subtitle: "",
        significance: { title: "", description: "", points: [] as string[] },
        darshanOptionsTitle: "",
        darshanOptions: [] as { title: string; description: string; price?: string }[],
        services: { title: "", description: "", items: [] as { title: string; description: string }[] },
        bookingProcess: [] as { step: string; description: string }[],
        bookingProcessTitle: "",
        guidelines: [] as { title: string; description: string }[],
        guidelinesTitle: "",
        trustPoints: [] as string[],
        ctaText: ""
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
                scheduleSectionTitle: data.scheduleSectionTitle || "",
                scheduleDescription: data.scheduleDescription || "",
                schedule: data.schedule || [],
                scheduleSummer: data.scheduleSummer || [],
                scheduleWinter: data.scheduleWinter || [],
                scheduleNote: data.scheduleNote || "",
                mapImage: data.mapImage || "",
                googleMapLink: data.googleMapLink || "",
                seoTitle: data.seoTitle || "",
                seoDescription: data.seoDescription || "",
                seoKeywords: data.seoKeywords || "",

                // Initialize new fields
                subtitle: data.subtitle || "",
                significance: data.significance || { title: "", description: "", points: [] },
                darshanOptionsTitle: data.darshanOptionsTitle || "",
                darshanOptions: data.darshanOptions || [],
                services: data.services || { title: "", description: "", items: [] },
                bookingProcess: data.bookingProcess || [],
                bookingProcessTitle: data.bookingProcessTitle || "",
                guidelines: data.guidelines || [],
                guidelinesTitle: data.guidelinesTitle || "",
                trustPoints: data.trustPoints || [],
                ctaText: data.ctaText || ""
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

    // Summer Schedule
    const handleSummerScheduleChange = (index: number, field: string, value: string) => {
        const newSchedule = [...formData.scheduleSummer];
        // @ts-ignore
        newSchedule[index][field] = value;
        setFormData({ ...formData, scheduleSummer: newSchedule });
    };
    const addSummerScheduleRow = () => {
        setFormData({ ...formData, scheduleSummer: [...formData.scheduleSummer, { label: "", time: "" }] });
    };
    const removeSummerScheduleRow = (index: number) => {
        const newSchedule = formData.scheduleSummer.filter((_, i) => i !== index);
        setFormData({ ...formData, scheduleSummer: newSchedule });
    };

    // Winter Schedule
    const handleWinterScheduleChange = (index: number, field: string, value: string) => {
        const newSchedule = [...formData.scheduleWinter];
        // @ts-ignore
        newSchedule[index][field] = value;
        setFormData({ ...formData, scheduleWinter: newSchedule });
    };
    const addWinterScheduleRow = () => {
        setFormData({ ...formData, scheduleWinter: [...formData.scheduleWinter, { label: "", time: "" }] });
    };
    const removeWinterScheduleRow = (index: number) => {
        const newSchedule = formData.scheduleWinter.filter((_, i) => i !== index);
        setFormData({ ...formData, scheduleWinter: newSchedule });
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

    // --- New Dynamic Field Handlers ---

    // Significance Points
    const handleSignificancePointChange = (index: number, value: string) => {
        const newPoints = [...formData.significance.points];
        newPoints[index] = value;
        setFormData({ ...formData, significance: { ...formData.significance, points: newPoints } });
    };
    const addSignificancePoint = () => {
        setFormData({ ...formData, significance: { ...formData.significance, points: [...formData.significance.points, ""] } });
    };
    const removeSignificancePoint = (index: number) => {
        const newPoints = formData.significance.points.filter((_, i) => i !== index);
        setFormData({ ...formData, significance: { ...formData.significance, points: newPoints } });
    };

    // Darshan Options
    const handleDarshanOptionChange = (index: number, field: string, value: string) => {
        const newOptions = [...formData.darshanOptions];
        // @ts-ignore
        newOptions[index][field] = value;
        setFormData({ ...formData, darshanOptions: newOptions });
    };
    const addDarshanOption = () => {
        setFormData({ ...formData, darshanOptions: [...formData.darshanOptions, { title: "", description: "" }] });
    };
    const removeDarshanOption = (index: number) => {
        const newOptions = formData.darshanOptions.filter((_, i) => i !== index);
        setFormData({ ...formData, darshanOptions: newOptions });
    };

    // Services Items
    const handleServiceItemChange = (index: number, field: string, value: string) => {
        const newItems = [...formData.services.items];
        // @ts-ignore
        newItems[index][field] = value;
        setFormData({ ...formData, services: { ...formData.services, items: newItems } });
    };
    const addServiceItem = () => {
        setFormData({ ...formData, services: { ...formData.services, items: [...formData.services.items, { title: "", description: "" }] } });
    };
    const removeServiceItem = (index: number) => {
        const newItems = formData.services.items.filter((_, i) => i !== index);
        setFormData({ ...formData, services: { ...formData.services, items: newItems } });
    };

    // Booking Process
    const handleBookingStepChange = (index: number, field: string, value: string) => {
        const newSteps = [...formData.bookingProcess];
        // @ts-ignore
        newSteps[index][field] = value;
        setFormData({ ...formData, bookingProcess: newSteps });
    };
    const addBookingStep = () => {
        setFormData({ ...formData, bookingProcess: [...formData.bookingProcess, { step: "", description: "" }] });
    };
    const removeBookingStep = (index: number) => {
        const newSteps = formData.bookingProcess.filter((_, i) => i !== index);
        setFormData({ ...formData, bookingProcess: newSteps });
    };

    // Guidelines
    const handleGuidelineChange = (index: number, field: string, value: string) => {
        const newGuidelines = [...formData.guidelines];
        // @ts-ignore
        newGuidelines[index][field] = value;
        setFormData({ ...formData, guidelines: newGuidelines });
    };
    const addGuideline = () => {
        setFormData({ ...formData, guidelines: [...formData.guidelines, { title: "", description: "" }] });
    };
    const removeGuideline = (index: number) => {
        const newGuidelines = formData.guidelines.filter((_, i) => i !== index);
        setFormData({ ...formData, guidelines: newGuidelines });
    };

    // Trust Points
    const handleTrustPointChange = (index: number, value: string) => {
        const newPoints = [...formData.trustPoints];
        newPoints[index] = value;
        setFormData({ ...formData, trustPoints: newPoints });
    };
    const addTrustPoint = () => {
        setFormData({ ...formData, trustPoints: [...formData.trustPoints, ""] });
    };
    const removeTrustPoint = (index: number) => {
        const newPoints = formData.trustPoints.filter((_, i) => i !== index);
        setFormData({ ...formData, trustPoints: newPoints });
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
                    {/* Subtitle removed */}

                    {/* Significance */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Significance</h3>
                        <div className="grid gap-3 mb-3">
                            <Input
                                placeholder="Section Title (e.g. The Sacred Significance...)"
                                value={formData.significance.title}
                                onChange={(e) => setFormData({ ...formData, significance: { ...formData.significance, title: e.target.value } })}
                            />
                            <Textarea
                                placeholder="Description"
                                value={formData.significance.description}
                                onChange={(e) => setFormData({ ...formData, significance: { ...formData.significance, description: e.target.value } })}
                            />
                        </div>
                        <label className="block text-sm font-medium mb-1">Key Points (Bulleted)</label>
                        {formData.significance.points.map((point, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <Input
                                    value={point}
                                    onChange={(e) => handleSignificancePointChange(index, e.target.value)}
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSignificancePoint(index)}>×</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addSignificancePoint}>+ Add Point</Button>
                    </div>

                    {/* Darshan Options */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Available Darshan Options</h3>
                        <div className="mb-4">
                            <Input
                                placeholder="Section Title (e.g. Available Darshan Options)"
                                value={formData.darshanOptionsTitle}
                                onChange={(e) => setFormData({ ...formData, darshanOptionsTitle: e.target.value })}
                            />
                        </div>
                        {formData.darshanOptions.map((option, index) => (
                            <div key={index} className="flex flex-col gap-2 mb-4 p-3 border rounded bg-white relative">
                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeDarshanOption(index)}>×</Button>
                                <Input
                                    placeholder="Option Title (e.g. General Darshan)"
                                    value={option.title}
                                    onChange={(e) => handleDarshanOptionChange(index, "title", e.target.value)}
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={option.description}
                                    onChange={(e) => handleDarshanOptionChange(index, "description", e.target.value)}
                                />
                                <Input
                                    placeholder="Price / Note (Optional)"
                                    value={option.price || ""}
                                    onChange={(e) => handleDarshanOptionChange(index, "price", e.target.value)}
                                />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addDarshanOption}>+ Add Darshan Option</Button>
                    </div>

                    {/* Services */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Services (What We Provide)</h3>
                        <div className="grid gap-3 mb-3">
                            <Input
                                placeholder="Service Section Title"
                                value={formData.services.title}
                                onChange={(e) => setFormData({ ...formData, services: { ...formData.services, title: e.target.value } })}
                            />
                            <Textarea
                                placeholder="Service Description"
                                value={formData.services.description}
                                onChange={(e) => setFormData({ ...formData, services: { ...formData.services, description: e.target.value } })}
                            />
                        </div>
                        <label className="block text-sm font-medium mb-1">Service Items</label>
                        {formData.services.items.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2 mb-4 p-3 border rounded bg-white relative">
                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeServiceItem(index)}>×</Button>
                                <Input
                                    placeholder="Item Title (e.g. Personal Guidance)"
                                    value={item.title}
                                    onChange={(e) => handleServiceItemChange(index, "title", e.target.value)}
                                />
                                <Textarea
                                    placeholder="Item Description"
                                    value={item.description}
                                    onChange={(e) => handleServiceItemChange(index, "description", e.target.value)}
                                />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addServiceItem}>+ Add Service Item</Button>
                    </div>

                    {/* Booking Process */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Booking Process (How to Book)</h3>
                        <div className="mb-4">
                            <Input
                                placeholder="Section Title (e.g. How to Book)"
                                value={formData.bookingProcessTitle}
                                onChange={(e) => setFormData({ ...formData, bookingProcessTitle: e.target.value })}
                            />
                        </div>
                        {formData.bookingProcess.map((stepItem, index) => (
                            <div key={index} className="flex gap-2 mb-2 items-start">
                                <span className="pt-2 font-bold">{index + 1}.</span>
                                <div className="flex-1 space-y-2">
                                    <Input
                                        placeholder="Step Title (e.g. Select Preferred Date)"
                                        value={stepItem.step}
                                        onChange={(e) => handleBookingStepChange(index, "step", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Step Description"
                                        value={stepItem.description}
                                        onChange={(e) => handleBookingStepChange(index, "description", e.target.value)}
                                    />
                                </div>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeBookingStep(index)}>×</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addBookingStep}>+ Add Step</Button>
                    </div>

                    {/* Guidelines */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Guidelines</h3>
                        <div className="mb-4">
                            <Input
                                placeholder="Section Title (e.g. Important Guidelines)"
                                value={formData.guidelinesTitle}
                                onChange={(e) => setFormData({ ...formData, guidelinesTitle: e.target.value })}
                            />
                        </div>
                        {formData.guidelines.map((guide, index) => (
                            <div key={index} className="flex flex-col gap-2 mb-4 p-3 border rounded bg-white relative">
                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeGuideline(index)}>×</Button>
                                <Input
                                    placeholder="Title (e.g. Dress Code)"
                                    value={guide.title}
                                    onChange={(e) => handleGuidelineChange(index, "title", e.target.value)}
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={guide.description}
                                    onChange={(e) => handleGuidelineChange(index, "description", e.target.value)}
                                />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addGuideline}>+ Add Guideline</Button>
                    </div>

                    {/* Trust Points */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Trust Benchmarks (Below Significance)</h3>
                        <p className="text-xs text-muted-foreground mb-2">Items like "Trusted by...", "Senior friendly", "Book Now". Icons assigned automatically.</p>
                        {formData.trustPoints.map((point, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <Input
                                    value={point}
                                    onChange={(e) => handleTrustPointChange(index, e.target.value)}
                                    placeholder="Point text..."
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeTrustPoint(index)}>×</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addTrustPoint}>+ Add Point</Button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">CTA Text</label>
                        <Input
                            name="ctaText"
                            value={formData.ctaText}
                            onChange={handleChange}
                            placeholder="e.g. Book Darshan Now"
                        />
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="text-xl font-bold mb-4">Detailed Schedule</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Section Title</label>
                        <Input
                            name="scheduleSectionTitle"
                            value={formData.scheduleSectionTitle}
                            onChange={handleChange}
                            placeholder="e.g. Darshan & Seva Timings"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description (Below Title)</label>
                        <Textarea
                            name="scheduleDescription"
                            value={formData.scheduleDescription}
                            onChange={handleChange}
                            placeholder="e.g. The temple follows a sacred daily ritual schedule..."
                        />
                    </div>
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

                    {/* Summer Schedule */}
                    <div className="mb-6 mt-6 border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Summer Schedule (Optional)</h3>
                        <div className="space-y-3">
                            {formData.scheduleSummer.map((row, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder="Label"
                                        value={row.label}
                                        onChange={(e) => handleSummerScheduleChange(index, "label", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Time"
                                        value={row.time}
                                        onChange={(e) => handleSummerScheduleChange(index, "time", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeSummerScheduleRow(index)}>
                                        <span className="text-lg">×</span>
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" className="w-full" onClick={addSummerScheduleRow}>
                                + Add Summer Row
                            </Button>
                        </div>
                    </div>

                    {/* Winter Schedule */}
                    <div className="mb-6 mt-4 border-t pt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Winter Schedule (Optional)</h3>
                        <div className="space-y-3">
                            {formData.scheduleWinter.map((row, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder="Label"
                                        value={row.label}
                                        onChange={(e) => handleWinterScheduleChange(index, "label", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Time"
                                        value={row.time}
                                        onChange={(e) => handleWinterScheduleChange(index, "time", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeWinterScheduleRow(index)}>
                                        <span className="text-lg">×</span>
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" className="w-full" onClick={addWinterScheduleRow}>
                                + Add Winter Row
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Bottom Note </label>
                        <Input
                            name="scheduleNote"
                            value={formData.scheduleNote}
                            onChange={handleChange}
                            placeholder="e.g. Early morning darshan is highly recommended..."
                        />
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
