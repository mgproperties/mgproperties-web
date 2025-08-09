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
import { Plus, Edit, Trash2, Save, XCircle } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "agent";
    status?: "active" | "invited"; // Add status field
    invited_at?: string;
    last_sign_in_at?: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    role?: string;
}

export function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [ saveStatus, setSaveStatus ] = useState<{
            type: "success" | "error" | null;
            message: string;
        }>({
            type: null,
            message: "",    
        });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<Omit<User, "id">>({
        name: "",
        email: "",
        role: "agent",
    });
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        if(!newUser.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!newUser.email.trim()){
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!newUser.role.trim()){
            newErrors.role = "Role is required"
        }

        return newErrors;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('api/admin/users')
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                setError('Failed to fetch users')
            }
        } catch (error) {
            console.error('Failed to fetch users:', error)
            setError('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateUser = () => {
        setEditingUser(null);
        setNewUser({ name: "", email: "", role: "agent" });
        setIsDialogOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setNewUser({ name: user.name, email: user.email, role: user.role });
        setIsDialogOpen(true);
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }
        
        try {
            const response = await fetch(`api/admin/users/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                fetchUsers(); // Refresh the list
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleSaveUser = async () => {

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0){
            setSaveStatus({
                type: 'error',
                message: 'Please fix the errors before submitting'
            });
            return;
        }

        setIsSaving(true);
        setSaveStatus({
            type: null,
            message: ""
        });

        try {
            const url = editingUser ? `api/admin/users/${editingUser.id}` : 'api/admin/users';
            const method = editingUser ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            const result = await response.json();

            if (response.ok) {
                fetchUsers();
                setSaveStatus({
                    type: 'success',
                    message: result.message
                })
                setErrors({});
                setIsDialogOpen(false);
            } else {
                setSaveStatus({
                    type: 'error',
                    message: result.error || 'An error occured while saving a new user'
                })
                console.error('Failed to save user');
            }
        } catch (error) {
            console.error('Failed to save user:', error);
            setSaveStatus({
                type: 'error',
                message: 'An unexpected error occurred. Please try again later.'
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <Card className="bg-white rounded-3xl border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                    <div>Loading users...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white rounded-3xl border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">
                    User Management
                </CardTitle>
                <Button
                    onClick={handleCreateUser}
                    className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-md"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            user.status === 'invited'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.status === 'invited' ? 'Pending' : 'Active'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEditUser(user)}
                                            className="mr-2"
                                        >
                                            <Edit className="h-4 w-4 text-primary" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-slate-800">
                                {editingUser ? "Edit User" : "Create New User"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            name: e.target.value,
                                        })
                                    }
                                    className={`col-span-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary ${
                                        errors.name ? 'border-red-300 bg-red-50' : 'boder-gray-200'
                                    }`}
                                />
                                {errors.name && <p className="col-start-2 col-span-3 text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className={`col-span-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                                />
                                {errors.email && <p className="col-start-2 col-span-3 text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={(
                                        value: "admin" | "agent"
                                    ) =>
                                        setNewUser({ ...newUser, role: value })
                                    }
                                >
                                    <SelectTrigger className="col-span-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="agent">
                                            Agent
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="col-start-2 col-span-3 text-red-600 text-sm mt-1">{errors.role}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="rounded-xl"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveUser}
                                disabled={isSaving}
                                className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-md disabled:opacity-50"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? 'Saving...' : 'Save Changes' }
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
