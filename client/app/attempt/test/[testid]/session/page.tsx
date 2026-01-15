"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    Send,
    CheckCircle2,
    Code2,
    ListTodo,
    AlertCircle
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Question {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    questionType: string;
    points: number;
    inputFormat?: string;
    outputFormat?: string;
    constraints?: string;
    boilerplate?: Record<string, string>;
    options?: string[];
}

export default function AttemptSessionPage() {
    const { testid } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [selectedLangs, setSelectedLangs] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const saveDebounceRef = useRef<Record<string, NodeJS.Timeout>>({});

    const fetchSessionData = useCallback(async () => {
        if (status !== "authenticated" || !session?.backendToken || !testid) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contest/${testid}/data`, {
                headers: {
                    "Authorization": `Bearer ${session.backendToken}`,
                    "Content-Type": "application/json"
                },
            });

            const result = await res.json();
            if (result.success) {
                setQuestions(result.data.problems || []);
                setTimeRemaining(result.data.timeRemaining || 0);

                const initialLangs: Record<string, string> = {};
                const initialAnswers: Record<string, any> = {};
                result.data.problems.forEach((q: Question) => {
                    if (q.questionType === "Coding" && q.boilerplate) {
                        const firstLang = Object.keys(q.boilerplate)[0] || "javascript";
                        initialLangs[q.id] = firstLang;
                        initialAnswers[q.id] = q.boilerplate[firstLang];
                    } else if (q.questionType === "Multiple Correct") {
                        initialAnswers[q.id] = [];
                    } else {
                        initialAnswers[q.id] = "";
                    }
                });
                setSelectedLangs(initialLangs);
                setAnswers(initialAnswers);
            } else {
                toast.error(result.message || "Failed to load test data");
                router.push(`/attempt/test/${testid}`);
            }
        } catch (err) {
            toast.error("Network error: Could not reach the server");
        } finally {
            setLoading(false);
        }
    }, [testid, session, status, router]);

    useEffect(() => {
        fetchSessionData();
    }, [fetchSessionData]);

    useEffect(() => {
        if (timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        handleFinalSubmit(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timeRemaining]);

    const handleSaveAnswer = useCallback(async (qId: string, answer: any, isFinal: boolean = false) => {
        if (!session?.backendToken) return;

        const performSave = async () => {
            const payload: any = {
                contestId: testid,
                questionId: qId,
                finalSubmit: isFinal
            };

            const currentQ = questions.find(q => q.id === qId);
            if (!currentQ) return;

            if (currentQ.questionType === "Coding") {
                payload.code = answer;
                payload.language = selectedLangs[qId];
            } else {
                payload.answer = answer;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contest/${testid}/submit`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${session.backendToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();
                if (!result.success && !isFinal) {
                    toast.error(result.error || "Failed to save answer");
                }
            } catch (error) {
                if (!isFinal) toast.error("Auto-save failed");
            }
        };

        if (isFinal) {
            if (saveDebounceRef.current[qId]) clearTimeout(saveDebounceRef.current[qId]);
            await performSave();
        } else {
            if (saveDebounceRef.current[qId]) clearTimeout(saveDebounceRef.current[qId]);
            saveDebounceRef.current[qId] = setTimeout(performSave, 2000);
        }
    }, [testid, session, questions, selectedLangs]);

    const handleFinalSubmit = async (auto: boolean = false) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            if (!auto) {
                const currentQ = questions[currentIdx];
                await handleSaveAnswer(currentQ.id, answers[currentQ.id], true);
            }
            toast.success(auto ? "Time up! Assessment submitted." : "Assessment submitted successfully!");
            router.push(`/`);
        } catch (error) {
            toast.error("Error during final submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading || status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-muted-foreground animate-pulse">Loading Environment...</p>
            </div>
        );
    }

    if (questions.length === 0) return <div className="p-20 text-center">No questions found.</div>;

    const currentQuestion = questions[currentIdx];
    const currentAnswer = answers[currentQuestion.id];

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden ">
            <header className="h-14 border-b bg-card px-6 flex items-center justify-between shrink-0 shadow-sm z-10 pt-2">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-lg tracking-tight bg-primary/10 px-3 py-1 rounded-md text-primary">SCEM Test Engine</h1>
                    <div className="h-4 w-px bg-border hidden md:block" />
                    <h2 className="text-sm font-medium text-muted-foreground hidden md:block max-w-[300px] truncate">{currentQuestion.title}</h2>
                </div>

                <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-colors ${timeRemaining < 300 ? 'bg-red-500/10 border-red-500/30 text-red-600' : 'bg-secondary border-border text-foreground'}`}>
                        <Clock className={`h-4 w-4 ${timeRemaining < 300 ? 'animate-pulse' : ''}`} />
                        <span className="font-mono font-bold text-sm tracking-wider">{formatTime(timeRemaining)}</span>
                    </div>
                    <Button
                        onClick={() => handleFinalSubmit()}
                        disabled={isSubmitting}
                        className="font-bold shadow-lg shadow-primary/20"
                    >
                        {isSubmitting ? "Submitting..." : "Finish Test"}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-16 md:w-64 border-r bg-card flex flex-col shrink-0 pt-4">
                    <div className="p-4 border-b hidden md:block">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Question Map</p>
                        <div className="grid grid-cols-4 gap-2">
                            {questions.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentIdx(i)}
                                    className={`h-10 w-10 text-xs font-bold rounded-lg transition-all border ${currentIdx === i
                                        ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                                        : answers[q.id] ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto w-full flex flex-col items-center py-4 md:hidden gap-4">
                        {questions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIdx(i)}
                                className={`h-8 w-8 text-[10px] font-bold rounded flex items-center justify-center ${currentIdx === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 flex overflow-hidden flex-col md:flex-row pt-4">
                    <section className="flex-1 flex flex-col border-r overflow-hidden min-w-0">
                        <ScrollArea className="flex-1">
                            <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${currentQuestion.difficulty === 'Hard' ? 'bg-red-500/10 text-red-600' :
                                            currentQuestion.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                                'bg-green-500/10 text-green-600'
                                            }`}>
                                            {currentQuestion.difficulty}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">
                                            {currentQuestion.points} Points
                                        </span>
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-primary/10 text-primary">
                                            {currentQuestion.questionType}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight">{currentQuestion.title}</h2>
                                </div>

                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{currentQuestion.description}</div>
                                </div>

                                {currentQuestion.questionType === "Coding" && (
                                    <div className="space-y-6 pt-4">
                                        {currentQuestion.inputFormat && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-bold flex items-center gap-2"><ListTodo className="h-4 w-4 text-primary" /> Input Format</h4>
                                                <div className="bg-muted/50 p-4 rounded-lg text-sm border">{currentQuestion.inputFormat}</div>
                                            </div>
                                        )}
                                        {currentQuestion.outputFormat && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-bold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Output Format</h4>
                                                <div className="bg-muted/50 p-4 rounded-lg text-sm border">{currentQuestion.outputFormat}</div>
                                            </div>
                                        )}
                                        {currentQuestion.constraints && (
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-bold flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Constraints</h4>
                                                <div className="bg-muted/50 p-4 rounded-lg text-sm border font-mono">{currentQuestion.constraints}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        <div className="h-16 border-t bg-card px-6 flex items-center justify-between shrink-0">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                                disabled={currentIdx === 0}
                                size="sm"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                                disabled={currentIdx === questions.length - 1}
                                size="sm"
                            >
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </section>

                    <section className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950 overflow-hidden min-w-0">
                        {currentQuestion.questionType === "Coding" ? (
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="h-12 border-b bg-muted/30 px-4 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-2">
                                        <Code2 className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Compiler</span>
                                    </div>
                                    <Select
                                        value={selectedLangs[currentQuestion.id]}
                                        onValueChange={(val) => {
                                            setSelectedLangs(prev => ({ ...prev, [currentQuestion.id]: val }));
                                            if (currentQuestion.boilerplate?.[val]) {
                                                setAnswers(prev => ({ ...prev, [currentQuestion.id]: currentQuestion.boilerplate![val] }));
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="h-8 w-32 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currentQuestion.boilerplate && Object.keys(currentQuestion.boilerplate).map(lang => (
                                                <SelectItem key={lang} value={lang} className="text-xs capitalize">{lang}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex-1 relative overflow-hidden">
                                    <Editor
                                        height="100%"
                                        language={selectedLangs[currentQuestion.id] === 'cpp' ? 'cpp' : selectedLangs[currentQuestion.id]}
                                        theme="vs-dark"
                                        value={currentAnswer}
                                        onChange={(val) => {
                                            setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
                                            handleSaveAnswer(currentQuestion.id, val);
                                        }}
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            padding: { top: 20 },
                                            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                                            lineNumbersMinChars: 3,
                                        }}
                                        loading={<Skeleton className="h-full w-full rounded-none" />}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 p-8 flex flex-col justify-center max-w-2xl mx-auto w-full">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Your Answer</p>
                                        <p className="text-sm text-muted-foreground">Select the {currentQuestion.questionType === "Multiple Correct" ? "correct options" : "correct option"}.</p>
                                    </div>

                                    {currentQuestion.questionType === "Multiple Correct" ? (
                                        <div className="grid gap-4">
                                            {currentQuestion.options?.map((opt, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => {
                                                        const newAns = currentAnswer.includes(opt)
                                                            ? currentAnswer.filter((a: string) => a !== opt)
                                                            : [...currentAnswer, opt];
                                                        setAnswers(prev => ({ ...prev, [currentQuestion.id]: newAns }));
                                                        handleSaveAnswer(currentQuestion.id, newAns);
                                                    }}
                                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${currentAnswer.includes(opt) ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50 bg-card'
                                                        }`}
                                                >
                                                    <Checkbox checked={currentAnswer.includes(opt)} className="pointer-events-none" />
                                                    <span className="text-sm font-medium">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <RadioGroup
                                            value={currentAnswer}
                                            onValueChange={(val) => {
                                                setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
                                                handleSaveAnswer(currentQuestion.id, val);
                                            }}
                                            className="grid gap-4"
                                        >
                                            {currentQuestion.options?.map((opt, idx) => (
                                                <div key={idx} className="relative">
                                                    <RadioGroupItem value={opt} id={`opt-${idx}`} className="peer sr-only" />
                                                    <label
                                                        htmlFor={`opt-${idx}`}
                                                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-border cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-md bg-card"
                                                    >
                                                        <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center peer-data-[state=checked]:bg-primary">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                                        </div>
                                                        <span className="text-sm font-medium">{opt}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}
