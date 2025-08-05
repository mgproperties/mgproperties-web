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
import { Plus, Edit, Trash2, Save, XCircle } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "agent" | "user";
}

const initialUsers: User[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "admin",
    },
    { id: "2", name: "Bob Williams", email: "bob@example.com", role: "agent" },
    {
        id: "3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "user",
    },
];

export function UserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<Omit<User, "id">>({
        name: "",
        email: "",
        role: "user",
    });

    const handleCreateUser = () => {
        setEditingUser(null);
        setNewUser({ name: "", email: "", role: "user" });
        setIsDialogOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setNewUser({ name: user.name, email: user.email, role: user.role });
        setIsDialogOpen(true);
    };

    const handleDeleteUser = (id: string) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleSaveUser = () => {
        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id
                        ? { ...newUser, id: editingUser.id }
                        : user
                )
            );
        } else {
            setUsers([...users, { ...newUser, id: String(users.length + 1) }]);
        }
        setIsDialogOpen(false);
    };

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
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
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
                        ))}
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
                                    className="col-span-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                />
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
                                    className="col-span-3 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={(
                                        value: "admin" | "agent" | "user"
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
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
