"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, Save, FileText, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import { saveQuestion } from "@/app/actions/save-question";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  points: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  type: z.enum(["code", "mcq"]),
  options: z.string().optional(),
  correctOption: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const initialState = { message: "" };

export default function AdminQuestionEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isCreating = id === "new";

  const [isLoading, setIsLoading] = useState(false);
  const [constraints, setConstraints] = useState<string[]>([""]);
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
  ]);

  const [languageOptions] = useState<string[]>([
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
  ]);
  const [selectedTab, setSelectedTab] = useState<string>("C");
  const [boilerplate, setBoilerplate] = useState<{ [key: string]: string }>({
    C: "",
    "C++": "",
    Java: "",
    Python: "",
    JavaScript: "",
  });

  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    saveQuestion,
    initialState
  );

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      points: "",
      difficulty: "easy",
      type: "code",
      options: "",
      correctOption: "",
    },
  });

  const handleRemoveConstraint = (index: number) => {
    const updated = [...constraints];
    updated.splice(index, 1);
    setConstraints(updated);
  };

  const toggleLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setSupportedLanguages((prev) => prev.filter((l) => l !== lang));
    } else {
      setSupportedLanguages((prev) => [...prev, lang]);
    }
  };

  return (
    <div className="flex-1 h-full bg-background text-foreground overflow-x-hidden">
      <div className="h-full w-full">
        <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="w-full bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground hover:bg-accent flex-shrink-0"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="space-y-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                    {isCreating ? "Create Question" : "Edit Question"}
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Configure question details, constraints, and boilerplate
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap bg-muted text-muted-foreground">
                  Waiting
                </span>
                <Button
                  type="submit"
                  form="question-form"
                  disabled={isLoading}
                  className="font-semibold px-4 sm:px-6 py-2 transition-all duration-200 bg-green-600 hover:bg-green-700 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span className="hidden sm:inline">Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span className="hidden sm:inline">Save Changes</span>
                      <span className="sm:hidden">Save</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6 lg:gap-8">
              <div className="2xl:col-span-3 space-y-6">
                <Form {...form}>
                  <form
                    id="question-form"
                    action={formAction}
                    className="space-y-6"
                  >
                    {/* Basic Info */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <FileText className="h-5 w-5 text-green-400" />
                          Basic Information
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Enter question title, description, and settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-input border-border text-foreground">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-popover border-border">
                                    <SelectItem value="code">Code</SelectItem>
                                    <SelectItem value="mcq">MCQ</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-input border-border text-foreground">
                                      <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-popover border-border">
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">
                                      Medium
                                    </SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="points"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Points</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="10"
                                    className="bg-input border-border text-foreground"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter title"
                                    className="bg-input border-border text-foreground"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={3}
                                    placeholder="Enter description"
                                    className="bg-input border-border text-foreground"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Constraints */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <Settings className="h-5 w-5 text-green-400" />
                          Constraints
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {constraints.map((c, i) => (
                          <div key={i} className="relative">
                            <Input
                              className="bg-input border-border text-foreground pr-10"
                              placeholder={`Constraint ${i + 1}`}
                              value={c}
                              onChange={(e) => {
                                const newConstraints = [...constraints];
                                newConstraints[i] = e.target.value;
                                setConstraints(newConstraints);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveConstraint(i)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => setConstraints([...constraints, ""])}
                          variant="outline"
                          size="sm"
                        >
                          + Add Constraint
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Boilerplate */}
                    <Card className="bg-card border border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <Settings className="h-5 w-5 text-green-400" />
                          Boilerplate Code
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Language Selector Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {languageOptions.map((lang) => (
                            <Button
                              key={lang}
                              type="button"
                              variant={
                                supportedLanguages.includes(lang)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => toggleLanguage(lang)}
                            >
                              {supportedLanguages.includes(lang)
                                ? `✓ ${lang}`
                                : lang}
                            </Button>
                          ))}
                        </div>

                        {/* Tabs for each selected language */}
                        {supportedLanguages.length > 0 && (
                          <Tabs
                            value={selectedTab}
                            onValueChange={setSelectedTab}
                            className="mt-4 w-full"
                          >
                            <TabsList className="overflow-x-auto flex">
                              {supportedLanguages.map((lang) => (
                                <TabsTrigger key={lang} value={lang}>
                                  {lang}
                                </TabsTrigger>
                              ))}
                            </TabsList>

                            {supportedLanguages.map((lang) => (
                              <TabsContent key={lang} value={lang} forceMount>
                                <Textarea
                                  placeholder={`${lang} boilerplate code...`}
                                  value={boilerplate[lang] || ""}
                                  onChange={(e) =>
                                    setBoilerplate((prev) => ({
                                      ...prev,
                                      [lang]: e.target.value,
                                    }))
                                  }
                                  className="min-h-[120px] font-mono bg-input border-border text-foreground"
                                />
                              </TabsContent>
                            ))}
                          </Tabs>
                        )}
                      </CardContent>
                    </Card>

                    {/* Input & Output Format */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <FileText className="h-5 w-5 text-green-400" />
                          Input & Output Format
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Define how inputs and outputs should be structured
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Textarea
                            placeholder="e.g., Two integers a and b"
                            value={inputFormat}
                            onChange={(e) => setInputFormat(e.target.value)}
                            className="min-h-[100px] bg-input border-border text-foreground"
                          />
                          <Textarea
                            placeholder="e.g., An integer representing their sum"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value)}
                            className="min-h-[100px] bg-input border-border text-foreground"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
