"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface UMKMFormData {
  name: string;
  description: string;
  location: string;
  mapUrl: string;
  phoneNumber: string;
  openingHours: string;
  closingHours: string;
  images: FileList;
}

export function UMKMDetailForm({
  umkmData,
}: {
  umkmData?: Partial<UMKMFormData>;
}) {
  const { register, handleSubmit, watch } = useForm<UMKMFormData>({
    defaultValues: umkmData ?? {
      name: "",
      description: "",
      location: "",
      mapUrl: "https://www.google.com/maps/embed?...", // ✅ Pastikan ini ada
      phoneNumber: "",
      openingHours: "",
      closingHours: "",
      images: {} as FileList,
    },
  });

  const onSubmit = (data: UMKMFormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">UMKM Name</Label>
                <Input id="name" {...register("name", { required: true })} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Address</Label>
                <Input
                  id="location"
                  {...register("location", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
                <Input
                  id="mapUrl"
                  {...register("mapUrl", { required: true })}
                />
              </div>
              <div className="aspect-video">
                {watch("mapUrl") ? (
                  <iframe
                    src={watch("mapUrl")}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <p className="text-red-500">No map available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openingHours">Opening Time</Label>
                <Input
                  id="openingHours"
                  type="time"
                  {...register("openingHours", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="closingHours">Closing Time</Label>
                <Input
                  id="closingHours"
                  type="time"
                  {...register("closingHours", { required: true })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>UMKM Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  {...register("images", { required: true })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Button type="submit" className="w-full">
        Save UMKM Details
      </Button>
    </form>
  );
}
