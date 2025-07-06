"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminQuestionEditPage() {
  const { id } = useParams();
  const isCreating = id === "new";
  const [type, setType] = useState<"code" | "mcq">("code");
  const [samples, setSamples] = useState([{ input: "", output: "" }]);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [constraints, setConstraints] = useState([""]);
  const [boilerplate, setBoilerplate] = useState({
    python: "",
    javascript: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [points, setPoints] = useState("");

  const handleAddSample = () =>
    setSamples([...samples, { input: "", output: "" }]);
  const handleAddTestCase = () =>
    setTestCases([...testCases, { input: "", output: "" }]);
  const handleAddConstraint = () => setConstraints([...constraints, ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !points) {
      alert("Please fill in the title, description, and points.");
      return;
    }
    console.log("Submitting...", { title, description, difficulty, points });
  };

  return (
    <div className="flex-1 h-full overflow-y-auto p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold mb-6 ">
            {isCreating ? "➕ Add New Question" : "Edit Question"}
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label className="mb-2 block text-base text-card-foreground">
                Type
              </Label>
              <Select
                onValueChange={(val) => setType(val as "code" | "mcq")}
                defaultValue={type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="mcq">MCQ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-base text-card-foreground">
                Title
              </Label>
              <Input
                placeholder="Enter question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-base text-card-foreground">
                Description
              </Label>
              <Textarea
                placeholder="Enter full question description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label className="mb-2 block text-base text-card-foreground">
                Difficulty
              </Label>
              <Select defaultValue={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-base text-card-foreground">
                Points
              </Label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>

            {type === "code" && (
              <>
                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Input Format
                  </Label>
                  <Textarea placeholder="Enter input format" />
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Output Format
                  </Label>
                  <Textarea placeholder="Enter output format" />
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Constraints
                  </Label>
                  {constraints.map((c, i) => (
                    <div key={i} className="mb-2">
                      <Input
                        placeholder={`Constraint ${i + 1}`}
                        value={c}
                        onChange={(e) => {
                          const newConstraints = [...constraints];
                          newConstraints[i] = e.target.value;
                          setConstraints(newConstraints);
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddConstraint}
                    variant="outline"
                  >
                    Add Constraint
                  </Button>
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Boilerplate Code
                  </Label>
                  <Tabs defaultValue="python" className="w-full mt-2">
                    <TabsList>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    </TabsList>
                    <TabsContent value="python">
                      <Textarea
                        placeholder="Python starter code"
                        value={boilerplate.python}
                        onChange={(e) =>
                          setBoilerplate({
                            ...boilerplate,
                            python: e.target.value,
                          })
                        }
                        className="min-h-[120px] font-mono"
                      />
                    </TabsContent>
                    <TabsContent value="javascript">
                      <Textarea
                        placeholder="JavaScript starter code"
                        value={boilerplate.javascript}
                        onChange={(e) =>
                          setBoilerplate({
                            ...boilerplate,
                            javascript: e.target.value,
                          })
                        }
                        className="min-h-[120px] font-mono"
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Sample Test Cases
                  </Label>
                  {samples.map((sample, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
                    >
                      <Textarea
                        placeholder="Sample input"
                        value={sample.input}
                        onChange={(e) => {
                          const newSamples = [...samples];
                          newSamples[i].input = e.target.value;
                          setSamples(newSamples);
                        }}
                        className="font-mono"
                      />
                      <Textarea
                        placeholder="Expected output"
                        value={sample.output}
                        onChange={(e) => {
                          const newSamples = [...samples];
                          newSamples[i].output = e.target.value;
                          setSamples(newSamples);
                        }}
                        className="font-mono"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddSample}
                    variant="outline"
                  >
                    Add Sample
                  </Button>
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Test Cases (Hidden)
                  </Label>
                  {testCases.map((testCase, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
                    >
                      <Textarea
                        placeholder="Test input"
                        value={testCase.input}
                        onChange={(e) => {
                          const newTestCases = [...testCases];
                          newTestCases[i].input = e.target.value;
                          setTestCases(newTestCases);
                        }}
                        className="font-mono"
                      />
                      <Textarea
                        placeholder="Expected output"
                        value={testCase.output}
                        onChange={(e) => {
                          const newTestCases = [...testCases];
                          newTestCases[i].output = e.target.value;
                          setTestCases(newTestCases);
                        }}
                        className="font-mono"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddTestCase}
                    variant="outline"
                  >
                    Add Test Case
                  </Button>
                </div>
              </>
            )}

            {type === "mcq" && (
              <>
                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Options (comma-separated)
                  </Label>
                  <Input placeholder="Option A, Option B, Option C, Option D" />
                </div>

                <div>
                  <Label className="mb-2 block text-base text-card-foreground">
                    Correct Option
                  </Label>
                  <Input placeholder="Enter the correct option" />
                </div>
              </>
            )}

            <Button type="submit" className="w-full h-12 font-medium">
              {isCreating ? "Create Question" : "Update Question"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
