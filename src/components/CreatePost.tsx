
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Image as ImageIcon,
  Video,
  FileText,
  TrendingUp,
  X,
  Upload
} from "lucide-react";

interface CreatePostProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
  onClose: () => void;
}

const CreatePost = ({ userRole, onClose }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("update");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const postTypes = [
    { id: "update", label: "General Update", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "milestone", label: "Milestone Update", icon: <FileText className="w-4 h-4" /> },
    { id: "opportunity", label: "Investment Opportunity", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "success", label: "Success Story", icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const popularTags = ['#AgriTech', '#FinTech', '#SolarEnergy', '#ECommerce', '#Healthcare', '#Education'];

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag.startsWith('#') ? tag : `#${tag}`]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePost = () => {
    if (content.trim()) {
      // Handle post creation logic here
      console.log({ content, postType, attachments, tags });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Post</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Share updates with the MANSA community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Post Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Post Type</label>
            <div className="grid grid-cols-2 gap-2">
              {postTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={postType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPostType(type.id)}
                  className="justify-start"
                >
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              placeholder={`Share your ${userRole === 'entrepreneur' ? 'business updates' : 'investment insights'}...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          {/* Media Attachments */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Attachments</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Add Video
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addTag(newTag)}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {popularTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-amber-50"
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              {content.length}/500 characters
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handlePost}
                disabled={!content.trim()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                Post Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
