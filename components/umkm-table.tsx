import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const umkmData = [
  {
    id: 1,
    name: "Warung Sate Madura",
    owner: "Pak Slamet",
    category: "Food",
    revenue: "$2,500",
    status: "Active",
  },
  {
    id: 2,
    name: "Batik Pekalongan",
    owner: "Ibu Siti",
    category: "Textile",
    revenue: "$3,800",
    status: "Active",
  },
  {
    id: 3,
    name: "Toko Elektronik Jaya",
    owner: "Budi Santoso",
    category: "Electronics",
    revenue: "$5,200",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Kerajinan Kayu Bali",
    owner: "Made Wijaya",
    category: "Handicraft",
    revenue: "$1,900",
    status: "Active",
  },
  {
    id: 5,
    name: "Kopi Gayo Aceh",
    owner: "Aminah",
    category: "Food & Beverage",
    revenue: "$3,100",
    status: "Active",
  },
];

export function UMKMTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {umkmData.map((umkm) => (
            <TableRow key={umkm.id}>
              <TableCell className="font-medium">{umkm.id}</TableCell>
              <TableCell>{umkm.name}</TableCell>
              <TableCell>{umkm.owner}</TableCell>
              <TableCell>{umkm.category}</TableCell>
              <TableCell>{umkm.revenue}</TableCell>
              <TableCell>
                <Badge
                  variant={umkm.status === "Active" ? "default" : "destructive"}
                >
                  {umkm.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
