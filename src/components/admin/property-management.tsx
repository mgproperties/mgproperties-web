"use client";

import { useState, useEffect } from "react";
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
import { PropertyData } from "@/contexts/FilterContext";
import { uploadPropertyImages, deletePropertyImages } from "@/utils/imageUpload";

function calculateDays(timestamp: string): number {
    const inputDate = new Date(timestamp);
    const today = new Date();
    const utcInput = Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate());
    const utcToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((utcToday - utcInput) / millisecondsPerDay) + 1;
}

interface PropertyManagementProps {
    userRole: "admin" | "agent";
}

export function PropertyManagement({ userRole }: PropertyManagementProps) {

    const [properties, setProperties] = useState<PropertyData[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    
        const fetchProperties = async () => {
            try {
                const response = await fetch('api/properties', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                const result: PropertyData[] = await response.json();
    
                if (response.ok) {
                    const updatedProperties = result.map((property) => ({
                        ...property,
                        daysOnMarket: calculateDays(property.listedOn)
                    }));
                    setProperties(updatedProperties);
                }
            } catch (error) {
                console.error("Error fetching properties: ", error);
            }
        };
    
        useEffect(() => {
            fetchProperties();
        }, []);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<PropertyData | null>(
        null
    );
    const [newProperty, setNewProperty] = useState<Omit<PropertyData, "propertyID">>({
        title: "",
        price: "",
        location: "",
        beds: 0,
        baths: 0,
        sqm: 0,
        status: "For Sale",
        propertyType: "Residential",
        description: "",
        images: [], // Add this for multiple images
        imageCount: 0,
        priceReduced: false,
        originalPrice: "",
        features: [],
        featured: false,
        listedOn: "",
        agent: ""
    });

    const handleCreateProperty = () => {
        setEditingProperty(null);
        setSelectedFiles([]);
        setNewProperty({
            title: "",
            price: "",
            location: "",
            beds: 0,
            baths: 0,
            sqm: 0,
            status: "For Sale",
            propertyType: "Residential",
            description: "",
            images: [], // Add this for multiple images
            imageCount: 0,
            priceReduced: false,
            originalPrice: "",
            features: [],
            featured: false,
            listedOn: "",
            agent: ""
        });
        setIsDialogOpen(true);
    };

    const handleEditProperty = (property: PropertyData) => {
        setEditingProperty(property);
        setSelectedFiles([]);
        setNewProperty({
            ...property, 
            images: property.images || [],
            features:property.features || [],
            originalPrice: property.originalPrice || "",
        });
        setIsDialogOpen(true);
    };

    const handleDeleteProperty = async (id: number) => {
        try {

            await deletePropertyImages(id);

            const response = await fetch('api/admin/properties', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    propertyID: id
                })
            });

            const result = await response.json();

            if (response.ok) {
                await fetchProperties();
            }
        } catch (error) {
            console.error("Could not delete property from the database: ", error);
        }
    };

    const handleSaveProperty = async () => {
        setIsSaving(true);
        try{
            const response = await fetch('api/admin/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newProperty,
                    propertyID: editingProperty?.propertyID
                })
            });

            const result = await response.json();

            if (response.ok && result.result[0]?.propertyID){
                const propertyID = result.result[0].propertyID;

                if (selectedFiles.length > 0) {
                    try {
                        const imagePaths = await uploadPropertyImages(propertyID, selectedFiles);
                    } catch (imageError) {
                        console.error("Error uploading images: ", imageError);
                    }
                }
                await fetchProperties();
            }
        } catch (error){
            console.error("Could not save property to the database: ", error);
            throw error;
        } finally {
            setIsSaving(false);
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
                            <TableRow key={property.propertyID}>
                                <TableCell>
                                    <img
                                        src={
                                            property.images[0] || "/placeholder.svg"
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
                                                onClick={() => {
                                                    if (window.confirm(`Are you you want to delete "${property.title}"?`)){
                                                        handleDeleteProperty(property.propertyID);
                                                    }
                                                }}
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
                                        type="number"
                                        value={newProperty.sqm}
                                        onChange={(e) =>
                                            setNewProperty({
                                                ...newProperty,
                                                sqm: Number.parseInt(e.target.value) || 0,
                                            })
                                        }
                                        className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceReduced">Price Reduced</Label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="priceReduced"
                                            type="checkbox"
                                            checked={newProperty.priceReduced}
                                            onChange={(e) => 
                                                setNewProperty({
                                                    ...newProperty,
                                                    priceReduced: e.target.checked,
                                                    originalPrice: e.target.checked ? newProperty.originalPrice : "",
                                                })
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-600">Mark as price reduced</span>
                                    </div>
                                </div>
                                {newProperty.priceReduced && (
                                    <div className="space-y-2">
                                        <Label htmlFor="originalPrice">Original Price</Label>
                                        <Input
                                            id="originalPrice"
                                            value={newProperty.originalPrice || ""}
                                            onChange={(e) =>
                                                setNewProperty({
                                                    ...newProperty,
                                                    originalPrice: e.target.value,
                                                })
                                            }
                                            className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            placeholder="Enter original price"
                                        />
                                    </div>
                                )}
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
                                            <SelectItem value="For Rent">
                                                For Rent
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
                                    <Label htmlFor="agent">Agent</Label>
                                    <Select
                                        value={newProperty.agent}
                                        onValueChange={(value) =>
                                            setNewProperty({
                                                ...newProperty,
                                                agent: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                            <SelectValue placeholder="Select agent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="John Stewards">
                                                John Stewards
                                            </SelectItem>
                                            <SelectItem value="Samantha Simone">
                                                Samantha Simone
                                            </SelectItem>
                                            <SelectItem value="Olebile Moremong">
                                                Olebile Moremong
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
                                            <SelectItem value="Residential">
                                                Residential
                                            </SelectItem>
                                            <SelectItem value="Commercial">
                                                Commercial
                                            </SelectItem>
                                            <SelectItem value="Agricultural">
                                                Agricultural
                                            </SelectItem>
                                            <SelectItem value="Multi-residential">
                                                Multi-residential
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="features">Features</Label>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <Input
                                                id="newFeature"
                                                placeholder="Add a feature..."
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const value = e.currentTarget.value.trim();
                                                        if (value && !newProperty.features.includes(value)) {
                                                            setNewProperty({
                                                                ...newProperty,
                                                                features: [...newProperty.features, value],
                                                            });
                                                            e.currentTarget.value = '';
                                                        }
                                                    }
                                                }}
                                                className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const input = document.getElementById('newFeature') as HTMLInputElement;
                                                    const value = input.value.trim();
                                                    if (value && !newProperty.features.includes(value)) {
                                                        setNewProperty({
                                                            ...newProperty,
                                                            features: [...newProperty.features, value],
                                                        });
                                                        input.value = '';
                                                    }
                                                }}
                                                className="rounded-lg"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        {newProperty.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {newProperty.features.map((feature, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                                                    >
                                                        {feature}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setNewProperty({
                                                                    ...newProperty,
                                                                    features: newProperty.features.filter((_, i) => i !== index),
                                                                });
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
                                                const files = Array.from(e.target.files || []);
                                                setSelectedFiles([...selectedFiles, ...files]);

                                                const imageUrls = files.map((file) => URL.createObjectURL(file));
                                                setNewProperty({
                                                    ...newProperty,
                                                    images: [
                                                        ...(newProperty.images || []),
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
                                                                    const updatedImages = newProperty.images?.filter((_, i) => i !== idx) || [];
                                                                    const updatedFiles = selectedFiles.filter((_, i) => i !== idx);

                                                                    setNewProperty({
                                                                        ...newProperty,
                                                                        images: updatedImages,
                                                                    });
                                                                    setSelectedFiles(updatedFiles);
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
                                disabled={isSaving}
                                className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-md"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
