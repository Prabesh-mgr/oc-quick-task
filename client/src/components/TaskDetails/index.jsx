import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskDetails } from "../../hooks/useTask/getAllTaskDetails/index.js";
import { Loader2, ArrowLeft } from "lucide-react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const TaskDetailsPage = () => {
  const { taskId, boardId } = useParams();
  const navigate = useNavigate();
  const { taskDetails, isLoadingTaskDetails, isErrorTask } = getTaskDetails(taskId);

  const handleGoBack = () => {
    navigate(`/home/${boardId}`);
  };

  if (isLoadingTaskDetails) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-bold">Task Details</h1>
            </div>
          </header>
          <div className="flex items-center justify-center p-16">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <p className="text-lg">Loading task details...</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (isErrorTask) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-bold">Task Details</h1>
            </div>
          </header>
          <div className="p-6">
            <div className="p-6 bg-red-50 text-red-600 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Error loading task details</h3>
              <p>{isErrorTask.message || "Failed to load task details"}</p>
              <button 
                onClick={handleGoBack}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to board
              </button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!taskDetails) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-bold">Task Details</h1>
            </div>
          </header>
          <div className="p-6">
            <div className="p-6 bg-gray-50 text-gray-600 rounded-lg text-center">
              <p className="mb-4">No task details found</p>
              <button 
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center mx-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to board
              </button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Task Details</h1>
          </div>
        </header>
        
        <div className="p-6">
          <button 
            onClick={handleGoBack}
            className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to board
          </button>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {taskDetails.taskName}
              </h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-gray-600 whitespace-pre-line">
                  {taskDetails.description || "No description provided"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Due Date</p>
                <p className="font-medium">
                  {taskDetails.dueDate || "Not set"}
                </p>
              </div>
              
              {/* Add more task properties as needed */}
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="font-medium">
                  {taskDetails.status || "Active"}
                </p>
              </div>
            </div>
            
            {/* You can add more sections here like comments, attachments, etc. */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};