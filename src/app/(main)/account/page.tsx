

'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchAccount, updateAccountField } from "@/hooks/user/account/useAccount";

type Field = {
  label: string;
  field: string;
  value: string;
  fallback?: boolean;
  fallbackMessage?: string;
  type?: "text" | "select" | "email" | "number";
};

export default function AccountPage() {
  const [fields, setFields] = useState<Field[] | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccount().then((data) => {
      setFields([
        { label: "Name", field: "displayName", value: data.displayName, type: "text" },
        {
          label: "Email",
          field: "storeEmail",
          value: data.email,
          fallback: data.emailFallback,
          fallbackMessage: "This is your default Synapse account email. If you wish you can change it separately for Synapse Store",
          type: "email"
        },
        {
          label: "Phone",
          field: "storePhone",
          value: data.phone,
          fallback: data.phoneFallback,
          fallbackMessage: "This is your default Synapse account phone.",
          type: "number"
        },
        { label: "Gender", field: "gender", value: data.gender, type: "select" },
      ]);
    });
  }, []);

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditValue(fields![index].value);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const saveField = async (index: number) => {
    const field = fields![index];
    setLoading(true);
    try {
      await updateAccountField(field.field, editValue);
      const updatedFields = [...fields!];
      updatedFields[index].value = editValue;
      updatedFields[index].fallback = false;
      setFields(updatedFields);
      cancelEditing();
    } catch (error) {
      console.error("Update failed:", error);
    }
    setLoading(false);
  };


  if (!fields) {
    return (
      <div className="space-y-4 max-w-xl mx-auto mt-10">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>
      <div className="space-y-6">
        {fields.map((field, i) => (
          <div key={i} className="space-y-1">
            <Label>{field.label}</Label>
            {editingIndex === i ? (
              <div className="flex items-center gap-2">
                {field.type === "select" ? (
                  <Select
                    value={editValue}
                    onValueChange={(val) => setEditValue(val)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    disabled={loading}
                    className="w-full"
                  />
                )}
                <Button
                  size="sm"
                  onClick={() => saveField(i)}
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEditing}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p>{field.value || <span className="text-muted-foreground">Not set</span>}</p>
                  {field.fallback && (
                    <p className="text-sm text-muted-foreground">{field.fallbackMessage}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEditing(i)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
