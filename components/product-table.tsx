"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { AddProductForm } from "./add-product-form"
import { Modal } from "./ui/modal"

const initialProducts = [
  { id: 1, name: "Batik Shirt", description: "Handmade batik shirt with traditional patterns", price: 250000 },
  { id: 2, name: "Wooden Carving", description: "Intricate wooden carving of Balinese scenery", price: 500000 },
  { id: 3, name: "Spice Mix", description: "Authentic Indonesian spice mix for various dishes", price: 35000 },
  { id: 4, name: "Woven Bag", description: "Handwoven bag made from natural fibers", price: 150000 },
  { id: 5, name: "Ceramic Vase", description: "Hand-painted ceramic vase with traditional motifs", price: 300000 },
]

export function ProductTable() {
  const [products, setProducts] = useState(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setIsModalOpen(false)
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <AddProductForm onAdd={addProduct} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}

