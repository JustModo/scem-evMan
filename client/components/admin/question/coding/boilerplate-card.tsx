"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Pencil } from "lucide-react";

const languageList = ["C", "Cpp", "Java", "Python", "JavaScript"];

export default function BoilerplateCard() {
  const { control } = useFormContext();

  const [supportedLanguages, setSupportedLanguages] =
    useState<string[]>(languageList);
  const [selectedTab, setSelectedTab] = useState("C");

  const toggleLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setSupportedLanguages((prev) => prev.filter((l) => l !== lang));
    } else {
      setSupportedLanguages((prev) => [...prev, lang]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pencil className="h-5 w-5 text-primary" />
          Boilerplate Code
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {languageList.map((lang) => (
            <Button
              key={lang}
              type="button"
              variant={
                supportedLanguages.includes(lang) ? "default" : "outline"
              }
              size="sm"
              onClick={() => toggleLanguage(lang)}
            >
              {supportedLanguages.includes(lang) ? `✓ ${lang}` : lang}
            </Button>
          ))}
        </div>

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
              <TabsContent key={lang} value={lang}>
                <FormField
                  control={control}
                  name={`boilerplate.${lang}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang} Boilerplate</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={`${lang} boilerplate code...`}
                          className="min-h-[120px] font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
