"use client";

import CreateServiceTagForm from "./createServiceTags/page";

export default function CreateServiceTagPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Создание Service Tag</h2>
      <CreateServiceTagForm />
    </div>
  );
}
