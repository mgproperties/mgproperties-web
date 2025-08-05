"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    propertyType?: string;
    budget?: string;
    timestamp: Date;
}

const initialSubmissions: ContactSubmission[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-111-2222",
        subject: "Buy Property",
        message: "I'm looking for a 3-bedroom house in the suburbs.",
        propertyType: "House",
        budget: "$500K - $750K",
        timestamp: new Date("2024-07-10T10:00:00Z"),
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        subject: "General Inquiry",
        message: "Could you provide more information about your services?",
        timestamp: new Date("2024-07-09T14:30:00Z"),
    },
    {
        id: "3",
        name: "Peter Jones",
        email: "peter.jones@example.com",
        phone: "555-333-4444",
        subject: "Sell Property",
        message: "I'm interested in selling my condo downtown.",
        propertyType: "Condo",
        timestamp: new Date("2024-07-08T09:15:00Z"),
    },
];

export function ContactSubmissions() {
    const [submissions] = useState<ContactSubmission[]>(initialSubmissions);
    const [selectedSubmission, setSelectedSubmission] =
        useState<ContactSubmission | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const handleViewSubmission = (submission: ContactSubmission) => {
        setSelectedSubmission(submission);
        setIsViewDialogOpen(true);
    };

    return (
        <Card className="bg-white rounded-3xl border-0 shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">
                    Contact Form Submissions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Property Type</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="text-sm text-slate-600">
                                        {format(
                                            submission.timestamp,
                                            "MMM dd, yyyy HH:mm"
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {submission.name}
                                    </TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell>{submission.subject}</TableCell>
                                    <TableCell>
                                        {submission.propertyType || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {submission.budget || "N/A"}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate text-sm text-slate-700">
                                        {submission.message}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleViewSubmission(submission)
                                            }
                                            className="hover:bg-primary/10"
                                        >
                                            <Eye className="h-4 w-4 text-primary" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Dialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                >
                    <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-slate-800">
                                Contact Submission Details
                            </DialogTitle>
                        </DialogHeader>
                        {selectedSubmission && (
                            <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">
                                            Contact Information
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <p>
                                                <span className="font-medium">
                                                    Name:
                                                </span>{" "}
                                                {selectedSubmission.name}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Email:
                                                </span>{" "}
                                                {selectedSubmission.email}
                                            </p>
                                            {selectedSubmission.phone && (
                                                <p>
                                                    <span className="font-medium">
                                                        Phone:
                                                    </span>{" "}
                                                    {selectedSubmission.phone}
                                                </p>
                                            )}
                                            <p>
                                                <span className="font-medium">
                                                    Date:
                                                </span>{" "}
                                                {format(
                                                    selectedSubmission.timestamp,
                                                    "MMMM dd, yyyy 'at' HH:mm"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">
                                            Inquiry Details
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <p>
                                                <span className="font-medium">
                                                    Subject:
                                                </span>{" "}
                                                {selectedSubmission.subject}
                                            </p>
                                            {selectedSubmission.propertyType && (
                                                <p>
                                                    <span className="font-medium">
                                                        Property Type:
                                                    </span>{" "}
                                                    {
                                                        selectedSubmission.propertyType
                                                    }
                                                </p>
                                            )}
                                            {selectedSubmission.budget && (
                                                <p>
                                                    <span className="font-medium">
                                                        Budget:
                                                    </span>{" "}
                                                    {selectedSubmission.budget}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-2">
                                        Message
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {selectedSubmission.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
