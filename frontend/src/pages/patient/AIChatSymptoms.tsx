import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Camera, 
  Bot,
  User,
  AlertTriangle,
  Heart,
  HelpCircle,
  Stethoscope
} from 'lucide-react';

interface AnalysisResult {
  severity: 'low' | 'medium' | 'high';
  possibleConditions: string[];
  recommendations: string[];
  urgency: string;
  disclaimer: string;
}

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  analysis?: AnalysisResult;
}

const AIChatSymptoms: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('symptoms');
  const [symptoms, setSymptoms] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generalMessages, setGeneralMessages] = useState<ChatMessage[]>([{
    type: 'bot',
    content: "Hello! I'm your AI Health Assistant. How can I help you today?",
    timestamp: new Date()
  }]);
  const [generalQuestion, setGeneralQuestion] = useState('');

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload an image smaller than 5MB.", variant: "destructive" });
        return;
      }
      setPhoto(file);
      toast({ title: "Photo uploaded", description: "Image has been added to your symptom report." });
    }
  };

  const handleSymptomAnalysis = async () => {
    if (!symptoms.trim()) {
      toast({ title: "No symptoms entered", description: "Please describe your symptoms before analyzing.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    const userMessage: ChatMessage = { type: 'user', content: symptoms, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);

    try {
      const formData = new FormData();
      formData.append('symptoms', symptoms);
      if (photo) formData.append('image', photo);

      const response = await fetch('http://localhost:5173/analyze-symptoms', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      const botMessage: ChatMessage = {
        type: 'bot',
        content: 'Here is the AI analysis of your symptoms:',
        timestamp: new Date(),
        analysis: result
      };
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to analyze symptoms.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
      setSymptoms('');
      setPhoto(null);
    }
  };

  const handleGeneralQuestion = async () => {
    if (!generalQuestion.trim()) return;
    const userMessage: ChatMessage = { type: 'user', content: generalQuestion, timestamp: new Date() };
    setGeneralMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:8000/ask-healthbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: generalQuestion })
      });
      const data = await response.json();
      const botMessage: ChatMessage = {
        type: 'bot',
        content: data.answer,
        timestamp: new Date()
      };
      setGeneralMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to get response.", variant: "destructive" });
    } finally {
      setGeneralQuestion('');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">AI Health Assistant</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="symptoms"><Stethoscope className="inline w-4 h-4 mr-2" />Symptom Checker</TabsTrigger>
          <TabsTrigger value="general"><HelpCircle className="inline w-4 h-4 mr-2" />General Health Q&A</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle><MessageCircle className="inline w-4 h-4 mr-2" />Symptom Checker</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe symptoms (e.g., fever, headache)..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mb-3"
              />
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              <div className="flex gap-2 mb-4">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}><Camera className="w-4 h-4 mr-2" />Add Photo</Button>
                <Button onClick={handleSymptomAnalysis} disabled={isAnalyzing}><Send className="w-4 h-4 mr-2" />{isAnalyzing ? 'Analyzing...' : 'Analyze'}</Button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`text-sm ${msg.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-3 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
                      <p>{msg.content}</p>
                      {msg.analysis && (
                        <div className="mt-2 space-y-1">
                          <Badge className={getSeverityColor(msg.analysis.severity)}>Severity: {msg.analysis.severity.toUpperCase()}</Badge>
                          <p><strong>Conditions:</strong> {msg.analysis.possibleConditions.join(', ')}</p>
                          <p><strong>Advice:</strong> {msg.analysis.recommendations.join('; ')}</p>
                          <p className="text-xs text-yellow-600 mt-1"><AlertTriangle className="inline w-3 h-3 mr-1" />{msg.analysis.disclaimer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle><Heart className="inline w-4 h-4 mr-2" />General Health Q&A</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {generalMessages.map((msg, idx) => (
                  <div key={idx} className={`text-sm ${msg.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-3 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>{msg.content}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={generalQuestion} onChange={e => setGeneralQuestion(e.target.value)} placeholder="Ask a question..." className="flex-1" />
                <Button onClick={handleGeneralQuestion} disabled={!generalQuestion}><Send className="w-4 h-4 mr-2" />Ask</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIChatSymptoms;
