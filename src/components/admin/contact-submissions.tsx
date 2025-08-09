"use client";

import { useEffect, useState } from "react";
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
    inquiryID: string;
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    propertyType?: string;
    budget?: string;
    createdAt: Date;
}

export function ContactSubmissions() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [selectedSubmission, setSelectedSubmission] =
        useState<ContactSubmission | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('api/admin/submissions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result: ContactSubmission[] = await response.json();

            setSubmissions(result);
        } catch (error) {
            console.error("Error fetching submissions: ", error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

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
                                <TableRow key={submission.inquiryID}>
                                    <TableCell className="text-sm text-slate-600">
                                        {format(
                                            submission.createdAt,
                                            "MMM dd, yyyy HH:mm"
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {submission.fullName}
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
                                                {selectedSubmission.fullName}
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
                                                    selectedSubmission.createdAt,
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
