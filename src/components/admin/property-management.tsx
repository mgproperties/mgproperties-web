"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, XCircle } from "lucide-react";

interface Property {
    id: string;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqm: string;
    status: string;
    propertyType: string;
    description: string;
    image: string;
    images?: string[]; // Add this optional field
}

const initialProperties: Property[] = [
    {
        id: "1",
        title: "Modern Family Home",
        price: "$750,000",
        location: "Beverly Hills, CA",
        beds: 4,
        baths: 3,
        sqm: "232",
        status: "For Sale",
        propertyType: "Single Family House",
        description:
            "Stunning modern home with open floor plan and premium finishes throughout.",
        image: "/placeholder.svg?height=100&width=150",
    },
    {
        id: "2",
        title: "Downtown Luxury Condo",
        price: "$1,200,000",
        location: "Manhattan, NY",
        beds: 2,
        baths: 2,
        sqm: "180",
        status: "New Listing",
        propertyType: "Condo",
        description:
            "Luxury high-rise condo with breathtaking city views and premium amenities.",
        image: "/placeholder.svg?height=100&width=150",
    },
];

interface PropertyManagementProps {
    userRole: "admin" | "agent";
}

export function PropertyManagement({ userRole }: PropertyManagementProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(
        null
    );
    const [newProperty, setNewProperty] = useState<Omit<Property, "id">>({
        title: "",
        price: "",
        location: "",
        beds: 0,
        baths: 0,
        sqm: "",
        status: "For Sale",
        propertyType: "Single Family House",
        description: "",
        image: "/placeholder.svg?height=100&width=150",
        images: [], // Add this for multiple images
    });

    const handleCreateProperty = () => {
        setEditingProperty(null);
        setNewProperty({
            title: "",
            price: "",
            location: "",
            beds: 0,
            baths: 0,
            sqm: "",
            status: "For Sale",
            propertyType: "Single Family House",
            description: "",
            image: "/placeholder.svg?height=100&width=150",
            images: [],
        });
        setIsDialogOpen(true);
    };

    const handleEditProperty = (property: Property) => {
        setEditingProperty(property);
        setNewProperty({ ...property, images: property.images || [] });
        setIsDialogOpen(true);
    };

    const handleDeleteProperty = (id: string) => {
        setProperties(properties.filter((property) => property.id !== id));
    };

    const handleSaveProperty = () => {
        if (editingProperty) {
            setProperties(
                properties.map((property) =>
                    property.id === editingProperty.id
                        ? { ...newProperty, id: editingProperty.id }
                        : property
                )
            );
        } else {
            setProperties([
                ...properties,
                { ...newProperty, id: String(properties.length + 1) },
            ]);
        }
        setIsDialogOpen(false);
    };

    return (
        <Card className="bg-white rounded-3xl border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">
                    Property Listings
                </CardTitle>
                {(userRole === "admin" || userRole === "agent") && (
                    <Button
                        onClick={handleCreateProperty}
                        className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-md"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Property
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Beds</TableHead>
                            <TableHead>Baths</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell>
                                    <img
                                        src={
                                            property.image || "/placeholder.svg"
                                        }
                                        alt={property.title}
                                        className="w-16 h-12 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {property.title}
                                </TableCell>
                                <TableCell>{property.price}</TableCell>
                                <TableCell>{property.location}</TableCell>
                                <TableCell>{property.beds}</TableCell>
                                <TableCell>{property.baths}</TableCell>
                                <TableCell>{property.status}</TableCell>
                                <TableCell className="text-right">
                                    {(userRole === "admin" ||
                                        userRole === "agent") && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditProperty(property)
                                                }
                                                className="mr-2"
                                            >
                                                <Edit className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteProperty(
                                                        property.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-white rounded-2xl p-0 shadow-xl overflow-hidden">
                        <DialogHeader className="p-6 pb-0">
                            <DialogTitle className="text-2xl font-bold text-slate-800">
                                {editingProperty
                                    ? "Edit Property"
                                    : "Create New Property"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={newProperty.title}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                title: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        value={newProperty.price}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                price: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={newProperty.location}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                location: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="beds">Bedrooms</Label>
                                    <Input
                                        id="beds"
                                        type="number"
                                        value={newProperty.beds}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                beds:
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="baths">Bathrooms</Label>
                                    <Input
                                        id="baths"
                                        type="number"
                                        value={newProperty.baths}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                baths:
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sqm">Area (sqm)</Label>
                                    <Input
                                        id="sqm"
                                        value={newProperty.sqm}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                sqm: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={newProperty.status}
                                        onValueChange={(value) =>
                                            setNewProperty({
                                                ...newProperty,
                                                status: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="For Sale">
                                                For Sale
                                            </SelectItem>
                                            <SelectItem value="New Listing">
                                                New Listing
                                            </SelectItem>
                                            <SelectItem value="Under Offer">
                                                Under Offer
                                            </SelectItem>
                                            <SelectItem value="Sold">
                                                Sold
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="propertyType">
                                        Property Type
                                    </Label>
                                    <Select
                                        value={newProperty.propertyType}
                                        onValueChange={(value) =>
                                            setNewProperty({
                                                ...newProperty,
                                                propertyType: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Single Family House">
                                                Single Family House
                                            </SelectItem>
                                            <SelectItem value="Condo">
                                                Condo
                                            </SelectItem>
                                            <SelectItem value="Townhouse">
                                                Townhouse
                                            </SelectItem>
                                            <SelectItem value="Villa">
                                                Villa
                                            </SelectItem>
                                            <SelectItem value="Commercial">
                                                Commercial
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={newProperty.image}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                image: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                {/* Add new image upload section before description */}
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="images">
                                        Property Images
                                    </Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                        <input
                                            type="file"
                                            id="images"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files || []
                                                );
                                                const imageUrls = files.map(
                                                    (file) =>
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                );
                                                setNewProperty({
                                                    ...newProperty,
                                                    images: [
                                                        ...(newProperty.images ||
                                                            []),
                                                        ...imageUrls,
                                                    ],
                                                });
                                            }}
                                        />
                                        <label
                                            htmlFor="images"
                                            className="cursor-pointer"
                                        >
                                            <div className="text-gray-500 mb-2">
                                                <svg
                                                    className="mx-auto h-12 w-12"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Click to upload images or drag
                                                and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB each
                                            </p>
                                        </label>
                                    </div>
                                    {newProperty.images &&
                                        newProperty.images.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2 mt-4">
                                                {newProperty.images.map(
                                                    (img, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="relative"
                                                        >
                                                            <img
                                                                src={
                                                                    img ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={`Upload ${
                                                                    idx + 1
                                                                }`}
                                                                className="w-full h-20 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedImages =
                                                                        newProperty.images?.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                idx
                                                                        ) || [];
                                                                    setNewProperty(
                                                                        {
                                                                            ...newProperty,
                                                                            images: updatedImages,
                                                                        }
                                                                    );
                                                                }}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newProperty.description}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                description: e.target.value,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="p-6 pt-0">
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="rounded-xl"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveProperty}
                                className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-md"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
