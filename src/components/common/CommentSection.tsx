import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

const CommentSection = () => {
    const [comments, setComments] = useState([
        { id: 1, name: "Aarav Sharma", date: "2 days ago", text: "Truly a divine experience reading this. Har Har Mahadev! 🙏" },
        { id: 2, name: "Priya Iyer", date: "1 week ago", text: "Very informative guide. I am planning my visit next month." }
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const newComment = {
                id: comments.length + 1,
                name: formData.name,
                date: "Just now",
                text: formData.comment
            };

            setComments([newComment, ...comments]);
            setFormData({ name: "", email: "", comment: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 mt-12">
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-8">
                Leave a Comment
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-stone-700">Name</label>
                        <Input
                            id="name"
                            required
                            placeholder="Your Name"
                            className="bg-stone-50 border-stone-200"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-stone-700">Email</label>
                        <Input
                            id="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="bg-stone-50 border-stone-200"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium text-stone-700">Comment</label>
                    <Textarea
                        id="comment"
                        required
                        placeholder="Share your thoughts..."
                        className="min-h-[120px] bg-stone-50 border-stone-200"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
            </form>

            <div className="h-px bg-stone-100 mb-10" />

            {/* Comments List */}
            <div className="space-y-8">
                <h4 className="font-bold text-lg text-stone-900">
                    {comments.length} Comments
                </h4>

                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-stone-900">{comment.name}</span>
                                    <span className="text-xs text-stone-400">•</span>
                                    <span className="text-sm text-stone-500">{comment.date}</span>
                                </div>
                                <p className="text-stone-700 leading-relaxed">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
