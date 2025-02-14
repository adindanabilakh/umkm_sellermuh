"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProductFormData {
  name: string
  description: string
  price: number
}

export function AddProductForm({ onAdd, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>()

  const onSubmit = (data: ProductFormData) => {
    onAdd(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" {...register("name", { required: "Product name is required" })} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description", { required: "Description is required" })} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="price">Price (IDR)</Label>
        <Input id="price" type="number" {...register("price", { required: "Price is required", min: 0 })} />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Product</Button>
      </div>
    </form>
  )
}

