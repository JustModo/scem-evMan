"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

const languageList = ["c", "java", "python"];

export default function BoilerplateCard() {
  const { control } = useFormContext();

  const [supportedLanguages, setSupportedLanguages] =
    useState<string[]>(languageList);

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
              className="uppercase"
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

        {/* {supportedLanguages.map((lang) => (
          <FormField
            key={lang}
            control={control}
            name={`boilerplate.${lang}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel><span className="uppercase">{lang}</span> Boilerplate</FormLabel>
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
        ))} */}
      </CardContent>
    </Card>
  );
}
