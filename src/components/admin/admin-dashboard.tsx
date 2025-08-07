'use client'

import { useState, useEffect } from "react";
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/admin/user-management";
import { PropertyManagement } from "@/components/admin/property-management";
import { ContactSubmissions } from "@/components/admin/contact-submissions";
import { Button } from "@/components/ui/button";
import { Users, Home, Mail, LogOut } from "lucide-react";

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    const [userRole, setUserRole] = useState<"admin" | "agent">("admin");
    const [activeTab, setActiveTab] = useState(
        userRole === "admin" ? "users" : "properties"
    );
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        if (userRole === "agent" && activeTab === "users") {
            setActiveTab("properties");
        }
    }, [userRole, activeTab]);

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-24 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden">
                {/* Logout button */}
                <div className="fixed top-4 right-4 z-50">
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 backdrop-blur-sm"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Soft geometric background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/3 rounded-full blur-2xl" />
                    <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/3 to-primary/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4 text-center">
                        Admin Dashboard
                    </h1>
                    <p className="text-center text-slate-600 mb-8">
                        Welcome back, {user.email}
                    </p>

                    {/* Role Switcher */}
                    <div className="flex justify-center gap-4 mb-12">
                        <Button
                            onClick={() => setUserRole("admin")}
                            variant={
                                userRole === "admin" ? "default" : "outline"
                            }
                            className={`rounded-full px-6 py-3 text-lg font-semibold ${
                                userRole === "admin"
                                    ? "bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg"
                                    : "border-2 border-gray-300 text-slate-700 hover:border-primary hover:bg-primary/5"
                            }`}
                        >
                            <Users className="mr-2 h-5 w-5" />
                            Admin View
                        </Button>
                        <Button
                            onClick={() => setUserRole("agent")}
                            variant={
                                userRole === "agent" ? "default" : "outline"
                            }
                            className={`rounded-full px-6 py-3 text-lg font-semibold ${
                                userRole === "agent"
                                    ? "bg-gradient-to-r from-accent to-accent-600 text-white shadow-lg"
                                    : "border-2 border-gray-300 text-slate-700 hover:border-accent hover:bg-accent/5"
                            }`}
                        >
                            <Home className="mr-2 h-5 w-5" />
                            Agent View
                        </Button>
                    </div>

                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList
                            className="grid w-full bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-200"
                            style={{
                                gridTemplateColumns:
                                    userRole === "admin"
                                        ? "1fr 1fr 1fr"
                                        : "1fr 1fr",
                            }}
                        >
                            {userRole === "admin" && (
                                <TabsTrigger
                                    value="users"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:rounded-xl data-[state=active]:font-semibold transition-all py-3 px-4 text-base whitespace-nowrap"
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    User Management
                                </TabsTrigger>
                            )}
                            <TabsTrigger
                                value="properties"
                                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:rounded-xl data-[state=active]:font-semibold transition-all py-3 px-4 text-base whitespace-nowrap"
                            >
                                <Home className="mr-2 h-5 w-5" />
                                Property Listings
                            </TabsTrigger>
                            <TabsTrigger
                                value="contacts"
                                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:rounded-xl data-[state=active]:font-semibold transition-all py-3 px-4 text-base whitespace-nowrap"
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                Contact Submissions
                            </TabsTrigger>
                        </TabsList>

                        {userRole === "admin" && (
                            <TabsContent value="users" className="mt-8">
                                <UserManagement />
                            </TabsContent>
                        )}
                        <TabsContent value="properties" className="mt-8">
                            <PropertyManagement userRole={userRole} />
                        </TabsContent>
                        <TabsContent value="contacts" className="mt-8">
                            <ContactSubmissions />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
}