// components/help/HelpSupport.tsx
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function HelpSupport() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      <Accordion type="single" collapsible className="mb-10">
        <AccordionItem value="faq-1">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
            After your order ships, you’ll receive an email with a tracking number. You can also check order status under "My Orders".
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return items within 30 days of delivery. Items must be unused and in original packaging.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>Can I cancel or change my order?</AccordionTrigger>
          <AccordionContent>
            You can cancel or modify your order within 1 hour of placing it. Contact support immediately.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold">Still need help? Contact us.</h2>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <Textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
        </div>

        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}
