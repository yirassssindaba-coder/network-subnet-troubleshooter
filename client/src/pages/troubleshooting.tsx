import { useState } from "react";
import { Wrench, Network, Gauge, Globe, Shield, Wifi, ChevronDown, ChevronRight, Check, Copy, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { troubleshootingCategories } from "@/lib/troubleshooting-data";
import type { TroubleshootingCategory, TroubleshootingStep } from "@shared/network-types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Network,
  Gauge,
  Globe,
  Shield,
  Wifi,
};

interface CommandBlockProps {
  commands: string[];
}

function CommandBlock({ commands }: CommandBlockProps) {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-1.5">
      {commands.map((cmd, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 bg-muted/50 rounded-md px-3 py-2 font-mono text-xs group"
        >
          <Terminal className="h-3 w-3 text-muted-foreground shrink-0" />
          <code className="flex-1 text-foreground">{cmd}</code>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleCopy(cmd, idx)}
            data-testid={`button-copy-command-${idx}`}
          >
            {copiedIndex === idx ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

interface StepItemProps {
  step: TroubleshootingStep;
  isCompleted: boolean;
  onToggle: () => void;
}

function StepItem({ step, isCompleted, onToggle }: StepItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors",
        isCompleted && "bg-primary/5 border-primary/20"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={step.id}
          checked={isCompleted}
          onCheckedChange={onToggle}
          className="mt-0.5"
          data-testid={`checkbox-step-${step.id}`}
        />
        <div className="flex-1 space-y-3">
          <label
            htmlFor={step.id}
            className={cn(
              "font-medium cursor-pointer block",
              isCompleted && "line-through text-muted-foreground"
            )}
          >
            {step.title}
          </label>
          <p className="text-sm text-muted-foreground">{step.description}</p>

          {step.commands && step.commands.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Commands:
              </p>
              <CommandBlock commands={step.commands} />
            </div>
          )}

          {step.expectedResult && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Expected Result:
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-md">
                {step.expectedResult}
              </p>
            </div>
          )}

          {step.troubleTip && (
            <div className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-md">
              <span className="font-medium shrink-0">Tip:</span>
              <span>{step.troubleTip}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  category: TroubleshootingCategory;
  completedSteps: Set<string>;
  onToggleStep: (stepId: string) => void;
}

function CategoryCard({ category, completedSteps, onToggleStep }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Network;
  const completedCount = category.steps.filter((s) => completedSteps.has(s.id)).length;
  const progress = Math.round((completedCount / category.steps.length) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </div>
          </div>
          <Badge variant={progress === 100 ? "default" : "secondary"} className="shrink-0">
            {completedCount}/{category.steps.length}
          </Badge>
        </div>
        {progress > 0 && (
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="steps" className="border-none">
            <AccordionTrigger
              className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              data-testid={`accordion-${category.id}`}
            >
              View Steps
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {category.steps.map((step) => (
                  <StepItem
                    key={step.id}
                    step={step}
                    isCompleted={completedSteps.has(step.id)}
                    onToggle={() => onToggleStep(step.id)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function Troubleshooting() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
  };

  const totalSteps = troubleshootingCategories.reduce(
    (acc, cat) => acc + cat.steps.length,
    0
  );
  const totalCompleted = completedSteps.size;
  const overallProgress = Math.round((totalCompleted / totalSteps) * 100);

  const filteredCategories = selectedCategory
    ? troubleshootingCategories.filter((c) => c.id === selectedCategory)
    : troubleshootingCategories;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Wrench className="h-7 w-7 text-primary" />
            Network Troubleshooting
          </h1>
          <p className="text-muted-foreground mt-2">
            Systematic step-by-step guide to diagnose and fix common network issues.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 mb-6">
          <Card className="lg:col-span-3">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{overallProgress}%</span>
                  </div>
                  <div>
                    <p className="font-medium">Overall Progress</p>
                    <p className="text-sm text-muted-foreground">
                      {totalCompleted} of {totalSteps} steps completed
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetProgress}
                  disabled={totalCompleted === 0}
                  data-testid="button-reset-progress"
                >
                  Reset Progress
                </Button>
              </div>
              <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Filter Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  data-testid="button-filter-all"
                >
                  All
                </Button>
                {troubleshootingCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    data-testid={`button-filter-${cat.id}`}
                  >
                    {cat.title.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              completedSteps={completedSteps}
              onToggleStep={toggleStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
