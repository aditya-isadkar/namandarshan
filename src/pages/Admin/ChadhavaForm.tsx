import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/utils/api";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Significance { title: string; description: string }
interface Review { name: string; location: string; comment: string; rating: number }
interface FAQ { question: string; answer: string }

const ChadhavaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        longDescription: "",
        image: "",
        tag: "",
        templeName: "",
        features: [] as string[],
        significance: [] as Significance[],
        reviews: [] as Review[],
        faqs: [] as FAQ[]
    });

    const [imageSource, setImageSource] = useState<'url' | 'public'>('url');

    const PUBLIC_IMAGES = [
        { label: 'Image 1 (Main Banner)', value: '/image1.jpg' },
        { label: 'Image 2 (Secondary Banner)', value: '/image2.jpg' },
        { label: 'Kashi Vishwanath', value: '/kashi-vishwanath.png' },
        { label: 'Naman Logo', value: '/images/naman-logo.png' },
        { label: 'Naman Stamp', value: '/images/naman-stamp.png' },
    ];

    useEffect(() => {
        if (id) {
            fetchChadhava();
        }
    }, [id]);

    const fetchChadhava = async () => {
        try {
            const res = await fetch(getApiUrl(`/api/chadhava/${id}`));
            const data = await res.json();
            setFormData({
                ...data,
                features: data.features || [],
                significance: data.significance || [],
                reviews: data.reviews || [],
                faqs: data.faqs || []
            });
        } catch (error) {
            console.error("Error fetching chadhava:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper for updating dynamic arrays (objects)
    const handleArrayChange = (index: number, field: string, key: string, value: any) => {
        const updatedArray = [...(formData as any)[field]];
        updatedArray[index] = { ...updatedArray[index], [key]: value };
        setFormData({ ...formData, [field]: updatedArray });
    };

    // Helper for updating features (simple string array)
    const handleFeatureChange = (index: number, value: string) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index] = value;
        setFormData({ ...formData, features: updatedFeatures });
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
                ? getApiUrl(`/api/chadhava/${id}`)
                : getApiUrl("/api/chadhava");

            const method = id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save chadhava");

            toast({ title: `Chadhava ${id ? "updated" : "created"} successfully` });
            navigate("/admin/chadhava");
        } catch (error) {
            toast({ title: "Error saving chadhava", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-6" onClick={() => navigate("/admin/chadhava")}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <h1 className="text-3xl font-bold font-display mb-8">
                {id ? "Edit Chadhava" : "Add New Chadhava"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border shadow-sm">

                {/* Basic Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b pb-2">Basic Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Brahmin-Panda Seva" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Temple Name</label>
                            <Input name="templeName" value={formData.templeName} onChange={handleChange} required placeholder="e.g. Moksha Teerth" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Short Description</label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Brief description..." rows={2} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Long Description</label>
                        <Textarea name="longDescription" value={formData.longDescription} onChange={handleChange} placeholder="Detailed description..." rows={4} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tag</label>
                            <Input name="tag" value={formData.tag} onChange={handleChange} required placeholder="e.g. SPECIAL" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-medium block">Image Source</label>

                            <div className="flex gap-4 mb-2">
                                <Button
                                    type="button"
                                    variant={imageSource === 'url' ? 'default' : 'outline'}
                                    onClick={() => setImageSource('url')}
                                    className="flex-1"
                                >
                                    External URL
                                </Button>
                                <Button
                                    type="button"
                                    variant={imageSource === 'public' ? 'default' : 'outline'}
                                    onClick={() => setImageSource('public')}
                                    className="flex-1"
                                >
                                    Public Gallery
                                </Button>
                            </div>

                            {imageSource === 'url' ? (
                                <div className="space-y-2">
                                    <Input
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-muted-foreground">Enter a direct link to an image.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <select
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    >
                                        <option value="" disabled>Select an image...</option>
                                        {PUBLIC_IMAGES.map((img) => (
                                            <option key={img.value} value={img.value}>
                                                {img.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.image && (
                                        <div className="mt-2 rounded-lg overflow-hidden border w-full h-32 bg-slate-50 relative">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Seva Inclusions (Features) */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Seva Inclusions</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("features", "")}>
                            <Plus className="w-4 h-4 mr-2" /> Add Inclusion
                        </Button>
                    </div>
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <Input
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder="Inclusion Name"
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(index, "features")}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Significance */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Significance of Offering</h2>
                        <Button type="button" variant="outline" size="sm" onClick={() => addToArray("significance", { title: "", description: "" })}>
                            <Plus className="w-4 h-4 mr-2" /> Add Significance
                        </Button>
                    </div>
                    {formData.significance.map((sig, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start border p-4 rounded-lg">
                            <Input
                                value={sig.title}
                                onChange={(e) => handleArrayChange(index, "significance", "title", e.target.value)}
                                placeholder="Title / Concept"
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
                        {loading ? "Saving..." : "Save Chadhava Details"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChadhavaForm;
