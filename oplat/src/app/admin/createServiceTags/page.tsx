"use client";

import { useState } from "react";
import { createServiceTag } from "./serviceTagsService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { toast } from "sonner";

interface Props {
  onCreated?: () => void;
}

export default function CreateServiceTagForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0);
  const [serviceTagId, setServiceTagId] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createServiceTag({ title, priority, serviceTagId });
      toast.success("Услуга успешно создана!");
      setTitle("");
      setPriority(0);
      setServiceTagId(1);
      onCreated?.();
    } catch (error: any) {
      toast.error("Ошибка при создании услуги");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 max-w-md">
      <CardHeader>
        <CardTitle>Создать услугу</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              placeholder="Введите название услуги"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority">Приоритет</Label>
            <Input
              id="priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="serviceTagId">ID тега</Label>
            <Input
              id="serviceTagId"
              type="number"
              value={serviceTagId}
              onChange={(e) => setServiceTagId(Number(e.target.value))}
            />
          </div>

          <CardFooter className="p-0 pt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Создание..." : "Создать услугу"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
