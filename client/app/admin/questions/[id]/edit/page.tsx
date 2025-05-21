"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



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
    <div className="min-h-screen flex items-center justify-center bg-[#B8E1B0] p-4 pt-16">
      <div className="w-full max-w-4xl rounded-2xl shadow-md bg-white dark:bg-neutral-900 text-black dark:text-white p-6 md:p-10 transition-colors duration-300">
        <h1 className="text-2xl font-semibold mb-6">
          {isCreating ? "➕ Add New Question" : "Edit Question"}
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label className="mb-2 block text-base">Type</Label>
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
            <Label className="mb-2 block text-base">Title</Label>
            <Input
              placeholder="Enter question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2 block text-base">Description</Label>
            <Textarea
              placeholder="Enter full question description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2 block text-base">Difficulty</Label>
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
            <Label className="mb-2 block text-base">Points</Label>
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
                <Label className="mb-2 block text-base">Input Format</Label>
                <Textarea placeholder="Enter input format" />
              </div>

              <div>
                <Label className="mb-2 block text-base">Output Format</Label>
                <Textarea placeholder="Enter output format" />
              </div>

              <div>
                <Label className="mb-2 block text-base">Constraints</Label>
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
                  className="border-1"
                >
                  Add Constraint
                </Button>
              </div>

              <div>
                <Label className="mb-2 block text-base">Boilerplate Code</Label>
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
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <Label className="mb-2 block text-base">Sample Test Cases</Label>
                {samples.map((_, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-2">
                    <Textarea placeholder="Sample input" />
                    <Textarea placeholder="Expected output" />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddSample}
                  variant="outline"
                  className="border-2"
                >
                  Add Sample
                </Button>
              </div>

              <div>
                <Label className="mb-2 block text-base">Test Cases (Hidden)</Label>
                {testCases.map((_, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4 mb-2">
                    <Textarea placeholder="Test input" />
                    <Textarea placeholder="Expected output" />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddTestCase}
                  variant="outline"
                  className="border-2"
                >
                  Add Test Case
                </Button>
              </div>
            </>
          )}

          {type === "mcq" && (
            <>
              <div>
                <Label className="mb-2 block text-base">Options (comma-separated)</Label>
                <Input placeholder="Option A, Option B, Option C, Option D" />
              </div>

              <div>
                <Label className="mb-2 block text-base">Correct Option</Label>
                <Input placeholder="Enter the correct option" />
              </div>
            </>
          )}

          <Button  className = " h-12"type="submit">
            {isCreating ? "Create Question" : "Update Question"}
          </Button>
        </form>
      </div>
    </div>
  );
}
