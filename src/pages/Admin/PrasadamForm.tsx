import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/utils/api";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Inclusion { item: string }
interface Significance { item: string; description: string }
interface Review { name: string; location: string; comment: string; rating: number }
interface FAQ { question: string; answer: string }

const PrasadamForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        templeName: "",
        location: "",
        inclusions: [] as Inclusion[],
        significance: [] as Significance[],
        reviews: [] as Review[],
        faqs: [] as FAQ[]
    });

    useEffect(() => {
        if (id) {
            fetchPrasadam();
        }
    }, [id]);

    const fetchPrasadam = async () => {
        try {
            const res = await fetch(getApiUrl(`/api/prasadams/${id}`));
            const data = await res.json();
            setFormData({
                ...data,
                inclusions: data.inclusions || [],
                significance: data.significance || [],
                reviews: data.reviews || [],
                faqs: data.faqs || []
            });
        } catch (error) {
            console.error("Error fetching prasadam:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper for updating dynamic arrays
    const handleArrayChange = (index: number, field: string, key: string, value: any) => {
        const updatedArray = [...(formData as any)[field]];
        if (key) {
            updatedArray[index] = { ...updatedArray[index], [key]: value };
        } else {
            updatedArray[index] = { ...updatedArray[index], item: value }; // Default for single-field objects if any (mostly handled by key)
        }
        setFormData({ ...formData, [field]: updatedArray });
    };

    const addToArray = (field: string, initialValue: any) => {
        setFormData({ ...formData, [field]: [...(formData as any)[field], initialValue] });
    };

    const removeFromArray = (index: number, field: string) => {
        const updatedArray = [...(formData as any)[field]];
        updatedArray.splice(index, 1);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = id
                ? getApiUrl(`/api/prasadams/${id}`)
                : getApiUrl("/api/prasadams");

            const method = id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save prasadam");

            toast({ title: `Prasadam ${id ? "updated" : "created"} successfully` });
            navigate("/admin/prasadam");
        } catch (error) {
            toast({ title: "Error saving prasadam", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-6" onClick={() => navigate("/admin/prasadam")}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <h1 className="text-3xl font-bold font-display mb-8">
                {id ? "Edit Prasadam" : "Add New Prasadam"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border shadow-sm">

                {/* Basic Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b pb-2">Basic Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Ram Mandir Prasad" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Temple Name</label>
                            <Input name="templeName" value={formData.templeName} onChange={handleChange} required placeholder="e.g. Ram Janmabhoomi" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Ayodhya" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Brief description..." rows={3} />
                    </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">What's Inside? (Inclusions)</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("inclusions", { item: "" })}>
                            <Plus className="w-4 h-4 mr-2" /> Add Item
                        </Button>
                    </div>
                    {formData.inclusions.map((inc, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <Input
                                value={inc.item}
                                onChange={(e) => handleArrayChange(index, "inclusions", "item", e.target.value)}
                                placeholder="Item Name"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(index, "inclusions")}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Significance */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Significance of Offering</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("significance", { item: "", description: "" })}>
                            <Plus className="w-4 h-4 mr-2" /> Add Significance
                        </Button>
                    </div>
                    {formData.significance.map((sig, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start border p-4 rounded-lg">
                            <Input
                                value={sig.item}
                                onChange={(e) => handleArrayChange(index, "significance", "item", e.target.value)}
                                placeholder="Item / Concept"
                            />
                            <Textarea
                                value={sig.description}
                                onChange={(e) => handleArrayChange(index, "significance", "description", e.target.value)}
                                placeholder="Description of significance"
                                rows={2}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(index, "significance")}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Devotee Experiences (Reviews)</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("reviews", { name: "", location: "", comment: "", rating: 5 })}>
                            <Plus className="w-4 h-4 mr-2" /> Add Review
                        </Button>
                    </div>
                    {formData.reviews.map((review, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_3fr_auto_auto] gap-4 items-start border p-4 rounded-lg">
                            <Input
                                value={review.name}
                                onChange={(e) => handleArrayChange(index, "reviews", "name", e.target.value)}
                                placeholder="Devotee Name"
                            />
                            <Input
                                value={review.location}
                                onChange={(e) => handleArrayChange(index, "reviews", "location", e.target.value)}
                                placeholder="Location"
                            />
                            <Textarea
                                value={review.comment}
                                onChange={(e) => handleArrayChange(index, "reviews", "comment", e.target.value)}
                                placeholder="Review Comment"
                                rows={2}
                            />
                            <Input
                                type="number"
                                min="1"
                                max="5"
                                className="w-20"
                                value={review.rating}
                                onChange={(e) => handleArrayChange(index, "reviews", "rating", parseInt(e.target.value))}
                                placeholder="Rating"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(index, "reviews")}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("faqs", { question: "", answer: "" })}>
                            <Plus className="w-4 h-4 mr-2" /> Add FAQ
                        </Button>
                    </div>
                    {formData.faqs.map((faq, index) => (
                        <div key={index} className="space-y-2 border p-4 rounded-lg relative">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeFromArray(index, "faqs")}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                            <Input
                                value={faq.question}
                                onChange={(e) => handleArrayChange(index, "faqs", "question", e.target.value)}
                                placeholder="Question"
                            />
                            <Textarea
                                value={faq.answer}
                                onChange={(e) => handleArrayChange(index, "faqs", "answer", e.target.value)}
                                placeholder="Answer"
                                rows={2}
                            />
                        </div>
                    ))}
                </div>

                <div className="pt-4 sticky bottom-0 bg-white border-t mt-8 p-4 z-10">
                    <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                        {loading ? "Saving..." : "Save Prasadam Details"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PrasadamForm;
